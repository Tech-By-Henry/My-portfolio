import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

export default function Projects({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* Simplified Title Section */}
        <div className="relative mb-8 sm:mb-12 lg:mb-16">
          <div className="relative text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            
            {/* Simple Underline */}
            <div className="relative mt-4 sm:mt-6 flex justify-center">
              <div className="relative w-32 sm:w-48 md:w-64 h-1 sm:h-2 overflow-hidden">
                <div className="absolute inset-0 bg-white/10 rounded-full"></div>
                <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-full"></div>
                <div className="absolute left-1/2 top-0 w-4 sm:w-8 h-full bg-white/50 rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Simplified Grid - No extra containers */}
        <div className="grid 
                       grid-cols-1 
                       sm:grid-cols-1 
                       md:grid-cols-2 
                       lg:grid-cols-2 
                       xl:grid-cols-3 
                       2xl:grid-cols-4
                       gap-6 sm:gap-8 lg:gap-10 xl:gap-12
                       items-stretch project-grid">
          {projects && projects.map((project, i) => (
            <div
              key={i}
              className="relative group/project flex flex-col min-h-0"
              onMouseEnter={() => setActiveIndex(i)}
            >
              {/* Minimal Project Framework */}
              <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 pointer-events-none">
                {/* Simple Corner Elements */}
                <div className="absolute top-0 left-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-l-2 border-t-2 border-purple-500/30 
                              transform origin-top-left group-hover/project:scale-125 transition-transform duration-500"></div>
                <div className="absolute top-0 right-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-r-2 border-t-2 border-cyan-500/30 
                              transform origin-top-right group-hover/project:scale-125 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-l-2 border-b-2 border-cyan-500/30 
                              transform origin-bottom-left group-hover/project:scale-125 transition-transform duration-500"></div>
                <div className="absolute bottom-0 right-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-r-2 border-b-2 border-purple-500/30 
                              transform origin-bottom-right group-hover/project:scale-125 transition-transform duration-500"></div>

                {/* Project Index Display */}
                <div className="absolute -top-4 sm:-top-5 lg:-top-6 -left-4 sm:-left-5 lg:-left-6 
                              w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 
                              border border-purple-500/40 rounded-full 
                              flex items-center justify-center text-purple-300 font-bold bg-black/20 backdrop-blur-sm
                              text-xs sm:text-sm lg:text-base
                              transform group-hover/project:scale-110 group-hover/project:rotate-12 transition-all duration-300">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Active Project Indicator */}
                {activeIndex === i && (
                  <div className="absolute inset-0 border-2 border-purple-500/50 rounded-2xl sm:rounded-3xl animate-pulse"></div>
                )}
              </div>

              {/* Direct ProjectCard - No extra wrappers */}
              {/* IMPORTANT: make the direct child (ProjectCard root) able to flex/grow/shrink properly */}
              <div className="flex-1 min-h-0">
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </div>

        {/* Grid Status Display */}
        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-2 sm:gap-4 opacity-50 text-xs sm:text-sm">
          <div className="hidden sm:block text-purple-300 font-mono">
            GRID: {projects ? projects.length : 0} PROJECTS
          </div>
          <div className="flex gap-1">
            {projects && projects.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'bg-purple-500 scale-125' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Ensure equal height cards in grid */
        .project-grid {
          align-items: stretch;

          /*
            Tiny placement tweak:
            - center the whole grid track area so the first item in a partial/final row
              starts visually in the middle column and subsequent items flow to the right.
            - grid-auto-rows keeps row heights consistent.
          */
          justify-items: center;    /* center each grid cell's contents horizontally */
          justify-content: center;  /* center the grid track area in the container (so partial rows start from middle) */
          grid-auto-rows: 1fr;
        }
        
        /* Make the immediate children of the grid flexible and able to shrink */
        .project-grid > * {
          display: flex;
          flex-direction: column;
          min-height: 0; /* <-- critical so child flex items can shrink */
        }

        /* Ensure the ProjectCard root (the first meaningful child) fills the space but can shrink */
        .project-grid > * > .flex-1 {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          min-height: 0;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .project-grid {
            gap: 1.5rem;
          }
        }

        @media (min-width: 1536px) {
          .project-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
