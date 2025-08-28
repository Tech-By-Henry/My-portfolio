// src/portfolio/components/AdditionalSkills.jsx
import React from 'react';

export default function AdditionalSkills({ additionalSkills }) {
  const handleWheel = (e) => {
    // Allow horizontal scrolling with wheel
    const container = e.currentTarget;
    const canScrollLeft = container.scrollLeft > 0;
    const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth;
    
    if (canScrollLeft || canScrollRight) {
      e.stopPropagation();
      // Convert vertical scroll to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }
  };

  return (
    <div className="relative neon-panel rounded-3xl p-8 shadow-2xl border border-white/8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full rounded-3xl overlay-grid" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-center text-purple-300 z-10 relative">
        How I Work With These Technologies
      </h3>

      <p className="text-slate-300 text-center mb-8 leading-relaxed max-w-4xl mx-auto z-10 relative">
        I combine these technologies into full-stack solutions: React and modern JS for the UI, Python/Django for the backend, PostgreSQL for data persistence, Docker + CI/CD for reproducible deployments, and cloud infra for scale.
      </p>

      {/* Horizontal scrollable container */}
      <div 
        className="overflow-x-auto overflow-y-visible pb-4 z-10 relative"
        style={{ 
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin"
        }}
        onWheel={handleWheel}
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex gap-6 min-w-max px-2">
          {additionalSkills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-white/3 backdrop-blur-md border border-white/6 rounded-2xl p-5 text-center shadow-lg hover:scale-[1.035] transition-transform duration-300 flex-shrink-0 w-48"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center bg-clip-padding icon-gradient">
                {skill.icon}
              </div>
              <h4 className="font-semibold text-white">{skill.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-4 text-center z-10 relative">
        <span className="text-xs text-slate-400">
          {additionalSkills.length > 4 ? '← Scroll horizontally to see all technologies →' : ''}
        </span>
      </div>
    </div>
  );
}