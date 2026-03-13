import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { Target, Zap, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { FileUpload } from '../components/ui/FileUpload';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

interface AssessmentDay {
  day: number;
  category: string;
  title: string;
  scenario: string;
  task: string;
  submissionRequirement: string;
}

const assessmentsByCourse: Record<string, AssessmentDay[]> = {
  'data-science': [
    {
      day: 1,
      category: "Analytics",
      title: "The Data Detective",
      scenario: "Imagine you joined SkyHigh Airlines. The management is worried about falling ratings.",
      task: "Analyze the relationship between 'Inflight Entertainment' and 'Overall Satisfaction' using the Airline Passenger Satisfaction dataset.",
      submissionRequirement: "List the top 3 features that correlate most with a 'Satisfied' customer. Explain your logic in 4-5 sentences."
    },
    {
      day: 2,
      category: "Data Cleaning",
      title: "Cleaning the Mess",
      scenario: "HealthGuard Insurance has a messy database. Some BMI values are missing, and smokers' data is inconsistent.",
      task: "Explain how you will handle missing values in the 'bmi' column. Will you use Mean, Median, or Mode?",
      submissionRequirement: "Provide the Python logic/strategy to detect and remove outliers from the 'charges' column so the company doesn't lose money on skewed data."
    },
    {
      day: 3,
      category: "Visualization",
      title: "The Visual Storyteller",
      scenario: "The CEO of RetailPulse wants a visual report of the 'South Region' performance.",
      task: "Decide which plot is best to show the sales trend of the 'Technology' category over the last 2 years.",
      submissionRequirement: "Describe the X-axis, Y-axis, and the type of chart (Line/Bar/Scatter) you would use. Explain why this chart is the best choice for a non-technical CEO."
    },
    {
      day: 4,
      category: "Feature Engineering",
      title: "Feature Architect",
      scenario: "CityCab AI needs better predictions. The raw 'pickup_datetime' isn't enough to predict traffic.",
      task: "Create 3 new features from the timestamp that could impact trip duration from the NYC Taxi dataset.",
      submissionRequirement: "Explain the logic for these 3 features (e.g., peak hours, weekend vs weekday). Describe how these features help a machine learning model understand traffic patterns."
    },
    {
      day: 5,
      category: "Modeling",
      title: "The Model Builder",
      scenario: "EasyLoan Bank wants to automate loan approvals.",
      task: "This is a classification problem. Choose between Logistic Regression and Random Forest.",
      submissionRequirement: "Justify your choice of algorithm. Explain what 'Train-Test Split' ratio you would use (e.g., 80/20) and why it's important to keep some data hidden from the model."
    },
    {
      day: 6,
      category: "Optimization",
      title: "Tuning the Engine",
      scenario: "RealEstate Pro's current model is underperforming. They need high accuracy for high-stakes property deals.",
      task: "Use 'Hyperparameter Tuning' to improve the house price prediction model.",
      submissionRequirement: "Explain the concept of 'GridSearchCV'. Pick 3 parameters of your chosen model and describe how you would find their optimal values."
    },
    {
      day: 7,
      category: "Strategy",
      title: "The CEO Presentation",
      scenario: "Combine your learnings from the past 6 days to present a Data Science Pipeline to the Board.",
      task: "Summarize the entire flow: Data Collection -> Cleaning -> Feature Engineering -> Model Selection -> Evaluation.",
      submissionRequirement: "Explain how your model's predictions will save the company money or increase revenue."
    }
  ],
  'web-development': [
    {
      day: 1,
      category: "Layout",
      title: "Layout Mastery",
      scenario: "FitTrack Gym needs a professional landing page. The first impression is the most important.",
      task: "Design a navigation bar and a Hero Section. Everything must be perfectly centered on the screen.",
      submissionRequirement: "Explain which CSS properties you would use to center a div both horizontally and vertically. Provide the logic for Flexbox vs. CSS Grid."
    },
    {
      day: 2,
      category: "Responsive Design",
      title: "The Mobile-First Challenge",
      scenario: "90% of FoodieExpress users order from mobile phones, but the current menu card layout is breaking on small screens.",
      task: "Make the menu card layout responsive without breaking the design for devices under 768px.",
      submissionRequirement: "Explain the concept of 'Media Queries'. How do you change a 3-column layout to a 1-column layout for small mirrors?"
    },
    {
      day: 3,
      category: "Interactivity",
      title: "Dynamic Interactions",
      scenario: "Users of TaskMaster SaaS want a 'Dark Mode' feature for better productivity at night.",
      task: "Implement a toggle button that changes the entire website's background and text color when clicked.",
      submissionRequirement: "How do you use JavaScript's addEventListener to manipulate the DOM? Explain how you would store the user's theme preference."
    },
    {
      day: 4,
      category: "API Integration",
      title: "Live Data Feed",
      scenario: "CryptoTracker needs to show live Bitcoin prices to users using a third-party public API.",
      task: "Fetch real-time data from an API and display it on a clean dashboard using async/await.",
      submissionRequirement: "Describe how fetch(), async, and await work together. How do you handle cases where the API fails (Error Handling)?"
    },
    {
      day: 5,
      category: "Security & Forms",
      title: "Secure Data Entry",
      scenario: "SecureBank is facing issues with users entering invalid email addresses and weak passwords.",
      task: "Create a robust form validation system for the login page using Regex.",
      submissionRequirement: "Explain the use of 'Regex' for email validation. List two security checks you must perform before allowing form submission."
    },
    {
      day: 6,
      category: "Architecture",
      title: "Scalable Components",
      scenario: "ShopZilla is expanding. They have 100+ products and need a way to display them without repetitive code.",
      task: "Design a reusable 'Product Card' component using a modern framework like React.",
      submissionRequirement: "Explain the difference between 'Props' and 'State'. How do you pass data dynamically to render different products?"
    },
    {
      day: 7,
      category: "Performance",
      title: "Performance & Launch",
      scenario: "It is launch day! You need to optimize the website so it loads in under 2 seconds.",
      task: "Optimize images, minify code, and prepare for production deployment.",
      submissionRequirement: "List three strategies to improve website loading speed. Which platform (Vercel/Netlify/GitHub Pages) will you choose and why?"
    }
  ],
  'ui-ux': [
    {
      day: 1,
      category: "Research",
      title: "Empathy & Research",
      scenario: "PetAdopt users are complaining that the onboarding process is too long and confusing.",
      task: "Create a plan to understand this problem using 'User Research' methods.",
      submissionRequirement: "List 3 specific questions you would ask users. Explain why creating a 'User Persona' is essential for this project."
    },
    {
      day: 2,
      category: "User Flow",
      title: "Mapping the Journey",
      scenario: "QuickCart wants users to complete checkout within 3 clicks after adding items to the cart.",
      task: "Design the step-by-step user journey from login to 'Order Success'.",
      submissionRequirement: "Describe the 'User Flow Diagram' steps. Explain how identifying 'Pain Points' helps improve the final design."
    },
    {
      day: 3,
      category: "Wireframing",
      title: "Skeleton of Design",
      scenario: "StudyBuddy LMS needs a dashboard layout that helps students track their courses and progress.",
      task: "Create a structure (Wireframe) for the dashboard, focusing only on layout without colors.",
      submissionRequirement: "Explain the benefits of 'Low-Fidelity Wireframes'. List 4 essential elements that must be on the dashboard."
    },
    {
      day: 4,
      category: "Visual Identity",
      title: "Visual Hierarchy & Colors",
      scenario: "LuxeStay is a premium hotel booking app, but their current design feels 'cheap' and dated.",
      task: "Decide on visual design elements that reflect a 'Premium' brand identity.",
      submissionRequirement: "What 'Color Palette' and 'Typography' will you choose? Explain how you will use 'Negative Space'."
    },
    {
      day: 5,
      category: "UI Design",
      title: "High-Fidelity UI",
      scenario: "CryptoWallet app needs a 'Send Money' screen that builds trust and is easy for first-time users.",
      task: "Design the logic and final look (mockup) of this screen focusing on trust.",
      submissionRequirement: "How will you use 'Visual Hierarchy' to highlight the 'Confirm' button? What role do icons and shadows play?"
    },
    {
      day: 6,
      category: "Prototyping",
      title: "Interactive Prototypes",
      scenario: "FoodMood wants their app to feel 'Real' and responsive before going into development.",
      task: "Plan the screen transitions and animations (Micro-interactions) for the checkout flow.",
      submissionRequirement: "Describe how you would use 'Smart Animate' or 'Transitions'. List 2 micro-interactions that enhance UX."
    },
    {
      day: 7,
      category: "Case Study",
      title: "The Final Case Study",
      scenario: "It is time to present your work. Convert your 6 days of effort into a convincing portfolio piece.",
      task: "Explain the entire journey from the problem statement to the final design solution.",
      submissionRequirement: "List 5 main headings for a professional UX Case Study. How would you incorporate feedback from Usability Testing?"
    }
  ]
};

const assessmentTitles: Record<string, string> = {
  'data-science': 'Data Science Track',
  'web-development': 'Web Development Track',
  'ui-ux': 'UI/UX Design Track',
  'default': 'Professional Readiness'
};

const defaultAssessment: AssessmentDay[] = [
  { 
    day: 1, 
    category: "General Skills", 
    title: "Problem Solving", 
    scenario: "In any professional role, solving ambiguous problems is key.",
    task: "Describe a complex technical problem you solved recently and the steps you took.", 
    submissionRequirement: "Explain your thought process and the final outcome in detail."
  },
  { 
    day: 2, 
    category: "General Skills", 
    title: "Communication", 
    scenario: "Translating tech-speak for business stakeholders is a superpower.",
    task: "How do you explain technical concepts to non-technical stakeholders?", 
    submissionRequirement: "Provide an example scenario where you successfully bridged a communication gap."
  }
];

export const AssessmentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, updateProfile } = useAuth();
  
  const courseId = searchParams.get('course') || user?.currentCourseId || 'default';
  const courseName = assessmentTitles[courseId] || assessmentTitles.default;
  
  const assessmentContent = useMemo(() => {
    return assessmentsByCourse[courseId] || defaultAssessment;
  }, [courseId]);

  const [currentDay, setCurrentDay] = useState(user?.assessmentProgress || 1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Sync state if user data loads later
  useEffect(() => {
    if (user?.assessmentProgress) {
      setCurrentDay(user.assessmentProgress);
    }
  }, [user?.assessmentProgress]);

  const currentAssessment = assessmentContent[currentDay - 1] || assessmentContent[0];

  const handleNext = async () => {
    if (currentDay < 7) {
      const nextDay = currentDay + 1;
      setCurrentDay(nextDay);
      setShowToast(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Persist progress
      const newCompletedDays = { 
        ...(user?.completedDays || {}), 
        [courseId]: Math.max((user?.completedDays?.[courseId] || 0), currentDay) 
      };
      await updateProfile({ 
        assessmentProgress: nextDay, 
        currentCourseId: courseId,
        completedDays: newCompletedDays
      });
    } else {
      const newCompletedDays = { 
        ...(user?.completedDays || {}), 
        [courseId]: 7 
      };
      await updateProfile({ 
        completedDays: newCompletedDays
      });
      setIsSuccessModalOpen(true);
    }
  };

  const handleBack = async () => {
    if (currentDay > 1) {
      const prevDay = currentDay - 1;
      setCurrentDay(prevDay);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // We don't necessarily update completedDays on back, 
      // but we update the current position
      await updateProfile({ assessmentProgress: prevDay, currentCourseId: courseId });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-200">
                 {courseId.replace('-', ' ')}
               </div>
               <div className="h-px w-8 bg-slate-200" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Day {currentDay} Simulation</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              {currentAssessment.title}
            </h1>
            <p className="text-xl text-slate-400 font-bold uppercase tracking-widest">{courseName}</p>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col items-center gap-3 min-w-[200px]">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32" cy="32" r="28"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-slate-50"
                />
                <circle
                  cx="32" cy="32" r="28"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 28}
                  strokeDashoffset={2 * Math.PI * 28 * (1 - currentDay / 7)}
                  className="text-indigo-600 transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="absolute text-sm font-black text-slate-900">{Math.round((currentDay / 7) * 100)}%</span>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Overall Progress</span>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Context & Task */}
          <div className="lg:col-span-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Scenario Card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="group p-10 rounded-[3rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-100/50 transition-colors" />
                <div className="relative space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">The Scenario</h3>
                  <p className="text-xl font-bold text-slate-700 leading-relaxed italic">
                    "{currentAssessment.scenario}"
                  </p>
                </div>
              </motion.div>

              {/* Task Details Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="group p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl shadow-indigo-900/10 relative overflow-hidden h-full"
              >
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -mb-24 -mr-24" />
                <div className="relative space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">The Objective</h3>
                  <p className="text-xl font-bold text-slate-100 leading-relaxed">
                    {currentAssessment.task}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Submission Area */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="p-12 rounded-[4rem] bg-white border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] space-y-10"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-50 pb-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Submission Requirement</h3>
                  </div>
                  <p className="text-slate-500 font-bold ml-8">{currentAssessment.submissionRequirement}</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Ready for Response</span>
                </div>
              </div>

              <div className="space-y-6">
                <textarea 
                  placeholder="Draft your professional response here..."
                  className="w-full min-h-[450px] p-12 rounded-[2.5rem] bg-slate-50/50 border-2 border-slate-50 hover:border-slate-100 focus:border-indigo-600 focus:bg-white focus:ring-[16px] focus:ring-indigo-600/5 transition-all outline-none text-xl font-medium text-slate-800 leading-relaxed placeholder:text-slate-300 shadow-inner"
                />
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <FileUpload onFilesSelected={(files: File[]) => console.log('Selected files:', files)} />
                  </div>
                  <div className="flex flex-col justify-end gap-4 min-w-[240px]">
                    <Button 
                      onClick={handleNext}
                      className="w-full h-20 rounded-3xl bg-indigo-600 text-white text-lg font-black shadow-2xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-4 group"
                    >
                      {currentDay === 7 ? "Complete Track" : "Submit Exercise"}
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <div className="flex gap-4">
                      <Button 
                        variant="outline" 
                        onClick={handleBack}
                        disabled={currentDay === 1}
                        className="flex-1 h-14 rounded-2xl border-2 border-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 disabled:opacity-30 transition-all flex items-center justify-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex-1 h-14 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all"
                      >
                        Save Progress
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Success Modal */}
        <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)}>
          <div className="p-16 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-100"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </motion.div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Mission Accomplished!</h2>
            <p className="text-lg text-slate-500 font-bold leading-relaxed mb-12 max-w-sm mx-auto">
              Your professional journey in <span className="text-indigo-600">{courseName}</span> is complete. Our experts are reviewing your work.
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="w-full h-16 rounded-2xl text-lg font-black bg-slate-900 text-white shadow-2xl active:scale-95 transition-all"
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full py-4 rounded-xl text-sm font-black text-slate-400 hover:text-slate-900 transition-all"
              >
                Download Performance Report
              </Button>
            </div>
          </div>
        </Modal>

        <Toast 
          message="Submission saved successfully!" 
          isVisible={showToast} 
          onClose={() => setShowToast(false)} 
        />
      </div>
    </DashboardLayout>
  );
};
