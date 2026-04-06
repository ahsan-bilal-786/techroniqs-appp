import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Briefcase, 
  Users, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  LayoutGrid,
  List,
  Edit
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { mockProjects, mockEmployees } from '../data/mock';

import { useTheme } from '../context/ThemeContext';

export default function Projects() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">Projects</h1>
          <p className={cn("mt-2 font-medium text-sm", isDark ? "text-slate-400" : "text-slate-500")}>
            Manage your portfolio and track project health in real-time.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex items-center gap-1 p-1 rounded-2xl mr-2",
            isDark ? "bg-slate-800" : "bg-slate-100"
          )}>
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2.5 rounded-xl transition-all",
                viewMode === 'grid' 
                  ? (isDark ? "bg-slate-700 text-indigo-400 shadow-lg" : "bg-white text-indigo-600 shadow-sm") 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2.5 rounded-xl transition-all",
                viewMode === 'list' 
                  ? (isDark ? "bg-slate-700 text-indigo-400 shadow-lg" : "bg-white text-indigo-600 shadow-sm") 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <List size={20} />
            </button>
          </div>
          <Link 
            to="/projects/new"
            className="flex items-center gap-2.5 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
          >
            <Plus size={20} />
            <span>Create Project</span>
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className={cn(
        "flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl border transition-all",
        isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
      )}>
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className={cn(
                "w-full pl-12 pr-5 py-3 border rounded-2xl outline-none transition-all text-sm font-medium focus:ring-4 focus:ring-indigo-500/10",
                isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200"
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select className={cn(
            "border rounded-2xl px-5 py-3 text-sm font-bold outline-none transition-all appearance-none min-w-[140px]",
            isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200"
          )}>
            <option>All Status</option>
            <option>Active</option>
            <option>On Hold</option>
            <option>Completed</option>
          </select>
          <select className={cn(
            "border rounded-2xl px-5 py-3 text-sm font-bold outline-none transition-all appearance-none min-w-[140px]",
            isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200"
          )}>
            <option>All Clients</option>
            <option>LogiCorp</option>
            <option>Internal</option>
          </select>
          <button className={cn(
            "flex items-center gap-2.5 px-5 py-3 font-bold rounded-2xl transition-all",
            isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"
          )}>
            <Filter size={20} />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {mockProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "rounded-3xl border transition-all group overflow-hidden flex flex-col",
                  isDark ? "bg-dark-card border-slate-800 hover:border-indigo-500/50" : "bg-white border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-200"
                )}
              >
                <div className="p-8 flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                      isDark ? "bg-slate-800 text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400" : "bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                    )}>
                      <Briefcase size={28} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Link 
                        to={`/projects/edit/${project.id}`}
                        className={cn(
                          "p-2.5 rounded-xl transition-all",
                          isDark ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800" : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                        )}
                      >
                        <Edit size={20} />
                      </Link>
                      <button className={cn(
                        "p-2.5 rounded-xl transition-all",
                        isDark ? "text-slate-500 hover:text-white hover:bg-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                      )}>
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.name}</h3>
                    <p className="text-sm opacity-50 font-bold uppercase tracking-widest">{project.client}</p>
                  </div>
                  <p className="text-sm opacity-50 mt-5 line-clamp-2 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="opacity-50 font-bold">Progress</span>
                      <span className="font-bold">{project.progress}%</span>
                    </div>
                    <div className={cn(
                      "w-full h-2 rounded-full overflow-hidden",
                      isDark ? "bg-slate-800" : "bg-slate-100"
                    )}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      />
                    </div>
                  </div>
                </div>

                <div className={cn(
                  "px-8 py-5 border-t flex items-center justify-between",
                  isDark ? "bg-slate-800/30 border-slate-800" : "bg-slate-50/50 border-slate-50"
                )}>
                  <div className="flex -space-x-3">
                    {project.team.map((empId) => (
                      <div key={empId} className={cn(
                        "w-9 h-9 rounded-full border-2 overflow-hidden transition-transform hover:scale-110 hover:z-10",
                        isDark ? "border-slate-800 bg-slate-700" : "border-white bg-slate-200 shadow-sm"
                      )}>
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${empId}`} 
                          alt="Team Member" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                    <div className={cn(
                      "w-9 h-9 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-transform hover:scale-110 hover:z-10",
                      isDark ? "border-slate-800 bg-slate-700 text-indigo-400" : "border-white bg-indigo-50 text-indigo-600 shadow-sm"
                    )}>
                      +2
                    </div>
                  </div>
                  <div className={cn(
                    "flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]",
                    isDark ? "text-slate-500" : "text-slate-400"
                  )}>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span>Active</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add New Project Card */}
            <Link 
              to="/projects/new"
              className={cn(
                "group relative p-10 rounded-[2rem] border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-6",
                isDark 
                  ? "border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5" 
                  : "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30"
              )}
            >
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center transition-all",
                isDark ? "bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-indigo-400" : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-indigo-500 group-hover:shadow-xl"
              )}>
                <Plus size={40} />
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-tight">Start New Project</h4>
                <p className="text-sm opacity-50 mt-1.5 font-medium">Use a template or build from scratch.</p>
              </div>
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "rounded-3xl border transition-all overflow-hidden",
              isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
            )}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={cn(
                  "border-b",
                  isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/50 border-slate-50"
                )}>
                  <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Project Name</th>
                  <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Client</th>
                  <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Progress</th>
                  <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Team</th>
                  <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]"></th>
                </tr>
              </thead>
              <tbody className={cn("divide-y", isDark ? "divide-slate-800" : "divide-slate-50")}>
                {mockProjects.map((project) => (
                  <tr key={project.id} className={cn(
                    "transition-colors group",
                    isDark ? "hover:bg-slate-800/30" : "hover:bg-slate-50/50"
                  )}>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                          isDark ? "bg-slate-800 text-slate-500 group-hover:text-indigo-400" : "bg-slate-100 text-slate-400 group-hover:text-indigo-600"
                        )}>
                          <Briefcase size={24} />
                        </div>
                        <span className="font-bold tracking-tight">{project.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm opacity-50 font-bold uppercase tracking-widest">{project.client}</td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                        project.status === 'active' 
                          ? (isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600") 
                          : (isDark ? "bg-slate-800 text-slate-500" : "bg-slate-100 text-slate-600")
                      )}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-32 h-2 rounded-full overflow-hidden",
                          isDark ? "bg-slate-800" : "bg-slate-100"
                        )}>
                          <div className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <span className="text-xs font-bold">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex -space-x-3">
                        {project.team.map((empId) => (
                          <div key={empId} className={cn(
                            "w-8 h-8 rounded-full border-2 overflow-hidden transition-transform hover:scale-110 hover:z-10",
                            isDark ? "border-slate-800 bg-slate-700" : "border-white bg-slate-200 shadow-sm"
                          )}>
                            <img 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${empId}`} 
                              alt="Team Member" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/projects/edit/${project.id}`}
                          className={cn(
                            "p-2.5 rounded-xl transition-all",
                            isDark ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800" : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                          )}
                        >
                          <Edit size={20} />
                        </Link>
                        <button className={cn(
                          "p-2.5 rounded-xl transition-all",
                          isDark ? "text-slate-500 hover:text-white hover:bg-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        )}>
                          <ChevronRight size={22} />
                        </button>
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
