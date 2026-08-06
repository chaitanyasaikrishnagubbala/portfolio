import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaAward } from 'react-icons/fa';
import useApi from '../hooks/useApi';
import { getEducation } from '../services/api';
import { getEducationIcon } from '../utils/iconMapper';

const Education = () => {
  // Fetch dynamic education data from the Spring Boot API
  const { data: educationData, loading } = useApi(getEducation, []);

  return (
    <section id="education" className="py-24 relative z-10">
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
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Solid academic foundation in Computer Science Engineering, mathematics, and software development.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-400"></div>
          </div>
        )}

        {/* Education Timeline Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {educationData?.map((edu, idx) => {
              const Icon = getEducationIcon(edu.degree);
              return (
                <motion.div
                  key={edu.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="bg-glass-card rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
                >
                  {/* Subtle top indicator */}
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-t-2xl absolute top-0 left-0 right-0" />

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-purple-400 group-hover:scale-110 transition-transform">
                        <Icon className="text-2xl" />
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                        <FaCalendarAlt className="text-xs" />
                        <span>{edu.duration}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {edu.degree}
                      </h3>
                      <p className="text-xs font-medium text-slate-300 mt-1">{edu.institution}</p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <FaMapMarkerAlt className="text-slate-500" />
                        <span>{edu.location}</span>
                      </p>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>

                  {/* Bottom Score & Highlight */}
                  <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">{edu.scoreLabel}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold font-mono text-xs border border-blue-500/30">
                        {edu.score}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5 text-[11px] text-cyan-300 font-medium">
                      <FaAward className="text-amber-400 shrink-0 mt-0.5" />
                      <span>{edu.highlight}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default Education;
