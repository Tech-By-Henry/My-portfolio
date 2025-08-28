import React, { useState, useMemo, useEffect, useRef } from 'react';
import SkillCard from './SkillCard';
import StackExplorer from './StackExplorer';
import { coreSkills as defaultCore, additionalSkills as defaultAdditional } from '../data/skills';

export default function Skills({ coreSkills = defaultCore, additionalSkills = defaultAdditional }) {
  const [showAdditional, setShowAdditional] = useState(false);
  const [highlight, setHighlight] = useState(null);
  const [canHover, setCanHover] = useState(true);
  const explorerRef = useRef(null);

  // Detect if the current device supports hover. If not (touch devices),
  // we'll disable mouse hover handlers so touch UX isn't weird.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(hover: hover)');
      const update = () => setCanHover(Boolean(mq.matches));
      update();
      if (mq.addEventListener) {
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
      } else if (mq.addListener) {
        mq.addListener(update);
        return () => mq.removeListener(update);
      }
    } else {
      // assume no hover if we can't detect
      setCanHover(false);
    }
    return undefined;
  }, []);

  // When the explorer opens, scroll it into view smoothly.
  // Small timeout lets the transition/expansion begin so scroll target is stable.
  useEffect(() => {
    if (showAdditional && explorerRef.current) {
      const t = setTimeout(() => {
        try {
          explorerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          // try to focus for accessibility without forcing scroll (preventScroll true)
          if (typeof explorerRef.current.focus === 'function') {
            explorerRef.current.focus?.({ preventScroll: true });
          }
        } catch (e) {
          // fallback - silent
          explorerRef.current.scrollIntoView();
        }
      }, 60);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [showAdditional]);

  const combinedSkills = useMemo(() => [...(coreSkills || []), ...(additionalSkills || [])], [coreSkills, additionalSkills]);

  const descriptions = {
    React: {
      subtitle: 'UI — component-driven single page apps',
      text: 'Build fast, component-based UIs with hooks, context and modern patterns for SPAs, PWAs and component libraries.'
    },
    Python: {
      subtitle: 'Backend, scripting, data & ML',
      text: 'APIs (Django/DRF, FastAPI), scripting/automation, and data analysis or machine learning with pandas, NumPy and friends.'
    },
    Django: {
      subtitle: 'Batteries-included Python web framework',
      text: 'Rapid development with ORM, admin, authentication and conventions — ideal for data-driven apps, dashboards and CMS-like projects.'
    },
    JavaScript: {
      subtitle: 'Language of the web',
      text: 'Client- and server-side language for interactive UI, DOM manipulation, async programming, and the huge tooling ecosystem (npm, Vite, Webpack).'
    },
    PostgreSQL: {
      subtitle: 'Production relational database',
      text: 'ACID-compliant RDBMS with advanced features (JSONB, full-text search, powerful indexes) for reliable production backends.'
    },
    Rust: {
      subtitle: 'Safe, fast systems language',
      text: 'Memory-safe, performance-focused language for systems and performance-critical components — great when safety and speed matter.'
    },
    Node: {
      subtitle: 'Server-side JavaScript runtime',
      text: 'Event-driven runtime for building APIs, CLIs and realtime apps; commonly paired with Express, Fastify, and socket libraries.'
    },
    CSS: {
      subtitle: 'Styling & responsive layouts',
      text: 'Responsible for visual presentation — modern techniques include Flexbox, Grid, variables and accessible responsive design.'
    },
    Bootstrap: {
      subtitle: 'Component-based CSS toolkit',
      text: 'Quick-to-use UI framework with prebuilt responsive components and utilities — great for prototypes and consistent admin UIs.'
    },
    Tailwind: {
      subtitle: 'Utility-first CSS',
      text: 'Utility-first approach for rapid, consistent styling and theming — works well with component systems and design tokens.'
    },
    mui: {
      subtitle: 'Material Design React components',
      text: 'Comprehensive React component library implementing Material Design—useful for dashboards, forms and consistent design systems.'
    },
    Docker: {
      subtitle: 'Containerization & reproducible runtimes',
      text: 'Package applications into portable containers for reproducible development and deployment; commonly used in CI/CD and multi-service setups.'
    },
    Git: {
      subtitle: 'Source control & collaboration',
      text: 'Distributed version control for tracking changes, branching strategies and collaboration through PRs and code reviews.'
    },
    FastAPI: {
      subtitle: 'High-performance Python API framework',
      text: 'Modern async framework for building fast APIs with automatic OpenAPI docs — ideal for microservices and low-latency endpoints.'
    },
    SQLite: {
      subtitle: 'Lightweight embedded database',
      text: 'File-based RDBMS perfect for prototyping, demos, and small apps that don’t need a full DB server.'
    },
    "CI/CD": {
      subtitle: 'Automated build & release pipelines',
      text: 'Automate testing, builds and deployments to ensure reliable and repeatable releases (GitHub Actions, GitLab CI, CircleCI, etc.).'
    },

    default: {
      subtitle: 'Technology',
      text: 'Part of a modern web stack.'
    }
  };


  const activeMeta = highlight ? (descriptions[highlight.name] || descriptions.default) : null;

  return (
    <section className="relative py-16 px-4 sm:px-6">
      {/* Scoped scrollbar styles for the quick-notes scroll area */}
      <style>{`
        /* Firefox */
        .quick-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(124,58,237,0.9) rgba(255,255,255,0.04);
        }
        /* WebKit (Chrome, Safari) */
        .quick-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .quick-scroll::-webkit-scrollbar-track {
          background: linear-gradient(180deg, rgba(0,0,0,0.12), rgba(255,255,255,0.02));
          border-radius: 9999px;
        }
        .quick-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(124,58,237,0.95), rgba(56,189,248,0.9));
          border-radius: 9999px;
          border: 2px solid rgba(0,0,0,0.12);
        }
        .quick-scroll::-webkit-scrollbar-thumb:hover {
          filter: brightness(1.04);
        }
        @media (max-width: 640px) {
          .quick-scroll::-webkit-scrollbar { width: 6px; }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-cyan-300">
            Core Skills
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Languages, frameworks and tools I use. Hover a skill for a preview — click "Explore Stacks" for deep-dive trees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left: Grid */}
          <div className="lg:col-span-8">
            <div className="bg-white/2 border border-white/6 rounded-3xl p-4 md:p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Skill Matrix</h3>
                <div className="text-xs sm:text-sm text-slate-300">Hover to preview • Tap on mobile</div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
                {(coreSkills || []).map((skill, idx) => {
                  // Build event props conditionally: only attach mouse hover handlers on hover-capable devices.
                  const eventProps = {
                    onClick: () => setHighlight(skill),      /* tap support for mobile */
                    onFocus: () => setHighlight(skill),
                    onBlur: () => setHighlight(null),
                    tabIndex: 0,
                    className: "outline-none",
                    'aria-label': `Skill ${skill.name}`
                  };

                  if (canHover) {
                    eventProps.onMouseEnter = () => setHighlight(skill);
                    eventProps.onMouseLeave = () => setHighlight(null);
                  }

                  return (
                    <div
                      key={idx}
                      {...eventProps}
                    >
                      <SkillCard skill={skill} />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
                <div className="text-xs text-slate-400">Core technologies I use day-to-day</div>
                <div>
                  <button
                    onClick={() => setShowAdditional(s => !s)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-cyan-400 text-black shadow-md hover:scale-[1.02] transition-transform w-full md:w-auto"
                    aria-expanded={showAdditional}
                    aria-controls="stack-explorer"
                  >
                    {showAdditional ? 'Close Explorer' : 'Explore Stacks'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: preview panel */}
          <aside className="lg:col-span-4 mt-6 lg:mt-0">
            {/* Reduced sticky height so it doesn't stretch too far; still a column so children can share space */}
            <div className="lg:sticky lg:top-20 lg:flex lg:flex-col lg:h-[calc(100vh-12rem)]">
              <div className="bg-gradient-to-br from-white/4 to-white/3 border border-white/8 rounded-3xl p-4 md:p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-3xl md:text-4xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 shadow-lg">
                    {highlight ? (
                      highlight.iconPath ? (
                        <img
                          src={highlight.iconPath}
                          alt={`${highlight.name} logo`}
                          style={{ width: '72%', height: '72%', objectFit: 'contain', display: 'block' }}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <span style={{ fontSize: '1.4rem' }}>{highlight.icon}</span>
                      )
                    ) : (
                      '⚙️'
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-white">{highlight ? highlight.name : (canHover ? 'Hover a skill' : 'Tap a skill')}</h4>
                    <div className="text-xs md:text-sm text-slate-300 mt-1">
                      {activeMeta ? activeMeta.subtitle : 'Preview details here'}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-slate-300 text-sm leading-relaxed min-h-[64px]">
                  {activeMeta ? activeMeta.text : (canHover ? 'Move your mouse over any core skill to see typical uses, pairings and deployment notes.' : 'Tap a skill to see typical uses, pairings and deployment notes.')}
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowAdditional(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition w-full sm:w-auto"
                  >
                    Explore stacks
                  </button>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-slate-200 hover:bg-white/2 transition w-full sm:w-auto text-center"
                  >
                    Work with me
                  </a>
                </div>
              </div>

              {/* Quick notes area with visible styled scrollbar (applies only where it scrolls) */}
              {/* Quick notes area with visible styled scrollbar (applies only where it scrolls) */}
  <div
    className="
      mt-6 p-4 rounded-2xl bg-white/3 border border-white/6
      max-h-[40vh] overflow-auto   /* apply scroll on mobile & tablet */
      lg:max-h-[34.7vh] lg:overflow-auto
      quick-scroll
    "
    aria-live="polite"
  >
    <div className="text-xs text-slate-300 mb-3">Quick notes</div>

    {/* Small badges remain for quick scanning */}
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/6">APIs</span>
      <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/6">Full-stack</span>
      <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/6">Docker</span>
      <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/6">CI / CD</span>
    </div>

    {/* Explanations — constrained by max height and scroll */}
    <div className="space-y-4 text-slate-300 text-sm">
      <div>
        <h5 className="text-sm font-semibold text-white mb-1">APIs</h5>
        <p className="text-xs sm:text-sm leading-relaxed">
          I design and implement RESTful and GraphQL APIs — usually with Django REST Framework or FastAPI. 
          Focused on clear contracts, stable versioning, and efficient pagination/serialization.
        </p>
      </div>

      <div>
        <h5 className="text-sm font-semibold text-white mb-1">Full-stack</h5>
        <p className="text-xs sm:text-sm leading-relaxed">
          Comfortable building end-to-end features: database schemas and migrations, backend business logic, 
          auth flows, and reactive frontend components (React + state management).
        </p>
      </div>

      <div>
        <h5 className="text-sm font-semibold text-white mb-1">Docker</h5>
        <p className="text-xs sm:text-sm leading-relaxed">
          Containerize apps for consistent development and deployment. Compose for local dev, 
          lean multi-stage Dockerfiles for smaller images in production, and sensible health checks.
        </p>
      </div>

      <div>
        <h5 className="text-sm font-semibold text-white mb-1">CI / CD</h5>
        <p className="text-xs sm:text-sm leading-relaxed">
          Automated pipelines for tests, linting, builds and deployments. Prefer incremental checks, 
          parallel jobs for speed, and deployment strategies that reduce risk (canary/blue-green).
        </p>
      </div>

      <div>
        <h5 className="text-sm font-semibold text-white mb-1">Observability</h5>
        <p className="text-xs sm:text-sm leading-relaxed">
          Instrument services with logs, metrics and traces. Fast feedback loops + clear dashboards 
          make debugging far less painful.
        </p>
      </div>

      <div>
        <h5 className="text-sm font-semibold text-white mb-1">Security</h5>
        <p className="text-xs sm:text-sm leading-relaxed">
          Secure defaults: proper auth/session handling, rate-limiting, input validation, 
          and keeping dependencies up to date. Security should be baked into the workflow.
        </p>
      </div>
    </div>


              </div>
            </div>
          </aside>
        </div>

        {/* Explorer: Natural height expansion */}
        <div
          id="stack-explorer"
          ref={explorerRef}
          tabIndex={-1}
          className={`mt-10 transition-all duration-400 ease-in-out overflow-hidden ${
            showAdditional ? 'opacity-100 max-h-none' : 'opacity-0 max-h-0 pointer-events-none'
          }`}
          aria-hidden={!showAdditional}
        >
          <div className="rounded-3xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border-b border-white/10 gap-3">
              <h3 className="text-lg md:text-xl font-bold text-white">Stack Explorer</h3>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="text-xs md:text-sm text-slate-400">Horizontally scroll to explore each stack</div>
                <button
                  onClick={() => setShowAdditional(false)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-white/10 hover:bg-white/20 text-white transition w-full sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Content area - no height restrictions */}
            <div className="p-4 md:p-6">
              <StackExplorer skills={combinedSkills} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
