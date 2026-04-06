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

export default function Projects() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Projects</h1>
          <p className="text-slate-500 mt-1">Manage your portfolio and track project health in real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mr-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'grid' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
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
            to="/projects/new"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus size={18} />
            <span>Create Project</span>
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-slate-50 border border-transparent rounded-xl px-4 py-2 text-sm font-medium text-slate-600 outline-none focus:bg-white focus:border-indigo-200 transition-all">
            <option>All Status</option>
            <option>Active</option>
            <option>On Hold</option>
            <option>Completed</option>
          </select>
          <select className="bg-slate-50 border border-transparent rounded-xl px-4 py-2 text-sm font-medium text-slate-600 outline-none focus:bg-white focus:border-indigo-200 transition-all">
            <option>All Clients</option>
            <option>LogiCorp</option>
            <option>Internal</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-all">
            <Filter size={18} />
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mockProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Briefcase size={24} />
                    </div>
                    <div className="flex items-center gap-1">
                      <Link 
                        to={`/projects/edit/${project.id}`}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <Edit size={18} />
                      </Link>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{project.client}</p>
                  </div>
                  <p className="text-sm text-slate-500 mt-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium">Progress</span>
                      <span className="text-slate-900 font-bold">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.team.map((empId) => (
                      <div key={empId} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden ring-1 ring-slate-100">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${empId}`} 
                          alt="Team Member" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 ring-1 ring-indigo-100">
                      +2
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <Clock size={14} />
                    <span>Active</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add New Project Card */}
            <Link 
              to="/projects/new"
              className="group relative p-8 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-center flex flex-col items-center justify-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-500 group-hover:shadow-md transition-all">
                <Plus size={32} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Start New Project</h4>
                <p className="text-sm text-slate-500 mt-1">Use a template or build from scratch.</p>
              </div>
            </Link>
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
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                          <Briefcase size={20} />
                        </div>
                        <span className="font-bold text-slate-900">{project.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{project.client}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                        project.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
                      )}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-900">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {project.team.map((empId) => (
                          <div key={empId} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden ring-1 ring-slate-100">
                            <img 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${empId}`} 
                              alt="Team Member" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/projects/edit/${project.id}`}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <Edit size={18} />
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                          <ChevronRight size={20} />
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
