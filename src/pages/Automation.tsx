import React, { useState } from 'react';
import { 
  Plus, 
  Zap, 
  Settings, 
  Play, 
  Pause, 
  Trash2, 
  ChevronRight, 
  Clock, 
  Bell, 
  Mail, 
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Activity,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const automations = [
  {
    id: 'auto-1',
    name: 'Report Reminder',
    description: 'Send Slack reminder if report not submitted by 6:00 PM.',
    trigger: 'Time: 18:00',
    action: 'Slack Notification',
    status: 'active',
    lastRun: '2024-04-05 18:00',
    runs: 124
  },
  {
    id: 'auto-2',
    name: 'Auto QA Assignment',
    description: 'When a task is moved to "Review", auto-assign to QA team.',
    trigger: 'Task Status Change',
    action: 'Assign Team',
    status: 'active',
    lastRun: '2024-04-05 14:30',
    runs: 45
  },
  {
    id: 'auto-3',
    name: 'Overdue Alert',
    description: 'Notify manager if a high priority task is overdue.',
    trigger: 'Task Overdue',
    action: 'Email Manager',
    status: 'paused',
    lastRun: '2024-04-01 09:00',
    runs: 12
  }
];

export default function Automation() {
  const [activeTab, setActiveTab] = useState<'workflows' | 'logs'>('workflows');

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Workflow Automation</h1>
          <p className="text-slate-500 mt-1">Automate repetitive tasks and notifications with smart rules.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          <Plus size={18} />
          <span>New Automation</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('workflows')}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
            activeTab === 'workflows' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Active Workflows
        </button>
        <button 
          onClick={() => setActiveTab('logs')}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
            activeTab === 'logs' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Execution Logs
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'workflows' ? (
          <motion.div
            key="workflows"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 gap-6"
          >
            {automations.map((auto, index) => (
              <motion.div
                key={auto.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-5 flex-1">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300",
                      auto.status === 'active' ? "bg-indigo-500 text-white shadow-indigo-100" : "bg-slate-100 text-slate-400 shadow-none"
                    )}>
                      <Zap size={28} fill={auto.status === 'active' ? "currentColor" : "none"} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900">{auto.name}</h3>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          auto.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                        )}>
                          {auto.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 max-w-md">{auto.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8 md:gap-12">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Trigger</p>
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <Activity size={14} className="text-indigo-500" />
                        <span>{auto.trigger}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Action</p>
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <Workflow size={14} className="text-emerald-500" />
                        <span>{auto.action}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Last Run</p>
                      <p className="text-sm font-bold text-slate-700">{auto.lastRun}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        {auto.status === 'active' ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                        <Settings size={20} />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Empty State / Add New Card */}
            <button className="group relative p-8 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-center flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-500 group-hover:shadow-md transition-all">
                <Plus size={32} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Create Custom Automation</h4>
                <p className="text-sm text-slate-500 mt-1">Build your own "If This Then That" logic to save time.</p>
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="logs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900">Recent Executions</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status:</span>
                <select className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer">
                  <option>All</option>
                  <option>Success</option>
                  <option>Failed</option>
                </select>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      i % 3 === 0 ? "bg-rose-50 text-rose-500" : "bg-emerald-50 text-emerald-500"
                    )}>
                      {i % 3 === 0 ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {i % 3 === 0 ? 'Failed to send Slack reminder' : 'Successfully assigned QA to Task #482'}
                      </p>
                      <p className="text-xs text-slate-500">Automation: {i % 3 === 0 ? 'Report Reminder' : 'Auto QA Assignment'}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400">2h ago</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Templates */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Recommended Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Mail, title: 'Email Roll-up', desc: 'Daily summary of project progress to stakeholders.' },
            { icon: MessageSquare, title: 'Slack Sync', desc: 'Post task updates to specific project channels.' },
            { icon: Clock, title: 'Time Audit', desc: 'Alert if logged hours differ from estimated by 20%.' },
          ].map((template) => (
            <div key={template.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center mb-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                <template.icon size={20} />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{template.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{template.desc}</p>
              <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:gap-2 transition-all">
                <span>Use Template</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
