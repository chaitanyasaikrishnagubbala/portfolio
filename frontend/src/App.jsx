import React from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import BackgroundCanvas from './components/BackgroundCanvas';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-[#0B1120] text-slate-100 selection:bg-blue-500/30 selection:text-cyan-300">
      {/* Interactive Background Particle & Blob Canvas */}
      <BackgroundCanvas />

      {/* Smooth Cursor Follower */}
      <CustomCursor />

      {/* Fixed Sticky Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Education />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
