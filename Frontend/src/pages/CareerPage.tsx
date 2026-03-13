import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  CheckCircle, 
  TrendingUp, 
  Map, 
  Database,
  Lock,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const roles = [
  {
    title: 'Frontend Developer',
    match: 85,
    description: 'Specializes in building high-performance, accessible user interfaces using React.',
    icon: <TrendingUp className="w-6 h-6 text-indigo-500" />
  },
  {
    title: 'Full Stack Engineer',
    match: 72,
    description: 'Handles both frontend and backend development with Node.js and PostgreSQL.',
    icon: <Database className="w-6 h-6 text-emerald-500" />
  },
];

export const CareerPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Career Path</h1>
        <p className="text-slate-500 mt-1">Discover your best-fit roles and personalized learning roadmap.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {roles.map((role) => (
          <Card key={role.title}>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                {role.icon}
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                {role.match}% Match
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{role.title}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">{role.description}</p>
            <Button variant="outline" className="w-full gap-2">
              View Role Profile <ChevronRight className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>

      <Card title="Career Roadmap: Full Stack Developer" subtitle="Step-by-step guide to achieve this role">
        <motion.div 
          layout
          className="mt-8 space-y-12 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100"
        >
          <RoadmapStep 
            status="completed"
            title="Frontend Fundamentals"
            description="Master HTML5, CSS3, and modern JavaScript (ES6+)."
            index={0}
          />
          <RoadmapStep 
            status="in-progress"
            title="React Framework & State Management"
            description="Deep dive into React Hooks, Context API, and Tailwind CSS."
            index={1}
          />
          <RoadmapStep 
            status="locked"
            title="Backend Development with Node.js"
            description="Learn Express.js, JWT Authentication, and RESTful API design."
            index={2}
          />
          <RoadmapStep 
            status="locked"
            title="Database Design & Deployment"
            description="Master PostgreSQL, Prisma ORM, and cloud hosting."
            index={3}
          />
        </motion.div>
      </Card>
    </div>
  );
};

const RoadmapStep = ({ status, title, description, index }: any) => {
  const icons = {
    completed: <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white ring-8 ring-emerald-50"><CheckCircle className="w-5 h-5" /></div>,
    'in-progress': <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white ring-8 ring-indigo-50"><Map className="w-5 h-5" /></motion.div>,
    locked: <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400"><Lock className="w-5 h-5" /></div>
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`flex gap-6 ${status === 'locked' ? 'opacity-60' : ''}`}
    >
      <div className="z-10">{icons[status as keyof typeof icons]}</div>
      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      </div>
    </motion.div>
  );
};
