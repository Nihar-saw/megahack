import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight,
  BookOpen,
  Zap
} from 'lucide-react';

const skillMatches = [
  { name: 'React.js', userScore: 85, marketAvg: 90, status: 'high' },
  { name: 'TypeScript', userScore: 40, marketAvg: 85, status: 'gap' },
  { name: 'Node.js', userScore: 60, marketAvg: 80, status: 'medium' },
  { name: 'System Design', userScore: 30, marketAvg: 75, status: 'critical' },
  { name: 'Tailwind CSS', userScore: 95, marketAvg: 70, status: 'expert' },
];

const gaps = [
  { 
    title: 'Advanced System Design', 
    reason: 'Essential for Senior Full Stack roles at Tier-1 companies.',
    difficulty: 'Hard',
    impact: 'High'
  },
  { 
    title: 'PostgreSQL Optimization', 
    reason: 'Required for handling high-concurrency data operations.',
    difficulty: 'Medium',
    impact: 'Medium'
  }
];

export const GapAnalysisPage = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header */}
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Skill Gap Analysis</h2>
          <p className="text-slate-500 font-bold">Bridging the distance between your profile and industry standards.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Table */}
          <Card className="lg:col-span-2 p-10 rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-100/50">
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-indigo-600" />
              Skill vs. Industry Index
            </h3>
            
            <div className="space-y-8 mb-16">
              {skillMatches.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-lg font-black text-slate-900">{skill.name}</span>
                      <span className={`ml-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        skill.status === 'expert' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        skill.status === 'high' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        skill.status === 'gap' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        'bg-red-50 text-red-600 border border-red-100'
                      }`}>
                        {skill.status}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-400">
                      Match: <span className="text-slate-900">{skill.userScore}%</span> / Market: <span className="text-indigo-600">{skill.marketAvg}%</span>
                    </div>
                  </div>
                  <div className="relative h-3 bg-slate-50 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-slate-200 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.marketAvg}%` }}
                    />
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 z-10 ${
                        skill.status === 'expert' ? 'bg-emerald-500' :
                        skill.status === 'high' ? 'bg-indigo-600' :
                        skill.status === 'gap' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${skill.userScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Development Graph */}
            <div className="pt-10 border-t border-slate-100">
              <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <ArrowUpRight className="w-6 h-6 text-emerald-500" />
                Development Progress
              </h4>
              <div className="h-48 flex items-end gap-6 px-4">
                {[45, 52, 48, 65, 72, 85, 82].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                    <div className="text-[10px] font-black text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{val}%</div>
                    <div 
                      className={`w-full rounded-t-xl transition-all duration-500 group-hover:bg-indigo-600 ${i === 6 ? 'bg-indigo-600' : 'bg-slate-100'}`}
                      style={{ height: `${val}%` }}
                    />
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Critical Gaps Sidebar */}
          <div className="space-y-8">
            <Card className="p-8 rounded-[2.5rem] border-slate-100 shadow-xl bg-slate-900 text-white">
              <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                Critical Fixes
              </h4>
              <div className="space-y-6">
                {gaps.map((gap, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-lg font-black group-hover:text-amber-400 transition-colors">{gap.title}</div>
                      <ArrowUpRight className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-sm text-slate-400 font-medium mb-4 leading-relaxed">
                      {gap.reason}
                    </p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-black uppercase text-slate-400 border border-white/5">
                        {gap.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-[10px] font-black uppercase text-amber-500 border border-amber-500/20">
                        {gap.impact} Impact
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 rounded-[2.5rem] border-slate-100 shadow-xl bg-indigo-600 text-white">
              <Zap className="w-10 h-10 text-amber-400 mb-6" />
              <h4 className="text-xl font-bold mb-3">AI Recommendation</h4>
              <p className="text-black font-medium text-sm leading-relaxed mb-8">
                Focus on <strong>TypeScript</strong> this week. Your React score is high enough to leverage advanced TS patterns immediately.
              </p>
              <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 py-4 rounded-xl font-black flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5" /> Start Learning Path
              </Button>
            </Card>
          </div>
        </div>

        {/* Roadmap Quick Link */}
        <div className="bg-emerald-50 rounded-[3rem] p-12 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">You're 72% Industry Ready</h3>
              <p className="text-emerald-700 font-bold">Only 3 major certifications away from Top-Tier eligibility.</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/career-path')}
            variant="outline" 
            className="px-10 py-4 rounded-2xl border-2 border-emerald-200 text-emerald-700 bg-white font-black hover:bg-emerald-100 transition-all active:scale-95 shadow-lg shadow-emerald-100"
          >
            View Career Roadmap
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
