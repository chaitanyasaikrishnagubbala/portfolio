import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useApi from '../hooks/useApi';
import { getSkills } from '../services/api';
import { getSkillStyles } from '../utils/iconMapper';

const categories = [
  { id: 'all', label: 'All Skills' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'languages', label: 'Languages' },
  { id: 'database', label: 'Database' },
  { id: 'tools', label: 'Tools' },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Fetch dynamic skills from the Spring Boot API
  const { data: skills, loading } = useApi(getSkills, []);

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills?.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Comprehensive toolkit spanning Java backend engineering, modern React frontend development, and core tools & databases.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-glow-blue scale-105 border border-blue-400/30'
                    : 'bg-slate-900/70 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
          </div>
        )}

        {/* Animated Skill Cards Grid */}
        {!loading && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 text-left"
          >
            <AnimatePresence>
              {filteredSkills?.map((skill) => {
                const { icon: Icon, color } = getSkillStyles(skill.name);
                return (
                  <motion.div
                    layout
                    key={skill.id || skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="bg-glass-card rounded-2xl p-5 border border-white/10 hover:border-blue-500/50 transition-all duration-300 group flex flex-col justify-between shadow-md"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 group-hover:scale-110 transition-transform">
                          <Icon className={`text-2xl ${color}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                            {skill.name}
                          </h3>
                          <span className="text-[10px] font-mono text-slate-400 capitalize">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
