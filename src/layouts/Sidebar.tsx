import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Target, 
  TrendingUp, 
  UserCircle, 
  FileText, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Skill Assessment', path: '/assessment', icon: Target },
  { name: 'Career Path', path: '/career', icon: FileText },
  { name: 'Skill Gap', path: '/gap-analysis', icon: TrendingUp },
  { name: 'Portfolio', path: '/portfolio', icon: UserCircle },
  { name: 'Industry Insights', path: '/insights', icon: BarChart3 },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth state here if needed
    navigate('/');
  };

  return (
    <div className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          JobSim
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-3 rounded-xl transition-all group
              ${isActive 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' 
                : 'hover:bg-slate-800 hover:text-white border border-transparent'}
            `}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 mt-auto border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all text-left"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

