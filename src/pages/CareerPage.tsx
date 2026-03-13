import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { 
  TrendingUp, 
  Layers, 
  ChevronRight, 
  CheckCircle2,
  Circle,
  BookOpen,
  MessageCircle,
  Briefcase
} from 'lucide-react';

const roles = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Specializes in building high-performance, accessible user interfaces using React.',
    match: 85,
    icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
    topics: ['React Hooks', 'State Management', 'Performance', 'Accessibility'],
    roadmap: [
      { status: 'completed', title: 'HTML & CSS Mastery', description: 'Advanced layouts and responsive design.' },
      { status: 'completed', title: 'JavaScript Fundamentals', description: 'ES6+, Async/Await, and DOM manipulation.' },
      { status: 'in-progress', title: 'React ecosystem', description: 'React Router, Redux/Toolkit, and Framer Motion.' },
      { status: 'locked', title: 'Unit Testing', description: 'Jest and React Testing Library.' },
      { status: 'locked', title: 'Next.js & SSR', description: 'Server-side rendering and static site generation.' }
    ]
  },
  {
    title : 'Data Scientist',
    description: 'Analyzes complex data sets to drive informed business decisions using Python and machine learning.',
    match: 58,
    icon: <BookOpen className="w-6 h-6 text-amber-500" />,
    topics: ['Python for Data Science', 'Machine Learning', 'Data Visualization', 'Big Data Tools'],
    roadmap: [
      { status: 'completed', title: 'Python Programming', description: 'Core language features and libraries.' },
      { status: 'in-progress', title: 'Data Analysis', description: 'Pandas, NumPy, and exploratory data analysis.' },
      { status: 'locked', title: 'Machine Learning', description: 'Scikit-learn, model evaluation, and deployment.' }
    ]
  },
  {
    id: 'ux',
    title: 'Web Development',
    description: 'Handles both frontend and backend development with Node.js and PostgreSQL.',
    match: 65,
    icon: <Circle className="w-6 h-6 text-amber-600" />,
    topics: ['Figma Mastery', 'User Research', 'Prototyping', 'Design Systems'],
    roadmap: [
      { status: 'completed', title: 'Design Principles', description: 'Color theory, typography, and hierarchy.' },
      { status: 'in-progress', title: 'Advanced Figma', description: 'Auto-layout, components, and variables.' },
      { status: 'locked', title: 'Usability Testing', description: 'Methods for gathering user feedback.' }
    ]
  },
  {
    id: 'fullstack',
    title: 'UI/UX Designer',
    description: 'Designs intuitive user experiences and interfaces with a strong focus on usability and aesthetics.',
    match: 72,
    icon: <Layers className="w-6 h-6 text-emerald-600" />,
    topics: ['Node.js', 'PostgreSQL', 'Auth Systems', 'API Design'],
    roadmap: [
      { status: 'completed', title: 'Backend Basics', description: 'Node.js and Express fundamentals.' },
      { status: 'in-progress', title: 'Database Design', description: 'SQL, normalization, and indexing.' },
      { status: 'locked', title: 'Authentication', description: 'JWT, OAuth2, and session management.' },
      { status: 'locked', title: 'System Scaling', description: 'Caching, load balancing, and microservices.' }
    ]
  }
];

export const CareerPage = () => {
  const [selectedRole, setSelectedRole] = useState<typeof roles[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-20">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Career Paths</h2>
            <p className="text-slate-500 font-bold text-lg">Discover roles tailored to your industry readiness score.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-2xl px-6 py-4 font-black border-2 hover:bg-white transition-all">
              Filter by Interest
            </Button>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {roles.map((role) => (
            <Card key={role.id} className="p-10 rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all group flex flex-col">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                  {role.icon}
                </div>
                <div className="px-5 py-2 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-wider border border-emerald-100">
                  {role.match}% Match
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{role.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-10 flex-1">{role.description}</p>
              <Button 
                onClick={() => setSelectedRole(role)}
                variant="outline" 
                className="w-full py-5 rounded-[1.5rem] font-black border-2 flex items-center justify-center gap-3 hover:bg-slate-900 hover:text-white hover:border-slate-900 group/btn transition-all active:scale-95"
              >
                View Role Profile <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Role Profile Modal */}
        <Modal 
          isOpen={!!selectedRole} 
          onClose={() => setSelectedRole(null)}
        >
          {selectedRole && (
            <div className="p-12">
              <div className="flex justify-between items-start mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center shadow-lg">
                    {selectedRole.icon}
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">{selectedRole.title} Profile</h2>
                    <p className="text-slate-500 font-bold mt-1 text-lg">Top Recommendation for your skill set</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Industry Match</div>
                  <div className="text-4xl font-black text-emerald-500">{selectedRole.match}%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Roadmap Column */}
                <div className="space-y-10">
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-indigo-600" />
                    Career Roadmap
                  </h3>
                  <div className="relative pl-10 space-y-12">
                    <div className="absolute left-4 top-4 bottom-4 w-1 bg-slate-100" />
                    {selectedRole.roadmap.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className={`absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-md ${
                          step.status === 'completed' ? 'bg-emerald-500 text-white' :
                          step.status === 'in-progress' ? 'bg-indigo-600 text-white' :
                          'bg-slate-100 text-slate-400'
                        }`}>
                          {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> :
                           step.status === 'in-progress' ? <Layers className="w-4 h-4" /> :
                           <Circle className="w-4 h-4" />}
                        </div>
                        <div>
                          <h4 className={`text-lg font-black ${step.status === 'locked' ? 'text-slate-400' : 'text-slate-900'}`}>{step.title}</h4>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Topics Column */}
                <div className="space-y-10">
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-amber-500" />
                    Learning Topics
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedRole.topics.map((topic, idx) => (
                      <button 
                        key={idx}
                        className="px-6 py-4 rounded-2xl bg-white border-2 border-slate-100 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-100 transition-all font-black text-slate-600 hover:text-indigo-600 flex items-center gap-3 active:scale-95 group"
                      >
                        <MessageCircle className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                        {topic}
                      </button>
                    ))}
                  </div>
                  
                  <div className="p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100 mt-12">
                    <h4 className="font-black text-indigo-900 mb-2">Pro Tip</h4>
                    <p className="text-sm text-indigo-700 font-medium leading-relaxed">
                      Deep diving into {selectedRole.topics[0]} and {selectedRole.topics[1]} will boost your match score by an estimated 12% by next month.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 flex justify-end gap-4">
                <Button variant="ghost" onClick={() => setSelectedRole(null)} className="px-8 py-4 rounded-xl font-bold">Close Profile</Button>
                <Button className="px-10 py-4 rounded-xl font-black bg-indigo-600 shadow-lg shadow-indigo-100">Start This Path</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};
