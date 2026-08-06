import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaPaperPlane, FaGithub, FaLinkedin, FaEnvelope, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill out all required fields.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const result = await submitContactForm(formData);
      setLoading(false);

      if (result.success) {
        setStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setStatus({ type: 'error', message: 'Failed to submit form. Please try again.' });
      }
    } catch (err) {
      setLoading(false);
      setStatus({ type: 'error', message: 'An unexpected error occurred.' });
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact <span className="text-gradient">Chaitanya</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have a job opportunity, project inquiry, or technical question? Send me a message below or connect via social media.
          </p>
        </motion.div>

        {/* Contact Form & Social Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left Column: Glassmorphism Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Connected to Spring Boot REST API Endpoint</p>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <FaPaperPlane className="text-lg" />
                </div>
              </div>

              {/* Status Alert Banner */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl mb-6 flex items-start gap-3 border text-xs sm:text-sm ${
                    status.type === 'success'
                      ? 'bg-green-500/10 border-green-500/40 text-green-300'
                      : 'bg-red-500/10 border-red-500/40 text-red-300'
                  }`}
                >
                  {status.type === 'success' ? (
                    <FaCheckCircle className="text-green-400 text-base shrink-0 mt-0.5" />
                  ) : (
                    <FaExclamationTriangle className="text-red-400 text-base shrink-0 mt-0.5" />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}

              {/* Form Controls */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineering Opportunity / Project Discussion"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message details here..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white font-bold text-sm shadow-glow-blue hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm" />
                      <span>Submit Form to REST API</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Social Links & Direct Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contact Card */}
            <div className="bg-glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white">Direct Connectivity</h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:chaitanya.gubbala@example.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/50 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Email Address</span>
                    <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      chaitanya.gubbala@example.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-white/10">
                  <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                    <FaGithub className="text-xl" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Location & Status</span>
                    <p className="text-sm font-semibold text-white">Andhra Pradesh, India • Open to Relocate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Coding Profiles */}
            <div className="bg-glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Professional Profiles</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-white/10 hover:border-blue-500/50 hover:bg-slate-800 transition-all text-white font-medium text-xs"
                >
                  <FaGithub className="text-lg text-white" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-white/10 hover:border-blue-500/50 hover:bg-slate-800 transition-all text-white font-medium text-xs"
                >
                  <FaLinkedin className="text-lg text-blue-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-500/50 hover:bg-slate-800 transition-all text-white font-medium text-xs"
                >
                  <SiLeetcode className="text-lg text-amber-400" />
                  <span>LeetCode</span>
                </a>

                <a
                  href="https://codechef.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-white/10 hover:border-orange-500/50 hover:bg-slate-800 transition-all text-white font-medium text-xs"
                >
                  <SiCodechef className="text-lg text-orange-400" />
                  <span>CodeChef</span>
                </a>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
