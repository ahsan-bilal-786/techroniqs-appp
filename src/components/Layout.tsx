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
  HelpCircle,
  User,
  CreditCard,
  ChevronDown,
  Play,
  Square,
  Clock,
  CheckCircle2,
  Eye,
  Calendar,
  AlertCircle,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { format, isSameMinute } from 'date-fns';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Briefcase, label: 'Projects', path: '/projects' },
  { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
  { icon: Clock, label: 'Attendance', path: '/attendance' },
  { icon: Calendar, label: 'Leaves', path: '/leaves' },
  { icon: ClipboardList, label: 'Reports', path: '/reports' },
  { icon: Users, label: 'People', path: '/people' },
  { icon: DollarSign, label: 'Finance', path: '/finance' },
  { icon: Zap, label: 'Automation', path: '/automation' },
];

import { useTheme } from '../context/ThemeContext';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [manualTime, setManualTime] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  
  const [attendance, setAttendance] = useState<{
    status: 'checked-out' | 'checked-in';
    checkInTime: Date | null;
    submissionTime: Date | null;
    isManual: boolean;
    elapsedTime: string;
  }>({
    status: 'checked-out',
    checkInTime: null,
    submissionTime: null,
    isManual: false,
    elapsedTime: '00:00:00'
  });

  const location = useLocation();

  const handleAttendanceToggle = () => {
    if (attendance.status === 'checked-out') {
      setIsCheckInModalOpen(true);
    } else {
      setAttendance(prev => ({
        ...prev,
        status: 'checked-out',
        checkInTime: null,
        elapsedTime: '00:00:00'
      }));
    }
  };

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const checkInDate = new Date(manualTime);
    const now = new Date();
    const isManual = !isSameMinute(checkInDate, now);

    setAttendance({
      status: 'checked-in',
      checkInTime: checkInDate,
      submissionTime: now,
      isManual,
      elapsedTime: '00:00:00'
    });
    setIsCheckInModalOpen(false);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (attendance.status === 'checked-in' && attendance.checkInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - attendance.checkInTime!.getTime();
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setAttendance(prev => ({
          ...prev,
          elapsedTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [attendance.status, attendance.checkInTime]);

  return (
    <div className={cn(
      "flex h-screen font-sans transition-colors duration-300 overflow-hidden",
      isDark ? "bg-dark-bg text-dark-body" : "bg-white text-slate-900"
    )}>
      {/* Check-In Modal */}
      <AnimatePresence>
        {isCheckInModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckInModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden",
                isDark ? "bg-dark-card border border-slate-800" : "bg-white"
              )}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Daily Check-In</h3>
                      <p className="text-xs opacity-60">Confirm your starting time</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsCheckInModalOpen(false)}
                    className="p-2 opacity-40 hover:opacity-100 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCheckIn} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-70 ml-1">Check-In Time</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-indigo-500 transition-colors" size={18} />
                      <input 
                        type="datetime-local" 
                        required
                        value={manualTime}
                        onChange={(e) => setManualTime(e.target.value)}
                        className={cn(
                          "w-full pl-12 pr-4 py-3 border border-transparent rounded-2xl focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium",
                          isDark ? "bg-slate-800/50 text-white" : "bg-slate-50"
                        )}
                      />
                    </div>
                    <p className="text-[10px] opacity-40 ml-1">
                      If you forgot to check in earlier, you can adjust the time here.
                    </p>
                  </div>

                  <div className={cn(
                    "p-4 rounded-2xl flex gap-3",
                    isDark ? "bg-amber-900/20 border border-amber-900/30" : "bg-amber-50 border border-amber-100"
                  )}>
                    <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className={cn("text-xs font-bold leading-tight", isDark ? "text-amber-400" : "text-amber-900")}>Review Required</p>
                      <p className={cn("text-[10px] leading-relaxed", isDark ? "text-amber-200/60" : "text-amber-700")}>
                        Manual check-in adjustments are flagged for administrative review to ensure accuracy.
                      </p>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 group"
                  >
                    <span>Confirm Check-In</span>
                    <Play size={18} fill="currentColor" className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className={cn(
          "relative flex flex-col transition-all duration-300 ease-in-out z-50",
          isDark ? "bg-dark-card border-r border-slate-800" : "bg-white border-r border-slate-100",
          !isSidebarOpen && "items-center"
        )}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Zap size={22} fill="currentColor" />
            </div>
            {isSidebarOpen && (
              <span className="font-display font-bold text-2xl tracking-tighter">
                Techroniqs
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                    : "text-nav hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-white" : "opacity-60 group-hover:opacity-100")} />
                {isSidebarOpen && <span className="font-bold text-sm tracking-tight">{item.label}</span>}
                {isActive && isSidebarOpen && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/40"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-nav hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
            <HelpCircle size={20} className="opacity-60 group-hover:opacity-100" />
            {isSidebarOpen && <span className="font-bold text-sm tracking-tight">Support</span>}
          </button>
          <Link to="/settings" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-nav hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
            <Settings size={20} className="opacity-60 group-hover:opacity-100" />
            {isSidebarOpen && <span className="font-bold text-sm tracking-tight">Settings</span>}
          </Link>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(
            "absolute -right-3 top-24 w-6 h-6 rounded-full flex items-center justify-center shadow-sm transition-all border",
            isDark ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-white border-slate-200 text-slate-400"
          )}
        >
          {isSidebarOpen ? <X size={12} /> : <Menu size={12} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className={cn(
          "h-20 flex items-center justify-between px-8 z-40",
          isDark ? "bg-dark-bg border-b border-slate-800" : "bg-white border-b border-slate-100"
        )}>
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className={cn(
                  "w-full pl-12 pr-4 py-3 border border-transparent rounded-2xl focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-medium",
                  isDark ? "bg-slate-800/50 text-white" : "bg-slate-50"
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={cn(
                "p-2.5 rounded-xl transition-all border",
                isDark ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700" : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100"
              )}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Attendance Widget */}
            <div className={cn(
              "flex items-center gap-4 px-5 py-2.5 rounded-2xl border transition-all duration-300 group/attendance relative",
              attendance.status === 'checked-in' 
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 border-transparent" 
                : isDark ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-slate-50 border-slate-100 text-slate-500"
            )}>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider leading-none opacity-70">
                    {attendance.status === 'checked-in' ? 'Working Since' : 'Attendance'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-bold tabular-nums">
                    {attendance.status === 'checked-in' ? attendance.elapsedTime : 'Not Checked In'}
                  </span>
                </div>
              </div>
              <div className="h-8 w-px bg-current opacity-20 mx-1"></div>
              
              <button 
                onClick={handleAttendanceToggle}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-xl transition-all shadow-sm active:scale-95",
                  attendance.status === 'checked-in'
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20"
                )}
              >
                {attendance.status === 'checked-in' ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </button>
            </div>

            <button className="relative p-2 opacity-60 hover:opacity-100 transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-2 cursor-pointer group outline-none"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold leading-none">Ahsan Bilal</p>
                  <p className="text-[11px] opacity-60 mt-1 font-medium">Administrator</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-indigo-100 border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden group-hover:ring-4 group-hover:ring-indigo-500/10 transition-all relative">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahsan" 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={cn(
                        "absolute right-0 mt-4 w-64 rounded-2xl shadow-2xl border py-2 z-20 overflow-hidden",
                        isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100"
                      )}
                    >
                      <div className="px-5 py-4 border-b border-slate-50 dark:border-slate-800 mb-1">
                        <p className="text-sm font-bold">Ahsan Bilal</p>
                        <p className="text-xs opacity-60 truncate">engr.ahsan.bilal@gmail.com</p>
                      </div>
                      
                      <div className="px-2 space-y-0.5">
                        <Link 
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
                        >
                          <User size={18} className="opacity-40 group-hover:text-indigo-600" />
                          <span>My Profile</span>
                        </Link>
                        <Link 
                          to="/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
                        >
                          <Settings size={18} className="opacity-40 group-hover:text-indigo-600" />
                          <span>Account Settings</span>
                        </Link>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-50 dark:border-slate-800 px-2">
                        <Link 
                          to="/login"
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all group"
                        >
                          <LogOut size={18} className="text-rose-400 group-hover:text-rose-600" />
                          <span>Logout</span>
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-10 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
