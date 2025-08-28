// src/portfolio/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer'; // <-- added

import projects from './data/projects';
import { coreSkills, additionalSkills, stats, socialLinks } from './data/skills';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Create stars once with mobile-awareness
  const [stars] = useState(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const starCount = isMobile ? 30 : 150;

    return [...Array(starCount)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      // scale sizes down on mobile so they don't dominate the layout
      size: (Math.random() * 2 + 1) * (isMobile ? 0.6 : 1), // ~0.6-1.8px on mobile, 1-3px on desktop
      opacity: Math.random() * 0.35 + 0.08, // dimmer overall
      glowIntensity: (Math.random() * 6 + 3) * (isMobile ? 0.6 : 1), // reduced glow on mobile
      animationDuration: 2 + Math.random() * 3, // 2-5s
      animationDelay: Math.random() * 4
    }));
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    // Only attach on non-touch devices for perf (touch devices don't need mouse-follow)
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Also listen for resize to keep mobile/desktop behavior stable if user rotates device
    const handleResize = () => {
      // noop here — we keep stars static at mount to avoid reflow, but keep this hook for future expansion
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (!isTouch) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative text-base md:text-lg lg:text-lg">
      {/* Animated Background with Galaxy Stars - Global */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {/* Dynamic background with mouse-following gradient.
            Use viewport-relative sizes so it scales on mobile. */}
        <div
          className="absolute inset-0 opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(40vw circle at ${mousePosition.x}% ${mousePosition.y}%, 
                         rgba(147, 51, 234, 0.25), 
                         rgba(59, 130, 246, 0.12), 
                         rgba(0, 0, 0, 0.96))`
          }}
        />

        {/* Galaxy Stars - Static sparkling dots */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${Math.max(0.6, star.size)}px`,
              height: `${Math.max(0.6, star.size)}px`,
              backgroundColor: '#ffffff',
              opacity: star.opacity,
              boxShadow: `0 0 ${star.glowIntensity}px rgba(255, 255, 255, 0.45), 
                         0 0 ${star.glowIntensity * 1.3}px rgba(147, 51, 234, 0.18),
                         0 0 ${star.glowIntensity * 1.8}px rgba(59, 130, 246, 0.12)`,
              animation: `sparkle ${star.animationDuration}s ease-in-out infinite`,
              animationDelay: `${star.animationDelay}s`,
              transform: 'translateZ(0)'
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Custom CSS for sparkling animation and futuristic scrollbar */}
      <style jsx global>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0.18;
            filter: brightness(0.75);
          }
          25% {
            opacity: 0.75;
            filter: brightness(1.05);
          }
          50% {
            opacity: 0.35;
            filter: brightness(0.95);
          }
          75% {
            opacity: 0.9;
            filter: brightness(1.2);
          }
        }

        /* Futuristic Scrollbar Styles */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.8);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(
            180deg,
            rgba(147, 51, 234, 0.8) 0%,
            rgba(59, 130, 246, 0.8) 50%,
            rgba(16, 185, 129, 0.8) 100%
          );
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            0 0 8px rgba(147, 51, 234, 0.22),
            0 0 16px rgba(59, 130, 246, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
          transition: all 0.25s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          transform: scale(1.05);
          box-shadow:
            0 0 12px rgba(147, 51, 234, 0.36),
            0 0 24px rgba(59, 130, 246, 0.26),
            inset 0 1px 0 rgba(255, 255, 255, 0.26);
        }

        ::-webkit-scrollbar-corner {
          background: rgba(0, 0, 0, 0.8);
        }

        /* Firefox scrollbar */
        html {
          scrollbar-width: thin;
          scrollbar-color: rgba(147, 51, 234, 0.8) rgba(0, 0, 0, 0.8);
        }

        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* ====================
           Mobile & small-screen readability & scaling fixes
           ==================== */

        /* For tablets and small laptops — slightly larger base */
        @media (max-width: 1024px) {
          html, body {
            font-size: 16px;
          }
        }

        /* For phones — keep things legible but not enormous */
        @media (max-width: 768px) {
          html, body {
            font-size: 15px;
            -webkit-text-size-adjust: 100%;
          }

          /* Tame big paddings and large hero heights that make layout feel huge */
          section {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          /* Make sure core z-10 content scales sensibly */
          .relative.z-10, .relative.z-10 * {
            line-height: 1.45 !important;
            -webkit-font-smoothing: antialiased;
          }

          /* Headings — slightly smaller than the original huge sizes to avoid taking entire screen */
          .relative.z-10 h1 {
            font-size: 1.8rem !important;
            line-height: 1.12 !important;
            margin-bottom: 0.5rem;
          }
          .relative.z-10 h2 {
            font-size: 1.4rem !important;
            line-height: 1.16 !important;
          }
          .relative.z-10 h3 {
            font-size: 1.15rem !important;
          }

          /* Paragraphs and smaller text */
          .relative.z-10 p, .relative.z-10 a, .relative.z-10 li, .relative.z-10 span {
            font-size: 0.95rem !important;
          }

          /* Buttons, links and interactive elements — keep tap targets good but not huge */
          .relative.z-10 button, .relative.z-10 .btn, .relative.z-10 a {
            min-height: 44px !important;
            padding: 0.6rem 0.9rem !important;
            font-size: 0.95rem !important;
            border-radius: 0.5rem !important;
          }

          /* Reduce hero/min-height usage that causes huge screens */
          .hero-fullscreen, .hero-large {
            min-height: auto !important;
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }

          /* Star visuals: keep subtle so they don't steal attention */
          .fixed.inset-0 .star {
            transform: translateZ(0) scale(0.95);
            opacity: 0.9;
          }

          /* Disable pointer-events on decorative layer to ensure taps hit real UI */
          .fixed.inset-0 {
            pointer-events: none;
          }
        }

        /* Very small phones */
        @media (max-width: 420px) {
          html, body {
            font-size: 14px;
          }

          .relative.z-10 h1 {
            font-size: 1.6rem !important;
          }
          .relative.z-10 h2 {
            font-size: 1.2rem !important;
          }
          .relative.z-10 p, .relative.z-10 a, .relative.z-10 li {
            font-size: 0.95rem !important;
          }

          /* Ensure project cards and images fit */
          .projects-grid img, .projects-grid .card {
            max-width: 100%;
            height: auto;
          }
        }

        /* Star-specific defaults (only target star elements) */
        .fixed.inset-0 .star {
          will-change: transform, opacity;
          transform-origin: center;
        }
      `}</style>

      {/* Main Content - All sections with relative positioning to appear above background */}
      <div className="relative z-10">
        <Navbar />
        <section id="home"><Hero /></section>

        {/* Faint demarcation line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section id="about"><About /></section>

        {/* Faint demarcation line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section id="projects"><Projects projects={projects} /></section>

        {/* Faint demarcation line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section id="skills"><Skills coreSkills={coreSkills} additionalSkills={additionalSkills} /></section>

        {/* Faint demarcation line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section id="stats"><Stats stats={stats} /></section>

        {/* Faint demarcation line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section id="contact"><Contact socialLinks={socialLinks} /></section>

        {/* Call Footer at the very bottom */}
        <Footer />
      </div>
    </div>
  );
}
