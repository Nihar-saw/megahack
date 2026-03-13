import { MoreVertical, Folder, BarChart3, Clock, User, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface SimulationCardProps {
  title: string;
  subtitle: string;
  status: 'In Progress' | 'Completed' | 'Trending';
  instructor: string;
  timeLeft?: string;
  masteryLevel: number;
  image: string;
  avatar: string;
}

export const SimulationCard = ({
  title,
  subtitle,
  status,
  instructor,
  timeLeft,
  masteryLevel,
  image,
  avatar
}: SimulationCardProps) => {
  const statusColors = {
    'In Progress': 'bg-white/90 text-slate-900',
    'Completed': 'bg-white/90 text-slate-900',
    'Trending': 'bg-white/90 text-slate-900',
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group hover:shadow-2xl transition-all h-full flex flex-col">
      <div className="relative h-56 overflow-hidden p-4">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-8 left-8">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${statusColors[status]}`}>
            {status}
          </span>
        </div>
        <button className="absolute top-8 right-8 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
        <div className="absolute -bottom-2 -right-2 p-4">
           <div className="w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-lg shadow-indigo-200">
             <img src={avatar} alt={instructor} className="w-full h-full object-cover" />
           </div>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="mb-6">
          <h3 className="text-xl font-black text-slate-900 mb-2 truncate">{title}</h3>
          <p className="text-sm font-bold text-slate-400">{subtitle}</p>
        </div>

        <div className="flex items-center justify-between mb-8 text-slate-500">
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

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastery Level</span>
            <span className="text-sm font-black text-slate-900">{masteryLevel}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                masteryLevel > 80 ? 'bg-emerald-500' : masteryLevel > 50 ? 'bg-indigo-500' : 'bg-red-500'
              }`}
              style={{ width: `${masteryLevel}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <Folder className="w-5 h-5" />
            </button>
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <BarChart3 className="w-5 h-5" />
            </button>
          </div>
          <Button className="bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl px-6 py-2.5 text-xs font-black flex items-center gap-2 transition-all active:scale-95">
            Enter Simulation <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
