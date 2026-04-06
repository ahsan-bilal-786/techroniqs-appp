import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  ClipboardList, 
  DollarSign, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Zap,
  ChevronRight,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Briefcase, label: 'Projects', path: '/projects' },
  { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
  { icon: ClipboardList, label: 'Reports', path: '/reports' },
  { icon: Users, label: 'People', path: '/people' },
  { icon: DollarSign, label: 'Finance', path: '/finance' },
  { icon: Zap, label: 'Automation', path: '/automation' },
];

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className={cn(
          "relative flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out z-50",
          !isSidebarOpen && "items-center"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Zap size={20} fill="currentColor" />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-xl tracking-tight text-slate-800">
                Techroniqs
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-indigo-50 text-indigo-600 font-medium shadow-sm" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
                {isSidebarOpen && <span>{item.label}</span>}
                {isActive && isSidebarOpen && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-indigo-600"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group">
            <HelpCircle size={20} className="text-slate-400 group-hover:text-slate-600" />
            {isSidebarOpen && <span>Support</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group">
            <Settings size={20} className="text-slate-400 group-hover:text-slate-600" />
            {isSidebarOpen && <span>Settings</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all"
        >
          {isSidebarOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search projects, tasks, or people..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">Ahsan Bilal</p>
                <p className="text-xs text-slate-500 mt-1">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 border-2 border-white shadow-sm overflow-hidden group-hover:ring-2 group-hover:ring-indigo-200 transition-all">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahsan" 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
