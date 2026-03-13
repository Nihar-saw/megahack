import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { BarChart2 } from 'lucide-react';

export const IndustryInsightsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Industry Insights</h2>
          <p className="text-slate-500 font-bold">Stay updated with market trends and salary benchmarks.</p>
        </div>
        <Card className="p-20 rounded-[2.5rem] border-slate-100 shadow-xl flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mb-8">
            <BarChart2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-4">Stay Tuned</h3>
          <p className="text-slate-500 max-w-md font-medium">Real-time market analytics and salary prediction models are currently being calibrated.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};
