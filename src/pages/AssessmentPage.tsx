import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { Clock, Zap, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const assessmentContent = [
  // ... existing content (keeping it simple for the chunk replace)
  {
    day: 1,
    category: "Product & UX",
    title: "User Experience Analysis",
    description: "Analyze the current onboarding flow of our platform. Describe three specific improvements you would make to reduce cognitive load for first-time users."
  },
  {
    day: 2,
    category: "Software Engineering",
    title: "System Design Challenge",
    description: "Design a scalable notification system that handles millions of messages across email, SMS, and push notifications. Explain your choice of message broker and database."
  },
  {
    day: 3,
    category: "Data Analysis",
    title: "Metrics & KPIs",
    description: "A recently launched feature saw a 20% drop in user retention after week 1. Identify five metrics you would investigate to find the root cause and propose a hypothesis."
  },
  {
    day: 4,
    category: "Industry Strategy",
    title: "Market Positioning",
    description: "Assess the competitive landscape for JobSim. How would you differentiate our platform from traditional career boards to appeal to Gen Z job seekers?"
  },
  {
    day: 5,
    category: "Frontend Dev",
    title: "Performance Optimization",
    description: "Our main dashboard is taking 6 seconds to load interactive elements. List five optimization techniques (e.g., code splitting, memoization) you would implement and why."
  },
  {
    day: 6,
    category: "Interpersonal Skills",
    title: "Conflict Resolution",
    description: "You're in a sprint planning meeting where the lead developer and the product owner disagree on priority. Draft a communication plan to reach a consensus."
  },
  {
    day: 7,
    category: "Final Review",
    title: "Career Readiness Pitch",
    description: "Synthesize your learnings from the past six days into a 2-minute pitch for why your identified career path is the right fit for your current skill set."
  }
];

export const AssessmentPage = () => {
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const currentAssessment = assessmentContent[currentDay - 1];

  const handleNext = () => {
    if (currentDay < 7) {
      setCurrentDay(currentDay + 1);
      setShowToast(true);
    } else {
      setIsSuccessModalOpen(true);
    }
  };

  const handleBack = () => {
    if (currentDay > 1) setCurrentDay(currentDay - 1);
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
               <span className="text-sm font-black text-slate-400 uppercase tracking-widest text-[#f59e0b]">Real-world Scenarios</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight">7-Day Skill Assessment</h1>
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
