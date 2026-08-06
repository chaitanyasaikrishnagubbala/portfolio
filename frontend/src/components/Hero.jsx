import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCodeBranch, FaFileDownload, FaArrowRight, FaTerminal } from 'react-icons/fa';
import { SiLeetcode, SiCodechef, SiSpringboot, SiReact, SiMysql } from 'react-icons/si';

const roles = [
  'Full Stack Java Developer',
  'Spring Boot REST API Specialist',
  'React Frontend Architect',
  '300+ DSA Problems Solved',
  'Backend System Builder'
];

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const targetRole = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(targetRole.substring(0, currentText.length + 1));
        setTypingSpeed(90);

        if (currentText === targetRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentText(targetRole.substring(0, currentText.length - 1));
        setTypingSpeed(45);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text Content & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-glow-cyan">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-mono text-cyan-300 tracking-wide uppercase">
              Available for Full-Time & Internship Roles
            </span>
          </div>

          {/* Main Headings */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-mono text-purple-400 font-semibold tracking-wide">
              Hello, I'm
            </h2>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Gubbala Chaitanya <br className="hidden sm:inline" />
              <span className="text-gradient">Sai Krishna</span>
            </h1>
          </div>

          {/* Dynamic Typing Title */}
          <div className="h-12 flex items-center">
            <div className="flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-mono font-medium text-slate-300">
              <FaTerminal className="text-blue-400 text-lg sm:text-xl shrink-0" />
              <span className="text-cyan-300">{currentText}</span>
              <span className="w-2.5 h-6 bg-purple-400 animate-pulse inline-block rounded-sm" />
            </div>
          </div>

          {/* Subtext description */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed font-normal">
            Building scalable backend systems using <strong className="text-blue-400 font-semibold">Spring Boot</strong> and creating modern, high-performance web interfaces with <strong className="text-purple-400 font-semibold">React.js</strong>. CSE Student with 300+ DSA problems solved & robust database architecture skills.
          </p>

          {/* Action CTA Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow-glow-blue hover:shadow-glow-purple transition-all duration-300 flex items-center gap-2 hover:scale-[1.03] cursor-pointer"
            >
              <span>View Projects</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-purple-500/50 text-slate-200 hover:text-white font-semibold text-sm backdrop-blur-md hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 hover:scale-[1.03] cursor-pointer"
            >
              <FaFileDownload className="text-purple-400" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-semibold text-sm hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 flex items-center gap-2 hover:scale-[1.03] cursor-pointer"
            >
              <span>Contact Me</span>
            </button>
          </div>

          {/* Quick Social & Competitive Links */}
          <div className="pt-6 flex items-center gap-4 text-slate-400 border-t border-white/10">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Connect:</span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-blue-400 hover:border-blue-500 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                className="p-2.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-500 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <SiLeetcode className="w-5 h-5" />
              </a>
              <a
                href="https://codechef.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CodeChef Profile"
                className="p-2.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-orange-400 hover:border-orange-500 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <SiCodechef className="w-5 h-5" />
              </a>
              <a
                href="mailto:chaitanya.gubbala@example.com"
                aria-label="Email Contact"
                className="p-2.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Hero Visual Card / Tech Stack Floating Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          {/* Glass Code Editor Mockup Card */}
          <div className="w-full max-w-md bg-slate-950/80 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500">
            {/* Top Window Dots */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400">DeveloperProfile.java</span>
            </div>

            {/* Code Snippet */}
            <pre className="font-mono text-xs text-left leading-relaxed overflow-x-auto text-slate-300">
              <code>
                <span className="text-purple-400">@RestController</span>{'\n'}
                <span className="text-purple-400">@RequestMapping</span>(<span className="text-green-400">"/api/v1/developer"</span>){'\n'}
                <span className="text-blue-400">public class</span> <span className="text-yellow-300">ChaitanyaController</span> &#123;{'\n'}
                {'  '}<span className="text-purple-400">@GetMapping</span>(<span className="text-green-400">"/stats"</span>){'\n'}
                {'  '}<span className="text-blue-400">public</span> DeveloperStats <span className="text-cyan-300">getStats</span>() &#123;{'\n'}
                {'    '}<span className="text-blue-400">return new</span> DeveloperStats({'\n'}
                {'      '}<span className="text-orange-400">"Gubbala Chaitanya Sai Krishna"</span>,{'\n'}
                {'      '}<span className="text-orange-400">"9.16 CGPA (B.Tech CSE)"</span>,{'\n'}
                {'      '}<span className="text-orange-400">"300+ DSA Problems Solved"</span>,{'\n'}
                {'      '}List.of(<span className="text-green-400">"Spring Boot"</span>, <span className="text-green-400">"React"</span>, <span className="text-green-400">"MySQL"</span>){'\n'}
                {'    '});{'\n'}
                {'  '}&#125;{'\n'}
                &#125;
              </code>
            </pre>

            {/* Floating Tech Badges */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-around">
              <div className="flex flex-col items-center gap-1">
                <SiSpringboot className="text-2xl text-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400">Spring Boot</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <SiReact className="text-2xl text-cyan-400 animate-spin-slow" />
                <span className="text-[10px] font-mono text-slate-400">React.js</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <SiMysql className="text-2xl text-blue-400" />
                <span className="text-[10px] font-mono text-slate-400">MySQL</span>
              </div>
            </div>
          </div>

          {/* Floating Metric Badges */}
          <div className="absolute -bottom-6 -left-4 sm:left-2 bg-slate-900/90 border border-blue-500/30 px-4 py-2.5 rounded-xl shadow-glow-blue backdrop-blur-md flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 font-bold font-mono text-lg">
              9.16
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">CGPA Score</p>
              <p className="text-[10px] text-slate-400">LBRCE College</p>
            </div>
          </div>

          <div className="absolute -top-6 -right-2 sm:right-2 bg-slate-900/90 border border-purple-500/30 px-4 py-2.5 rounded-xl shadow-glow-purple backdrop-blur-md flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 font-bold font-mono text-lg">
              300+
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">DSA Solved</p>
              <p className="text-[10px] text-slate-400">LeetCode & CP</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
