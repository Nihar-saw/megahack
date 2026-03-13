import React from 'react';
import { Sidebar } from './Sidebar';
import { Bell, Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ProfileSidebar } from './ProfileSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebar-collapsed') === 'true';
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userImage, setUserImage] = useState('/src/assets/react.svg');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Assessment Overdue', message: 'Software Engineering II submission is late!', type: 'warning', active: true }
  ]);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(isCollapsed));
  }, [isCollapsed]);

  // Load image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem('user-profile-image');
    if (savedImage) {
      setUserImage(savedImage);
    }
  }, []);

  const handleUpdateImage = (newImage: string) => {
    setUserImage(newImage);
    localStorage.setItem('user-profile-image', newImage);
  };

  const user = {
    name: 'Nihar Saw', // This would come from sign-up data
    role: 'Full-stack Dev',
    email: 'nihar.saw@jobsim.ai',
    location: 'Mumbai, India',
    joined: 'Jan 2026',
    image: userImage
  };

  const activeNotifications = notifications.filter(n => n.active);
  const dismissNotification = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, active: false } : n));

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-12 sticky top-0 z-10 space-x-4">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources, simulations..." 
                className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-xl text-slate-400 hover:bg-slate-50 transition-all group">
              <Bell className={`w-6 h-6 ${activeNotifications.length > 0 ? 'text-indigo-600 animate-pulse' : ''}`} />
              {activeNotifications.length > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
              {/* Notification Tooltip */}
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Recent Alerts</h4>
                {activeNotifications.length === 0 && (
                  <p className="text-xs text-slate-400 font-bold text-center py-2">No new alerts</p>
                )}
                {activeNotifications.map(n => (
                  <div key={n.id} className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-100 mb-2">
                    <div className="flex-1">
                      <div className="text-sm font-black text-red-600">{n.title}</div>
                      <div className="text-[11px] font-medium text-red-500 leading-tight">{n.message}</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); dismissNotification(n.id); }}
                      className="text-red-300 hover:text-red-600 transition-colors mt-0.5 shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </button>
            <div 
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-4 pl-6 border-l border-slate-100 cursor-pointer group active:scale-95 transition-all"
            >
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user.name}</div>
                <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{user.role}</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border-2 border-indigo-100 p-0.5 overflow-hidden shadow-sm group-hover:shadow-indigo-100 group-hover:border-indigo-200 transition-all">
                <img src={user.image} alt="Profile" className="w-full h-full object-cover rounded-[14px]" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>

      <ProfileSidebar 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdateImage={handleUpdateImage}
      />
    </div>
  );
};
