import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { Clock, Zap, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { FileUpload } from '../components/ui/FileUpload';

interface AssessmentDay {
  day: number;
  category: string;
  title: string;
  description: string;
}

const assessmentsByCourse: Record<string, AssessmentDay[]> = {
  'se-ii': [
    { day: 1, category: "System Architecture", title: "Microservices vs Monolith", description: "Design a migration strategy for a legacy monolithic e-commerce platform to a microservices architecture. Focus on database splitting techniques." },
    { day: 2, category: "DevOps", title: "CI/CD Pipeline Design", description: "Draft a high-level CI/CD pipeline for a mission-critical financial application. Include security scanning and automated rollback strategies." },
    { day: 3, category: "Design Patterns", title: "Refactoring Legacy Code", description: "A system uses nested if-else blocks for payment processing. Explain how you would apply the Strategy or State pattern to improve extensibility." },
    { day: 4, category: "Scalability", title: "Load Balancing Strategies", description: "Compare Layer 4 vs Layer 7 load balancing. When would you prefer one over the other for a global video streaming platform?" },
    { day: 5, category: "Quality Assurance", title: "Automated Testing Suite", description: "Propose a testing pyramid for a React/Node.js stack. Detail the balance between unit, integration, and end-to-end tests." },
    { day: 6, category: "Security", title: "Authentication Flow", description: "Design a secure OAuth2/OpenID Connect flow for a multi-tenant SaaS application. Address token storage and revocation." },
    { day: 7, category: "Final Review", title: "Architectural Pitch", description: "Present your architectural vision for a 'Scale-to-Zero' serverless backend. Justify the trade-offs in cold-start latency vs cost." }
  ],
  'algorithms': [
    { day: 1, category: "Computational Logic", title: "Time Complexity Analysis", description: "Analyze the amortized time complexity of a dynamic array resizing operation. Explain why O(1) average is possible." },
    { day: 2, category: "Graph Theory", title: "Shortest Path Optimization", description: "In a real-time logistics system, implement a modified Dijkstra's for dynamic traffic conditions. How do you handle negative edge weights?" },
    { day: 3, category: "Data Structures", title: "Advanced Tree Structures", description: "Explain the rebalancing logic of an AVL tree vs a Red-Black tree. Which is better for read-heavy workloads and why?" },
    { day: 4, category: "Dynamic Programming", title: "Subsequence Optimization", description: "Solve the Longest Common Subsequence problem using DP. Explain the space optimization from O(N*M) to O(min(N,M))." },
    { day: 5, category: "Sorting & Searching", title: "External Sorting", description: "Design an algorithm to sort 1TB of data on a machine with only 8GB of RAM. Detail the N-way merge process." },
    { day: 6, category: "Probability", title: "Randomized Algorithms", description: "Explain the logic behind Randomized Quicksort or Bloom Filters. How does randomness minimize worst-case scenarios?" },
    { day: 7, category: "Final Review", title: "Algorithm Efficiency Pitch", description: "Synthesize how algorithmic efficiency directly impacts cloud computing costs and system sustainability." }
  ],
  'iot': [
    { day: 1, category: "Smart Systems", title: "Edge Computing Architecture", description: "Design a localized processing layer for a smart factory. Explain why processing data at the edge is critical for low latency." },
    { day: 2, category: "Connectivity", title: "Protocol Selection", description: "Compare MQTT, CoAP, and HTTP for low-power IoT devices. Which protocol would you choose for a heart-rate monitor and why?" },
    { day: 3, category: "Device Management", title: "OTA Update Security", description: "Draft a secure protocol for Over-The-Air (OTA) updates on IoT devices. Address man-in-the-middle attacks and rollback recovery." },
    { day: 4, category: "Data Engineering", title: "Time Series Analysis", description: "Sensor data is generating 10,000 events/sec. Propose a data ingestion pipeline using Kafka or AWS Kinesis for real-time alerts." },
    { day: 5, category: "Energy Efficiency", title: "Power Management", description: "Design an interrupt-based sleep cycle for a battery-powered environmental sensor. Calculate the estimated battery life improvement." },
    { day: 6, category: "Security", title: "Hardware Root of Trust", description: "Explain how Secure Elements and Hardware Security Modules (HSMs) protect device identity in untrusted environments." },
    { day: 7, category: "Final Review", title: "IoT Ecosystem Pitch", description: "Present a holistic view of an IoT ecosystem, from physical sensors to cloud-based predictive maintenance models." }
  ]
};

const assessmentTitles: Record<string, string> = {
  'se-ii': 'Software Engineering II',
  'algorithms': 'Analysis of Algorithms',
  'iot': 'MDM & IoT Systems',
  'default': 'Professional Readiness'
};

const defaultAssessment: AssessmentDay[] = [
  { day: 1, category: "General Skills", title: "Problem Solving", description: "Describe a complex technical problem you solved recently and the steps you took." },
  { day: 2, category: "General Skills", title: "Communication", description: "How do you explain technical concepts to non-technical stakeholders?" },
  { day: 3, category: "General Skills", title: "Adaptability", description: "Tell us about a time you had to learn a new technology quickly." },
  { day: 4, category: "General Skills", title: "Collaboration", description: "Describe your ideal team environment and your role within it." },
  { day: 5, category: "General Skills", title: "Time Management", description: "How do you prioritize tasks when faced with multiple tight deadlines?" },
  { day: 6, category: "General Skills", title: "Critical Thinking", description: "Analyze a business case where a technical solution might not be the answer." },
  { day: 7, category: "Final Review", title: "Career Goals", description: "Where do you see yourself in five years and how does this role help?" }
];

export const AssessmentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course') || 'default';
  const courseName = assessmentTitles[courseId] || assessmentTitles.default;
  
  const assessmentContent = useMemo(() => {
    return assessmentsByCourse[courseId] || defaultAssessment;
  }, [courseId]);

  const [currentDay, setCurrentDay] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const currentAssessment = assessmentContent[currentDay - 1] || assessmentContent[0];

  const handleNext = () => {
    if (currentDay < 7) {
      setCurrentDay(currentDay + 1);
      setShowToast(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsSuccessModalOpen(true);
    }
  };

  const handleBack = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-slate-900 leading-none">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <Clock className="w-5 h-5 text-indigo-600" />
               <span className="text-sm font-black text-slate-400 uppercase tracking-widest">7 Dedicated Days</span>
               <Zap className="w-5 h-5 text-amber-500 ml-4" />
               <span className="text-sm font-black text-slate-400 uppercase tracking-widest text-[#f59e0b]">
                 {courseId !== 'default' ? `${courseId.toUpperCase()} Track` : 'Real-world Scenarios'}
               </span>
            </div>
            <h1 className="text-5xl font-black tracking-tight">{courseName}</h1>
            <p className="mt-4 text-slate-500 font-bold text-lg">Daily Skills & Readiness Assessment</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Task {currentDay} of 7</span>
            <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                style={{ width: `${(currentDay / 7) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Assessment Card */}
        <Card className="p-16 rounded-[2.5rem] border-slate-100 shadow-2xl shadow-indigo-100 content-start">
          <div className="flex justify-between items-center mb-12">
            <span className="px-6 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest border border-indigo-100">
              {currentAssessment.category}
            </span>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleBack}
                disabled={currentDay === 1}
                className="p-2 rounded-full hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-slate-400" />
              </button>
              <span className="text-xl font-black text-slate-400">Day {currentDay}</span>
              <button 
                onClick={handleNext}
                disabled={currentDay === 7}
                className="p-2 rounded-full hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-6 h-6 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">{currentAssessment.title}</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              {currentAssessment.description}
            </p>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Your Detailed Response</label>
                <span className="text-xs font-bold text-slate-400 italic">Be as detailed as possible to showcase your industry readiness.</span>
              </div>
              <textarea 
                placeholder="Type your answer here..."
                className="w-full min-h-[400px] p-10 rounded-[2rem] bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none text-lg font-medium text-slate-700 leading-relaxed placeholder:text-slate-300"
              />
            </div>

            <FileUpload onFilesSelected={(files: File[]) => console.log('Selected files:', files)} />
          </div>

          <div className="mt-12 flex justify-end gap-4">
             <Button variant="ghost" className="px-10 py-5 rounded-2xl text-lg font-black text-slate-400 hover:text-slate-900">
               Save Draft
             </Button>
             <Button 
                onClick={handleNext}
                className="px-12 py-5 rounded-2xl text-lg font-black shadow-xl shadow-indigo-200 transition-all active:scale-95 bg-indigo-600"
              >
               {currentDay === 7 ? "Final Submit" : "Next Exercise"}
             </Button>
          </div>
        </Card>

        {/* Success Modal */}
        <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)}>
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Assessment Submitted!</h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-sm mx-auto">
              Your 7-day skill assessment has been successfully recorded. Our industry experts will review your responses and update your profile shortly.
            </p>
            <div className="flex flex-col gap-4">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 rounded-2xl text-lg font-black shadow-xl shadow-indigo-200 transition-all active:scale-95 bg-indigo-600"
              >
                Back to Dashboard
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full py-4 rounded-2xl text-lg font-black text-slate-400 hover:text-slate-900 transition-all"
              >
                View Summary
              </Button>
            </div>
          </div>
        </Modal>

        <Toast 
          message="Successfully submitted exercise!" 
          isVisible={showToast} 
          onClose={() => setShowToast(false)} 
        />
      </div>
    </DashboardLayout>
  );
};
