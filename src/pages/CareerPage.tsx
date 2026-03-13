import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  TrendingUp, 
  Layers, 
  ChevronRight, 
  CheckCircle2,
  Circle
} from 'lucide-react';

const roles = [
  {
    title: 'Frontend Developer',
    description: 'Specializes in building high-performance, accessible user interfaces using React.',
    match: 85,
    icon: <TrendingUp className="w-6 h-6 text-indigo-600" />
  },
  {
    title: 'Full Stack Engineer',
    description: 'Handles both frontend and backend development with Node.js and PostgreSQL.',
    match: 72,
    icon: <Layers className="w-6 h-6 text-emerald-600" />
  },
  {
    title: 'UI/UX Designer',
    description: 'Focuses on creating intuitive and visually appealing designs with Figma.',
    match: 65,
    icon: <Circle className="w-6 h-6 text-amber-600" />
  },
  {
    title: 'DevOps Engineer',
    description: 'Manages cloud infrastructure and CI/CD pipelines using AWS and Docker.',
    match: 58,
    icon: <CheckCircle2 className="w-6 h-6 text-red-600" />
  },
  {
    title: 'Data Scientist',
    description: 'Analyzes complex datasets to extract actionable insights using Python and machine learning.',
    match: 42,
    icon: <TrendingUp className="w-6 h-6 text-violet-600" />
    },
    {
      title: 'Mobile App Developer',
      description: 'Builds cross-platform mobile applications using React Native and Flutter.',
      match: 38,
      icon: <Layers className="w-6 h-6 text-pink-600" />
    },
    {
      title: 'Product Manager', 
      description: 'Oversees product development lifecycle and coordinates between engineering and design teams.',
      match: 30,
      icon: <Circle className="w-6 h-6 text-yellow-600" />
    },
    {
      title: 'QA Engineer',
      description: 'Ensures software quality through automated testing and manual QA processes.',
      match: 25,
      icon: <CheckCircle2 className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Technical Writer', 
      description: 'Creates clear and concise documentation for software products and APIs.',
      match: 20,
      icon: <TrendingUp className="w-6 h-6 text-gray-600" />
    }
];

const roadmap = [
  {
    title: 'Frontend Fundamentals',
    description: 'Master HTML5, CSS3, and modern JavaScript (ES6+).',
    status: 'completed'
  },
  {
    title: 'React Framework & State Management',
    description: 'Deep dive into React Hooks, Context API, and Tailwind CSS.',
    status: 'in-progress'
  },
  {
    title: 'Backend Integration',
    description: 'Learn RESTful APIs, GraphQL, and basic Node.js setup.',
    status: 'locked'
  }
];

export const CareerPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header */}
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Career Path</h2>
          <p className="text-slate-500 font-bold">Discover your best-fit roles and personalized learning roadmap.</p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roles.map((role, index) => (
            <Card key={index} className="p-10 rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {role.icon}
                </div>
                <div className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-wider border border-emerald-100">
                  {role.match}% Match
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{role.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">{role.description}</p>
              <Button variant="outline" className="w-full py-4 rounded-2xl font-black border-2 flex items-center justify-center gap-2 hover:bg-slate-50 group/btn">
                View Role Profile <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Roadmap Section */}
        <Card className="p-10 rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-100/50">
          <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Career Roadmap: Full Stack Developer</h3>
          <p className="text-sm font-bold text-slate-400 mb-10">Step-by-step guide to achieve this role</p>
          
          <div className="space-y-10 relative">
            <div className="absolute left-6 top-6 bottom-6 w-1 bg-slate-100 -z-0" />
            
            {roadmap.map((step, index) => (
              <div key={index} className="flex gap-8 relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                  step.status === 'completed' ? 'bg-emerald-500 text-white' :
                  step.status === 'in-progress' ? 'bg-indigo-600 text-white' :
                  'bg-white text-slate-300 border-2 border-slate-100'
                }`}>
                  {step.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> :
                   step.status === 'in-progress' ? <Layers className="w-6 h-6 shadow-indigo-500/50" /> :
                   <Circle className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className={`text-lg font-black mb-1 ${step.status === 'locked' ? 'text-slate-400' : 'text-slate-900'}`}>
                    {step.title}
                  </h4>
                  <p className="text-slate-500 font-medium">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
