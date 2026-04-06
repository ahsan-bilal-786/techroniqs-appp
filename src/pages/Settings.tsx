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

import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const [activeSection, setActiveSection] = useState<'account' | 'security' | 'notifications' | 'display'>('account');
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const sections = [
    { id: 'account', label: 'Account Details', icon: User },
    { id: 'security', label: 'Security & Password', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Display & Theme', icon: Eye },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tighter">Account Settings</h1>
        <p className={cn("mt-2 font-medium text-sm", isDark ? "text-slate-400" : "text-slate-500")}>
          Manage your account preferences, security, and notification settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2.5">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all",
                activeSection === section.id 
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20" 
                  : cn(
                      "text-slate-500 hover:text-slate-900 border border-transparent",
                      isDark ? "hover:bg-slate-800 hover:text-white" : "hover:bg-white hover:border-slate-200"
                    )
              )}
            >
              <section.icon size={20} />
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-10">
          {activeSection === 'account' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-3xl border transition-all overflow-hidden",
                isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
              )}
            >
              <div className={cn("p-8 border-b", isDark ? "border-slate-800" : "border-slate-50")}>
                <h3 className="text-xl font-bold tracking-tight">Account Information</h3>
                <p className="text-sm opacity-50 mt-1 font-medium">Update your basic account details and contact info.</p>
              </div>
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2.5">
                    <label className="text-sm font-bold opacity-70 ml-1">Username</label>
                    <input 
                      type="text" 
                      defaultValue="ahsan.bilal"
                      className={cn(
                        "w-full px-5 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium focus:ring-4 focus:ring-indigo-500/10",
                        isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200"
                      )}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-sm font-bold opacity-70 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="engr.ahsan.bilal@gmail.com"
                      className={cn(
                        "w-full px-5 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium focus:ring-4 focus:ring-indigo-500/10",
                        isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200"
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm font-bold opacity-70 ml-1">Language</label>
                  <select className={cn(
                    "w-full px-5 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium appearance-none focus:ring-4 focus:ring-indigo-500/10",
                    isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200"
                  )}>
                    <option>English (United States)</option>
                    <option>Urdu (Pakistan)</option>
                    <option>German (Germany)</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
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
              className="space-y-10"
            >
              <div className={cn(
                "rounded-3xl border transition-all overflow-hidden",
                isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
              )}>
                <div className={cn("p-8 border-b", isDark ? "border-slate-800" : "border-slate-50")}>
                  <h3 className="text-xl font-bold tracking-tight">Change Password</h3>
                  <p className="text-sm opacity-50 mt-1 font-medium">Ensure your account is using a long, random password to stay secure.</p>
                </div>
                <div className="p-8 space-y-8">
                  <div className="space-y-2.5">
                    <label className="text-sm font-bold opacity-70 ml-1">Current Password</label>
                    <input 
                      type="password" 
                      className={cn(
                        "w-full px-5 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium focus:ring-4 focus:ring-indigo-500/10",
                        isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200"
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2.5">
                      <label className="text-sm font-bold opacity-70 ml-1">New Password</label>
                      <input 
                        type="password" 
                        className={cn(
                          "w-full px-5 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium focus:ring-4 focus:ring-indigo-500/10",
                          isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200"
                        )}
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-sm font-bold opacity-70 ml-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        className={cn(
                          "w-full px-5 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium focus:ring-4 focus:ring-indigo-500/10",
                          isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200"
                        )}
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              <div className={cn(
                "rounded-3xl border p-8 flex items-center justify-between transition-all",
                isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
              )}>
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                    isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                  )}>
                    <Smartphone size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold tracking-tight">Two-Factor Authentication</h4>
                    <p className="text-sm opacity-50 font-medium">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <button className={cn(
                  "px-8 py-3 rounded-xl font-bold transition-all",
                  isDark ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                )}>
                  Enable
                </button>
              </div>
            </motion.div>
          )}

          {activeSection === 'notifications' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-3xl border transition-all overflow-hidden",
                isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
              )}
            >
              <div className={cn("p-8 border-b", isDark ? "border-slate-800" : "border-slate-50")}>
                <h3 className="text-xl font-bold tracking-tight">Notification Preferences</h3>
                <p className="text-sm opacity-50 mt-1 font-medium">Choose how you want to be notified about project updates.</p>
              </div>
              <div className="p-8 space-y-8">
                {[
                  { title: 'Email Notifications', desc: 'Receive updates via your registered email.' },
                  { title: 'Push Notifications', desc: 'Receive real-time alerts on your browser.' },
                  { title: 'Project Updates', desc: 'Get notified when someone comments on your project.' },
                  { title: 'Attendance Alerts', desc: 'Reminders for check-in and check-out.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-xs opacity-50 font-medium">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={idx < 2} />
                      <div className={cn(
                        "w-12 h-6 rounded-full peer transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6 peer-checked:bg-indigo-600",
                        isDark ? "bg-slate-700" : "bg-slate-200"
                      )}></div>
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
              className={cn(
                "rounded-3xl border transition-all overflow-hidden",
                isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
              )}
            >
              <div className={cn("p-8 border-b", isDark ? "border-slate-800" : "border-slate-50")}>
                <h3 className="text-xl font-bold tracking-tight">Display Settings</h3>
                <p className="text-sm opacity-50 mt-1 font-medium">Customize your dashboard appearance.</p>
              </div>
              <div className="p-8 space-y-10">
                <div className="space-y-6">
                  <h4 className="text-sm font-bold opacity-70">Interface Theme</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <button 
                      onClick={() => setTheme('light')}
                      className={cn(
                        "flex items-center justify-center gap-4 p-6 rounded-2xl border-2 transition-all",
                        !isDark 
                          ? "border-indigo-600 bg-indigo-500/5 text-indigo-600" 
                          : "border-slate-800 text-slate-500 hover:border-slate-700"
                      )}
                    >
                      <Sun size={24} />
                      <span className="font-bold">Light Mode</span>
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={cn(
                        "flex items-center justify-center gap-4 p-6 rounded-2xl border-2 transition-all",
                        isDark 
                          ? "border-indigo-500 bg-indigo-500/10 text-indigo-400" 
                          : "border-slate-100 text-slate-500 hover:border-slate-200"
                      )}
                    >
                      <Moon size={24} />
                      <span className="font-bold">Dark Mode</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-bold opacity-70">Compact Mode</h4>
                  <div className={cn(
                    "flex items-center justify-between p-6 rounded-2xl transition-colors",
                    isDark ? "bg-slate-800/50" : "bg-slate-50"
                  )}>
                    <div className="flex items-center gap-4">
                      <Smartphone size={24} className="opacity-40" />
                      <span className="text-sm font-bold opacity-70">Reduce padding and font sizes</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className={cn(
                        "w-12 h-6 rounded-full peer transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6 peer-checked:bg-indigo-600",
                        isDark ? "bg-slate-700" : "bg-slate-200"
                      )}></div>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Danger Zone */}
          <div className={cn(
            "rounded-3xl p-10 border transition-all",
            isDark ? "bg-rose-500/5 border-rose-500/20" : "bg-rose-50 border-rose-100"
          )}>
            <div className="flex items-center gap-4 text-rose-600 dark:text-rose-400 mb-6">
              <AlertTriangle size={28} />
              <h3 className="text-xl font-bold tracking-tight">Danger Zone</h3>
            </div>
            <p className="text-sm text-rose-700 dark:text-rose-300/70 mb-8 font-medium">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-xl shadow-rose-500/20">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
