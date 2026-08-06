import {
  SiPython, SiJavascript, SiMysql, SiReact, SiTailwindcss,
  SiSpringboot, SiPostman, SiApachemaven, SiIntellijidea
} from 'react-icons/si';
import {
  FaDatabase, FaServer, FaCogs, FaProjectDiagram, FaLayerGroup,
  FaNetworkWired, FaMemory, FaJava, FaHtml5, FaCss3Alt,
  FaGitAlt, FaGithub, FaCode, FaFilm, FaGraduationCap,
  FaSchool, FaUniversity, FaLaptopCode, FaCheckCircle
} from 'react-icons/fa';

/**
 * Maps dynamic string names to React Icons and Tailwind color classes.
 * This preserves the rich UI styling when data is loaded from the backend API.
 */

export const getSkillStyles = (name) => {
  const map = {
    'Java': { icon: FaJava, color: 'text-red-500' },
    'Python': { icon: SiPython, color: 'text-yellow-400' },
    'JavaScript': { icon: SiJavascript, color: 'text-yellow-300' },
    'SQL': { icon: SiMysql, color: 'text-blue-400' },
    'React': { icon: SiReact, color: 'text-cyan-400' },
    'HTML': { icon: FaHtml5, color: 'text-orange-500' },
    'CSS': { icon: FaCss3Alt, color: 'text-blue-500' },
    'Tailwind CSS': { icon: SiTailwindcss, color: 'text-cyan-300' },
    'Spring Boot': { icon: SiSpringboot, color: 'text-green-500' },
    'Spring MVC': { icon: FaServer, color: 'text-green-400' },
    'REST APIs': { icon: FaProjectDiagram, color: 'text-purple-400' },
    'Hibernate': { icon: FaLayerGroup, color: 'text-amber-500' },
    'JPA': { icon: FaDatabase, color: 'text-indigo-400' },
    'JDBC': { icon: FaCogs, color: 'text-slate-300' },
    'MySQL': { icon: SiMysql, color: 'text-blue-500' },
    'Git': { icon: FaGitAlt, color: 'text-orange-600' },
    'GitHub': { icon: FaGithub, color: 'text-white' },
    'Postman': { icon: SiPostman, color: 'text-orange-500' },
    'Maven': { icon: SiApachemaven, color: 'text-red-400' },
    'VS Code': { icon: FaCode, color: 'text-blue-400' },
    'IntelliJ IDEA': { icon: SiIntellijidea, color: 'text-purple-500' },
    'Data Structures': { icon: FaLayerGroup, color: 'text-amber-400' },
    'Algorithms': { icon: FaCogs, color: 'text-purple-400' },
    'OOP': { icon: FaProjectDiagram, color: 'text-cyan-400' },
    'DBMS': { icon: FaDatabase, color: 'text-blue-400' },
    'Operating Systems': { icon: FaMemory, color: 'text-pink-400' },
    'Computer Networks': { icon: FaNetworkWired, color: 'text-teal-400' }
  };
  return map[name] || { icon: FaCheckCircle, color: 'text-cyan-400' };
};

export const getProjectStyles = (title) => {
  if (title.includes('Movie')) return { icon: FaFilm, color: 'from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/40' };
  if (title.includes('Student')) return { icon: FaGraduationCap, color: 'from-purple-500/20 to-cyan-500/20 text-purple-400 border-purple-500/40' };
  return { icon: FaCode, color: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/40' };
};

export const getEducationIcon = (degree) => {
  if (degree.includes('B.Tech') || degree.includes('Bachelor')) return FaUniversity;
  if (degree.includes('Intermediate')) return FaGraduationCap;
  return FaSchool;
};

export const getExperienceStyles = (title) => {
  if (title.includes('Internship')) return { icon: FaLaptopCode, color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/40' };
  if (title.includes('Backend')) return { icon: FaServer, color: 'from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/40' };
  return { icon: FaLayerGroup, color: 'from-purple-500/20 to-cyan-500/20 text-purple-400 border-purple-500/40' };
};
