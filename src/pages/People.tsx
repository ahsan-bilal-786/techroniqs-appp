import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Users, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  LayoutGrid,
  List,
  MapPin,
  Globe,
  MessageSquare,
  UserPlus,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { mockEmployees } from '../data/mock';

import { useTheme } from '../context/ThemeContext';

export default function People() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">People</h1>
          <p className={cn("mt-2 font-medium text-sm", isDark ? "text-slate-400" : "text-slate-500")}>
            Manage your team, roles, and track productivity metrics.
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
            to="/people/invite"
            className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <UserPlus size={20} />
            <span>Invite Member</span>
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
              placeholder="Search by name, role, or department..." 
              className={cn(
                "w-full pl-12 pr-5 py-3 border rounded-2xl outline-none transition-all text-sm font-medium focus:ring-4 focus:ring-indigo-500/10",
                isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200"
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select className={cn(
            "border rounded-2xl px-5 py-3 text-sm font-bold outline-none transition-all cursor-pointer",
            isDark ? "bg-slate-800 border-slate-700 text-slate-300 focus:border-indigo-500" : "bg-slate-50 border-transparent text-slate-600 focus:bg-white focus:border-indigo-200"
          )}>
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Design</option>
            <option>HR</option>
          </select>
          <select className={cn(
            "border rounded-2xl px-5 py-3 text-sm font-bold outline-none transition-all cursor-pointer",
            isDark ? "bg-slate-800 border-slate-700 text-slate-300 focus:border-indigo-500" : "bg-slate-50 border-transparent text-slate-600 focus:bg-white focus:border-indigo-200"
          )}>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className={cn(
            "flex items-center gap-2 px-5 py-3 font-bold rounded-2xl transition-all",
            isDark ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"
          )}>
            <Filter size={20} />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Employees Grid */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {mockEmployees.map((employee, index) => (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "rounded-3xl border transition-all group overflow-hidden flex flex-col",
                  isDark ? "bg-dark-card border-slate-800 hover:border-indigo-500/50" : "bg-white border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-200"
                )}
              >
                <div className="p-8 flex-1 text-center relative">
                  <div className="absolute top-6 right-6">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === employee.id ? null : employee.id)}
                      className={cn(
                        "p-2 rounded-xl transition-all",
                        isDark ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <MoreHorizontal size={20} />
                    </button>
                    {activeMenu === employee.id && (
                      <div className={cn(
                        "absolute right-0 mt-3 w-52 rounded-2xl shadow-2xl border py-2 z-50 text-left",
                        isDark ? "bg-slate-800 border-slate-700 shadow-black/50" : "bg-white border-slate-100 shadow-slate-200"
                      )}>
                        <Link to={`/people/${employee.id}`} className={cn(
                          "flex items-center gap-3 px-5 py-2.5 text-sm font-bold transition-colors",
                          isDark ? "text-slate-300 hover:bg-slate-700 hover:text-indigo-400" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                        )}>
                          <ExternalLink size={16} />
                          <span>View Profile</span>
                        </Link>
                        <button className={cn(
                          "w-full flex items-center gap-3 px-5 py-2.5 text-sm font-bold transition-colors",
                          isDark ? "text-slate-300 hover:bg-slate-700 hover:text-indigo-400" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                        )}>
                          <Edit size={16} />
                          <span>Edit Details</span>
                        </button>
                        <div className={cn("h-px my-2", isDark ? "bg-slate-700" : "bg-slate-50")}></div>
                        <button className={cn(
                          "w-full flex items-center gap-3 px-5 py-2.5 text-sm font-bold transition-colors",
                          isDark ? "text-rose-400 hover:bg-rose-500/10" : "text-rose-600 hover:bg-rose-50"
                        )}>
                          <Trash2 size={16} />
                          <span>Remove Member</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <div className={cn(
                      "w-full h-full rounded-3xl p-1 border-2 transition-all group-hover:ring-8",
                      isDark ? "bg-slate-800 border-slate-700 group-hover:ring-indigo-500/10" : "bg-indigo-50 border-white shadow-sm group-hover:ring-indigo-100"
                    )}>
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.id}`} 
                        alt={employee.name} 
                        className="w-full h-full object-cover rounded-2xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4",
                      isDark ? "border-slate-900" : "border-white",
                      employee.status === 'active' ? "bg-emerald-500" : "bg-slate-300"
                    )}></div>
                  </div>
                  <div className="space-y-1.5">
                    <Link to={`/people/${employee.id}`} className={cn(
                      "text-xl font-bold tracking-tight transition-colors block",
                      isDark ? "text-slate-100 hover:text-indigo-400" : "text-slate-900 hover:text-indigo-600"
                    )}>
                      {employee.name}
                    </Link>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold">{employee.role}</p>
                    <p className={cn("text-[10px] font-bold uppercase tracking-widest", isDark ? "text-slate-500" : "text-slate-400")}>{employee.department}</p>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className={cn(
                      "p-3 rounded-2xl transition-colors",
                      isDark ? "bg-slate-800/50" : "bg-slate-50"
                    )}>
                      <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-1", isDark ? "text-slate-500" : "text-slate-400")}>Tasks</p>
                      <p className="text-base font-bold">24</p>
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl transition-colors",
                      isDark ? "bg-slate-800/50" : "bg-slate-50"
                    )}>
                      <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-1", isDark ? "text-slate-500" : "text-slate-400")}>Reports</p>
                      <p className="text-base font-bold">98%</p>
                    </div>
                  </div>
                </div>

                <div className={cn(
                  "px-6 py-4 border-t flex items-center justify-center gap-3",
                  isDark ? "bg-slate-800/30 border-slate-800" : "bg-slate-50/50 border-slate-100"
                )}>
                  <button className={cn(
                    "p-2.5 rounded-xl transition-all",
                    isDark ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800" : "text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm"
                  )}>
                    <Mail size={20} />
                  </button>
                  <button className={cn(
                    "p-2.5 rounded-xl transition-all",
                    isDark ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800" : "text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm"
                  )}>
                    <MessageSquare size={20} />
                  </button>
                  <button className={cn(
                    "p-2.5 rounded-xl transition-all",
                    isDark ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800" : "text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm"
                  )}>
                    <Phone size={20} />
                  </button>
                  <div className={cn("w-px h-5 mx-2", isDark ? "bg-slate-700" : "bg-slate-200")}></div>
                  <Link 
                    to={`/people/${employee.id}`}
                    className={cn(
                      "p-2.5 rounded-xl transition-all",
                      isDark ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800" : "text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm"
                    )}
                  >
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Add New Employee Card */}
            <Link 
              to="/people/invite"
              className={cn(
                "group relative p-10 rounded-3xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-6",
                isDark ? "border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5" : "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30"
              )}
            >
              <div className={cn(
                "w-20 h-20 rounded-3xl flex items-center justify-center transition-all",
                isDark ? "bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-indigo-400" : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-indigo-500 group-hover:shadow-xl"
              )}>
                <Plus size={40} />
              </div>
              <div>
                <h4 className="text-lg font-bold">Invite Team Member</h4>
                <p className="text-sm opacity-50 mt-1 font-medium">Add a new person to your organization.</p>
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
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={cn(
                    "border-b",
                    isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/50 border-slate-100"
                  )}>
                    <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Employee</th>
                    <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Role & Dept</th>
                    <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Contact</th>
                    <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Joined</th>
                    <th className="px-8 py-5 text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]"></th>
                  </tr>
                </thead>
                <tbody className={cn("divide-y", isDark ? "divide-slate-800" : "divide-slate-50")}>
                  {mockEmployees.map((employee) => (
                    <tr key={employee.id} className={cn(
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
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.id}`} 
                              alt={employee.name} 
                              className="w-full h-full object-cover rounded-xl"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <Link to={`/people/${employee.id}`} className="font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            {employee.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold">{employee.role}</p>
                        <p className="text-xs opacity-50 font-bold uppercase tracking-widest">{employee.department}</p>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2.5">
                          <div className={cn(
                            "w-2.5 h-2.5 rounded-full",
                            employee.status === 'active' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-slate-300"
                          )}></div>
                          <span className="text-sm font-bold opacity-80 capitalize">{employee.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <button className={cn(
                            "p-2 rounded-xl transition-all",
                            isDark ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800" : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                          )}>
                            <Mail size={18} />
                          </button>
                          <button className={cn(
                            "p-2 rounded-xl transition-all",
                            isDark ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800" : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                          )}>
                            <MessageSquare size={18} />
                          </button>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold opacity-60">{employee.joinedAt}</td>
                      <td className="px-8 py-5 text-right">
                        <div className="relative inline-block text-left">
                          <button 
                            onClick={() => setActiveMenu(activeMenu === employee.id ? null : employee.id)}
                            className={cn(
                              "p-2.5 rounded-xl transition-all",
                              isDark ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800" : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                            )}
                          >
                            <MoreHorizontal size={22} />
                          </button>
                          {activeMenu === employee.id && (
                            <div className={cn(
                              "absolute right-0 mt-3 w-52 rounded-2xl shadow-2xl border py-2 z-50 text-left",
                              isDark ? "bg-slate-800 border-slate-700 shadow-black/50" : "bg-white border-slate-100 shadow-slate-200"
                            )}>
                              <Link to={`/people/${employee.id}`} className={cn(
                                "flex items-center gap-3 px-5 py-2.5 text-sm font-bold transition-colors",
                                isDark ? "text-slate-300 hover:bg-slate-700 hover:text-indigo-400" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                              )}>
                                <ExternalLink size={16} />
                                <span>View Profile</span>
                              </Link>
                              <button className={cn(
                                "w-full flex items-center gap-3 px-5 py-2.5 text-sm font-bold transition-colors",
                                isDark ? "text-slate-300 hover:bg-slate-700 hover:text-indigo-400" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                              )}>
                                <Edit size={16} />
                                <span>Edit Details</span>
                              </button>
                              <div className={cn("h-px my-2", isDark ? "bg-slate-700" : "bg-slate-50")}></div>
                              <button className={cn(
                                "w-full flex items-center gap-3 px-5 py-2.5 text-sm font-bold transition-colors",
                                isDark ? "text-rose-400 hover:bg-rose-500/10" : "text-rose-600 hover:bg-rose-50"
                              )}>
                                <Trash2 size={16} />
                                <span>Remove Member</span>
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
