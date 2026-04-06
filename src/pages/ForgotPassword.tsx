import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Mail, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock send delay
    setTimeout(() => {
      if (email.includes('@')) {
        setIsSent(true);
        setIsLoading(false);
      } else {
        setError('Please enter a valid email address.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200 mb-6"
          >
            <Zap size={32} fill="currentColor" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Techroniqs ERP</h1>
        </div>

        {/* Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden"
        >
          <div className="p-8">
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900">Forgot password?</h2>
                    <p className="text-sm text-slate-500 mt-1">No worries, we'll send you reset instructions.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm"
                      >
                        <AlertCircle size={18} />
                        <p className="font-medium">{error}</p>
                      </motion.div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com" 
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Reset Password</span>
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Check your email</h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    We've sent a password reset link to <br />
                    <span className="font-bold text-slate-900">{email}</span>
                  </p>
                  
                  <button 
                    onClick={() => setIsSent(false)}
                    className="mt-8 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    Didn't receive the email? Click to resend
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-slate-50">
              <Link 
                to="/login" 
                className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to login</span>
              </Link>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-slate-400 text-xs mt-8">
          © 2026 Techroniqs Software Solutions. All rights reserved.
        </p>
      </div>
    </div>
  );
}
