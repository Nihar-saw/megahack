import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

const dailyTasks = [
  {
    id: 1,
    day: "Day 1",
    title: "User Experience Analysis",
    description: "Analyze the current onboarding flow of our platform. Describe three specific improvements you would make to reduce cognitive load for first-time users.",
    category: "Product & UX"
  },
  {
    id: 2,
    day: "Day 2",
    title: "System Scalability",
    description: "Our API endpoint is expecting a 10x traffic spike during a marketing event. Outline your strategy for ensuring the system remains responsive and stable.",
    category: "Backend Architecture"
  },
  {
    id: 3,
    day: "Day 3",
    title: "Edge Case Debugging",
    description: "A small subset of users report that their progress isn't saving correctly on mobile devices. Describe your step-by-step debugging process to identify the root cause.",
    category: "Full Stack Engineering"
  },
  {
    id: 4,
    day: "Day 4",
    title: "Modern UI Components",
    description: "Propose a design for a reusable 'Notification Center' component. What features would you include to make it both accessible and highly interactive?",
    category: "Frontend Development"
  },
  {
    id: 5,
    day: "Day 5",
    title: "Security & Compliance",
    description: "Explain the importance of 'Principle of Least Privilege' in cloud infrastructure and provide an example of how you would implement it in a Node.js application.",
    category: "DevOps & Security"
  },
  {
    id: 6,
    day: "Day 6",
    title: "Technical Documentation",
    description: "Write a brief 'Quick Start Guide' for a new developer joining your team to help them set up their local environment for this project.",
    category: "Communication"
  },
  {
    id: 7,
    day: "Day 7",
    title: "Final Capstone Proposal",
    description: "Reflecting on your week, propose one major feature that would significantly increase the value of this simulator. Describe its technical implementation and business impact.",
    category: "Strategic Thinking"
  }
];

export const AssessmentPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswerChange = (text: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentStep]: text
    }));
  };

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <Card className="text-center p-12">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Assessment Submitted!</h2>
          <p className="text-slate-500 mb-8">You've successfully completed the 7-Day Industry Readiness Assessment.</p>
          
          <div className="grid grid-cols-2 gap-6 mb-10 text-left">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Status</div>
              <div className="text-xl font-bold text-emerald-600">Under Review</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Days Completed</div>
              <div className="text-xl font-bold text-slate-900">7 / 7</div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.href = '/dashboard'}>Go to Dashboard</Button>
            <Button variant="outline">View My Responses</Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentTask = dailyTasks[currentStep];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">7-Day Skill Assessment</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Clock className="w-4 h-4" /> 7 Dedicated Days
            </div>
            <div className="flex items-center gap-1.5 text-sm text-amber-600 font-medium">
              <AlertCircle className="w-4 h-4" /> Real-world Scenarios
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-slate-600 mb-2">Task {currentStep + 1} of {dailyTasks.length}</div>
          <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / dailyTasks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-10">
            <div className="flex justify-between items-start mb-6">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
                {currentTask.category}
              </div>
              <div className="text-slate-400 font-bold text-xl">{currentTask.day}</div>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-relaxed">
              {currentTask.title}
            </h2>
            <p className="text-slate-600 mb-8 text-lg">
              {currentTask.description}
            </p>
            
            <div className="space-y-4">
              <label 
                htmlFor="answer-box" 
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Your Detailed Response
              </label>
              <textarea
                id="answer-box"
                rows={8}
                className="w-full p-5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-slate-700 bg-slate-50/50 resize-none placeholder:text-slate-400"
                placeholder="Type your answer here... Be as detailed as possible to showcase your industry readiness."
                value={answers[currentStep] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
            </div>

            <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
              <Button 
                variant="outline" 
                className="gap-2" 
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4" /> Previous Day
              </Button>
              <Button 
                className="gap-2 px-8" 
                onClick={() => {
                  if (currentStep === dailyTasks.length - 1) {
                    setShowResults(true);
                  } else {
                    setCurrentStep(prev => prev + 1);
                  }
                }}
              >
                {currentStep === dailyTasks.length - 1 ? 'Submit Assessment' : 'Submit Day Answer'} 
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

