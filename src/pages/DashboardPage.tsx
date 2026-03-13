import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  TrendingUp, 
  Target, 
  Award, 
  ArrowUpRight,
  Clock,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', score: 45, value: 30 },
  { name: 'Feb', score: 52, value: 35 },
  { name: 'Mar', score: 48, value: 32 },
  { name: 'Apr', score: 61, value: 45 },
  { name: 'May', score: 75, value: 58 },
  { name: 'Jun', score: 82, value: 65 },
];

export const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your career prep.</p>
        </div>
        <Button className="gap-2">
          <Target className="w-4 h-4" /> Take New Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Skill Score" 
          value="82/100" 
          change="+12%" 
          icon={<Award className="w-6 h-6 text-indigo-600" />}
          description="Avg. across all domains"
        />
        <StatCard 
          title="Market Value" 
          value="$65k - $80k" 
          change="+$5k" 
          icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
          description="Estimated annual salary"
        />
        <StatCard 
          title="Industry Readiness" 
          value="74%" 
          change="+8%" 
          icon={<Target className="w-6 h-6 text-amber-600" />}
          description="Match for target roles"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2" title="Skill Growth & Market Value" subtitle="Platform performance over the last 6 months">
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recommended to Learn" subtitle="Based on your skill gap analysis">
          <div className="space-y-4 mt-4">
            <RecommendedItem title="System Design" level="Advanced" time="12h" />
            <RecommendedItem title="Docker & Kubernetes" level="Intermediate" time="8h" />
            <RecommendedItem title="TypeScript Patterns" level="Intermediate" time="5h" />
            <RecommendedItem title="Next.js SSR" level="Advanced" time="15h" />
            <Button variant="outline" className="w-full mt-4">View All Recommendations</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon, description }: any) => (
  <Card className="relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white transition-colors">
        {icon}
      </div>
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
        <ArrowUpRight className="w-3 h-3" /> {change}
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <div className="text-2xl font-bold text-slate-900 mt-1">{value}</div>
    <p className="text-slate-400 text-xs mt-2">{description}</p>
  </Card>
);

const RecommendedItem = ({ title, level, time }: any) => (
  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group">
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</span>
      <span className="text-xs text-slate-500">{level}</span>
    </div>
    <div className="flex items-center gap-1.5 text-slate-400">
      <Clock className="w-3.5 h-3.5" />
      <span className="text-xs">{time}</span>
      <ChevronRight className="w-4 h-4 ml-1" />
    </div>
  </div>
);
