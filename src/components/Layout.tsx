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
  AlertCircle
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

export default function Layout() {
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

  // Timer for checked-in duration
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

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDate = new Date(manualTime);
    const now = new Date();
    
    // If selected time is different from current time (ignoring seconds for simplicity in comparison)
    const isManual = !isSameMinute(selectedDate, now);

    setAttendance({
      status: 'checked-in',
      checkInTime: selectedDate,
      submissionTime: now,
      isManual: isManual,
      elapsedTime: '00:00:00'
    });
    setIsCheckInModalOpen(false);
  };

  const handleAttendanceToggle = () => {
    if (attendance.status === 'checked-out') {
      setManualTime(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
      setIsCheckInModalOpen(true);
    } else {
      setAttendance({
        status: 'checked-out',
        checkInTime: null,
        submissionTime: null,
        isManual: false,
        elapsedTime: '00:00:00'
      });
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
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
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Daily Check-In</h3>
                      <p className="text-xs text-slate-500">Confirm your starting time</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsCheckInModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCheckIn} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Check-In Time</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                      <input 
                        type="datetime-local" 
                        required
                        value={manualTime}
                        onChange={(e) => setManualTime(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 ml-1">
                      If you forgot to check in earlier, you can adjust the time here.
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                    <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-amber-900 leading-tight">Review Required</p>
                      <p className="text-[10px] text-amber-700 leading-relaxed">
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
            {/* Attendance Widget */}
            <div className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all duration-300 group/attendance relative",
              attendance.status === 'checked-in' 
                ? "bg-emerald-50 border-emerald-100 text-emerald-700 shadow-sm shadow-emerald-100" 
                : "bg-slate-50 border-slate-200 text-slate-500"
            )}>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5 mb-1">
                  {attendance.isManual && (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-md text-[9px] font-bold animate-pulse">
                      <Eye size={10} />
                      <span>REVIEW</span>
                    </div>
                  )}
                  <p className="text-[10px] font-bold uppercase tracking-wider leading-none opacity-70">
                    {attendance.status === 'checked-in' ? 'Working Since' : 'Attendance'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {attendance.status === 'checked-in' && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                  <span className="text-sm font-bold tabular-nums">
                    {attendance.status === 'checked-in' ? attendance.elapsedTime : 'Not Checked In'}
                  </span>
                </div>
              </div>
              <div className="h-8 w-px bg-current opacity-10 mx-1"></div>
              
              {/* Tooltip for Manual Entry */}
              {attendance.isManual && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900 text-white p-3 rounded-2xl shadow-2xl z-[60] opacity-0 group-hover/attendance:opacity-100 transition-opacity pointer-events-none border border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <AlertCircle size={14} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Manual Entry Details</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="opacity-60">Submitted At:</span>
                      <span className="font-bold">{attendance.submissionTime ? format(attendance.submissionTime, 'MMM d, yyyy HH:mm:ss') : '-'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="opacity-60">Selected Time:</span>
                      <span className="font-bold text-amber-400">{attendance.checkInTime ? format(attendance.checkInTime, 'MMM d, yyyy HH:mm:ss') : '-'}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2 text-[9px] text-emerald-400 font-medium">
                    <Eye size={12} />
                    <span>Awaiting Admin Approval</span>
                  </div>
                </div>
              )}
              <button 
                onClick={handleAttendanceToggle}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-xl transition-all shadow-sm active:scale-95",
                  attendance.status === 'checked-in'
                    ? "bg-white text-rose-500 hover:bg-rose-50 hover:text-rose-600 border border-rose-100"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"
                )}
                title={attendance.status === 'checked-in' ? 'Check Out' : 'Check In'}
              >
                {attendance.status === 'checked-in' ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </button>
            </div>

            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-2 cursor-pointer group outline-none"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 leading-none">Ahsan Bilal</p>
                  <p className="text-xs text-slate-500 mt-1">Admin</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 border-2 border-white shadow-sm overflow-hidden group-hover:ring-2 group-hover:ring-indigo-200 transition-all relative">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahsan" 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-200", isProfileOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    {/* Backdrop for closing */}
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-50 mb-1">
                        <p className="text-sm font-bold text-slate-900">Ahsan Bilal</p>
                        <p className="text-xs text-slate-500 truncate">engr.ahsan.bilal@gmail.com</p>
                      </div>
                      
                      <div className="px-2 space-y-0.5">
                        <Link 
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all group"
                        >
                          <User size={18} className="text-slate-400 group-hover:text-indigo-600" />
                          <span className="font-medium">My Profile</span>
                        </Link>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all group">
                          <CreditCard size={18} className="text-slate-400 group-hover:text-indigo-600" />
                          <span className="font-medium">Billing</span>
                        </button>
                        <Link 
                          to="/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all group"
                        >
                          <Settings size={18} className="text-slate-400 group-hover:text-indigo-600" />
                          <span className="font-medium">Account Settings</span>
                        </Link>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-50 px-2">
                        <Link 
                          to="/login"
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-rose-600 hover:bg-rose-50 transition-all group"
                        >
                          <LogOut size={18} className="text-rose-400 group-hover:text-rose-600" />
                          <span className="font-bold">Logout</span>
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
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
