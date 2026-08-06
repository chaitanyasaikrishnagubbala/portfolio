import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import ProjectModal from './ProjectModal';
import useApi from '../hooks/useApi';
import { getProjects } from '../services/api';
import { getProjectStyles } from '../utils/iconMapper';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Fetch dynamic projects from the Spring Boot API
  const { data: projects, loading } = useApi(getProjects, []);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Full Stack <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Production-ready web applications built with Spring Boot backend REST architecture, React UI, and MySQL databases.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
          </div>
        )}

        {/* Project Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            {projects?.map((project, idx) => {
              const { icon: Icon, color } = getProjectStyles(project.title);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="bg-glass-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
                >
                  {/* Subtle Ambient Glow */}
                  <div className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                  <div className="space-y-6 relative z-10">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3.5 rounded-2xl bg-slate-900 border border-white/10 shadow-glow-blue group-hover:rotate-6 transition-transform`}>
                          <Icon className="text-2xl text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-xs font-mono text-slate-400">{project.subtitle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Technologies Used</span>
                      <div className="flex flex-wrap gap-2">
                        {project.stack?.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-lg bg-slate-900/90 border border-white/10 text-cyan-300 font-mono text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features Checklist */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Core Capabilities</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features?.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <FaCheckCircle className="text-blue-400 text-xs shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/50 text-xs font-semibold text-cyan-300 hover:text-white transition-all cursor-pointer"
                    >
                      View Details & Architecture
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 hover:border-white/30 text-white font-semibold text-xs flex items-center gap-2 transition-all hover:bg-slate-800 cursor-pointer"
                      >
                        <FaGithub className="text-sm" />
                        <span>GitHub</span>
                      </a>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs shadow-glow-blue flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        <span>Live Demo</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
