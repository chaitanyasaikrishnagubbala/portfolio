import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCheckCircle, FaAward, FaCode, FaServer, FaBrain, FaJava } from 'react-icons/fa';
import { SiSpringboot, SiReact, SiMysql } from 'react-icons/si';

const keyHighlights = [
  {
    icon: FaBrain,
    title: '300+ DSA Problems Solved',
    desc: 'Deep understanding of Data Structures, Algorithms, and algorithmic optimization on LeetCode & CodeChef.',
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
  },
  {
    icon: FaServer,
    title: 'Spring Boot REST APIs',
    desc: 'Architecting robust, scalable backend services, Spring Data JPA, Hibernate, and clean controller architectures.',
    color: 'from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30'
  },
  {
    icon: FaCode,
    title: 'Modern Full Stack Web',
    desc: 'Combining React frontends with Spring Boot backends, delivering reactive state management & dynamic UI/UX.',
    color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30'
  },
  {
    icon: FaAward,
    title: 'Academic Excellence (9.16 CGPA)',
    desc: 'Consistent top ranker at Lakireddy Bali Reddy College of Engineering with strong CS fundamentals.',
    color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30'
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 text-purple-400 text-xs font-mono">
            <span>GET TO KNOW ME</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient">Chaitanya</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Computer Science Engineering student passionate about backend engineering, full-stack design, and problem solving.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Avatar & Quick Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            {/* Glowing Avatar Frame */}
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x" />
              
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-slate-900 border border-white/10 p-2 overflow-hidden flex items-center justify-center shadow-2xl">
                {/* Styled Vector Developer Avatar Placeholder */}
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] shadow-glow-purple">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-3xl font-extrabold text-white">
                      CS
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base">G. Chaitanya Sai Krishna</h3>
                  <p className="text-xs text-cyan-400 font-mono">Full Stack Java Engineer</p>
                  
                  {/* Tech Pill Row */}
                  <div className="flex gap-2 text-lg text-slate-300 pt-1">
                    <FaJava title="Java" className="hover:text-red-400 transition-colors" />
                    <SiSpringboot title="Spring Boot" className="hover:text-green-400 transition-colors" />
                    <SiReact title="React" className="hover:text-cyan-400 transition-colors" />
                    <SiMysql title="MySQL" className="hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Education Badge Card */}
            <div className="mt-8 w-full max-w-md bg-glass-card rounded-2xl p-5 border border-white/10 flex items-center gap-4 text-left shadow-lg">
              <div className="p-3.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <FaGraduationCap className="text-2xl" />
              </div>
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wide">Education</span>
                <h4 className="text-sm font-bold text-white leading-tight">
                  B.Tech Computer Science Engineering
                </h4>
                <p className="text-xs text-slate-400">Lakireddy Bali Reddy College of Engineering</p>
                <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold font-mono border border-blue-500/30">
                  <span>CGPA: 9.16 / 10.0</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Paragraph & Grid of Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="bg-glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Driven by problem solving & clean software architecture.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I am a Computer Science Engineering student passionate about Backend Development, Full Stack Development, Data Structures & Algorithms, and Software Engineering. I enjoy building production-ready applications using <strong className="text-blue-400">Java</strong>, <strong className="text-green-400">Spring Boot</strong>, <strong className="text-cyan-400">React</strong>, and <strong className="text-purple-400">MySQL</strong>.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Having solved over 300+ DSA problems across platforms like LeetCode and CodeChef, I continuously refine my skills in software architecture, RESTful API design, database normalization, and reactive user interfaces.
              </p>
            </div>

            {/* Achievement Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyHighlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className={`bg-glass-card rounded-xl p-4 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex items-start gap-3`}
                  >
                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${item.color} shrink-0`}>
                      <Icon className="text-lg" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-normal">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
