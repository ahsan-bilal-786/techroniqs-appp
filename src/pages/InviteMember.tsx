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
  AlertCircle,
  User,
  Globe,
  MapPin,
  Award
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
    accessLevel: 'member',
    designation: '',
    joinDate: '',
    nicNumber: '',
    contactNumber: '',
    permanentAddress: '',
    currentAddress: '',
    personalEmail: '',
    linkedinProfile: '',
    githubProfile: '',
    bankName: '',
    vehicleNumber: '',
    ibanNumber: '',
    dateOfBirth: '',
    salary: '',
    technicalSkills: '',
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
              <p className="text-slate-500 text-sm">Fill in the employee details to create their profile and send an invitation.</p>
            </div>
          </div>
        </div>

        <form className="p-8 space-y-12">
          {/* Personal Information */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <User size={20} className="text-indigo-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormItem label="Full Name" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} placeholder="e.g., Ahsan Bilal" />
              <FormItem label="Personal Email" value={formData.personalEmail} onChange={(v) => setFormData({...formData, personalEmail: v})} placeholder="e.g., personal@email.com" type="email" />
              <FormItem label="Contact Number" value={formData.contactNumber} onChange={(v) => setFormData({...formData, contactNumber: v})} placeholder="e.g., +92 300 1234567" />
              <FormItem label="Date of Birth" value={formData.dateOfBirth} onChange={(v) => setFormData({...formData, dateOfBirth: v})} type="date" />
              <FormItem label="NIC Number" value={formData.nicNumber} onChange={(v) => setFormData({...formData, nicNumber: v})} placeholder="e.g., 35202-1234567-1" />
              <FormItem label="Vehicle Number" value={formData.vehicleNumber} onChange={(v) => setFormData({...formData, vehicleNumber: v})} placeholder="e.g., LEC-1234" />
            </div>
          </section>

          {/* Professional Information */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Briefcase size={20} className="text-indigo-600" />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormItem label="Work Email" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} placeholder="e.g., ahsan@techroniqs.com" type="email" />
              <FormItem label="Designation" value={formData.designation} onChange={(v) => setFormData({...formData, designation: v})} placeholder="e.g., Senior Full Stack Developer" />
              <FormItem label="Join Date" value={formData.joinDate} onChange={(v) => setFormData({...formData, joinDate: v})} type="date" />
              <FormItem label="Salary (Monthly)" value={formData.salary} onChange={(v) => setFormData({...formData, salary: v})} placeholder="e.g., PKR 250,000" />
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Department</label>
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
              <FormItem label="Technical Skills" value={formData.technicalSkills} onChange={(v) => setFormData({...formData, technicalSkills: v})} placeholder="e.g., React, Node.js, Flutter (comma separated)" />
            </div>
          </section>

          {/* Address Information */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <MapPin size={20} className="text-indigo-600" />
              Address Information
            </h3>
            <div className="space-y-6">
              <FormItem label="Current Address" value={formData.currentAddress} onChange={(v) => setFormData({...formData, currentAddress: v})} placeholder="e.g., Apartment #5B, Gulberg Heights, Lahore" fullWidth />
              <FormItem label="Permanent Address" value={formData.permanentAddress} onChange={(v) => setFormData({...formData, permanentAddress: v})} placeholder="e.g., House #123, Street #4, Model Town, Lahore" fullWidth />
            </div>
          </section>

          {/* Bank Information */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Award size={20} className="text-indigo-600" />
              Bank Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormItem label="Bank Name" value={formData.bankName} onChange={(v) => setFormData({...formData, bankName: v})} placeholder="e.g., Habib Bank Limited (HBL)" />
              <FormItem label="IBAN Number" value={formData.ibanNumber} onChange={(v) => setFormData({...formData, ibanNumber: v})} placeholder="e.g., PK70HABB0012345678901234" />
            </div>
          </section>

          {/* Social Profiles */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Globe size={20} className="text-indigo-600" />
              Social Profiles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormItem label="LinkedIn Profile" value={formData.linkedinProfile} onChange={(v) => setFormData({...formData, linkedinProfile: v})} placeholder="e.g., https://linkedin.com/in/username" />
              <FormItem label="GitHub Profile" value={formData.githubProfile} onChange={(v) => setFormData({...formData, githubProfile: v})} placeholder="e.g., https://github.com/username" />
            </div>
            <div className="space-y-4 mt-4">
              <label className="text-sm font-bold text-slate-700">Additional Social Profiles</label>
              <p className="text-xs text-slate-500 italic">Add other platforms like Twitter, Behance, etc. (Platform: URL)</p>
              <textarea 
                placeholder="Twitter: https://twitter.com/username&#10;Behance: https://behance.net/username"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm h-24"
              />
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Mail size={20} className="text-indigo-600" />
              Additional Contact Information
            </h3>
            <div className="space-y-4">
              <p className="text-xs text-slate-500 italic">Add emergency contacts, Skype, etc. (Label: Value)</p>
              <textarea 
                placeholder="Emergency Contact: +92 321 7654321&#10;Skype: username.dev"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm h-24"
              />
            </div>
          </section>

          {/* Documents */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck size={20} className="text-indigo-600" />
              Documents (NIC)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">NIC Front Image</label>
                <input type="file" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">NIC Back Image</label>
                <input type="file" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
            </div>
          </section>

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

function FormItem({ label, value, onChange, placeholder, type = "text", fullWidth = false }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; fullWidth?: boolean }) {
  return (
    <div className={cn("space-y-2", fullWidth ? "md:col-span-2" : "")}>
      <label className="text-sm font-bold text-slate-700">{label}</label>
      <input 
        type={type} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium"
      />
    </div>
  );
}
