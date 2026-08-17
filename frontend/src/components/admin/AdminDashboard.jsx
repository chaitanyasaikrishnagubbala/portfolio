import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFolderOpen, FaGraduationCap, FaTools, FaCertificate, FaTrophy,
  FaBriefcase, FaUserCheck, FaPlus, FaEdit, FaTrash, FaSignOutAlt,
  FaTimes, FaSave, FaExternalLinkAlt, FaGithub, FaCheckCircle, FaSearch
} from 'react-icons/fa';
import { isAuthenticated, logout, getCurrentUser } from '../../services/authService';
import {
  getProjects, getEducation, getSkills, getCertifications,
  getAchievements, getExperience, getAboutMe
} from '../../services/profileService';
import {
  createProject, updateProject, deleteProject,
  createEducation, updateEducation, deleteEducation,
  createSkill, updateSkill, deleteSkill,
  createCertification, updateCertification, deleteCertification,
  createAchievement, updateAchievement, deleteAchievement,
  createExperience, updateExperience, deleteExperience,
  updateAboutMe
} from '../../services/adminService';

const tabs = [
  { id: 'projects', label: 'Projects', icon: FaFolderOpen },
  { id: 'education', label: 'Education', icon: FaGraduationCap },
  { id: 'skills', label: 'Skills', icon: FaTools },
  { id: 'certifications', label: 'Certifications', icon: FaCertificate },
  { id: 'achievements', label: 'Achievements', icon: FaTrophy },
  { id: 'experience', label: 'Experience', icon: FaBriefcase },
  { id: 'about', label: 'About Me', icon: FaUserCheck },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState({
    projects: [],
    education: [],
    skills: [],
    certifications: [],
    achievements: [],
    experience: [],
    about: null,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadAllData();
  }, [navigate]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    const [pRes, eRes, sRes, cRes, aRes, expRes, abRes] = await Promise.all([
      getProjects(), getEducation(), getSkills(), getCertifications(),
      getAchievements(), getExperience(), getAboutMe()
    ]);

    setData({
      projects: pRes.data || [],
      education: eRes.data || [],
      skills: sRes.data || [],
      certifications: cRes.data || [],
      achievements: aRes.data || [],
      experience: expRes.data || [],
      about: abRes.data || null,
    });
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Open modal for Create / Edit
  const openModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      // Map item array fields to string for forms
      const formatted = { ...item };
      if (Array.isArray(formatted.stack)) formatted.techStack = formatted.stack.join('|');
      if (Array.isArray(formatted.features)) formatted.features = formatted.features.join('|');
      if (Array.isArray(formatted.architecture)) formatted.architecture = formatted.architecture.join('|');
      if (Array.isArray(formatted.highlights)) formatted.highlights = formatted.highlights.join('|');
      setFormData(formatted);
    } else {
      setFormData(getDefaultFormData(activeTab));
    }
    setIsModalOpen(true);
  };

  const getDefaultFormData = (tab) => {
    switch (tab) {
      case 'projects':
        return { title: '', subtitle: '', description: '', longDescription: '', techStack: '', features: '', architecture: '', githubUrl: '', demoUrl: '', imageUrl: '', status: 'Completed', sortOrder: 1 };
      case 'education':
        return { degree: '', institution: '', location: '', duration: '', scoreLabel: 'CGPA', score: '', highlight: '', description: '', sortOrder: 1 };
      case 'skills':
        return { name: '', category: 'backend', level: 85, description: '', sortOrder: 1 };
      case 'certifications':
        return { title: '', issuer: '', date: '', credentialUrl: '', sortOrder: 1 };
      case 'achievements':
        return { title: '', category: '', description: '', year: new Date().getFullYear().toString(), highlights: '', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10', sortOrder: 1 };
      case 'experience':
        return { title: '', type: '', details: '', color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/40', sortOrder: 1 };
      case 'about':
        return data.about || { fullName: 'Gubbala Chaitanya Sai Krishna', title: 'Full Stack Java Engineer', bio: '', dsaSolved: '300+', cgpa: '9.16 / 10.0', collegeName: 'LBRCE', degreeName: 'B.Tech CSE', email: '', githubUrl: '', linkedinUrl: '', leetcodeUrl: '', codechefUrl: '' };
      default:
        return {};
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    let res;
    switch (activeTab) {
      case 'projects': res = await deleteProject(id); break;
      case 'education': res = await deleteEducation(id); break;
      case 'skills': res = await deleteSkill(id); break;
      case 'certifications': res = await deleteCertification(id); break;
      case 'achievements': res = await deleteAchievement(id); break;
      case 'experience': res = await deleteExperience(id); break;
      default: return;
    }

    if (res.success) {
      showToast('Item deleted successfully');
      loadAllData();
    } else {
      showToast(res.error || 'Failed to delete item', 'error');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let res;

    if (activeTab === 'about') {
      res = await updateAboutMe(formData);
    } else if (editingItem) {
      switch (activeTab) {
        case 'projects': res = await updateProject(editingItem.id, formData); break;
        case 'education': res = await updateEducation(editingItem.id, formData); break;
        case 'skills': res = await updateSkill(editingItem.id, formData); break;
        case 'certifications': res = await updateCertification(editingItem.id, formData); break;
        case 'achievements': res = await updateAchievement(editingItem.id, formData); break;
        case 'experience': res = await updateExperience(editingItem.id, formData); break;
        default: return;
      }
    } else {
      switch (activeTab) {
        case 'projects': res = await createProject(formData); break;
        case 'education': res = await createEducation(formData); break;
        case 'skills': res = await createSkill(formData); break;
        case 'certifications': res = await createCertification(formData); break;
        case 'achievements': res = await createAchievement(formData); break;
        case 'experience': res = await createExperience(formData); break;
        default: return;
      }
    }

    if (res.success) {
      showToast(res.message || 'Saved successfully');
      setIsModalOpen(false);
      loadAllData();
    } else {
      showToast(res.error || 'Operation failed', 'error');
    }
  };

  const currentList = Array.isArray(data[activeTab]) ? data[activeTab] : [];
  const filteredList = currentList.filter(item => {
    const search = searchTerm.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(search)) ||
      (item.name && item.name.toLowerCase().includes(search)) ||
      (item.degree && item.degree.toLowerCase().includes(search)) ||
      (item.institution && item.institution.toLowerCase().includes(search))
    );
  });

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col selection:bg-blue-500/30 selection:text-cyan-300">
      
      {/* Toast Alert */}
      {toast.message && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl border shadow-2xl backdrop-blur-lg flex items-center gap-3 text-sm font-semibold transition-all ${
          toast.type === 'error' ? 'bg-red-500/20 border-red-500/40 text-red-300' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
        }`}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 border-b border-white/10 backdrop-blur-xl px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-glow-blue">
            A
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Admin Dashboard</h1>
            <p className="text-xs text-cyan-400 font-mono">Portfolio Data Management System</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors items-center gap-2"
          >
            <FaExternalLinkAlt className="text-xs" />
            <span>View Public Site</span>
          </a>

          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-white">{user?.username || 'Admin'}</span>
            <span className="text-[10px] text-slate-400 font-mono">{user?.role || 'ADMIN'}</span>
          </div>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Dashboard Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-slate-950/60 border border-white/10 rounded-2xl p-3 flex md:flex-col gap-1.5 overflow-x-auto shrink-0 shadow-xl">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
                className={`w-full px-4 py-3 rounded-xl text-left font-medium text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-glow-blue font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                }`}
              >
                <Icon className={`text-base ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {Array.isArray(data[tab.id]) && (
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-slate-900 border border-white/10 text-[10px] font-mono text-slate-300">
                    {data[tab.id].length}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-glass-card rounded-2xl p-5 sm:p-8 border border-white/10 flex flex-col shadow-xl">
          
          {/* Section Header & Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white capitalize">
                Manage {activeTab}
              </h2>
              <p className="text-xs text-slate-400">
                {activeTab === 'about' ? 'Update personal bio and summary details' : `Add, edit, or remove portfolio ${activeTab} items`}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {activeTab !== 'about' && (
                <>
                  <div className="relative flex-1 sm:w-48">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                    <input
                      type="text"
                      placeholder="Filter items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    onClick={() => openModal(null)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs flex items-center gap-2 shadow-glow-blue hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <FaPlus />
                    <span>Add {activeTab.slice(0, -1)}</span>
                  </button>
                </>
              )}

              {activeTab === 'about' && (
                <button
                  onClick={() => openModal(data.about)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs flex items-center gap-2 shadow-glow-blue hover:scale-105 transition-all cursor-pointer"
                >
                  <FaEdit />
                  <span>Edit About Me Info</span>
                </button>
              )}
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400" />
            </div>
          )}

          {/* Tab Content Display */}
          {!loading && (
            <div className="pt-6">
              
              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div className="grid grid-cols-1 gap-4">
                  {filteredList.map((project) => (
                    <div key={project.id} className="bg-slate-950/80 border border-white/10 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-bold text-white text-base">{project.title}</h3>
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono">
                            {project.status || 'Completed'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.stack?.map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-slate-900 border border-white/10 rounded text-[10px] font-mono text-cyan-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button onClick={() => openModal(project)} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                          <FaEdit /> <span>Edit</span>
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                          <FaTrash /> <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredList.length === 0 && <p className="text-slate-500 text-center py-8 text-sm font-mono">No project records found.</p>}
                </div>
              )}

              {/* EDUCATION TAB */}
              {activeTab === 'education' && (
                <div className="grid grid-cols-1 gap-4">
                  {filteredList.map((edu) => (
                    <div key={edu.id} className="bg-slate-950/80 border border-white/10 rounded-xl p-5 flex items-center justify-between gap-4 text-left">
                      <div className="space-y-1">
                        <h3 className="font-bold text-white text-base">{edu.degree}</h3>
                        <p className="text-xs text-cyan-400">{edu.institution} ({edu.duration})</p>
                        <p className="text-xs text-slate-400">{edu.scoreLabel}: <strong className="text-white">{edu.score}</strong></p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => openModal(edu)} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold flex items-center gap-1 cursor-pointer">
                          <FaEdit /> Edit
                        </button>
                        <button onClick={() => handleDelete(edu.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-1 cursor-pointer">
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredList.length === 0 && <p className="text-slate-500 text-center py-8 text-sm font-mono">No education records found.</p>}
                </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'skills' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                  {filteredList.map((skill) => (
                    <div key={skill.id} className="bg-slate-950/80 border border-white/10 rounded-xl p-4 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white text-sm">{skill.name}</h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-cyan-300 capitalize">{skill.category}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{skill.description}</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                        <button onClick={() => openModal(skill)} className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs cursor-pointer"><FaEdit /></button>
                        <button onClick={() => handleDelete(skill.id)} className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs cursor-pointer"><FaTrash /></button>
                      </div>
                    </div>
                  ))}
                  {filteredList.length === 0 && <p className="text-slate-500 text-center py-8 text-sm font-mono col-span-full">No skill records found.</p>}
                </div>
              )}

              {/* CERTIFICATIONS TAB */}
              {activeTab === 'certifications' && (
                <div className="grid grid-cols-1 gap-4 text-left">
                  {filteredList.map((cert) => (
                    <div key={cert.id} className="bg-slate-950/80 border border-white/10 rounded-xl p-5 flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-white text-base">{cert.title}</h3>
                        <p className="text-xs text-slate-400">Issuer: {cert.issuer} | Year: {cert.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openModal(cert)} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold cursor-pointer"><FaEdit /> Edit</button>
                        <button onClick={() => handleDelete(cert.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold cursor-pointer"><FaTrash /> Delete</button>
                      </div>
                    </div>
                  ))}
                  {filteredList.length === 0 && <p className="text-slate-500 text-center py-8 text-sm font-mono">No certification records found.</p>}
                </div>
              )}

              {/* ACHIEVEMENTS TAB */}
              {activeTab === 'achievements' && (
                <div className="grid grid-cols-1 gap-4 text-left">
                  {filteredList.map((ach) => (
                    <div key={ach.id} className="bg-slate-950/80 border border-white/10 rounded-xl p-5 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{ach.title}</h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-amber-500/30">{ach.year}</span>
                        </div>
                        <p className="text-xs text-slate-400">{ach.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => openModal(ach)} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold cursor-pointer"><FaEdit /> Edit</button>
                        <button onClick={() => handleDelete(ach.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold cursor-pointer"><FaTrash /> Delete</button>
                      </div>
                    </div>
                  ))}
                  {filteredList.length === 0 && <p className="text-slate-500 text-center py-8 text-sm font-mono">No achievement records found.</p>}
                </div>
              )}

              {/* EXPERIENCE TAB */}
              {activeTab === 'experience' && (
                <div className="grid grid-cols-1 gap-4 text-left">
                  {filteredList.map((exp) => (
                    <div key={exp.id} className="bg-slate-950/80 border border-white/10 rounded-xl p-5 flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-white text-base">{exp.title}</h3>
                        <p className="text-xs text-cyan-400">{exp.type}</p>
                        <p className="text-xs text-slate-400 mt-1">{exp.details}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => openModal(exp)} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold cursor-pointer"><FaEdit /> Edit</button>
                        <button onClick={() => handleDelete(exp.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold cursor-pointer"><FaTrash /> Delete</button>
                      </div>
                    </div>
                  ))}
                  {filteredList.length === 0 && <p className="text-slate-500 text-center py-8 text-sm font-mono">No experience records found.</p>}
                </div>
              )}

              {/* ABOUT ME TAB */}
              {activeTab === 'about' && data.about && (
                <div className="bg-slate-950/80 border border-white/10 rounded-xl p-6 text-left space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Full Name</span>
                      <p className="text-sm font-bold text-white">{data.about.fullName}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Professional Title</span>
                      <p className="text-sm font-bold text-cyan-300">{data.about.title}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Academic CGPA</span>
                      <p className="text-sm font-bold text-white">{data.about.cgpa}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">DSA Solved Count</span>
                      <p className="text-sm font-bold text-amber-400">{data.about.dsaSolved}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Bio Overview</span>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">{data.about.bio}</p>
                  </div>
                </div>
              )}

            </div>
          )}

        </main>
      </div>

      {/* CREATE / EDIT MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 my-8 text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-extrabold text-white capitalize">
                {editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              
              {/* FORM FIELDS ACCORDING TO TAB */}
              {activeTab === 'projects' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Project Title *</label>
                      <input type="text" required value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:border-cyan-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Subtitle / Category</label>
                      <input type="text" value={formData.subtitle || ''} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:border-cyan-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Short Description *</label>
                    <textarea required rows={2} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:border-cyan-400" />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Long Description</label>
                    <textarea rows={3} value={formData.longDescription || ''} onChange={e => setFormData({ ...formData, longDescription: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:border-cyan-400" />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Technologies Used (Pipe '|' separated)</label>
                    <input type="text" placeholder="Java|Spring Boot|React|MySQL" value={formData.techStack || ''} onChange={e => setFormData({ ...formData, techStack: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:border-cyan-400" />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Features (Pipe '|' separated)</label>
                    <input type="text" placeholder="JWT Auth|Interactive Grid|REST API" value={formData.features || ''} onChange={e => setFormData({ ...formData, features: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:border-cyan-400" />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Architecture Notes (Pipe '|' separated)</label>
                    <input type="text" placeholder="POST /api/auth|GET /api/movies" value={formData.architecture || ''} onChange={e => setFormData({ ...formData, architecture: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:border-cyan-400" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">GitHub URL</label>
                      <input type="url" value={formData.githubUrl || ''} onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:border-cyan-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Live / Demo URL</label>
                      <input type="url" value={formData.demoUrl || ''} onChange={e => setFormData({ ...formData, demoUrl: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:border-cyan-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Project Poster / Image URL</label>
                      <input type="text" placeholder="https://..." value={formData.imageUrl || ''} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:border-cyan-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Status</label>
                      <select value={formData.status || 'Completed'} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:border-cyan-400">
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Production">Production</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'education' && (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Degree Title *</label>
                    <input type="text" required value={formData.degree || ''} onChange={e => setFormData({ ...formData, degree: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Institution *</label>
                    <input type="text" required value={formData.institution || ''} onChange={e => setFormData({ ...formData, institution: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Duration</label>
                      <input type="text" placeholder="2022 - 2026" value={formData.duration || ''} onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Score (CGPA / %)</label>
                      <input type="text" placeholder="9.16 / 10.0" value={formData.score || ''} onChange={e => setFormData({ ...formData, score: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'skills' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Skill Name *</label>
                      <input type="text" required value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
                      <select value={formData.category || 'backend'} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white">
                        <option value="backend">Backend</option>
                        <option value="frontend">Frontend</option>
                        <option value="languages">Languages</option>
                        <option value="database">Database</option>
                        <option value="tools">Tools</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Description</label>
                    <textarea rows={2} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                  </div>
                </>
              )}

              {activeTab === 'certifications' && (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Certification Title *</label>
                    <input type="text" required value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Issuer</label>
                      <input type="text" value={formData.issuer || ''} onChange={e => setFormData({ ...formData, issuer: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Year / Date</label>
                      <input type="text" value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'achievements' && (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Achievement Title *</label>
                    <input type="text" required value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Description</label>
                    <textarea rows={2} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Bullet Highlights (Pipe '|' separated)</label>
                    <input type="text" placeholder="Top percentile|Optimized DP" value={formData.highlights || ''} onChange={e => setFormData({ ...formData, highlights: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                  </div>
                </>
              )}

              {activeTab === 'experience' && (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Role Title *</label>
                    <input type="text" required value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Type / Category</label>
                    <input type="text" value={formData.type || ''} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Details (Pipe '|' separated)</label>
                    <input type="text" value={formData.details || ''} onChange={e => setFormData({ ...formData, details: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                  </div>
                </>
              )}

              {activeTab === 'about' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
                      <input type="text" value={formData.fullName || ''} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Professional Title</label>
                      <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">CGPA</label>
                      <input type="text" value={formData.cgpa || ''} onChange={e => setFormData({ ...formData, cgpa: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">DSA Solved Count</label>
                      <input type="text" value={formData.dsaSolved || ''} onChange={e => setFormData({ ...formData, dsaSolved: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Bio</label>
                    <textarea rows={3} value={formData.bio || ''} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white" />
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold shadow-glow-blue flex items-center gap-2 cursor-pointer">
                  <FaSave /> <span>Save Changes</span>
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
