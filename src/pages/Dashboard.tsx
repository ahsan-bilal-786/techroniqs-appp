import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { mockProjects, mockTasks, mockEmployees, mockFinance } from '../data/mock';

const stats = [
  { label: 'Active Projects', value: '12', change: '+2', trend: 'up', icon: Briefcase, color: 'bg-indigo-500' },
  { label: 'Total Employees', value: '48', change: '+5', trend: 'up', icon: Users, color: 'bg-emerald-500' },
  { label: 'Tasks Completed', value: '1,284', change: '+12%', trend: 'up', icon: CheckCircle2, color: 'bg-amber-500' },
  { label: 'Monthly Revenue', value: '$84,200', change: '-2%', trend: 'down', icon: TrendingUp, color: 'bg-rose-500' },
];

const chartData = [
  { name: 'Jan', revenue: 45000, expenses: 32000 },
  { name: 'Feb', revenue: 52000, expenses: 35000 },
  { name: 'Mar', revenue: 48000, expenses: 38000 },
  { name: 'Apr', revenue: 61000, expenses: 42000 },
  { name: 'May', revenue: 55000, expenses: 40000 },
  { name: 'Jun', revenue: 67000, expenses: 45000 },
];

const projectStatusData = [
  { name: 'In Progress', value: 8, color: '#6366f1' },
  { name: 'Completed', value: 4, color: '#10b981' },
  { name: 'On Hold', value: 2, color: '#f59e0b' },
];

import { useTheme } from '../context/ThemeContext';

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">Dashboard Overview</h1>
          <p className={cn("mt-2 font-medium text-sm", isDark ? "text-slate-400" : "text-slate-500")}>
            Welcome back, Ahsan. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-sm border",
            isDark ? "bg-dark-card border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
          )}>
            <Calendar size={18} className="opacity-60" />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 rounded-2xl text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <Filter size={18} />
            <span>Customize</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "p-7 rounded-3xl border transition-all group relative overflow-hidden",
              isDark ? "bg-dark-card border-slate-800 hover:border-slate-700" : "bg-white border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
            )}
          >
            <div className="flex items-start justify-between relative z-10">
              <div className={cn("p-3.5 rounded-2xl text-white shadow-lg", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg",
                stat.trend === 'up' 
                  ? (isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600") 
                  : (isDark ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-600")
              )}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="mt-6 relative z-10">
              <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", isDark ? "text-slate-500" : "text-slate-400")}>{stat.label}</p>
              <h3 className="text-3xl font-bold mt-2 tracking-tight">{stat.value}</h3>
            </div>
            {/* Subtle background decoration */}
            <div className={cn(
              "absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-[0.03] transition-transform group-hover:scale-150",
              stat.color
            )} />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Chart */}
        <div className={cn(
          "lg:col-span-2 p-8 rounded-3xl border transition-all",
          isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
        )}>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Revenue vs Expenses</h3>
              <p className={cn("text-sm font-medium", isDark ? "text-slate-500" : "text-slate-400")}>Financial performance overview</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                <span className="text-xs opacity-70 font-bold uppercase tracking-wider">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <span className="text-xs opacity-70 font-bold uppercase tracking-wider">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1e293b" : "#f1f5f9"} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDark ? '#475569' : '#64748b', fontSize: 12, fontWeight: 600 }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDark ? '#475569' : '#64748b', fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0f172a' : '#fff', 
                    borderRadius: '16px', 
                    border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px 16px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                  labelStyle={{ fontSize: '13px', fontWeight: 800, marginBottom: '4px', color: isDark ? '#f8fafc' : '#0f172a' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke={isDark ? "#334155" : "#cbd5e1"} 
                  strokeWidth={2}
                  fillOpacity={0} 
                  strokeDasharray="6 6"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Status Pie */}
        <div className={cn(
          "p-8 rounded-3xl border transition-all",
          isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
        )}>
          <h3 className="text-display-sm font-bold mb-1">Project Health</h3>
          <p className="text-sm opacity-60 font-medium mb-10">Current status distribution</p>
          <div className="h-[260px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-display font-bold">14</span>
              <span className="text-[10px] opacity-50 uppercase font-bold tracking-[0.2em] mt-1">Total</span>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {projectStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm opacity-70 font-bold">{item.name}</span>
                </div>
                <span className="text-sm font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Activity & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className={cn(
          "rounded-3xl border overflow-hidden transition-all",
          isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
        )}>
          <div className="p-8 border-b border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
            <h3 className="text-display-sm font-bold">Active Projects</h3>
            <button className="text-indigo-600 text-sm font-bold hover:text-indigo-700 transition-colors">View All</button>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {mockProjects.map((project) => (
              <div key={project.id} className="p-8 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300",
                      isDark ? "bg-slate-800 text-slate-400 group-hover:bg-indigo-900/40 group-hover:text-indigo-400" : "bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                    )}>
                      <Briefcase size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{project.name}</h4>
                      <p className="text-sm opacity-50 font-medium">{project.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">{project.progress}%</span>
                    <div className={cn(
                      "w-28 h-2 rounded-full mt-2 overflow-hidden",
                      isDark ? "bg-slate-800" : "bg-slate-100"
                    )}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-indigo-500 rounded-full" 
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {project.team.map((empId, i) => (
                      <div key={empId} className={cn(
                        "w-9 h-9 rounded-full border-2 overflow-hidden ring-4 ring-transparent group-hover:ring-indigo-500/10 transition-all",
                        isDark ? "border-slate-800 bg-slate-700" : "border-white bg-slate-200"
                      )}>
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${empId}`} 
                          alt="Team Member" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold opacity-40">
                    <Clock size={14} />
                    <span>Updated 2h ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Tasks */}
        <div className={cn(
          "rounded-3xl border overflow-hidden transition-all",
          isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
        )}>
          <div className="p-8 border-b border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
            <h3 className="text-display-sm font-bold">Priority Tasks</h3>
            <button className="text-indigo-600 text-sm font-bold hover:text-indigo-700 transition-colors">View All</button>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {mockTasks.map((task) => (
              <div key={task.id} className="p-8 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    task.priority === 'high' 
                      ? (isDark ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-600") 
                      : (isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600")
                  )}>
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{task.title}</h4>
                    <p className="text-sm opacity-50 font-medium">Due {task.dueDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <span className={cn(
                    "px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest",
                    task.status === 'in-progress' 
                      ? (isDark ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600") 
                      : (isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-600")
                  )}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <button className="p-2 opacity-40 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
