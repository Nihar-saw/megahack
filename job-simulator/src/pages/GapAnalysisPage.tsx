import { Card } from '../components/ui/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';

const gapData = [
  { subject: 'UI/UX', current: 85, industry: 90 },
  { subject: 'React', current: 70, industry: 95 },
  { subject: 'Testing', current: 30, industry: 75 },
  { subject: 'DevOps', current: 20, industry: 60 },
  { subject: 'Backend', current: 55, industry: 85 },
  { subject: 'Architecture', current: 40, industry: 80 },
];

export const GapAnalysisPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Skill Gap Analysis</h1>
        <p className="text-slate-500 mt-1">Comparison between your skills and top industry expectations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Skill Comparison Radar" subtitle="Visual representation of your holistic profile">
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={gapData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} axisLine={false} tick={false} />
                <Radar
                  name="Current Level"
                  dataKey="current"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.5}
                />
                <Radar
                  name="Industry Benchmark"
                  dataKey="industry"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.1}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Critical Skill Gaps" subtitle="Top skills requiring your attention right now">
          <div className="mt-6 space-y-6">
            <GapItem 
              title="Automated Testing" 
              diff="-45%" 
              description="Most senior roles require Jest and RTL knowledge."
              severity="high"
            />
            <GapItem 
              title="DevOps & Deployment" 
              diff="-40%" 
              description="Understanding of Docker is now a baseline expectation."
              severity="high"
            />
            <GapItem 
              title="System Design" 
              diff="-35%" 
              description="Scalability concepts are critical for mid-level roles."
              severity="medium"
            />
            <GapItem 
              title="Backend Integration" 
              diff="-30%" 
              description="API design principles need further strengthening."
              severity="low"
            />
          </div>
        </Card>
      </div>

      <Card className="bg-indigo-900 border-none">
        <div className="flex flex-col md:flex-row gap-6 items-center p-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center shrink-0">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">Personalized Learning Recommendation</h3>
            <p className="text-indigo-200">
              Based on your gaps in **Testing** and **DevOps**, we recommend starting the 
              "Production Readiness for React Developers" module.
            </p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-white text-indigo-900 font-bold hover:bg-slate-100 transition-all flex items-center gap-2">
            Start Module <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </div>
  );
};

const GapItem = ({ title, diff, description, severity }: any) => {
  const styles = {
    high: 'text-red-600 bg-red-50 border-red-100',
    medium: 'text-amber-600 bg-amber-50 border-amber-100',
    low: 'text-blue-600 bg-blue-50 border-blue-100'
  };

  return (
    <div className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:shadow-sm transition-all bg-white">
      <div className={`p-2 rounded-lg border flex items-center justify-center shrink-0 h-10 ${styles[severity as keyof typeof styles]}`}>
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h4 className="font-bold text-slate-900">{title}</h4>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles[severity as keyof typeof styles]}`}>
            {diff}
          </span>
        </div>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
};
