import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { FaGithub, FaExternalLinkAlt, FaCheckCircle, FaServer, FaLayerGroup } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-[#0B1120] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 text-left my-8"
        >
          {/* Header Bar */}
          <div className="p-6 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-cyan-400">
                  <FaLayerGroup />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">{project.title}</h3>
                <span className="text-xs font-mono text-cyan-400">{project.subtitle}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.longDescription || project.description}
            </p>

            {/* Stack Pill Badges */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Tech Stack & Architecture</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-900 border border-blue-500/30 text-cyan-300 text-xs font-mono font-medium flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features List */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Key Features & Modules</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                    <FaCheckCircle className="text-cyan-400 text-sm shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend Endpoints & Database Architecture */}
            {project.architecture && project.architecture.length > 0 && (
              <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-purple-500/30 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2 text-purple-400 font-bold border-b border-white/10 pb-2">
                  <FaServer />
                  <span>REST API Controller & Database Schema</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-400">
                  {project.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-400">►</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 bg-slate-900/90 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-800 border border-white/10 text-white font-semibold text-xs hover:bg-slate-700 flex items-center gap-2 transition-all cursor-pointer"
            >
              <FaGithub className="text-base" />
              <span>View Source Code</span>
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs shadow-glow-blue flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <FaExternalLinkAlt className="text-xs" />
              <span>Live Application Preview</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
