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
import { useTheme } from '../context/ThemeContext';

const columns: { id: TaskStatus; label: string; color: string }[] = [
  { id: 'todo', label: 'To Do', color: 'bg-slate-500' },
  { id: 'in-progress', label: 'In Progress', color: 'bg-indigo-500' },
  { id: 'review', label: 'Review', color: 'bg-amber-500' },
  { id: 'done', label: 'Done', color: 'bg-emerald-500' },
];

const priorityColors: Record<Priority, string> = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  medium: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  high: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  urgent: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
};

export default function Tasks() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('list');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="space-y-8 max-w-full mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className={cn("mt-1 font-medium", isDark ? "text-slate-400" : "text-slate-500")}>
            Manage your daily tasks and track progress across projects.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn("flex items-center gap-1 p-1 rounded-xl mr-2", isDark ? "bg-slate-800" : "bg-slate-100")}>
            <button 
              onClick={() => setViewMode('kanban')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'kanban' 
                  ? isDark ? "bg-slate-700 text-indigo-400 shadow-sm" : "bg-white text-indigo-600 shadow-sm" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              )}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'list' 
                  ? isDark ? "bg-slate-700 text-indigo-400 shadow-sm" : "bg-white text-indigo-600 shadow-sm" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              )}
            >
              <List size={18} />
            </button>
          </div>
          <Link 
            to="/tasks/new"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
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
                    <h3 className={cn("font-bold", isDark ? "text-white" : "text-slate-900")}>{column.label}</h3>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-400")}>
                      {mockTasks.filter(t => t.status === column.id).length}
                    </span>
                  </div>
                  <Link 
                    to="/tasks/new"
                    className={cn("p-1.5 rounded-lg transition-all", isDark ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100")}
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
                      className={cn(
                        "p-5 rounded-2xl border transition-all group cursor-grab active:cursor-grabbing",
                        isDark 
                          ? "bg-dark-card border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50" 
                          : "bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200"
                      )}
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
                            className={cn("p-1 rounded-lg transition-all", isDark ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50")}
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {activeMenu === task.id && (
                            <div className={cn(
                              "absolute right-0 mt-2 w-48 rounded-xl shadow-xl border py-2 z-50",
                              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                            )}>
                              <Link to={`/tasks/edit/${task.id}`} className={cn("flex items-center gap-2 px-4 py-2 text-sm transition-colors", isDark ? "text-slate-400 hover:bg-slate-800 hover:text-indigo-400" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600")}>
                                <Edit size={14} />
                                <span>Edit Task</span>
                              </Link>
                              <button className={cn("w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors", isDark ? "text-slate-400 hover:bg-slate-800 hover:text-indigo-400" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600")}>
                                <CheckCircle2 size={14} />
                                <span>Mark as Done</span>
                              </button>
                              <div className={cn("h-px my-1", isDark ? "bg-slate-800" : "bg-slate-50")}></div>
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                                <Trash2 size={14} />
                                <span>Delete Task</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <h4 className={cn("font-bold mb-2 group-hover:text-indigo-600 transition-colors leading-snug", isDark ? "text-white" : "text-slate-900")}>
                        {task.title}
                      </h4>
                      <div className={cn("flex items-center gap-2 text-xs mb-4 font-medium", isDark ? "text-slate-500" : "text-slate-500")}>
                        <Briefcase size={12} />
                        <span>Global Logistics Platform</span>
                      </div>
                      <div className={cn("flex items-center justify-between pt-4 border-t", isDark ? "border-slate-800" : "border-slate-50")}>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                          <Calendar size={14} />
                          <span>{task.dueDate}</span>
                        </div>
                        <div className={cn("w-7 h-7 rounded-full border-2 overflow-hidden ring-1", isDark ? "bg-slate-800 border-slate-900 ring-slate-800" : "bg-slate-100 border-white ring-slate-100")}>
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
                    <div className={cn("h-24 rounded-2xl border-2 border-dashed flex items-center justify-center", isDark ? "border-slate-800 text-slate-700" : "border-slate-100 text-slate-300")}>
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
            className={cn(
              "rounded-2xl border shadow-sm overflow-hidden",
              isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-200"
            )}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={cn("border-b", isDark ? "bg-slate-900/50 border-slate-800" : "bg-slate-50/50 border-slate-100")}>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Assignee</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className={cn("divide-y", isDark ? "divide-slate-800" : "divide-slate-50")}>
                  {mockTasks.map((task) => (
                    <tr key={task.id} className={cn("transition-colors group", isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50/50")}>
                      <td className="px-6 py-4">
                        <span className={cn("font-bold", isDark ? "text-white" : "text-slate-900")}>{task.title}</span>
                      </td>
                      <td className={cn("px-6 py-4 text-sm font-medium", isDark ? "text-slate-400" : "text-slate-600")}>Global Logistics</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                          task.status === 'done' 
                            ? isDark ? "bg-emerald-900/20 text-emerald-400" : "bg-emerald-50 text-emerald-600" 
                            : isDark ? "bg-indigo-900/20 text-indigo-400" : "bg-indigo-50 text-indigo-600"
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
                      <td className={cn("px-6 py-4 text-sm font-medium", isDark ? "text-slate-400" : "text-slate-600")}>{task.dueDate}</td>
                      <td className="px-6 py-4">
                        <div className={cn("w-8 h-8 rounded-full border-2 overflow-hidden ring-1", isDark ? "bg-slate-800 border-slate-900 ring-slate-800" : "bg-slate-200 border-white ring-slate-100")}>
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
                            className={cn("p-2 rounded-xl transition-all", isDark ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800" : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50")}
                          >
                            <MoreHorizontal size={20} />
                          </button>
                          {activeMenu === task.id && (
                            <div className={cn(
                              "absolute right-0 mt-2 w-48 rounded-xl shadow-xl border py-2 z-50",
                              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                            )}>
                              <Link to={`/tasks/edit/${task.id}`} className={cn("flex items-center gap-2 px-4 py-2 text-sm transition-colors", isDark ? "text-slate-400 hover:bg-slate-800 hover:text-indigo-400" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600")}>
                                <Edit size={14} />
                                <span>Edit Task</span>
                              </Link>
                              <button className={cn("w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors", isDark ? "text-slate-400 hover:bg-slate-800 hover:text-indigo-400" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600")}>
                                <CheckCircle2 size={14} />
                                <span>Mark as Done</span>
                              </button>
                              <div className={cn("h-px my-1", isDark ? "bg-slate-800" : "bg-slate-50")}></div>
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
