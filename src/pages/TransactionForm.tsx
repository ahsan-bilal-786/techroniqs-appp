import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Briefcase, 
  Tag,
  AlertCircle,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { mockProjects } from '../data/mock';

export default function TransactionForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    projectId: ''
  });

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Finance</span>
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg",
              formData.type === 'income' ? "bg-emerald-500 shadow-emerald-100" : "bg-rose-500 shadow-rose-100"
            )}>
              {formData.type === 'income' ? <TrendingUp size={28} /> : <TrendingDown size={28} />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Add {formData.type === 'income' ? 'Income' : 'Expense'}
              </h1>
              <p className="text-slate-500 text-sm">Record a new financial transaction for the organization.</p>
            </div>
          </div>
        </div>

        <form className="p-8 space-y-8">
          {/* Type Selection */}
          <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit">
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: 'expense'})}
              className={cn(
                "px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                formData.type === 'expense' ? "bg-white text-rose-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <TrendingDown size={16} />
              <span>Expense</span>
            </button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: 'income'})}
              className={cn(
                "px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                formData.type === 'income' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <TrendingUp size={16} />
              <span>Income</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <DollarSign size={16} className="text-slate-400" />
                <span>Amount ($)</span>
              </label>
              <input 
                type="number" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-bold text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                <span>Transaction Date</span>
              </label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Tag size={16} className="text-slate-400" />
                <span>Category</span>
              </label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none"
              >
                <option value="">Select Category</option>
                {formData.type === 'income' ? (
                  <>
                    <option value="Project Payment">Project Payment</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Investment">Investment</option>
                    <option value="Other Income">Other Income</option>
                  </>
                ) : (
                  <>
                    <option value="Salaries">Salaries</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Office Rent">Office Rent</option>
                    <option value="SaaS Subscription">SaaS Subscription</option>
                    <option value="Other Expense">Other Expense</option>
                  </>
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Briefcase size={16} className="text-slate-400" />
                <span>Project (Optional)</span>
              </label>
              <select 
                value={formData.projectId}
                onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none"
              >
                <option value="">No Project</option>
                {mockProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Description</label>
            <textarea 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Provide a brief description of the transaction..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none"
            ></textarea>
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
              className={cn(
                "flex items-center gap-2 px-10 py-3 text-white rounded-xl font-bold transition-all shadow-xl",
                formData.type === 'income' ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100" : "bg-rose-600 hover:bg-rose-700 shadow-rose-100"
              )}
            >
              <Save size={18} />
              <span>Record Transaction</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
