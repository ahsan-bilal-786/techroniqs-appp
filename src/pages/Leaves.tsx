import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MoreHorizontal,
  ChevronRight,
  AlertCircle,
  Info,
  User,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { format, addDays } from 'date-fns';

type LeaveType = 'Sick' | 'Casual' | 'Paternity';
type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

interface LeaveRequest {
  id: string;
  employeeName: string;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveStatus;
  appliedOn: Date;
}

const mockLeaves: LeaveRequest[] = [
  {
    id: '1',
    employeeName: 'Ahsan Bilal',
    type: 'Casual',
    startDate: new Date(2026, 3, 10),
    endDate: new Date(2026, 3, 12),
    reason: 'Family event',
    status: 'Pending',
    appliedOn: new Date(2026, 3, 5)
  },
  {
    id: '2',
    employeeName: 'Sarah Chen',
    type: 'Sick',
    startDate: new Date(2026, 3, 1),
    endDate: new Date(2026, 3, 2),
    reason: 'Flu',
    status: 'Approved',
    appliedOn: new Date(2026, 2, 30)
  },
  {
    id: '3',
    employeeName: 'Marcus Rodriguez',
    type: 'Paternity',
    startDate: new Date(2026, 3, 15),
    endDate: new Date(2026, 3, 25),
    reason: 'New baby arrival',
    status: 'Approved',
    appliedOn: new Date(2026, 3, 1)
  }
];

const leaveAllowances = [
  { type: 'Sick', total: 12, used: 2, color: 'text-rose-600', bg: 'bg-rose-50' },
  { type: 'Casual', total: 15, used: 5, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { type: 'Paternity', total: 10, used: 0, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export default function Leaves() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'my-leaves' | 'team-requests'>('my-leaves');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Leave Management</h1>
          <p className="text-slate-500 mt-1">Apply for time off and track your leave balances.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsApplyModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus size={18} />
            <span>Apply for Leave</span>
          </button>
        </div>
      </div>

      {/* Leave Allowances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaveAllowances.map((allowance) => (
          <div key={allowance.type} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", allowance.bg, allowance.color)}>
                  <Calendar size={24} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remaining</p>
                  <p className={cn("text-2xl font-black", allowance.color)}>{allowance.total - allowance.used}</p>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{allowance.type} Leave</h3>
              <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Used: {allowance.used}</span>
                <span>Total: {allowance.total}</span>
              </div>
              <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(allowance.used / allowance.total) * 100}%` }}
                  className={cn("h-full", allowance.bg.replace('bg-', 'bg-').replace('50', '500'))}
                />
              </div>
            </div>
            <div className={cn("absolute -right-4 -bottom-4 w-24 h-24 opacity-5 transition-transform group-hover:scale-110", allowance.color)}>
              <Calendar size={96} />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs & Filters */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100">
          <div className="flex p-2">
            <button 
              onClick={() => setActiveTab('my-leaves')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === 'my-leaves' ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              My Leaves
            </button>
            <button 
              onClick={() => setActiveTab('team-requests')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                activeTab === 'team-requests' ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              Team Requests
              <span className="px-1.5 py-0.5 bg-indigo-600 text-white text-[10px] rounded-full">1</span>
            </button>
          </div>
        </div>

        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search requests..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-200">
              <Filter size={18} />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Leave Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Applied On</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold overflow-hidden border-2 border-white shadow-sm">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leave.employeeName}`} 
                          alt={leave.employeeName} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <p className="font-bold text-slate-900">{leave.employeeName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                      leave.type === 'Sick' ? "bg-rose-50 text-rose-600" :
                      leave.type === 'Casual' ? "bg-indigo-50 text-indigo-600" :
                      "bg-emerald-50 text-emerald-600"
                    )}>
                      {leave.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-800">
                        {format(leave.startDate, 'MMM d')} - {format(leave.endDate, 'MMM d, yyyy')}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">3 Days Total</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {format(leave.appliedOn, 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      leave.status === 'Approved' ? "bg-emerald-50 text-emerald-600" :
                      leave.status === 'Pending' ? "bg-amber-50 text-amber-600" :
                      "bg-rose-50 text-rose-600"
                    )}>
                      {leave.status === 'Pending' ? <Clock size={12} className="animate-pulse" /> : 
                       leave.status === 'Approved' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {leave.status}
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

      {/* Apply Leave Modal */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Apply for Leave</h3>
                      <p className="text-sm text-slate-500">Submit a new leave request for approval.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsApplyModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <Calendar size={20} />
                  </button>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Leave Type</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium appearance-none">
                        <option>Sick Leave</option>
                        <option>Casual Leave</option>
                        <option>Paternity Leave</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Duration</label>
                      <div className="flex items-center gap-2 p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                        <Info size={16} className="text-indigo-600" />
                        <span className="text-xs font-bold text-indigo-900">3 Days Selected</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Start Date</label>
                      <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">End Date</label>
                      <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Reason for Leave</label>
                    <textarea 
                      rows={3}
                      placeholder="Briefly explain the reason for your leave..."
                      className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Settings Banner */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center">
            <Settings size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Leave Allowance Settings</h3>
            <p className="text-slate-500 text-sm mt-1">Configure the default number of leaves for all employees.</p>
          </div>
        </div>
        <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg relative z-10">
          Manage Allowances
        </button>
        <div className="absolute right-0 top-0 w-32 h-full bg-indigo-50/30 -skew-x-12 translate-x-16"></div>
      </div>
    </div>
  );
}
