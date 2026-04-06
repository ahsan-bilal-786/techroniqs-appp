import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Briefcase, 
  Calendar, 
  MoreHorizontal,
  PieChart as PieChartIcon,
  CreditCard,
  Wallet,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { mockFinance, mockProjects } from '../data/mock';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const categoryData = [
  { name: 'Project Income', value: 45000 },
  { name: 'Salaries', value: 25000 },
  { name: 'Infrastructure', value: 8000 },
  { name: 'Marketing', value: 5000 },
  { name: 'Office Rent', value: 12000 },
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Finance</h1>
          <p className="text-slate-500 mt-1">Track revenue, expenses, and project profitability.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} />
            <span>Export Report</span>
          </button>
          <Link 
            to="/finance/new"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus size={18} />
            <span>Add Transaction</span>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Wallet size={24} />
            </div>
            <p className="text-sm font-medium text-slate-500">Total Balance</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">$124,500.00</h3>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-4 bg-emerald-50 w-fit px-2 py-1 rounded-full">
              <ArrowUpRight size={12} />
              <span>+12.5% from last month</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl group-hover:bg-indigo-100/50 transition-colors"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={24} />
            </div>
            <p className="text-sm font-medium text-slate-500">Monthly Revenue</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">$45,200.00</h3>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-4 bg-emerald-50 w-fit px-2 py-1 rounded-full">
              <ArrowUpRight size={12} />
              <span>+8.2% from last month</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-emerald-50/50 rounded-full blur-3xl group-hover:bg-emerald-100/50 transition-colors"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingDown size={24} />
            </div>
            <p className="text-sm font-medium text-slate-500">Monthly Expenses</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">$18,400.00</h3>
            <div className="flex items-center gap-1 text-xs font-bold text-rose-600 mt-4 bg-rose-50 w-fit px-2 py-1 rounded-full">
              <ArrowDownRight size={12} />
              <span>+4.1% from last month</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-rose-50/50 rounded-full blur-3xl group-hover:bg-rose-100/50 transition-colors"></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('overview')}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
            activeTab === 'overview' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Insights
        </button>
        <button 
          onClick={() => setActiveTab('transactions')}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
            activeTab === 'transactions' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Transactions
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Expense Distribution */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Expense Distribution</h3>
                  <p className="text-sm text-slate-500">Breakdown by category</p>
                </div>
                <PieChartIcon className="text-slate-400" size={20} />
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {categoryData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm font-medium text-slate-600">{item.name}</span>
                    <span className="text-sm font-bold text-slate-900 ml-auto">${(item.value / 1000).toFixed(1)}k</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Profitability */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Project Profitability</h3>
                  <p className="text-sm text-slate-500">Revenue vs Budget Utilization</p>
                </div>
                <TrendingUp className="text-slate-400" size={20} />
              </div>
              <div className="space-y-6">
                {mockProjects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-indigo-500" />
                        <span className="text-sm font-bold text-slate-800">{project.name}</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-600">+$15,000</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500" 
                        style={{ width: `${(project.spent! / project.budget!) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Spent: ${project.spent?.toLocaleString()}</span>
                      <span>Budget: ${project.budget?.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="transactions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search transactions..." 
                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <button className="p-2 text-slate-500 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-200">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {mockFinance.map((record) => (
                <div key={record.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm",
                      record.type === 'income' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                      {record.type === 'income' ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{record.category}</h4>
                      <p className="text-xs text-slate-500">{record.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Date</p>
                      <p className="text-sm font-bold text-slate-800">{new Date(record.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Amount</p>
                      <p className={cn(
                        "text-lg font-bold",
                        record.type === 'income' ? "text-emerald-600" : "text-rose-600"
                      )}>
                        {record.type === 'income' ? '+' : '-'}${record.amount.toLocaleString()}
                      </p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
