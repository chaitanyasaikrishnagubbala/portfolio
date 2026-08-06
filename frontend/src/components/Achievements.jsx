import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCode, FaCertificate, FaServer, FaBrain, FaMedal } from 'react-icons/fa';
import { SiLeetcode, SiCodechef, SiSpringboot } from 'react-icons/si';

const achievementTimeline = [
  {
    year: '2026',
    title: '300+ DSA Problems Solved',
    category: 'Algorithmic Problem Solving',
    icon: SiLeetcode,
    color: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
    description: 'Mastered Arrays, Strings, Trees, Graphs, Dynamic Programming, Two Pointers, and Binary Search algorithms on LeetCode & GeeksforGeeks.',
    highlights: ['Top percentile problem solver', 'Optimized Time & Space Complexities', 'Strong grasp of data structure trade-offs']
  },
  {
    year: '2025',
    title: 'CodeChef Badges & Competitive Programming',
    category: 'Competitive Coding',
    icon: SiCodechef,
    color: 'text-orange-400 border-orange-500/40 bg-orange-500/10',
    description: 'Consistently participated in rated coding contests on CodeChef, sharpening speed, accuracy, and edge-case analytical thinking under time pressure.',
    highlights: ['Earned platform contest badges', 'Consistent contest rating growth', 'Complex logic implementation under strict constraints']
  },
  {
    year: '2025',
    title: 'Strong Backend & REST API Architecture',
    category: 'Spring Boot Engineering',
    icon: SiSpringboot,
    color: 'text-green-400 border-green-500/40 bg-green-500/10',
    description: 'Architected multiple full-stack production systems using Java Spring Boot REST controllers, Spring Security, Hibernate ORM, and MySQL database engines.',
    highlights: ['RESTful Endpoint standardization', 'Database indexing & query tuning', 'Clean layered architecture (Controller, Service, Repository)']
  },
  {
    year: '2024 - Present',
    title: 'Full Stack Web System Projects',
    category: 'Full Stack Development',
    icon: FaCode,
    color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
    description: 'Engineered responsive web applications combining React.js frontend state management with robust Java Spring Boot micro-services.',
    highlights: ['Movie Ticket Booking System', 'Student Management Portal', 'Responsive Glassmorphism UI/UX']
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 text-xs font-mono">
            <span>MILESTONES & RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Key <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Track record of continuous problem-solving practice, competitive coding achievements, and backend engineering milestones.
          </p>
        </motion.div>

        {/* Vertical Animated Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500 transform -translate-x-1/2 opacity-40" />

          <div className="space-y-12">
            {achievementTimeline.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-glow-cyan z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  </div>

                  {/* Timeline Card */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 ${
                    isEven ? 'sm:pr-4 text-left' : 'sm:pl-4 text-left'
                  }`}>
                    <div className="bg-glass-card rounded-2xl p-6 border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xl group">
                      
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl border ${item.color}`}>
                            <Icon className="text-lg" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase">{item.category}</span>
                            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-cyan-400 shrink-0">
                          {item.year}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-1.5 pt-3 border-t border-white/10">
                        {item.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-400">
                            <FaMedal className="text-amber-400 text-xs shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Achievements;
