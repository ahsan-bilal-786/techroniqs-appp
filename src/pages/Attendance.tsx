import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  User,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { format, subDays, startOfToday } from 'date-fns';

interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeRole: string;
  checkIn: Date;
  checkOut: Date | null;
  submissionTime: Date;
  isManual: boolean;
  status: 'approved' | 'pending' | 'rejected';
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    employeeName: 'Ahsan Bilal',
    employeeRole: 'Admin',
    checkIn: new Date(2026, 3, 6, 9, 0, 0),
    checkOut: null,
    submissionTime: new Date(2026, 3, 6, 10, 15, 0),
    isManual: true,
    status: 'pending'
  },
  {
    id: '2',
    employeeName: 'Sarah Chen',
    employeeRole: 'Senior Developer',
    checkIn: new Date(2026, 3, 6, 8, 55, 0),
    checkOut: null,
    submissionTime: new Date(2026, 3, 6, 8, 55, 0),
    isManual: false,
    status: 'approved'
  },
  {
    id: '3',
    employeeName: 'Marcus Rodriguez',
    employeeRole: 'Product Manager',
    checkIn: new Date(2026, 3, 5, 9, 30, 0),
    checkOut: new Date(2026, 3, 5, 18, 0, 0),
    submissionTime: new Date(2026, 3, 5, 11, 0, 0),
    isManual: true,
    status: 'approved'
  },
  {
    id: '4',
    employeeName: 'Elena Gilbert',
    employeeRole: 'UI/UX Designer',
    checkIn: new Date(2026, 3, 5, 9, 0, 0),
    checkOut: new Date(2026, 3, 5, 17, 30, 0),
    submissionTime: new Date(2026, 3, 5, 9, 0, 0),
    isManual: false,
    status: 'approved'
  }
];

import { useTheme } from '../context/ThemeContext';

export default function Attendance() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [filter, setFilter] = useState<'all' | 'pending' | 'manual'>('all');

  const filteredRecords = mockAttendance.filter(record => {
    if (filter === 'pending') return record.status === 'pending';
    if (filter === 'manual') return record.isManual;
    return true;
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">Attendance Logs</h1>
          <p className={cn("mt-2 font-medium text-sm", isDark ? "text-slate-400" : "text-slate-500")}>
            Monitor team check-ins, manual adjustments, and approval status.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex items-center gap-1 p-1 rounded-2xl",
            isDark ? "bg-slate-800" : "bg-slate-100"
          )}>
            <button 
              onClick={() => setFilter('all')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                filter === 'all' 
                  ? (isDark ? "bg-slate-700 text-indigo-400 shadow-lg" : "bg-white text-indigo-600 shadow-sm") 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('manual')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                filter === 'manual' 
                  ? (isDark ? "bg-slate-700 text-indigo-400 shadow-lg" : "bg-white text-indigo-600 shadow-sm") 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Manual
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                filter === 'pending' 
                  ? (isDark ? "bg-slate-700 text-indigo-400 shadow-lg" : "bg-white text-indigo-600 shadow-sm") 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Pending
              <span className="w-4 h-4 bg-amber-500 text-white text-[10px] flex items-center justify-center rounded-full">1</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={cn(
          "p-8 rounded-3xl border transition-all",
          isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
        )}>
          <div className="flex items-center gap-5 mb-6">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
              isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"
            )}>
              <CheckCircle2 size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">On Time Today</p>
              <h3 className="text-3xl font-bold tracking-tight">12/15</h3>
            </div>
          </div>
          <div className={cn(
            "w-full h-2 rounded-full overflow-hidden",
            isDark ? "bg-slate-800" : "bg-slate-100"
          )}>
            <div className="bg-emerald-500 h-full w-[80%] shadow-[0_0_12px_rgba(16,185,129,0.4)]"></div>
          </div>
        </div>

        <div className={cn(
          "p-8 rounded-3xl border transition-all",
          isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
        )}>
          <div className="flex items-center gap-5 mb-6">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
              isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"
            )}>
              <Eye size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Pending Review</p>
              <h3 className="text-3xl font-bold tracking-tight">1</h3>
            </div>
          </div>
          <p className="text-sm font-medium opacity-50">Manual adjustments awaiting approval.</p>
        </div>

        <div className={cn(
          "p-8 rounded-3xl border transition-all",
          isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
        )}>
          <div className="flex items-center gap-5 mb-6">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
              isDark ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600"
            )}>
              <Clock size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Avg. Work Hours</p>
              <h3 className="text-3xl font-bold tracking-tight">8.4h</h3>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
            <ArrowUpRight size={16} />
            <span>+0.2h from last week</span>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className={cn(
        "rounded-3xl border transition-all overflow-hidden",
        isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
      )}>
        <div className={cn(
          "p-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-6",
          isDark ? "border-slate-800" : "border-slate-100"
        )}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by employee name..." 
              className={cn(
                "w-full pl-12 pr-5 py-3 border rounded-2xl outline-none transition-all text-sm font-medium focus:ring-4 focus:ring-indigo-500/10",
                isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200"
              )}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className={cn(
              "p-3 rounded-xl transition-all",
              isDark ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            )}>
              <Filter size={22} />
            </button>
            <button className={cn(
              "p-3 rounded-xl transition-all",
              isDark ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            )}>
              <Calendar size={22} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={cn(
                "border-b",
                isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/50 border-slate-100"
              )}>
                <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Employee</th>
                <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Check-In Details</th>
                <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Check-Out</th>
                <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Type</th>
                <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]"></th>
              </tr>
            </thead>
            <tbody className={cn("divide-y", isDark ? "divide-slate-800" : "divide-slate-50")}>
              {filteredRecords.map((record) => (
                <tr key={record.id} className={cn(
                  "transition-colors group",
                  isDark ? "hover:bg-slate-800/30" : "hover:bg-slate-50/50"
                )}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl p-0.5 border-2 transition-all",
                        isDark ? "bg-slate-800 border-slate-700" : "bg-indigo-50 border-white shadow-sm"
                      )}>
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${record.employeeName}`} 
                          alt={record.employeeName} 
                          className="w-full h-full object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-bold">{record.employeeName}</p>
                        <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{record.employeeRole}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <ArrowDownRight size={16} className="text-emerald-500" />
                        <span className="text-sm font-bold">{format(record.checkIn, 'HH:mm')}</span>
                        <span className="text-[10px] opacity-40 font-bold">{format(record.checkIn, 'MMM d, yyyy')}</span>
                      </div>
                      {record.isManual && (
                        <div className="flex items-center gap-2 pl-6">
                          <p className="text-[10px] opacity-40 font-bold">
                            Submitted at: <span className="text-indigo-600 dark:text-indigo-400">{format(record.submissionTime, 'HH:mm')}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {record.checkOut ? (
                      <div className="flex items-center gap-2.5">
                        <ArrowUpRight size={16} className="text-rose-500" />
                        <span className="text-sm font-bold">{format(record.checkOut, 'HH:mm')}</span>
                        <span className="text-[10px] opacity-40 font-bold">{format(record.checkOut, 'MMM d, yyyy')}</span>
                      </div>
                    ) : (
                      <span className={cn(
                        "px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider animate-pulse",
                        isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                      )}>
                        Active Now
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    {record.isManual ? (
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                        <AlertCircle size={16} />
                        <span className="text-xs font-bold">Manual</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 opacity-40">
                        <Clock size={16} />
                        <span className="text-xs font-bold">Automatic</span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      record.status === 'approved' ? (isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600") :
                      record.status === 'pending' ? (isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600") :
                      (isDark ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-600")
                    )}>
                      {record.status === 'pending' && <Eye size={14} className="animate-pulse" />}
                      {record.status}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className={cn(
                      "p-2.5 rounded-xl transition-all",
                      isDark ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800" : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                    )}>
                      <MoreHorizontal size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Administrative Review</h3>
              <p className="text-indigo-100 font-medium mt-1">You have 1 manual check-in adjustment awaiting your review.</p>
            </div>
          </div>
          <button className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl shadow-black/10">
            Review Now
          </button>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
      </motion.div>
    </div>
  );
}
