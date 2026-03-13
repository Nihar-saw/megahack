import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Trophy, 
  FileCheck,
  ChevronRight,
  Plus,
  FileCode
} from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'E-commerce Platform',
    type: 'Full Stack',
    status: 'verified',
    description: 'A complete online store with payment integration and admin dashboard.',
    tags: ['Next.js', 'Prisma', 'Stripe']
  },
  {
    title: 'Task Management App',
    type: 'Frontend',
    status: 'in-review',
    description: 'Real-time collaborative task board with drag-and-drop features.',
    tags: ['React', 'Redux', 'Tailwind']
  },
  {
    title: 'Portfolio Website',
    type: 'UI/UX',
    status: 'verified',
    description: 'A modern, high-performance portfolio with interactive animations.',
    tags: ['Framer Motion', 'React']
  },
];

export const PortfolioPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Portfolio</h1>
          <p className="text-slate-500 mt-1">Manage and showcase your projects, certifications, and skills.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Certifications" subtitle="Verified industry certifications and courses">
          <div className="space-y-4 mt-6">
            <CertCard 
              title="Advanced React Pattern" 
              issuer="Frontend Masters" 
              date="Feb 2026" 
              icon={<FileCheck className="w-5 h-5" />} 
            />
            <CertCard 
              title="AWS Certified Developer" 
              issuer="Amazon Web Services" 
              date="Jan 2026" 
              icon={<Trophy className="w-5 h-5" />} 
            />
            <Button variant="outline" className="w-full mt-4">View All Certificates</Button>
          </div>
        </Card>

        <Card title="Verified Skills" subtitle="Skills validated through platform assessments">
          <div className="grid grid-cols-2 gap-4 mt-6">
            <SkillBadge name="React.js" match={95} />
            <SkillBadge name="TypeScript" match={92} />
            <SkillBadge name="Tailwind CSS" match={98} />
            <SkillBadge name="Node.js" match={88} />
            <SkillBadge name="PostgreSQL" match={82} />
            <SkillBadge name="System Design" match={75} />
          </div>
        </Card>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, type, status, description, tags }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="flex flex-col h-full bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
  >
    <div className="h-40 bg-slate-100 flex items-center justify-center border-b border-slate-50">
      <FileCode className="w-12 h-12 text-slate-300" />
    </div>
    <div className="p-6 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 mb-1 block">{type}</span>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${status === 'verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
          {status === 'verified' ? 'Verified' : 'In Review'}
        </span>
      </div>
      <p className="text-sm text-slate-500 mb-6 flex-1">{description}</p>
      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
        {tags.map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 rounded bg-slate-50 text-slate-500 text-[10px] font-medium border border-slate-100">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const CertCard = ({ title, issuer, date, icon }: any) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer group"
  >
    <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
        <span>{issuer}</span>
        <span>•</span>
        <span>{date}</span>
      </div>
    </div>
    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
  </motion.div>
);

const SkillBadge = ({ name, match }: any) => (
  <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col gap-1">
    <span className="text-xs font-bold text-slate-900">{name}</span>
    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${match}%` }}
        transition={{ duration: 1, delay: 0.2 }}
        className="h-full bg-indigo-600"
      />
    </div>
    <span className="text-[10px] text-slate-500 font-medium">{match}% Proficient</span>
  </div>
);
