import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Send,
  Sparkles,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { mockReports, mockTasks, mockEmployees } from '../data/mock';

export default function Reports() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const activeTasks = mockTasks.filter(t => t.status === 'in-progress');
  const completedTasks = mockTasks.filter(t => t.status === 'done');

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Daily Reports</h1>
          <p className="text-slate-500 mt-1">Track your daily progress and automate roll-ups.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <History size={16} />
            <span>{showHistory ? 'Back to Submit' : 'View History'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showHistory ? (
          <motion.div
            key="submit-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* AI Suggestion Banner */}
            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100 flex items-center justify-between overflow-hidden relative group">
              <div className="relative z-10 max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} className="text-indigo-200" />
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">AI Assistant</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Ready to submit your report?</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  I've analyzed your activity for today. You've completed 2 tasks and spent 4 hours on "Implement OAuth2 Flow". Would you like me to pre-fill your report?
                </p>
                <button className="mt-4 px-6 py-2 bg-white text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-900/20">
                  Auto-fill Report
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-500/50 to-transparent pointer-events-none"></div>
              <Sparkles size={120} className="absolute -right-10 -bottom-10 text-indigo-500/20 group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Report Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
                  {/* Tasks Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-emerald-500" />
                      <span>What did you work on today?</span>
                    </h3>
                    <div className="space-y-3">
                      {activeTasks.map(task => (
                        <div key={task.id} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl group hover:border-indigo-200 transition-all cursor-pointer">
                          <div className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center group-hover:border-indigo-500">
                            <div className="w-2.5 h-2.5 bg-indigo-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-800">{task.title}</p>
                            <p className="text-xs text-slate-500">Project: Global Logistics</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="number" defaultValue={4} className="w-12 h-8 bg-white border border-slate-200 rounded-lg text-center text-sm font-bold outline-none focus:border-indigo-500" />
                            <span className="text-xs text-slate-400 font-bold">hrs</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blockers Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <AlertCircle size={20} className="text-rose-500" />
                      <span>Any blockers or challenges?</span>
                    </h3>
                    <textarea 
                      placeholder="Mention any issues that are slowing you down..."
                      className="w-full min-h-[120px] p-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm resize-none"
                    ></textarea>
                  </div>

                  {/* Tomorrow's Plan */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Calendar size={20} className="text-indigo-500" />
                      <span>What's the plan for tomorrow?</span>
                    </h3>
                    <textarea 
                      placeholder="List your main goals for the next working day..."
                      className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={16} />
                      <span className="text-sm font-medium">Auto-saved at 10:45 AM</span>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                      <Send size={18} />
                      <span>Submit Report</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-4">Submission Stats</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Weekly Streak</span>
                      <span className="text-sm font-bold text-emerald-600">5 Days 🔥</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Avg. Submission Time</span>
                      <span className="text-sm font-bold text-slate-800">5:45 PM</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[85%]"></div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Consistency Score: 85%</p>
                  </div>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <AlertCircle size={18} />
                    <span>Reminder</span>
                  </h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Reports submitted after 7:00 PM are marked as "Late". Try to submit before leaving for the day.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="history-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search reports..." 
                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <button className="p-2 text-slate-500 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-200">
                  <Filter size={18} />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 font-bold text-sm hover:bg-indigo-50 rounded-xl transition-all">
                <Download size={16} />
                <span>Export PDF</span>
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {mockReports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                        {new Date(report.date).getDate()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{new Date(report.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h4>
                        <p className="text-xs text-slate-500">Submitted at {new Date(report.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Hours</p>
                        <p className="font-bold text-slate-800">{report.hoursWorked}h</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Tasks</p>
                        <p className="font-bold text-slate-800">{report.tasksCompleted.length + report.tasksInProgress.length}</p>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </div>
                  {report.blockers && (
                    <div className="flex items-start gap-2 p-3 bg-rose-50 rounded-xl border border-rose-100">
                      <AlertCircle size={14} className="text-rose-500 mt-0.5" />
                      <p className="text-xs text-rose-800 font-medium">{report.blockers}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
