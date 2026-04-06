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

export default function People() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">People</h1>
          <p className="text-slate-500 mt-1">Manage your team, roles, and track productivity metrics.</p>
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
            to="/people/invite"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <UserPlus size={18} />
            <span>Invite Member</span>
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
              placeholder="Search by name, role, or department..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-slate-50 border border-transparent rounded-xl px-4 py-2 text-sm font-medium text-slate-600 outline-none focus:bg-white focus:border-indigo-200 transition-all">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Design</option>
            <option>HR</option>
          </select>
          <select className="bg-slate-50 border border-transparent rounded-xl px-4 py-2 text-sm font-medium text-slate-600 outline-none focus:bg-white focus:border-indigo-200 transition-all">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-all">
            <Filter size={18} />
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {mockEmployees.map((employee, index) => (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1 text-center relative">
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === employee.id ? null : employee.id)}
                      className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    {activeMenu === employee.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 text-left">
                        <Link to={`/people/${employee.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                          <ExternalLink size={14} />
                          <span>View Profile</span>
                        </Link>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                          <Edit size={14} />
                          <span>Edit Details</span>
                        </button>
                        <div className="h-px bg-slate-50 my-1"></div>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                          <Trash2 size={14} />
                          <span>Remove Member</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="w-full h-full rounded-2xl bg-indigo-50 border-2 border-white shadow-sm overflow-hidden group-hover:ring-4 group-hover:ring-indigo-100 transition-all">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.id}`} 
                        alt={employee.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white",
                      employee.status === 'active' ? "bg-emerald-500" : "bg-slate-300"
                    )}></div>
                  </div>
                  <div className="space-y-1">
                    <Link to={`/people/${employee.id}`} className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors block">
                      {employee.name}
                    </Link>
                    <p className="text-sm text-indigo-600 font-bold">{employee.role}</p>
                    <p className="text-xs text-slate-500 font-medium">{employee.department}</p>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Tasks</p>
                      <p className="text-sm font-bold text-slate-800">24</p>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Reports</p>
                      <p className="text-sm font-bold text-slate-800">98%</p>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                    <Mail size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                    <MessageSquare size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                    <Phone size={18} />
                  </button>
                  <div className="w-px h-4 bg-slate-200 mx-1"></div>
                  <Link 
                    to={`/people/${employee.id}`}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                  >
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Add New Employee Card */}
            <Link 
              to="/people/invite"
              className="group relative p-8 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-center flex flex-col items-center justify-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-500 group-hover:shadow-md transition-all">
                <Plus size={32} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Invite Team Member</h4>
                <p className="text-sm text-slate-500 mt-1">Add a new person to your organization.</p>
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
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role & Dept</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 overflow-hidden border-2 border-white shadow-sm">
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.id}`} 
                            alt={employee.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <Link to={`/people/${employee.id}`} className="font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                          {employee.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">{employee.role}</p>
                      <p className="text-xs text-slate-500 font-medium">{employee.department}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          employee.status === 'active' ? "bg-emerald-500" : "bg-slate-300"
                        )}></div>
                        <span className="text-sm font-medium text-slate-600 capitalize">{employee.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <Mail size={16} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <MessageSquare size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{employee.joinedAt}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block text-left">
                        <button 
                          onClick={() => setActiveMenu(activeMenu === employee.id ? null : employee.id)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <MoreHorizontal size={20} />
                        </button>
                        {activeMenu === employee.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 text-left">
                            <Link to={`/people/${employee.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                              <ExternalLink size={14} />
                              <span>View Profile</span>
                            </Link>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                              <Edit size={14} />
                              <span>Edit Details</span>
                            </button>
                            <div className="h-px bg-slate-50 my-1"></div>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                              <Trash2 size={14} />
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
