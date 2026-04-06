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

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, Ahsan. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Calendar size={16} />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
            <Filter size={16} />
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
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-xl text-white shadow-lg", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                stat.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revenue vs Expenses</h3>
              <p className="text-sm text-slate-500">Financial performance overview</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-xs text-slate-600 font-medium">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <span className="text-xs text-slate-600 font-medium">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#cbd5e1" 
                  strokeWidth={2}
                  fillOpacity={0} 
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Status Pie */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Project Health</h3>
          <p className="text-sm text-slate-500 mb-8">Current status distribution</p>
          <div className="h-[240px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-800">14</span>
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {projectStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Activity & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Active Projects</h3>
            <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {mockProjects.map((project) => (
              <div key={project.id} className="p-6 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{project.name}</h4>
                      <p className="text-xs text-slate-500">{project.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">{project.progress}%</span>
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.team.map((empId, i) => (
                      <div key={empId} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden ring-1 ring-slate-100">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${empId}`} 
                          alt="Team Member" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Clock size={14} />
                    <span>Updated 2h ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Tasks */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Priority Tasks</h3>
            <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {mockTasks.map((task) => (
              <div key={task.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    task.priority === 'high' ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
                  )}>
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{task.title}</h4>
                    <p className="text-xs text-slate-500">Due {task.dueDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                    task.status === 'in-progress' ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-600"
                  )}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                    <MoreHorizontal size={18} />
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
