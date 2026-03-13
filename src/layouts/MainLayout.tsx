import React from 'react';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="pl-64 min-h-screen">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h2 className="text-sm font-medium text-slate-500">Welcome back, username</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></button>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
