import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { login } from '../../services/authService';

const AdminLogin = () => {
  const [username, setUsername] = useState('chaitanya4123');
  const [password, setPassword] = useState('chaitanya@@gubb');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex items-center justify-center p-4 selection:bg-blue-500/30 selection:text-cyan-300 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-slate-950/80 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 shadow-glow-cyan mb-2">
            <FaShieldAlt className="text-3xl" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Portfolio <span className="text-gradient">Admin Panel</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Log in to manage your portfolio projects and dynamic data
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Admin Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FaUser className="text-sm" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Admin Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FaLock className="text-sm" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-glow-blue hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
            ) : (
              <>
                <span>Log In to Dashboard</span>
                <FaArrowRight className="text-xs" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-4 border-t border-white/10 text-center">
          <Link
            to="/"
            className="text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
          >
            ← Back to Public Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
