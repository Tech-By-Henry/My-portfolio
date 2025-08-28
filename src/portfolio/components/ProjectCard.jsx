import React, { useState, useEffect, useRef } from 'react';

export default function ProjectCard({
  project = {
    title: "Social Media Dashboard",
    description:
      "Analytics dashboard for social media management with data visualization and automated reporting features.",
    techStack: ["React", "Node.js", "Chart.js", "Redis"],
    github: "#",
    website: "#",
  },
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setMousePosition({ x, y });
      setRotateX((y - centerY) / 15);
      setRotateY((centerX - x) / 15);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={
        "relative group perspective-1000 w-full h-full overflow-hidden transform-gpu transition-all duration-500 ease-out " +
        // default card lengths (edit these min-h values to change card length)
        "min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px] xl:min-h-[360px] " +
        "flex flex-col"
      }
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${
          isHovered ? "20px" : "0px"
        })`,
      }}
    >
      {/* Floating Elements Around Card - Hidden on small screens */}
      <div className="hidden lg:block absolute -inset-8 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 border border-purple-500/30 rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-1000`}
            style={{
              left: `${20 + i * 10}%`,
              top: `${10 + i * 8}%`,
              animationDelay: `${i * 0.2}s`,
              animation: isHovered ? `orbit-${i % 4} ${4 + i}s linear infinite` : "none",
            }}
          />
        ))}
      </div>

      {/* Geometric Border Framework - Responsive sizing */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-l-2 border-t-2 border-purple-500/50 transform origin-top-left group-hover:scale-[1.5] transition-transform duration-700"></div>
        <div className="absolute top-0 right-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-r-2 border-t-2 border-cyan-500/50 transform origin-top-right group-hover:scale-[1.5] transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-l-2 border-b-2 border-cyan-500/50 transform origin-bottom-left group-hover:scale-[1.5] transition-transform duration-700"></div>
        <div className="absolute bottom-0 right-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-r-2 border-b-2 border-purple-500/50 transform origin-bottom-right group-hover:scale-[1.5] transition-transform duration-700"></div>

        <div className="hidden md:block absolute left-0 top-1/4 w-1 h-1/2 bg-purple-500/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        <div className="hidden md:block absolute right-0 top-1/4 w-1 h-1/2 bg-cyan-500/30 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        <div className="hidden md:block absolute top-0 left-1/4 w-1/2 h-1 bg-purple-500/30 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <div className="hidden md:block absolute bottom-0 left-1/4 w-1/2 h-1 bg-cyan-500/30 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      </div>

      {/* Multi-Layer Card Structure */}
      <div className="relative flex-1 h-full min-h-0">
        {/* Base Layer */}
        <div className="absolute inset-0 border border-white/10 rounded-2xl sm:rounded-3xl transform group-hover:scale-105 transition-transform duration-700"></div>

        {/* Second Layer */}
        <div className="hidden sm:block absolute inset-1 sm:inset-2 border border-purple-500/20 rounded-xl sm:rounded-2xl transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"></div>

        {/* Third Layer */}
        <div className="hidden lg:block absolute inset-2 lg:inset-4 border border-cyan-500/20 rounded-lg lg:rounded-xl transform group-hover:scale-[1.15] group-hover:-rotate-1 transition-all duration-700"></div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden min-h-0">
          {/* Scanning Lines */}
          <div className="hidden md:block absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent transform -translate-y-full group-hover:translate-y-full transition-transform duration-2000 ease-linear"></div>
            <div className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-linear delay-500"></div>
          </div>

          {/* Holographic Grid */}
          <div
            className="hidden lg:block absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{
              backgroundImage: `
                     linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                   `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Content Area */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="relative mb-4 sm:mb-6 overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300 line-clamp-2">
                  {project.title}
                </h3>

                <div className="relative h-0.5 sm:h-1 overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 rounded-full"></div>
                  <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out w-3/5"></div>
                  <div className="absolute right-0 top-0 w-3 sm:w-4 h-full bg-purple-500/50 rounded-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-700 delay-300"></div>
                </div>
              </div>
            </div>

            <div className="relative mb-4 sm:mb-6 lg:mb-8 overflow-hidden flex-1 min-h-0">
              <div className="hidden sm:block absolute inset-0">
                <div className="absolute left-0 top-0 w-full h-full border-l-2 border-purple-500/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="absolute right-0 top-0 w-full h-full border-r-2 border-cyan-500/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-200"></div>
              </div>

              <p className="relative text-slate-300 leading-relaxed text-sm sm:text-base transform group-hover:scale-105 transition-transform duration-300 line-clamp-3 sm:line-clamp-4">
                {project.description}
              </p>
            </div>

            <div className="relative mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.techStack.map((tech, idx) => (
                  <div key={idx} className="relative group/tech">
                    <div className="hidden sm:block absolute inset-0 border border-purple-500/30 rounded-lg transform group-hover/tech:rotate-3 transition-transform duration-300"></div>
                    <div className="hidden lg:block absolute inset-0 border border-cyan-500/20 rounded-lg transform group-hover/tech:-rotate-3 group-hover/tech:scale-110 transition-all duration-300 delay-100"></div>

                    <span
                      className="relative block px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-purple-200 text-xs sm:text-sm font-semibold bg-white/5 sm:bg-transparent border sm:border-0 border-white/10 rounded-md sm:rounded-lg transform group-hover/tech:translate-y-0.5 sm:group-hover/tech:translate-y-1 transition-transform duration-300"
                      style={{
                        animationDelay: `${idx * 0.1}s`,
                        animation: isHovered ? `float-tech 2s ease-in-out infinite alternate` : "none",
                      }}
                    >
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Viz */}
          <div className="hidden lg:block absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-purple-500/50 rounded-full"
                  style={{
                    height: `${Math.random() * 16 + 8}px`,
                    animationDelay: `${i * 0.2}s`,
                    animation: isHovered ? `data-viz 1s ease-in-out infinite alternate` : "none",
                  }}
                />
              ))}
            </div>
          </div>

          {/* FOOTER — moved out of absolute positioning so buttons never overlap stack/content */}
          <div className="flex-shrink-0 pt-3 sm:pt-4 lg:pt-5">
            <div className="flex justify-end gap-2 sm:gap-3">
              {/* GitHub Button */}
              <a
                href={project.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                className="relative inline-flex items-center justify-center w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-white font-bold rounded-lg sm:rounded-xl border border-white/20 transform transition-all duration-300 overflow-hidden group/button-hover hover:scale-105 hover:border-purple-500/50 text-xs sm:text-sm lg:text-base bg-black/20 backdrop-blur-sm"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {/* Compact GitHub icon sized like the website icon (keeps container intact) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6"
                  >
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.28 5.68.41.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.2.66.79.55C20.71 21.38 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                  </svg>
                </span>

                {/* Button Shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover/button-hover:translate-x-full transition-transform duration-700"></div>
              </a>

              {/* Website Button */}
              <a
                href={project.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} Website`}
                className="relative inline-flex items-center justify-center w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-white font-bold rounded-lg sm:rounded-xl border border-white/20 transform transition-all duration-300 overflow-hidden group/button-hover hover:scale-105 hover:border-cyan-500/50 text-xs sm:text-sm lg:text-base bg-black/20 backdrop-blur-sm"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                </span>

                {/* Button Shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover/button-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            </div>
          </div>
          {/* end footer */}
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit-0 {
          0% {
            transform: rotate(0deg) translateX(30px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(30px) rotate(-360deg);
          }
        }
        @keyframes orbit-1 {
          0% {
            transform: rotate(0deg) translateX(40px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(40px) rotate(360deg);
          }
        }
        @keyframes orbit-2 {
          0% {
            transform: rotate(0deg) translateX(25px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(25px) rotate(-360deg);
          }
        }
        @keyframes orbit-3 {
          0% {
            transform: rotate(0deg) translateX(35px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(35px) rotate(360deg);
          }
        }
        @keyframes float-tech {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-3px) rotate(1deg);
          }
        }
        @keyframes data-viz {
          0% {
            transform: scaleY(1);
            opacity: 0.5;
          }
          100% {
            transform: scaleY(1.5);
            opacity: 0.8;
          }
        }

        /* Ensure proper text clamping */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Prevent any overflow issues with buttons on very small screens */
        @media (max-width: 360px) {
          .flex-shrink-0 a {
            width: 1.75rem;
            height: 1.75rem;
            font-size: 0.75rem;
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
