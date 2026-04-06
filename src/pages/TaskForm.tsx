import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  ClipboardList, 
  Calendar, 
  User, 
  Flag,
  Briefcase,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { mockTasks, mockProjects, mockEmployees } from '../data/mock';

export default function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const task = isEditing ? mockTasks.find(t => t.id === id) : null;

  const [formData, setFormData] = useState({
    title: task?.title || '',
    projectId: task?.projectId || '',
    description: task?.description || '',
    status: task?.status || 'todo',
    priority: task?.priority || 'medium',
    assigneeId: task?.assigneeId || '',
    dueDate: task?.dueDate || ''
  });

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Tasks</span>
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <ClipboardList size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {isEditing ? 'Edit Task' : 'Create New Task'}
              </h1>
              <p className="text-slate-500 text-sm">Define the task details and assign it to a team member.</p>
            </div>
          </div>
        </div>

        <form className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Task Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Design user registration flow"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Briefcase size={16} className="text-slate-400" />
                <span>Project</span>
              </label>
              <select 
                value={formData.projectId}
                onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none"
              >
                <option value="">Select Project</option>
                {mockProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <User size={16} className="text-slate-400" />
                <span>Assignee</span>
              </label>
              <select 
                value={formData.assigneeId}
                onChange={(e) => setFormData({...formData, assigneeId: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none"
              >
                <option value="">Select Assignee</option>
                {mockEmployees.map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Description</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Provide more context about this task..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                <span>Due Date</span>
              </label>
              <input 
                type="date" 
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Flag size={16} className="text-slate-400" />
                <span>Priority</span>
              </label>
              <div className="flex gap-2">
                {['low', 'medium', 'high', 'urgent'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({...formData, priority: p as any})}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-xs font-bold capitalize transition-all border",
                      formData.priority === p 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700">Status</label>
            <div className="flex flex-wrap gap-3">
              {['todo', 'in-progress', 'review', 'done', 'blocked'].map((status) => (
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
              <span>{isEditing ? 'Update Task' : 'Create Task'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
