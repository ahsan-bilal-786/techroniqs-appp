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

export default function Attendance() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'manual'>('all');

  const filteredRecords = mockAttendance.filter(record => {
    if (filter === 'pending') return record.status === 'pending';
    if (filter === 'manual') return record.isManual;
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance Logs</h1>
          <p className="text-slate-500 mt-1">Monitor team check-ins, manual adjustments, and approval status.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button 
              onClick={() => setFilter('all')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                filter === 'all' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('manual')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                filter === 'manual' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Manual
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                filter === 'pending' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Pending
              <span className="w-4 h-4 bg-amber-500 text-white text-[10px] flex items-center justify-center rounded-full">1</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">On Time Today</p>
              <h3 className="text-2xl font-bold text-slate-900">12/15</h3>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[80%]"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Eye size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Review</p>
              <h3 className="text-2xl font-bold text-slate-900">1</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500">Manual adjustments awaiting approval.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg. Work Hours</p>
              <h3 className="text-2xl font-bold text-slate-900">8.4h</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
            <ArrowUpRight size={14} />
            <span>+0.2h from last week</span>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by employee name..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
              <Filter size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
              <Calendar size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Check-In Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Check-Out</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold overflow-hidden border-2 border-white shadow-sm">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${record.employeeName}`} 
                          alt={record.employeeName} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{record.employeeName}</p>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{record.employeeRole}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <ArrowDownRight size={14} className="text-emerald-500" />
                        <span className="text-sm font-bold text-slate-800">{format(record.checkIn, 'HH:mm')}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{format(record.checkIn, 'MMM d, yyyy')}</span>
                      </div>
                      {record.isManual && (
                        <div className="flex items-center gap-2 pl-5">
                          <p className="text-[10px] text-slate-400">
                            Submitted at: <span className="font-bold text-slate-600">{format(record.submissionTime, 'HH:mm')}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {record.checkOut ? (
                      <div className="flex items-center gap-2">
                        <ArrowUpRight size={14} className="text-rose-500" />
                        <span className="text-sm font-bold text-slate-800">{format(record.checkOut, 'HH:mm')}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{format(record.checkOut, 'MMM d, yyyy')}</span>
                      </div>
                    ) : (
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase tracking-wider animate-pulse">
                        Active Now
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {record.isManual ? (
                      <div className="flex items-center gap-1.5 text-amber-600">
                        <AlertCircle size={14} />
                        <span className="text-xs font-bold">Manual</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock size={14} />
                        <span className="text-xs font-medium">Automatic</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      record.status === 'approved' ? "bg-emerald-50 text-emerald-600" :
                      record.status === 'pending' ? "bg-amber-50 text-amber-600" :
                      "bg-rose-50 text-rose-600"
                    )}>
                      {record.status === 'pending' && <Eye size={12} className="animate-pulse" />}
                      {record.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                      <MoreHorizontal size={20} />
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
        className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Administrative Review</h3>
              <p className="text-indigo-100 text-sm mt-1">You have 1 manual check-in adjustment awaiting your review.</p>
            </div>
          </div>
          <button className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg">
            Review Now
          </button>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </motion.div>
    </div>
  );
}
