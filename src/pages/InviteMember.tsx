import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Users, 
  Mail, 
  Briefcase, 
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function InviteMember() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    accessLevel: 'member'
  });

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to People</span>
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Users size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Invite Team Member</h1>
              <p className="text-slate-500 text-sm">Send an invitation to join the Techroniqs ERP workspace.</p>
            </div>
          </div>
        </div>

        <form className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., John Doe"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Mail size={16} className="text-slate-400" />
                <span>Email Address</span>
              </label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="e.g., john@techroniqs.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Briefcase size={16} className="text-slate-400" />
                <span>Job Role</span>
              </label>
              <input 
                type="text" 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                placeholder="e.g., Senior Developer"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <ShieldCheck size={16} className="text-slate-400" />
                <span>Department</span>
              </label>
              <select 
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none"
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700">Access Level</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'admin', label: 'Admin', desc: 'Full access to all modules and settings.' },
                { id: 'member', label: 'Member', desc: 'Standard access to projects and tasks.' },
                { id: 'viewer', label: 'Viewer', desc: 'Read-only access to assigned projects.' }
              ].map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setFormData({...formData, accessLevel: level.id})}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all",
                    formData.accessLevel === level.id 
                      ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100" 
                      : "bg-white border-slate-200 hover:border-slate-300"
                  )}
                >
                  <p className={cn(
                    "text-sm font-bold mb-1",
                    formData.accessLevel === level.id ? "text-indigo-600" : "text-slate-900"
                  )}>
                    {level.label}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{level.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
              <Zap size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-indigo-900 mb-1">Automation Note</h4>
              <p className="text-xs text-indigo-800 leading-relaxed">
                Inviting a new member will automatically trigger the "Onboarding Workflow", which includes setting up their default tasks and Slack channel access.
              </p>
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
              <Send size={18} />
              <span>Send Invitation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
