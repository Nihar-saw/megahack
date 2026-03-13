import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Clock, Zap } from 'lucide-react';

export const AssessmentPage = () => {
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
            <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Task 1 of 7</span>
            <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full w-[14.28%]" />
            </div>
          </div>
        </div>

        {/* Assessment Card */}
        <Card className="p-16 rounded-[2.5rem] border-slate-100 shadow-2xl shadow-indigo-100 content-start">
          <div className="flex justify-between items-center mb-12">
            <span className="px-6 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest border border-indigo-100">
              Product & UX
            </span>
            <span className="text-xl font-black text-slate-400">Day 1</span>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">User Experience Analysis</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Analyze the current onboarding flow of our platform. Describe three specific improvements you would make to reduce cognitive load for first-time users.
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
             <Button className="px-12 py-5 rounded-2xl text-lg font-black shadow-xl shadow-indigo-200 transition-all active:scale-95 bg-indigo-600">
               Submit for Review
             </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
