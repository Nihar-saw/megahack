import { useState } from 'react';
import { MoreVertical, FolderOpen, BarChart3, Clock, User, ArrowRight, Hash, Calendar, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const courseStats: Record<string, { questions: number; days: number; avgScore: string }> = {
  'se-ii':       { questions: 35, days: 7, avgScore: '72%' },
  'algorithms':  { questions: 42, days: 7, avgScore: '91%' },
  'iot':         { questions: 28, days: 7, avgScore: '58%' },
  'data-sci':    { questions: 30, days: 7, avgScore: '—'   },
};

interface SimulationCardProps {
  courseId: string;
  title: string;
  subtitle: string;
  status: 'In Progress' | 'Completed' | 'Trending' | 'Archived';
  instructor: string;
  timeLeft?: string;
  masteryLevel: number;
  image: string;
  onArchive?: (id: string) => void;
  onRestore?: (id: string) => void;
  isArchived?: boolean;
}

export const SimulationCard = ({
  courseId,
  title,
  subtitle,
  status,
  instructor,
  timeLeft,
  masteryLevel,
  image,
  onArchive,
  onRestore,
  isArchived = false
}: SimulationCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const stats = courseStats[courseId] ?? { questions: 30, days: 7, avgScore: '—' };

  const statusColors: Record<string, string> = {
    'In Progress': 'bg-indigo-600/90 text-white',
    'Completed':   'bg-emerald-500/90 text-white',
    'Trending':    'bg-amber-500/90 text-white',
    'Archived':    'bg-slate-500/90 text-white',
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group hover:shadow-2xl transition-all h-full flex flex-col">
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden p-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'; }}
        />
        <div className="absolute top-8 left-8">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm backdrop-blur-sm ${statusColors[isArchived ? 'Archived' : status]}`}>
            {isArchived ? 'Archived' : status}
          </span>
        </div>

        {/* Three-dot menu → Archive */}
        {!isArchived && (
          <div className="absolute top-8 right-8">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
              title="Options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-20">
                <button
                  onClick={() => { onArchive?.(courseId); setMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm font-black text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  <FolderOpen className="w-4 h-4" />
                  Move to Archive
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="mb-5">
          <h3 className="text-xl font-black text-slate-900 mb-1 truncate">{title}</h3>
          <p className="text-sm font-bold text-slate-400">{subtitle}</p>
        </div>

        <div className="flex items-center justify-between mb-5 text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
              <User className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider">{instructor}</span>
          </div>
          {timeLeft && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-wider">{timeLeft} Left</span>
            </div>
          )}
        </div>

        {/* Per-course stats mini-table */}
        <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex flex-col items-center gap-1">
            <Hash className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Questions</span>
            <span className="text-base font-black text-slate-800">{stats.questions}</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Days</span>
            <span className="text-base font-black text-slate-800">{stats.days}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Star className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Avg Score</span>
            <span className="text-base font-black text-slate-800">{stats.avgScore}</span>
          </div>
        </div>

        {/* Mastery Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastery Level</span>
            <span className="text-sm font-black text-slate-900">{masteryLevel}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                masteryLevel > 80 ? 'bg-emerald-500' : masteryLevel > 50 ? 'bg-indigo-500' : 'bg-amber-400'
              }`}
              style={{ width: `${masteryLevel}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            {isArchived ? (
              <button
                onClick={() => onRestore?.(courseId)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 text-slate-400 transition-colors text-xs font-black border border-slate-100"
                title="Restore to Active"
              >
                <FolderOpen className="w-4 h-4" /> Restore
              </button>
            ) : (
              <button className="text-slate-400 hover:text-indigo-600 transition-colors" title="Analytics">
                <BarChart3 className="w-5 h-5" />
              </button>
            )}
          </div>
          {!isArchived && (
            <Link to={`/assessment?course=${courseId}`}>
              <Button className="bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl px-6 py-2.5 text-xs font-black flex items-center gap-2 transition-all active:scale-95">
                Enter Simulation <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
