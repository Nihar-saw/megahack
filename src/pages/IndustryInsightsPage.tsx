import { Card } from '../components/ui/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { TrendingUp, Users, DollarSign, Briefcase } from 'lucide-react';

const salaryData = [
  { role: 'Frontend', min: 60, med: 95, max: 140 },
  { role: 'Backend', min: 70, med: 110, max: 160 },
  { role: 'Fullstack', min: 80, med: 125, max: 180 },
  { role: 'Mobile', min: 65, med: 100, max: 150 },
  { role: 'DevOps', min: 75, med: 120, max: 175 },
];

const trendingSkills = [
  { name: 'React/Next.js', value: 92, color: '#6366f1' },
  { name: 'TypeScript', value: 85, color: '#3b82f6' },
  { name: 'AWS/Cloud', value: 78, color: '#0ea5e9' },
  { name: 'AI/ML Integration', value: 72, color: '#2dd4bf' },
  { name: 'PostgreSQL', value: 65, color: '#10b981' },
];

export const IndustryInsightsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Industry Insights</h1>
        <p className="text-slate-500 mt-1">Stay updated with current market trends and salary expectations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <InsightStat title="Avg. Entry Salary" value="$72k" icon={<DollarSign className="w-5 h-5" />} color="bg-emerald-50 text-emerald-600" />
        <InsightStat title="Job Growth" value="+24%" icon={<TrendingUp className="w-5 h-5" />} color="bg-indigo-50 text-indigo-600" />
        <InsightStat title="Active Candidates" value="1.2M" icon={<Users className="w-5 h-5" />} color="bg-slate-50 text-slate-600" />
        <InsightStat title="Open Roles" value="45k+" icon={<Briefcase className="w-5 h-5" />} color="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2" title="Salary Ranges by Role ($k)" subtitle="Annual compensation based on US market data 2026">
          <div className="h-[400px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="role" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="med" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Skill Demand" subtitle="Percentage of JDs requiring these skills">
          <div className="h-[400px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trendingSkills}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trendingSkills.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <CustomLegend />
          </div>
        </Card>
      </div>
    </div>
  );
};

const InsightStat = ({ title, value, icon, color }: any) => (
  <Card className="p-5 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
      <p className="text-xl font-bold text-slate-900 mt-0.5">{value}</p>
    </div>
  </Card>
);

const CustomLegend = () => (
  <div className="flex flex-col gap-3 mt-4">
    {trendingSkills.map((skill) => (
      <div key={skill.name} className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }}></div>
        <span className="text-xs text-slate-600 font-medium">{skill.name} ({skill.value}%)</span>
      </div>
    ))}
  </div>
);
