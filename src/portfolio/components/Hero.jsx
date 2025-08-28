// src/portfolio/components/Hero.jsx
import React, { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  // animation state
  const [animating, setAnimating] = useState(false);
  // +1 => headline moves RIGHT this cycle; -1 => LEFT. Subtitle is opposite.
  const [dir, setDir] = useState(1);

  const words = [
    { text: "Henry", subtitle: "That's me - your next developer" },
    { text: "Problem Solver", subtitle: "I turn complex challenges into elegant solutions" },
    { text: "Code Craftsman", subtitle: "Building digital experiences that just work" },
    { text: "Full-Stack Dev", subtitle: "Frontend beauty meets backend power" },
    { text: "API Builder", subtitle: "Connecting systems with seamless integrations" },
    { text: "Henry", subtitle: "Ready to bring your vision to life" },
    { text: "UI/UX Focused", subtitle: "Creating interfaces users actually love" },
    { text: "Performance Expert", subtitle: "Fast, scalable, and optimized solutions" },
    { text: "Team Player", subtitle: "Collaborative mindset with solo execution skills" },
    { text: "Tech Innovator", subtitle: "Always learning the latest and greatest" },
    { text: "Henry", subtitle: "Your reliable development partner" },
    { text: "Bug Crusher", subtitle: "Clean code that stands the test of time" },
    { text: "Client Focused", subtitle: "Your success is my priority" },
    { text: "Detail Oriented", subtitle: "Pixel-perfect execution every single time" },
    { text: "Deadline Driven", subtitle: "On time, every time, without compromise" },
    { text: "Henry", subtitle: "The developer you've been searching for" },
    { text: "Solution Architect", subtitle: "Designing systems that scale with your business" },
    { text: "Quality Obsessed", subtitle: "Excellence isn't optional, it's standard" },
    { text: "Future Ready", subtitle: "Building today for tomorrow's challenges" },
    { text: "Your Choice", subtitle: "Let's create something amazing together" }
  ];

  const CYCLE_MS = 3000;   // time between cycle starts
  const ANIM_MS = 550;     // slide duration (must match CSS)

  const timerRef = useRef(null);
  const aliveRef = useRef(true);

  // Self-rescheduling loop so we never re-trigger during an active animation.
  useEffect(() => {
    aliveRef.current = true;

    const schedule = (delay) => {
      timerRef.current = setTimeout(() => {
        if (!aliveRef.current) return;

        // start animation
        setAnimating(true);

        // after animation completes, commit the new index and flip direction
        setTimeout(() => {
          if (!aliveRef.current) return;
          setIndex((i) => (i + 1) % words.length);
          setDir((d) => -d);
          setAnimating(false);

          // schedule next cycle
          if (aliveRef.current) schedule(CYCLE_MS);
        }, ANIM_MS);
      }, delay);
    };

    schedule(CYCLE_MS); // first cycle

    return () => {
      aliveRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [words.length]);

  const nextIndex = (index + 1) % words.length;

  // close preview on ESC
  useEffect(() => {
    if (!showPreview) return;
    const onKey = (e) => e.key === "Escape" && setShowPreview(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPreview]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showPreview ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [showPreview]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Movement for this cycle
  const headlineGoingRight = dir === 1;
  const subtitleGoingRight = !headlineGoingRight;

  // Rails never collide: headline rail on motion-origin side; subtitle on the opposite.
  const headlineRailSide = headlineGoingRight ? "left" : "right";
  const subtitleRailSide = subtitleGoingRight ? "left" : "right";

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative overflow-visible flex items-center justify-center px-4 sm:px-6 py-12"
    >
      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 opacity-10 text-cyan-400 font-mono text-sm animate-float-slow hidden md:block">
          {'<div className="hero">'}
        </div>
        <div className="absolute top-40 right-20 opacity-10 text-purple-400 font-mono text-sm animate-float-medium hidden md:block">
          {'const developer = "Henry";'}
        </div>
        <div className="absolute bottom-32 left-20 opacity-10 text-blue-400 font-mono text-sm animate-float-fast hidden md:block">
          {'function createMagic() {'}
        </div>
        <div className="absolute top-60 right-40 opacity-10 text-green-400 font-mono text-sm animate-float-slow hidden lg:block">
          {'return innovation;'}
        </div>
        <div className="absolute bottom-60 right-10 opacity-10 text-yellow-400 font-mono text-sm animate-float-medium hidden lg:block">
          {'}'}
        </div>
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-500/20 rotate-45 animate-spin-slow hidden lg:block"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-cyan-500/20 rotate-12 animate-pulse hidden md:block"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full animate-bounce-slow hidden sm:block"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[60vh] lg:min-h-[80vh]">

          {/* LEFT: Titles */}
          <div className="lg:col-span-7 lg:col-start-2 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-full text-xs sm:text-sm text-purple-300 mb-4 backdrop-blur-sm animate-fade-in">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Available for new opportunities
            </div>

            {/* HEADLINE switcher with side rail */}
            <div className="relative mb-3 sm:mb-4">
              {/* Rail */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 h-10 sm:h-12 md:h-14 ${headlineRailSide === "left" ? "left-0 border-l-4" : "right-0 border-r-4"} border-cyan-400/70`}
              />
              {/* Mask */}
              <div className="relative overflow-hidden will-change-transform">
                {/* Outgoing layer */}
                <div
                  key={`headline-out-${index}-${dir}-${animating}`}
                  className={[
                    "inline-block font-black leading-none bg-clip-text text-transparent",
                    "text-2xl xs:text-3xl sm:text-4xl md:text-6xl xl:text-7xl",
                    "bg-gradient-to-r from-white via-purple-200 to-cyan-200",
                    animating
                      ? (headlineGoingRight ? "anim-out-right" : "anim-out-left")
                      : "translate-x-0",
                  ].join(" ")}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {words[index].text}
                </div>

                {/* Incoming layer */}
                {animating && (
                  <div
                    key={`headline-in-${nextIndex}-${dir}`}
                    className={[
                      "inline-block font-black leading-none bg-clip-text text-transparent absolute inset-0",
                      "text-2xl xs:text-3xl sm:text-4xl md:text-6xl xl:text-7xl",
                      "bg-gradient-to-r from-white via-purple-200 to-cyan-200",
                      headlineGoingRight ? "anim-in-from-left" : "anim-in-from-right",
                    ].join(" ")}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {words[nextIndex].text}
                  </div>
                )}
              </div>
            </div>

            {/* SUBTITLE switcher with opposite rail */}
            <div className="relative mb-4 sm:mb-6">
              <div
                className={`absolute top-1/2 -translate-y-1/2 h-6 sm:h-7 md:h-8 ${subtitleRailSide === "left" ? "left-0 border-l-4" : "right-0 border-r-4"} border-purple-400/70`}
              />
              <div className="relative overflow-hidden min-h-[2.2rem] will-change-transform">
                {/* Outgoing subtitle */}
                <div
                  key={`subtitle-out-${index}-${dir}-${animating}`}
                  className={[
                    "inline-block text-cyan-300 font-medium",
                    "text-xs sm:text-sm md:text-lg",
                    animating
                      ? (subtitleGoingRight ? "anim-out-right" : "anim-out-left")
                      : "translate-x-0",
                  ].join(" ")}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {words[index].subtitle}
                </div>

                {/* Incoming subtitle */}
                {animating && (
                  <div
                    key={`subtitle-in-${nextIndex}-${dir}`}
                    className={[
                      "inline-block text-cyan-300 font-medium absolute inset-0",
                      "text-xs sm:text-sm md:text-lg",
                      subtitleGoingRight ? "anim-in-from-left" : "anim-in-from-right",
                    ].join(" ")}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {words[nextIndex].subtitle}
                  </div>
                )}
              </div>
            </div>

            {/* Roles */}
            <div className="mb-6 sm:mb-8 relative">
              <div className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full opacity-60 hidden md:block"></div>
              <p className="text-base sm:text-lg md:text-2xl text-gray-300 font-light mb-1 sm:mb-2 pl-0 sm:pl-6">
                Software Engineer
              </p>
              <p className="text-sm sm:text-base md:text-lg text-purple-300 pl-0 sm:pl-6 font-medium">
                Full-Stack Developer
              </p>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-3 sm:mt-4 rounded-full ml-0 sm:ml-6 shadow-lg shadow-purple-500/30"></div>
            </div>

            {/* About */}
            <div className="relative">
              <p className="text-sm sm:text-base md:text-xl text-gray-400 max-w-lg leading-relaxed mb-8 sm:mb-12 mx-auto lg:mx-0 backdrop-blur-sm bg-black/20 p-3 sm:p-4 rounded-lg border border-white/10">
                Design-minded developer crafting exceptional digital experiences from{" "}
                <span className="text-cyan-300 font-semibold relative">
                  <span className="absolute inset-0 bg-cyan-400/20 blur-lg hidden sm:block"></span>
                  <span className="relative"> Lagos, Nigeria</span>
                </span>
              </p>
            </div>
          </div>

          {/* RIGHT: Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-xs">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 hidden sm:block"></div>
              <div className="relative p-4 sm:p-6 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl hover:scale-105 transition-all duration-500 text-center w-full max-w-xs group-hover:bg-black/60">
                <div className="relative mb-4 sm:mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-md opacity-50 animate-pulse hidden sm:block"></div>
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-r from-purple-600/80 to-cyan-600/80 flex items-center justify-center text-lg sm:text-2xl font-bold text-white shadow-lg border border-white/10">
                    H
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping"></div>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-200 mb-1">Available for Work</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-2">Let's build something amazing together</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <span className="text-green-300 text-xs sm:text-sm font-medium">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center mt-6 sm:mt-8 lg:mt-12 px-4">
          <button
            onClick={() => setShowPreview(true)}
            className="group relative w-full sm:w-auto px-5 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-2xl text-sm sm:text-base md:text-lg font-bold text-white overflow-hidden transform transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-purple-500/50 text-center border border-purple-400/30"
            title="Preview resume"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">📄 Preview Resume</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="group relative w-full sm:w-auto px-5 sm:px-10 py-3 sm:py-4 bg-white/5 backdrop-blur-lg border-2 border-white/18 rounded-2xl text-sm sm:text-base md:text-lg font-bold text-white overflow-hidden transform transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:-rotate-1 hover:bg-white/10 hover:border-purple-400/50 text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">🚀 Let's Connect</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="relative">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm bg-black/20">
              <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full mt-2 animate-pulse"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Scroll</p>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100dvh" }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowPreview(false)} />
          <div className="relative z-[10000] w-full h-full max-w-4xl bg-black/95 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <div className="flex items-center justify-between p-2 sm:p-4 border-b border-white/10 bg-black/90 backdrop-blur-sm">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs sm:text-sm">
                  📄
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-base font-semibold text-white truncate">Resume Preview</h4>
                  <p className="text-xs text-gray-400 truncate hidden sm:block">Previewing CV.pdf</p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <a
                  href="/CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs sm:text-sm rounded hover:opacity-90 transition"
                >
                  <span className="hidden xs:inline">Save</span>
                </a>
                <button onClick={() => setShowPreview(false)} aria-label="Close preview" className="p-1 sm:p-2 rounded hover:bg-white/10 transition text-white text-sm sm:text-base">
                  ✕
                </button>
              </div>
            </div>
            <div className="w-full h-[calc(100%-44px)] sm:h-[calc(100%-60px)] bg-gray-900 relative overflow-hidden">
              <iframe
                src="/CV.pdf#view=FitH"
                title="CV Preview"
                width="100%"
                height="100%"
                className="border-0"
                style={{ minHeight: "400px", backgroundColor: "#1f2937" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Custom animations + responsive tweaks */}
      <style jsx>{`
        /* ==== SLIDE ANIMATIONS (match ANIM_MS) ==== */
        .anim-out-right {
          animation: out-right ${ANIM_MS}ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .anim-out-left {
          animation: out-left ${ANIM_MS}ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .anim-in-from-left {
          animation: in-from-left ${ANIM_MS}ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .anim-in-from-right {
          animation: in-from-right ${ANIM_MS}ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        @keyframes out-right {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(110%); opacity: 0.0; }
        }
        @keyframes out-left {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-110%); opacity: 0.0; }
        }
        @keyframes in-from-left {
          from { transform: translateX(-110%); opacity: 0.0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes in-from-right {
          from { transform: translateX(110%); opacity: 0.0; }
          to { transform: translateX(0); opacity: 1; }
        }

        /* Background/perf helpers you already had */
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
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }

        @media (max-width: 768px) {
          #home { scroll-margin-top: 72px; padding-top: 45px; }
          section { padding-top: 10px; padding-bottom: 8px; }
          .min-h-[65vh] { min-height: 56vh !important; }
          .min-h-[60vh] { min-height: 52vh !important; }
          h1 { font-size: 1.6rem !important; line-height: 1.05 !important; }
          p { font-size: 0.85rem !important; }
          .max-w-7xl { padding-left: 10px; padding-right: 10px; }
          .backdrop-blur-sm, .backdrop-blur-xl { backdrop-filter: none !important; }
          .drop-shadow-2xl, .shadow-2xl { filter: none !important; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          #home { scroll-margin-top: 84px; padding-top: 60px; }
          .min-h-[65vh] { min-height: 62vh !important; }
          .min-h-[60vh] { min-height: 58vh !important; }
        }

        @supports (-webkit-touch-callout: none) {
          .fixed { position: -webkit-sticky; position: fixed; }
        }
      `}</style>
    </section>
  );
}
