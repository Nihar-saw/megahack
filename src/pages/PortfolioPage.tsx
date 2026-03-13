import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { User } from 'lucide-react';

export const PortfolioPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">My Portfolio</h2>
          <p className="text-slate-500 font-bold">Showcase your simulation certificates and verified skill badges.</p>
        </div>
        <Card className="p-20 rounded-[2.5rem] border-slate-100 shadow-xl flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-amber-50 flex items-center justify-center mb-8">
            <User className="w-10 h-10 text-amber-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-4">Building Your Profile</h3>
          <p className="text-slate-500 max-w-md font-medium">Complete your first simulation to generate an industry-ready career portfolio.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};
