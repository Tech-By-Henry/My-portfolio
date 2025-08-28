import React, { useState, useEffect, useRef } from 'react';

export default function About() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // ==== NEW: zoom state and refs ====
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [imgNaturalSize, setImgNaturalSize] = useState({ w: 0, h: 0 });
  const avatarImgRef = useRef(null);
  const zoomImgRef = useRef(null);

  const roles = [
    "Full-Stack Developer",
    "Backend Architect",
    "API Specialist",
    "Problem Solver",
    "Code Craftsman"
  ];

  const expertise = [
    {
      category: "Frontend",
      icon: "🎨",
      techs: ["React", "MUI", "HTML & CSS", "Tailwind CSS"],
      description: "Creating responsive, interactive user interfaces"
    },
    {
      category: "Backend",
      icon: "⚡",
      techs: ["Node.js", "Python", "Django", "Flask"],
      description: "Building scalable server-side architectures"
    },
    {
      category: "Database",
      icon: "🗄️",
      techs: ["MongoDB", "PostgreSQL", "Redis", "Sqlite"],
      description: "Designing efficient data storage solutions"
    },
    {
      category: "DevOps",
      icon: "🚀",
      techs: ["Docker", "Render", "Vercel", "GitHub Actions"],
      description: "Streamlining deployment and infrastructure"
    }
  ];

  const journey = [
    {
      phase: "Foundation",
      period: "2021-2022",
      milestone: "Learning Core Technologies",
      details: "Mastered JavaScript, React, and fundamental programming concepts"
    },
    {
      phase: "Growth",
      period: "2022-2023",
      milestone: "First Professional Projects",
      details: "Built real-world applications and collaborated with development teams"
    },
    {
      phase: "Expertise",
      period: "2023-2024",
      milestone: "Full-Stack Mastery",
      details: "Architected complete solutions from database to deployment"
    },
    {
      phase: "Innovation",
      period: "2024-Present",
      milestone: "Leading Development",
      details: "Creating scalable systems and mentoring other developers"
    }
  ];

  const principles = [
    "Clean, maintainable code",
    "User-centered design",
    "Performance optimization",
    "Continuous learning",
    "Collaborative teamwork"
  ];

  // Typing animation for roles
  useEffect(() => {
    let index = 0;
    const currentText = roles[currentRole];
    const timer = setInterval(() => {
      if (index < currentText.length) {
        setTypingText(currentText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
          setTypingText('');
        }, 2000);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [currentRole]);

  // Detect mobile for disabling heavy effects or conditional UI (kept)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handle = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) {
      mq.addEventListener('change', handle);
    } else {
      mq.addListener(handle);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handle);
      } else {
        mq.removeListener(handle);
      }
    };
  }, []);

  // Mouse tracking for subtle effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Section cycling (timeline highlight)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % journey.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll progress (keeps working)
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // initialize
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ===== NEW: close lightbox on ESC and on viewport resize recalculation =====
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setIsZoomOpen(false);
    }
    if (isZoomOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isZoomOpen]);

  // helper to open zoom (can be used on click)
  const openZoom = () => {
    // if we already have the natural size from thumbnail load, good.
    // Otherwise, attempt to read it from the image element.
    if (avatarImgRef.current && (!imgNaturalSize.w || !imgNaturalSize.h)) {
      const el = avatarImgRef.current;
      setImgNaturalSize({ w: el.naturalWidth || 0, h: el.naturalHeight || 0 });
    }
    setIsZoomOpen(true);
  };

  // compute constrained display size so zoom doesn't exceed natural size or viewport
  const computeZoomStyle = () => {
    const padding = 48; // px padding on each side
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    const maxW = Math.max(0, vw - padding * 2);
    const maxH = Math.max(0, vh - padding * 2);

    // if we don't know natural size, fall back to viewport-constrained size
    if (!imgNaturalSize.w || !imgNaturalSize.h) {
      return {
        maxWidth: `${maxW}px`,
        maxHeight: `${maxH}px`,
        width: 'auto',
        height: 'auto'
      };
    }

    // don't upscale: set display width to the minimum of natural width and viewport available width
    const displayW = Math.min(imgNaturalSize.w, maxW);
    const displayH = Math.min(imgNaturalSize.h, maxH);

    // maintain aspect ratio: figure scale based on whichever dimension constrains
    const widthRatio = displayW / imgNaturalSize.w;
    const heightRatio = displayH / imgNaturalSize.h;
    const ratio = Math.min(widthRatio, heightRatio, 1);

    return {
      width: `${Math.round(imgNaturalSize.w * ratio)}px`,
      height: `${Math.round(imgNaturalSize.h * ratio)}px`
    };
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Subtle animated background elements - responsive positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating code elements like Hero - responsive positioning */}
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 opacity-10 text-cyan-400 font-mono text-xs sm:text-sm animate-float-slow">
          {'const about = {'}
        </div>
        <div className="absolute top-32 sm:top-40 right-8 sm:right-20 opacity-10 text-purple-400 font-mono text-xs sm:text-sm animate-float-medium">
          {'  passion: "development",'}
        </div>
        <div className="absolute bottom-24 sm:bottom-32 left-8 sm:left-20 opacity-10 text-gray-400 font-mono text-xs sm:text-sm animate-float-fast">
          {'  expertise: "full-stack",'}
        </div>
        <div className="absolute top-48 sm:top-60 right-16 sm:right-40 opacity-10 text-cyan-400 font-mono text-xs sm:text-sm animate-float-slow">
          {'  focus: "innovation"'}
        </div>
        <div className="absolute bottom-48 sm:bottom-60 right-4 sm:right-10 opacity-10 text-purple-400 font-mono text-xs sm:text-sm animate-float-medium">
          {'};'}
        </div>

        {/* Geometric shapes matching Hero theme - responsive sizes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border border-purple-500/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 border border-cyan-500/20 rotate-12 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full animate-bounce-slow"></div>

        {/* Subtle mouse-following gradient */}
        <div
          className="absolute inset-0 opacity-5 transition-all duration-300"
          style={{
            background: `radial-gradient(${isMobile ? '300px' : '600px'} circle at ${mousePos.x}% ${mousePos.y}%, 
                         rgba(147, 51, 234, 0.1), 
                         rgba(6, 182, 212, 0.05), 
                         transparent 70%)`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header section — no entry/exit animations, always visible */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Status badge like Hero - responsive sizing */}
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-full text-xs sm:text-sm text-purple-300 mb-4 sm:mb-6 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            About Henry
          </div>

          {/* Main title with glitch effect - responsive text sizes */}
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute inset-0 opacity-20">
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-purple-500 blur-sm transform translate-x-1 translate-y-1 animate-glitch-1">
                About Me
              </h2>
            </div>
            <div className="absolute inset-0 opacity-15">
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-cyan-500 blur-sm transform -translate-x-1 -translate-y-1 animate-glitch-2">
                About Me
              </h2>
            </div>
            <h2 className="relative text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-none hover:scale-105 transition-transform duration-300 cursor-default">
              About Me
            </h2>
          </div>

          {/* Typing role animation - responsive text size */}
          <div className="text-lg sm:text-2xl md:text-3xl text-cyan-300 font-medium mb-6 sm:mb-8 min-h-[2rem] sm:min-h-[3rem] flex items-center justify-center px-4">
            <span className="border-r-2 border-cyan-400 animate-pulse pr-2 text-center">
              {typingText}
            </span>
          </div>
        </div>

        {/* Complex multi-section layout (all sections render statically, no enter/exit transforms) */}
        <div className="grid grid-cols-1 lg:grid-cols-8 xl:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">

          {/* Left Column - Profile & Core Info - responsive column spans */}
          <div className="lg:col-span-3 xl:col-span-4 space-y-6 sm:space-y-8">
            {/* Enhanced 3D Profile Card — static visible */}
            <div className="relative group scale-100 opacity-100">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl sm:rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>

              <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full"
                      style={{
                        left: `${20 + (i % 4) * 20}%`,
                        top: `${20 + Math.floor(i / 4) * 20}%`,
                        animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite ${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 text-center">
                  {/* Profile avatar with multiple rings - responsive sizing */}
                  <div className="relative mx-auto mb-4 sm:mb-6 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
                    <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-spin-slow"></div>
                    <div className="absolute inset-1 sm:inset-3 rounded-full border border-cyan-500/40 animate-spin-reverse"></div>
                    <div className="absolute inset-3 sm:inset-6 rounded-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white shadow-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      {/* Replaced the 'H' character with an image from public/contact2.png — responsive and rounded */}
                      <img
                        src="/contact2.png"
                        alt="Henry avatar"
                        loading="lazy"
                        ref={avatarImgRef}
                        onLoad={(e) => {
                          try {
                            const { naturalWidth, naturalHeight } = e.target;
                            setImgNaturalSize({ w: naturalWidth || 0, h: naturalHeight || 0 });
                          } catch (err) {
                            // ignore
                          }
                        }}
                        onClick={openZoom}
                        // <--- Ensure the small circular avatar has a pure black background behind any transparent parts
                        style={{ backgroundColor: '#000' }}
                        className="w-full h-full object-cover rounded-full cursor-pointer"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Henry</h3>
                  <p className="text-sm sm:text-base text-purple-300 font-medium mb-3 sm:mb-4">Software Engineer</p>
                  <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto mb-4 sm:mb-6"></div>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
                    Passionate about creating digital solutions that bridge the gap between complex problems and elegant implementations.
                  </p>
                </div>
              </div>
            </div>

            {/* Development Philosophy - responsive padding */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 sm:mb-4 flex items-center gap-2">
                <span>💡</span> Philosophy
              </h3>
              <blockquote className="text-gray-300 italic text-xs sm:text-sm leading-relaxed border-l-2 border-purple-500/50 pl-3 sm:pl-4">
                "Every line of code is an opportunity to solve a problem elegantly. I believe in writing software that not only works but inspires."
              </blockquote>
            </div>

            {/* Core Principles - responsive spacing */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 sm:mb-4 flex items-center gap-2">
                <span>⚡</span> Core Values
              </h3>
              <div className="space-y-2">
                {principles.map((principle, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 group cursor-default">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full group-hover:bg-purple-400 transition-colors duration-200 flex-shrink-0"></div>
                    <span className="group-hover:text-white transition-colors duration-200">{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Main Content - responsive column spans */}
          <div className="lg:col-span-3 xl:col-span-5 space-y-6 sm:space-y-8">
            {/* Introduction - responsive padding and text */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">My Story</h3>
                <div className="space-y-3 sm:space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
                  <p>
                    I'm a passionate <span className="text-purple-300 font-semibold">software engineer</span> from Lagos, Nigeria, specializing in full-stack development. My journey began with curiosity about how digital experiences come to life, and has evolved into a deep expertise in creating scalable, efficient applications.
                  </p>
                  <p>
                    What drives me is the intersection of <span className="text-cyan-300 font-semibold">creativity</span> and <span className="text-purple-300 font-semibold">technology</span> – transforming complex business requirements into intuitive digital solutions that users love and businesses depend on.
                  </p>
                  <p>
                    I believe in writing clean, maintainable code and staying current with emerging technologies while maintaining a strong foundation in time-tested principles.
                  </p>
                </div>
              </div>
            </div>

            {/* Journey Timeline - responsive spacing */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <span>🚀</span> Development Journey
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {journey.map((item, i) => (
                  <div key={i} className={`relative pl-6 sm:pl-8 pb-3 sm:pb-4 ${i !== journey.length - 1 ? 'border-l-2 border-gray-700' : ''}`}>
                    <div className={`absolute -left-1.5 sm:-left-2 top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300 ${activeSection === i ? 'bg-purple-500 border-purple-400' : 'bg-gray-600 border-gray-500'}`}></div>
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className={`text-xs sm:text-sm font-bold transition-colors duration-300 ${activeSection === i ? 'text-purple-300' : 'text-gray-400'}`}>{item.period}</span>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-300 self-start sm:self-auto ${activeSection === i ? 'bg-purple-500/20 text-purple-300' : 'bg-gray-600/20 text-gray-400'}`}>{item.phase}</span>
                      </div>
                      <h4 className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${activeSection === i ? 'text-white' : 'text-gray-300'}`}>{item.milestone}</h4>
                      <p className={`text-xs sm:text-sm transition-colors duration-300 ${activeSection === i ? 'text-gray-300' : 'text-gray-400'}`}>{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Technical Expertise - responsive column spans */}
          <div className="lg:col-span-2 xl:col-span-3 space-y-6 sm:space-y-8">
            {/* Expertise Areas - responsive layout for mobile */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Technical Expertise</h3>
              
              {/* Mobile: 2x2 grid, Tablet: 2x2 grid, Desktop: vertical stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                {expertise.map((area, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="text-lg sm:text-xl flex-shrink-0">{area.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors duration-200 text-sm sm:text-base">
                          {area.category}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 leading-tight">{area.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {area.techs.map((tech, j) => (
                        <span key={j} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-white/10 hover:border-purple-500/30 transition-colors duration-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Focus - responsive padding */}
            <div className="bg-gradient-to-br from-purple-600/10 to-cyan-600/10 backdrop-blur-xl border border-purple-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-purple-300 mb-3 sm:mb-4 flex items-center gap-2">
                <span>🎯</span> Currently Exploring
              </h3>
              <div className="space-y-2">
                {['AI/ML Integration', 'Cloud Architecture', 'Microservices', 'Performance Optimization'].map((focus, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 group cursor-default">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full group-hover:bg-purple-400 transition-colors duration-200 flex-shrink-0"></div>
                    <span className="group-hover:text-white transition-colors duration-200">{focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== NEW: Lightbox markup - appears when isZoomOpen is true ===== */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={() => setIsZoomOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // prevent outer click from closing when interacting inside
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              aria-label="Close"
              className="absolute top-2 right-2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-60"
            >
              ✕
            </button>

            {/* Image: style computed so it never exceeds natural size or viewport */}
            <img
              ref={zoomImgRef}
              src="/contact2.png"
              alt="Henry avatar large"
              // <--- Ensure the zoomed image also has a pure black background behind any transparent parts
              style={{ ...computeZoomStyle(), backgroundColor: '#000' }}
              className="rounded-md shadow-2xl"
              onLoad={(e) => {
                // Set natural size again just in case
                try {
                  const { naturalWidth, naturalHeight } = e.target;
                  setImgNaturalSize({ w: naturalWidth || imgNaturalSize.w, h: naturalHeight || imgNaturalSize.h });
                } catch (err) {
                  // ignore
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Refined animations matching Hero style (kept) */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes glitch-1 {
          0%, 100% { transform: translate(1px, 1px); }
          10% { transform: translate(-1px, -2px); }
          20% { transform: translate(-3px, 0px); }
          30% { transform: translate(3px, 2px); }
          40% { transform: translate(1px, -1px); }
          50% { transform: translate(-1px, 2px); }
          60% { transform: translate(-3px, 1px); }
          70% { transform: translate(3px, 1px); }
          80% { transform: translate(-1px, -1px); }
          90% { transform: translate(1px, 2px); }
        }

        @keyframes glitch-2 {
          0%, 100% { transform: translate(-1px, -1px); }
          10% { transform: translate(2px, 1px); }
          20% { transform: translate(1px, -2px); }
          30% { transform: translate(-2px, -1px); }
          40% { transform: translate(2px, 2px); }
          50% { transform: translate(1px, -1px); }
          60% { transform: translate(2px, -2px); }
          70% { transform: translate(-2px, 1px); }
          80% { transform: translate(1px, 1px); }
          90% { transform: translate(-1px, 2px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-glitch-1 {
          animation: glitch-1 0.3s ease-in-out infinite alternate;
        }

        .animate-glitch-2 {
          animation: glitch-2 0.3s ease-in-out infinite alternate;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .animate-glitch-1,
          .animate-glitch-2 {
            animation-duration: 0.5s;
          }
        }
      `}</style>
    </section>
  );
}
