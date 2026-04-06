import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Globe,
  ShieldCheck,
  Award,
  User,
  Zap,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { mockEmployees, mockTasks, mockReports } from '../data/mock';

export default function MemberDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const employee = mockEmployees.find(e => e.id === id) || mockEmployees[0];
  const employeeTasks = mockTasks.filter(t => t.assigneeId === employee.id);
  const employeeReports = mockReports.filter(r => r.employeeId === employee.id);

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to People</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600"></div>
            <div className="px-6 pb-8 -mt-16 text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-indigo-50 overflow-hidden">
                    <img 
                      src={employee.avatar} 
                      alt={employee.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white"></div>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-slate-900">{employee.name}</h2>
                <p className="text-indigo-600 font-bold text-sm tracking-wide uppercase">{employee.designation}</p>
                <p className="text-slate-500 text-sm mt-1">{employee.department}</p>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                <button className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  Message
                </button>
                <button className="p-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 rounded-xl transition-all border border-slate-100">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 border-t border-slate-100 space-y-4 text-sm">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail size={18} className="text-slate-400" />
                <span className="font-medium">{employee.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone size={18} className="text-slate-400" />
                <span className="font-medium">{employee.contactNumber}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} className="text-slate-400" />
                <span className="font-medium truncate">{employee.currentAddress}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Calendar size={18} className="text-slate-400" />
                <span className="font-medium">Joined {employee.joinedAt}</span>
              </div>
            </div>

            <div className="px-6 py-6 border-t border-slate-100 flex items-center justify-center gap-6">
              {employee.githubProfile && (
                <a href={employee.githubProfile} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                  <Github size={20} />
                </a>
              )}
              {employee.linkedinProfile && (
                <a href={employee.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                  <Linkedin size={20} />
                </a>
              )}
              <button className="text-slate-400 hover:text-slate-900 transition-colors"><Twitter size={20} /></button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {employee.technicalSkills.map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Information Sections */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Employee Profile Details</h3>
            </div>
            <div className="p-8 space-y-10">
              {/* Personal & Professional */}
              <section className="space-y-6">
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <User size={16} />
                  Personal & Professional
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailItem label="Full Name" value={employee.name} />
                  <DetailItem label="Designation" value={employee.designation} />
                  <DetailItem label="Personal Email" value={employee.personalEmail} />
                  <DetailItem label="Date of Birth" value={employee.dateOfBirth} />
                  <DetailItem label="NIC Number" value={employee.nicNumber} />
                  <DetailItem label="Salary" value={employee.salary} />
                </div>
              </section>

              {/* Address Details */}
              <section className="space-y-6">
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={16} />
                  Address Details
                </h4>
                <div className="space-y-4">
                  <DetailItem label="Current Address" value={employee.currentAddress} />
                  <DetailItem label="Permanent Address" value={employee.permanentAddress} />
                </div>
              </section>

              {/* Bank & Assets */}
              <section className="space-y-6">
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <Award size={16} />
                  Bank & Assets
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailItem label="Bank Name" value={employee.bankName} />
                  <DetailItem label="IBAN Number" value={employee.ibanNumber} />
                  <DetailItem label="Vehicle Number" value={employee.vehicleNumber || 'N/A'} />
                </div>
              </section>

              {/* Documents */}
              {(employee.nicFront || employee.nicBack) && (
                <section className="space-y-6">
                  <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={16} />
                    NIC Documents
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {employee.nicFront && (
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">NIC Front</p>
                        <div className="aspect-[1.6/1] rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                          <img src={employee.nicFront} alt="NIC Front" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    )}
                    {employee.nicBack && (
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">NIC Back</p>
                        <div className="aspect-[1.6/1] rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                          <img src={employee.nicBack} alt="NIC Back" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tasks Completed</p>
              <div className="flex items-end gap-2">
                <h4 className="text-3xl font-bold text-slate-900">124</h4>
                <span className="text-emerald-500 text-xs font-bold mb-1">+12%</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Report Consistency</p>
              <div className="flex items-end gap-2">
                <h4 className="text-3xl font-bold text-slate-900">98%</h4>
                <span className="text-emerald-500 text-xs font-bold mb-1">Perfect</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Projects</p>
              <div className="flex items-end gap-2">
                <h4 className="text-3xl font-bold text-slate-900">3</h4>
                <span className="text-slate-400 text-xs font-bold mb-1">Current</span>
              </div>
            </div>
          </div>

          {/* Recent Activity / Tasks */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Assigned Tasks</h3>
              <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {employeeTasks.map((task) => (
                <div key={task.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      task.status === 'done' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                    )}>
                      {task.status === 'done' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{task.title}</h4>
                      <p className="text-xs text-slate-500">Due {task.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                      task.status === 'done' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                    )}>
                      {task.status.replace('-', ' ')}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</p>
      <p className="text-sm font-bold text-slate-700 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
        {value || 'Not Provided'}
      </p>
    </div>
  );
}
