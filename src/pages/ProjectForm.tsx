import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Briefcase, 
  Calendar, 
  Users, 
  DollarSign,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { mockProjects, mockEmployees } from '../data/mock';

export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const project = isEditing ? mockProjects.find(p => p.id === id) : null;

  const [formData, setFormData] = useState({
    name: project?.name || '',
    client: project?.client || '',
    description: project?.description || '',
    status: project?.status || 'active',
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
    budget: project?.budget || '',
    team: project?.team || []
  });

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Projects</span>
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Briefcase size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {isEditing ? 'Edit Project' : 'Create New Project'}
              </h1>
              <p className="text-slate-500 text-sm">Fill in the details to {isEditing ? 'update the' : 'launch a new'} project.</p>
            </div>
          </div>
        </div>

        <form className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Project Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Mobile App Redesign"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Client Name</label>
              <input 
                type="text" 
                value={formData.client}
                onChange={(e) => setFormData({...formData, client: e.target.value})}
                placeholder="e.g., Acme Corp"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Description</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the project goals, scope, and key deliverables..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Timeline & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                <span>Start Date</span>
              </label>
              <input 
                type="date" 
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                <span>End Date (Optional)</span>
              </label>
              <input 
                type="date" 
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <DollarSign size={16} className="text-slate-400" />
                <span>Budget ($)</span>
              </label>
              <input 
                type="number" 
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Team Selection */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Users size={16} className="text-slate-400" />
              <span>Assign Team Members</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {mockEmployees.map((emp) => {
                const isSelected = formData.team.includes(emp.id);
                return (
                  <button
                    key={emp.id}
                    type="button"
                    onClick={() => {
                      const newTeam = isSelected 
                        ? formData.team.filter(id => id !== emp.id)
                        : [...formData.team, emp.id];
                      setFormData({...formData, team: newTeam});
                    }}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                      isSelected 
                        ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100" 
                        : "bg-white border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                      <img src={emp.avatar} alt={emp.name} referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{emp.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{emp.role}</p>
                    </div>
                    {isSelected && <CheckCircle2 size={16} className="text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700">Project Status</label>
            <div className="flex flex-wrap gap-3">
              {['active', 'on-hold', 'completed', 'archived'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({...formData, status: status as any})}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all border",
                    formData.status === status 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" 
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  )}
                >
                  {status.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 flex items-center justify-end gap-4 border-t border-slate-100">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex items-center gap-2 px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
            >
              <Save size={18} />
              <span>{isEditing ? 'Update Project' : 'Create Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
