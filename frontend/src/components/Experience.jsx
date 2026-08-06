import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import useApi from '../hooks/useApi';
import { getExperience } from '../services/api';
import { getExperienceStyles } from '../utils/iconMapper';

const Experience = () => {
  // Fetch dynamic experience data from the Spring Boot API
  const { data: opportunityRoles, loading } = useApi(getExperience, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-green-500/30 text-green-400 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>CURRENTLY OPEN TO OPPORTUNITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Career <span className="text-gradient">Opportunities</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Actively seeking challenging engineering roles where I can contribute Java Spring Boot and React full-stack expertise.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-400"></div>
          </div>
        )}

        {/* Opportunity Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {opportunityRoles?.map((role, idx) => {
              const { icon: Icon, color } = getExperienceStyles(role.title);
              return (
                <motion.div
                  key={role.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="bg-glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${color} border border-white/10 group-hover:scale-110 transition-transform`}>
                        <Icon className="text-2xl" />
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
                        Active Target
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                        {role.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-1">{role.type}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {role.details?.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <FaCheck className="text-green-400 text-xs shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={scrollToContact}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:border-blue-500/40"
                    >
                      <span>Connect for this Role</span>
                      <FaArrowRight className="text-cyan-400 text-xs group-hover:translate-x-1 transition-transform" />
                    </button>
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

export default Experience;
