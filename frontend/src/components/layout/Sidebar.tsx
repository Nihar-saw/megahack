import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  Map, 
  BarChart2, 
  User, 
  History, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Award
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Target, label: 'Skill Assessment', path: '/assessment' },
  { icon: Map, label: 'Career Path', path: '/career' },
  { icon: BarChart2, label: 'Skill Gap', path: '/gap-analysis' },
  { icon: Award, label: 'Certificates', path: '/certificates' },
  { icon: User, label: 'Portfolio', path: '/portfolio' },
  { icon: History, label: 'Industry Insights', path: '/insights' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={`bg-[#0f172a] text-slate-300 flex flex-col fixed left-0 top-0 h-screen transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-white flex items-center gap-3 animate-in fade-in duration-300">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 flex-shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            JobSim
          </h1>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mx-auto">
            <Target className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      <button 
        onClick={onToggle}
        className="absolute -right-3 top-24 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-indigo-500 transition-colors z-[60]"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-hidden">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.label : ''}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              {!isCollapsed && <span className="font-medium truncate animate-in fade-in slide-in-from-left-2 duration-300">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link
          to="/"
          title={isCollapsed ? 'Logout' : ''}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all group ${isCollapsed ? 'justify-center px-2' : ''}`}
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium truncate animate-in fade-in slide-in-from-left-2 duration-300">Logout</span>}
        </Link>
      </div>
    </div>
  );
};
