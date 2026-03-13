import { useState, useMemo } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SimulationCard } from '../components/dashboard/SimulationCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import {
  Plus,
  Award,
  TrendingUp,
  Target,
  ArrowUpRight,
  Archive
} from 'lucide-react';

interface Simulation {
  courseId: string;
  title: string;
  subtitle: string;
  status: 'In Progress' | 'Completed' | 'Trending' | 'Archived';
  instructor: string;
  timeLeft?: string;
  masteryLevel: number;
  image: string;
  isArchived: boolean;
}

const initialSimulations: Simulation[] = [
  {
    courseId: 'data-science',
    title: 'Data Science',
    subtitle: 'Professional Track',
    status: 'Trending',
    instructor: 'Dr. Sarah Chen',
    timeLeft: '7 Days',
    masteryLevel: 0,
    image: 'https://images.unsplash.com/photo-1551288049-bbda33658fb0?w=800&q=80',
    isArchived: false
  },
  {
    courseId: 'web-development',
    title: 'Web Development',
    subtitle: 'Fullstack Mastery',
    status: 'Trending',
    instructor: 'Alex Rivera',
    timeLeft: '7 Days',
    masteryLevel: 0,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    isArchived: false
  },
  {
    courseId: 'ui-ux',
    title: 'UI/UX Design',
    subtitle: 'Creative Professional',
    status: 'Trending',
    instructor: 'Maya Patel',
    timeLeft: '7 Days',
    masteryLevel: 0,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    isArchived: false
  }
];

export const DashboardPage = () => {
  const { user } = useAuth();
  const [showArchived, setShowArchived] = useState(false);

  // Sync simulations with user progress
  const sims = useMemo(() => {
    return initialSimulations.map(sim => {
      const completed = user?.completedDays?.[sim.courseId] || 0;
      const mastery = Math.round((completed / 7) * 100);
      return {
        ...sim,
        masteryLevel: mastery,
        status: (mastery === 100 ? 'Completed' : mastery > 0 ? 'In Progress' : 'Trending') as Simulation['status']
      };
    });
  }, [user?.completedDays]);

  const filteredSims = sims.filter(sim => sim.isArchived === showArchived);

  // Calculate Global Metrics
  const completedDaysValues = Object.values(user?.completedDays || {}) as number[];
  const totalDays = completedDaysValues.reduce((a, b) => a + b, 0);
  
  const allScores = Object.values(user?.performanceScores || {}).flat() as number[];
  const avgScore = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
  
  const maxDays = 21; // 3 tracks * 7 days
  
  const skillScore = Math.min(Math.round((totalDays / maxDays) * 100), 100);
  const readiness = Math.min(Math.round((totalDays / maxDays) * 95), 100); // Max 95% readiness as default
  
  // Salary estimate base 30k, increases with performance + days
  // User wants market to increase ONLY based on fairing against assessment
  // So we use avgScore as a multiplier for the growth
  const performanceMultiplier = avgScore / 100;
  const growth = totalDays * 4.5 * performanceMultiplier;
  const currentSalary = 30 + growth;
  const salaryRange = `$${Math.round(currentSalary)}k - $${Math.round(currentSalary + 10)}k`;

  // Portfolio Score: 100 points per item, max 1000
  const portfolioScore = (user?.portfolioCount || 0) * 100;

  const handleArchive = (id: string) => {
    // Note: In a real app, this would update the backend
    console.log('Archive', id);
  };

  const handleRestore = (id: string) => {
    console.log('Restore', id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Welcome Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
              {showArchived ? 'Archived Simulations' : 'Active Simulations'}
            </h2>
            <p className="text-slate-500 font-bold">
              {showArchived ? 'View your completed professional journeys' : 'Manage your professional career paths'}
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant={showArchived ? "secondary" : "outline"}
              onClick={() => setShowArchived(!showArchived)}
              className={`rounded-2xl px-6 py-4 font-black border-2 active:scale-95 transition-all flex items-center gap-2 ${showArchived ? 'bg-indigo-600 border-indigo-600 text-white' : 'hover:bg-white'}`}
            >
              <Archive className="w-4 h-4" />
              {showArchived ? 'Back to Active' : 'View Archives'}
            </Button>
            {!showArchived && (
              <Button className="rounded-2xl px-6 py-4 font-black shadow-xl shadow-indigo-200 active:scale-95 transition-all bg-indigo-600 outline-none">
                Start New Simulation
              </Button>
            )}
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatMiniCard
            title="Skill Score"
            value={`${skillScore}/100`}
            change={`+${totalDays * 4}%`}
            icon={<Award className="w-6 h-6 text-indigo-600" />}
            description="Professional proficiency"
          />
          <StatMiniCard
            title="Market Value"
            value={totalDays > 0 ? salaryRange : "$30k - $40k"}
            change={`+${Math.round(growth)}k`}
            icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
            description="Based on performance"
          />
          <StatMiniCard
            title="Industry Readiness"
            value={`${readiness}%`}
            change={`+${Math.round(totalDays * 3.5)}%`}
            icon={<Target className="w-6 h-6 text-amber-600" />}
            description="Match for target roles"
          />
          <StatMiniCard
            title="Portfolio Score"
            value={`${portfolioScore}/1000`}
            change={`+${user?.portfolioCount || 0}`}
            icon={<Plus className="w-6 h-6 text-fuchsia-600" />}
            description="Linked exhibits & projects"
          />
        </div>

        {/* Simulations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSims.map((sim, index) => (
            <SimulationCard
              key={index}
              {...sim}
              onArchive={handleArchive}
              onRestore={handleRestore}
            />
          ))}

          {/* Add New Simulation Placeholder */}
          {!showArchived && (
            <button className="border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center p-12 hover:border-indigo-100 hover:bg-slate-50/50 transition-all group min-h-[500px]">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg transition-all">
                <Plus className="w-8 h-8 text-slate-400 group-hover:text-indigo-600" />
              </div>
              <span className="text-lg font-black text-slate-400 group-hover:text-slate-900 transition-colors">Browse Simulations</span>
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const StatMiniCard = ({ title, value, change, icon, description }: any) => (
  <Card className="p-8 rounded-[2rem] border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all cursor-default group overflow-hidden relative">
    <div className="absolute -right-8 -top-8 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500" />
    <div className="relative">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-2xl bg-white shadow-lg border border-slate-50 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex items-center gap-1 font-black text-emerald-500 text-xs bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <ArrowUpRight className="w-3 h-3" /> {change}
        </div>
      </div>
      <div className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-widest">{title}</div>
      <div className="text-3xl font-black text-slate-900 mb-2">{value}</div>
      <p className="text-xs font-bold text-slate-400">{description}</p>
    </div>
  </Card>
);
