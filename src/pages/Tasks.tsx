import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  LayoutGrid,
  List,
  Calendar,
  User,
  Tag,
  Flag,
  Briefcase,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { mockTasks, mockProjects, mockEmployees } from '../data/mock';
import { TaskStatus, Priority } from '../types';

const columns: { id: TaskStatus; label: string; color: string }[] = [
  { id: 'todo', label: 'To Do', color: 'bg-slate-500' },
  { id: 'in-progress', label: 'In Progress', color: 'bg-indigo-500' },
  { id: 'review', label: 'Review', color: 'bg-amber-500' },
  { id: 'done', label: 'Done', color: 'bg-emerald-500' },
];

const priorityColors: Record<Priority, string> = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-indigo-50 text-indigo-600',
  high: 'bg-amber-50 text-amber-600',
  urgent: 'bg-rose-50 text-rose-600',
};

export default function Tasks() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('list');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="space-y-8 max-w-full mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tasks</h1>
          <p className="text-slate-500 mt-1">Manage your daily tasks and track progress across projects.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mr-2">
            <button 
              onClick={() => setViewMode('kanban')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'kanban' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'list' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <List size={18} />
            </button>
          </div>
          <Link 
            to="/tasks/new"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </Link>
        </div>
      </div>

      {/* Kanban Board */}
      <AnimatePresence mode="wait">
        {viewMode === 'kanban' ? (
          <motion.div 
            key="kanban"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex gap-6 overflow-x-auto pb-4 min-h-[calc(100vh-300px)]"
          >
            {columns.map((column) => (
              <div key={column.id} className="flex-shrink-0 w-80 space-y-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", column.color)}></div>
                    <h3 className="font-bold text-slate-900">{column.label}</h3>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {mockTasks.filter(t => t.status === column.id).length}
                    </span>
                  </div>
                  <Link 
                    to="/tasks/new"
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                  >
                    <Plus size={16} />
                  </Link>
                </div>

                <div className="space-y-4">
                  {mockTasks.filter(t => t.status === column.id).map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={cn(
                          "px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                          priorityColors[task.priority]
                        )}>
                          {task.priority}
                        </span>
                        <div className="relative">
                          <button 
                            onClick={() => setActiveMenu(activeMenu === task.id ? null : task.id)}
                            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {activeMenu === task.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                              <Link to={`/tasks/edit/${task.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                                <Edit size={14} />
                                <span>Edit Task</span>
                              </Link>
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                                <CheckCircle2 size={14} />
                                <span>Mark as Done</span>
                              </button>
                              <div className="h-px bg-slate-50 my-1"></div>
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                                <Trash2 size={14} />
                                <span>Delete Task</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <Briefcase size={12} />
                        <span className="font-medium">Global Logistics Platform</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                          <Calendar size={14} />
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white overflow-hidden ring-1 ring-slate-100">
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assigneeId}`} 
                            alt="Assignee" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Empty Column Placeholder */}
                  {mockTasks.filter(t => t.status === column.id).length === 0 && (
                    <div className="h-24 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300">
                      <span className="text-xs font-bold uppercase tracking-widest">No Tasks</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Assignee</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900">{task.title}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">Global Logistics</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                        task.status === 'done' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                      )}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                        priorityColors[task.priority]
                      )}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{task.dueDate}</td>
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden ring-1 ring-slate-100">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assigneeId}`} 
                          alt="Assignee" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block text-left">
                        <button 
                          onClick={() => setActiveMenu(activeMenu === task.id ? null : task.id)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <MoreHorizontal size={20} />
                        </button>
                        {activeMenu === task.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                            <Link to={`/tasks/edit/${task.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                              <Edit size={14} />
                              <span>Edit Task</span>
                            </Link>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                              <CheckCircle2 size={14} />
                              <span>Mark as Done</span>
                            </button>
                            <div className="h-px bg-slate-50 my-1"></div>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                              <Trash2 size={14} />
                              <span>Delete Task</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
