import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronUp, FaHeart } from 'react-icons/fa';
import { SiLeetcode, SiCodechef, SiSpringboot, SiReact } from 'react-icons/si';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0B1120]/90 backdrop-blur-md pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10 text-center md:text-left">
          
          {/* Brand Info */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Gubbala Chaitanya Sai Krishna
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Full Stack Java Developer • Spring Boot & React Specialist
            </p>
          </div>

          {/* Social Links Bar */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-blue-500 transition-all cursor-pointer"
              aria-label="GitHub"
            >
              <FaGithub className="text-lg" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-blue-400 hover:border-blue-500 transition-all cursor-pointer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-500 transition-all cursor-pointer"
              aria-label="LeetCode"
            >
              <SiLeetcode className="text-lg" />
            </a>
            <a
              href="https://codechef.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-orange-400 hover:border-orange-500 transition-all cursor-pointer"
              aria-label="CodeChef"
            >
              <SiCodechef className="text-lg" />
            </a>
            <a
              href="mailto:chaitanya.gubbala@example.com"
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500 transition-all cursor-pointer"
              aria-label="Email"
            >
              <FaEnvelope className="text-lg" />
            </a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/50 text-cyan-400 hover:bg-slate-800 transition-all flex items-center gap-2 text-xs font-mono cursor-pointer"
          >
            <span>Back to Top</span>
            <FaChevronUp />
          </button>
        </div>

        {/* Bottom Copyright & Tech Stack Mention */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <span>Made with</span>
            <FaHeart className="text-red-500 animate-pulse text-xs" />
            <span>using</span>
            <span className="text-cyan-400 font-semibold flex items-center gap-1">
              <SiReact className="text-xs" /> React
            </span>
            <span>+</span>
            <span className="text-green-400 font-semibold flex items-center gap-1">
              <SiSpringboot className="text-xs" /> Spring Boot
            </span>
          </div>

          <div className="font-mono text-slate-500 flex items-center gap-3">
            <span>© 2026 Gubbala Chaitanya Sai Krishna. All rights reserved.</span>
            <span>•</span>
            <a href="/admin/login" className="hover:text-cyan-400 transition-colors underline decoration-dashed">Admin Login</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
