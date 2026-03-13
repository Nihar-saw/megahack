import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SimulationCard } from '../components/dashboard/SimulationCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
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
    courseId: 'se-ii',
    title: 'Software Engineering II',
    subtitle: 'Ac. Year 2025-26',
    status: 'In Progress',
    instructor: 'Pankaj Patil',
    timeLeft: '12h',
    masteryLevel: 65,
    image: '/src/assets/simulation_se_ii.png',
    isArchived: false
  },
  {
    courseId: 'algorithms',
    title: 'Analysis of Algorithms',
    subtitle: 'Batch A - Advanced',
    status: 'Completed',
    instructor: 'Dr. Nilesh Deotale',
    masteryLevel: 100,
    image: '/src/assets/simulation_algorithms.png',
    isArchived: false
  },
  {
    courseId: 'iot',
    title: 'MDM & IoT Systems',
    subtitle: 'Advanced Workshop',
    status: 'Trending',
    instructor: 'Hiral Patel',
    timeLeft: '12h',
    masteryLevel: 42,
    image: '/src/assets/simulation_iot.png',
    isArchived: false
  }
];

export const DashboardPage = () => {
  const [sims, setSims] = useState<Simulation[]>(initialSimulations);
  const [showArchived, setShowArchived] = useState(false);

  const handleArchive = (id: string) => {
    setSims(prev => prev.map(sim => 
      sim.courseId === id ? { ...sim, isArchived: true, status: 'Archived' as const } : sim
    ));
  };

  const filteredSims = sims.filter(sim => sim.isArchived === showArchived);

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
              <Button className="rounded-2xl px-6 py-4 font-black shadow-xl shadow-indigo-200 active:scale-95 transition-all bg-indigo-600">
                Start New Simulation
              </Button>
            )}
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatMiniCard 
            title="Skill Score" 
            value="82/100" 
            change="+12%" 
            icon={<Award className="w-6 h-6 text-indigo-600" />}
            description="Avg. across all domains"
          />
          <StatMiniCard 
            title="Market Value" 
            value="$65k - $80k" 
            change="+$5k" 
            icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
            description="Estimated annual salary"
          />
          <StatMiniCard 
            title="Industry Readiness" 
            value="74%" 
            change="+8%" 
            icon={<Target className="w-6 h-6 text-amber-600" />}
            description="Match for target roles"
          />
        </div>

        {/* Simulations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSims.map((sim, index) => (
            <SimulationCard 
              key={index} 
              {...sim} 
              onArchive={handleArchive}
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
