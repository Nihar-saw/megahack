import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Layers } from 'lucide-react';

export const GapAnalysisPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Skill Gap Analysis</h2>
          <p className="text-slate-500 font-bold">Compare your current skills with industry-standard Job Descriptions.</p>
        </div>
        <Card className="p-20 rounded-[2.5rem] border-slate-100 shadow-xl flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-8">
            <Layers className="w-10 h-10 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-4">Coming Soon</h3>
          <p className="text-slate-500 max-w-md font-medium">We're building an AI-powered engine to analyze your skills against live job data from top tech companies.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};
