import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Eye, 
  Lock, 
  User, 
  Smartphone, 
  Globe, 
  Moon, 
  Sun,
  CheckCircle2,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Settings() {
  const [activeSection, setActiveSection] = useState<'account' | 'security' | 'notifications' | 'display'>('account');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const sections = [
    { id: 'account', label: 'Account Details', icon: User },
    { id: 'security', label: 'Security & Password', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Display & Theme', icon: Eye },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences, security, and notification settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                activeSection === section.id 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                  : "text-slate-500 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200"
              )}
            >
              <section.icon size={18} />
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {activeSection === 'account' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Account Information</h3>
                <p className="text-sm text-slate-500 mt-1">Update your basic account details and contact info.</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                    <input 
                      type="text" 
                      defaultValue="ahsan.bilal"
                      className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="engr.ahsan.bilal@gmail.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Language</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium appearance-none">
                    <option>English (United States)</option>
                    <option>Urdu (Pakistan)</option>
                    <option>German (Germany)</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'security' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">Change Password</h3>
                  <p className="text-sm text-slate-500 mt-1">Ensure your account is using a long, random password to stay secure.</p>
                </div>
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold hover:bg-emerald-100 transition-all">
                  Enable
                </button>
              </div>
            </motion.div>
          )}

          {activeSection === 'notifications' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Notification Preferences</h3>
                <p className="text-sm text-slate-500 mt-1">Choose how you want to be notified about project updates.</p>
              </div>
              <div className="p-8 space-y-6">
                {[
                  { title: 'Email Notifications', desc: 'Receive updates via your registered email.' },
                  { title: 'Push Notifications', desc: 'Receive real-time alerts on your browser.' },
                  { title: 'Project Updates', desc: 'Get notified when someone comments on your project.' },
                  { title: 'Attendance Alerts', desc: 'Reminders for check-in and check-out.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={idx < 2} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'display' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Display Settings</h3>
                <p className="text-sm text-slate-500 mt-1">Customize your dashboard appearance.</p>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-700">Interface Theme</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setIsDarkMode(false)}
                      className={cn(
                        "flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all",
                        !isDarkMode ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-100 text-slate-500 hover:border-slate-200"
                      )}
                    >
                      <Sun size={20} />
                      <span className="font-bold">Light Mode</span>
                    </button>
                    <button 
                      onClick={() => setIsDarkMode(true)}
                      className={cn(
                        "flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all",
                        isDarkMode ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-100 text-slate-500 hover:border-slate-200"
                      )}
                    >
                      <Moon size={20} />
                      <span className="font-bold">Dark Mode</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-700">Compact Mode</h4>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Smartphone size={20} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">Reduce padding and font sizes</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Danger Zone */}
          <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100">
            <div className="flex items-center gap-3 text-rose-600 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-bold">Danger Zone</h3>
            </div>
            <p className="text-sm text-rose-700 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="px-8 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
