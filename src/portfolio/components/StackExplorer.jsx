// src/portfolio/components/StackExplorer.jsx
import React from "react";
import StackTree from "./StackTree";
import { coreSkills, additionalSkills, stats, socialLinks } from "../data/skills";

/**
 * StackExplorer
 * - Renders horizontally-scrollable cards, each a StackTree
 * - Props: skills: array (for icon lookup)
 *
 * NOTE:
 * We import coreSkills and additionalSkills and use their iconPath/icon when available.
 * Public images are referenced by their paths (e.g. "/react.svg"), which should exist in /public.
 */

const fallbackIcons = {
  "tailwind": "💨",
  "mui": "🎛️",
  "material ui": "🎛️",
  "bootstrap": "📦",
  "drf": "🛰️",
  "django rest framework": "🛰️",
  "sqlite": "📚",
  "node": "🟢",
  "node.js": "🟢",
  "fastapi": "⚡",
  "postgre": "💾",
  "postgresql": "💾",
  "git": "🔧",
  "docker": "🐳"
};

/**
 * svgMap
 * Map common key substrings to files in /public (root).
 * These filenames match the `public/` tree you shared.
 * We keep this as a secondary option (useful if a skill doesn't carry iconPath).
 */
const svgMap = {
  python: "/python.svg",
  django: "/django.svg",
  "django rest framework": "/Django REST.svg",
  drf: "/Django REST.svg",
  react: "/react.svg",
  node: "/node.svg",
  "node.js": "/node.svg",
  postgre: "/postgre.svg",
  postgresql: "/postgre.svg",
  git: "/git.svg",
  js: "/js.svg",
  javascript: "/js.svg",
  html: "/html.svg",
  css: "/css.svg",
  rust: "/rust.svg",
  github: "/github.svg",
  database: "/database.svg",
  tailwind: "/tailwind.svg",
  bootstrap: "/bootstrap.svg",
  mui: "/mui.svg"
  
};

/**
 * IconImg
 * Small helper that attempts to load an image from /public and falls back to an emoji
 * if the image fails to load.
 *
 * We encode the URI to handle spaces like "linked in.jpg" and use a simple onError to show fallback.
 * Accepts width and height (in px) so we can make specific icons larger (Node.js / Docker).
 */
function IconImg({ src, alt, fallback, width = 20, height = 20, className = "" }) {
  const [ok, setOk] = React.useState(true);

  if (!src) return <span style={{ display: "inline-block", width, height, lineHeight: `${height}px` }}>{fallback ?? "🔹"}</span>;

  if (ok) {
    return (
      <img
        src={encodeURI(src)}
        alt={alt}
        className={className}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          marginRight: "0.5rem"
        }}
        onError={() => setOk(false)}
      />
    );
  }

  return <span style={{ display: "inline-block", width, height, lineHeight: `${height}px`, marginRight: "0.5rem" }}>{fallback ?? "🔹"}</span>;
}

/**
 * buildLookupSkills
 * Combine imported skills (core + additional) plus any provided skills prop later,
 * returning a normalized array to search when resolving icons.
 */
const buildLookupSkills = (extra = []) => {
  // prefer iconPath from the data file; merge arrays
  const merged = [...coreSkills, ...additionalSkills, ...extra];
  // normalize name lower-case for faster comparisons (we keep original objects)
  return merged;
};

const inferIcon = (skillsFromProps, name) => {
  const skills = buildLookupSkills(skillsFromProps);

  // 1) check passed-in skill objects (from data files) for an exact/substring match
  if (Array.isArray(skills)) {
    const found = skills.find(s => s && s.name && s.name.toLowerCase().includes(name.toLowerCase()));
    if (found) {
      // if there's an iconPath prefer using it
      if (found.iconPath) {
        // make Node/Node.js and Docker icons larger (44px)
        const keyLower = (found.name || "").toLowerCase();
        if (keyLower.includes("node") || keyLower.includes("docker")) {
          return <IconImg src={found.iconPath} alt={found.name} fallback={found.icon ?? "🔹"} width={44} height={44} />;
        }
        return <IconImg src={found.iconPath} alt={found.name} fallback={found.icon ?? "🔹"} />;
      }
      // else if there's an emoji/icon string return it
      if (found.icon && (typeof found.icon === "string")) {
        // if it's node/docker and an emoji, render a noticeably bigger span
        const fn = (found.name || "").toLowerCase();
        if (fn.includes("node") || fn.includes("docker")) {
          return <span style={{ fontSize: 26, marginRight: 8 }}>{found.icon}</span>;
        }
        return found.icon;
      }
      // if icon is a React node, return as-is
      if (found.icon && React.isValidElement(found.icon)) return found.icon;
    }
  }

  const key = name.toLowerCase();

  // 2) try the svgMap fallback by substring
  for (const k of Object.keys(svgMap)) {
    if (key.includes(k)) {
      // bump Node and Docker size here too (44px)
      if (k === "node" || k === "docker") {
        return <IconImg src={svgMap[k]} alt={name} fallback={fallbackIcons[k] ?? "🔹"} width={44} height={44} />;
      }
      return <IconImg src={svgMap[k]} alt={name} fallback={fallbackIcons[k] ?? "🔹"} />;
    }
  }

  // 3) fallback emoji map
  for (const k of Object.keys(fallbackIcons)) {
    if (key.includes(k)) {
      // make node/docker emoji a bit larger
      if (k === "node" || k === "node.js" || k === "docker") return <span style={{ fontSize: 26, marginRight: 8 }}>{fallbackIcons[k]}</span>;
      return fallbackIcons[k];
    }
  }

  // final default
  return "🔹";
};

const stackDefinitions = (skills = []) => {
  // full set of stacks you gave me (plus close relatives)
  return [
    {
      name: "Python",
      icon: inferIcon(skills, "python"),
      tree: [
        { title: "Primary uses", children: [{ title: "Backend APIs (Django, DRF, FastAPI)" }, { title: "Data analysis & ML (pandas, numpy)" }, { title: "Scripting & automation" }] },
        { title: "Frameworks & tools", children: [{ title: "Django / DRF" }, { title: "FastAPI" }, { title: "Jupyter" }] },
        { title: "Deploy & infra", children: [{ title: "Docker images" }] }
      ]
    },

    {
      name: "Django",
      icon: inferIcon(skills, "django"),
      tree: [
        { title: "Role", children: [{ title: "Full-featured backend framework" }, { title: "Admin, ORM, Auth out of the box" }] },
        { title: "Common pairing", children: [{ title: "Django REST Framework (APIs)" }, { title: "PostgreSQL for production" }, { title: "Celery for background tasks" }] },
        { title: "When to use", children: [{ title: "Fast development with conventions" }, { title: "Data-driven apps, admin dashboards" }] }
      ]
    },

    {
      name: "Django REST Framework (DRF)",
      icon: inferIcon(skills, "django"),
      tree: [
        { title: "Purpose", children: [{ title: "Build REST APIs rapidly" }, { title: "Serializers & viewsets" }] },
        { title: "Pairings", children: [{ title: "Django + DRF + JWT auth" }, { title: "React / Mobile clients" }] }
      ]
    },

    {
      name: "JavaScript",
      icon: inferIcon(skills, "javascript"),
      tree: [
        { title: "Role", children: [{ title: "Language of the web: browser + server (Node)" }, { title: "Async/event-driven programming" }] },
        { title: "Ecosystem", children: [{ title: "Node.js, npm/yarn, tooling (Vite, Webpack)" }, { title: "Transpilers: Babel, TypeScript" }] }
      ]
    },

    {
      name: "Node.js",
      icon: inferIcon(skills, "node"),
      tree: [
        { title: "Role", children: [{ title: "Server-side JS runtime" }, { title: "API servers, realtime sockets" }] },
        { title: "Common libs", children: [{ title: "Express, Fastify" }, { title: "Socket.io" }] }
      ]
    },

    {
      name: "React",
      icon: inferIcon(skills, "react"),
      tree: [
        { title: "UI role", children: [{ title: "Component-driven SPAs" }, { title: "Hooks, context, concurrent patterns" }] },
        { title: "Testing & build", children: [{ title: "Jest, React Testing Library" }, { title: "Vite / CRA / Next.js for SSR" }] },
        { title: "Styling & UI libs", children: [{ title: "Tailwind CSS" }, { title: "Material UI (MUI)" }, { title: "Bootstrap" }] }
      ]
    },

    {
      name: "HTML & CSS",
      // combine two icons into a React fragment so both (SVG or fallback) render correctly
      icon: (
        <>
          {inferIcon(skills, "html")}{" "}
          {inferIcon(skills, "css")}
        </>
      ),
      tree: [
        { title: "Core", children: [{ title: "Semantic HTML" }, { title: "Responsive & accessible CSS" }] },
        { title: "Frameworks", children: [{ title: "Tailwind (utility-first)" }, { title: "Bootstrap (component-based)" }] }
      ]
    },

    {
      name: "Tailwind CSS",
      icon: inferIcon(skills, "tailwind"),
      tree: [
        { title: "Role", children: [{ title: "Utility-first styling" }, { title: "Rapid layout & theming" }] },
        { title: "Pairings", children: [{ title: "React + Tailwind" }, { title: "Component libraries (headless UI)" }] }
      ]
    },

    {
      name: "MUI (Material UI)",
      icon: inferIcon(skills, "mui"),
      tree: [
        { title: "Role", children: [{ title: "Prebuilt React components" }, { title: "Design system & themeable UI" }] },
        { title: "Use", children: [{ title: "Dashboards, admin panels, forms" }] }
      ]
    },

    {
      name: "Bootstrap",
      icon: inferIcon(skills, "bootstrap"),
      tree: [
        { title: "Role", children: [{ title: "Component-based CSS framework" }, { title: "Quick responsive layout" }] },
        { title: "Use", children: [{ title: "Prototypes, admin UIs, legacy support" }] }
      ]
    },

    {
      name: "Databases",
      icon: inferIcon(skills, "database"),
      tree: [
        { title: "PostgreSQL", children: [{ title: "ACID, production-ready" }, { title: "Advanced features: JSONB, indexing" }] },
        { title: "SQLite", children: [{ title: "Lightweight, local dev & prototypes" }] },
        { title: "Notes", children: [{ title: "Migrations, backups, connection pooling" }] }
      ]
    },

    {
      name: "Docker & DevOps",
      icon: inferIcon(skills, "docker"),
      tree: [
        { title: "Containers", children: [{ title: "Reproducible runtime (images)" }, { title: "Compose for multi-service dev" }] },
        { title: "CI/CD & Cloud", children: [{ title: "CI pipelines, image registries" }, { title: "Deploy to cloud (Render, DigitalOcean)" }] },
        { title: "Versioning", children: [{ title: "Git for source control" }] }
      ]
    },

    {
      name: "Git",
      icon: inferIcon(skills, "git"),
      tree: [
        { title: "Purpose", children: [{ title: "Source control" }, { title: "Branching strategies (GitFlow, trunk)" }] },
        { title: "Pairings", children: [{ title: "CI integrations" }, { title: "Code reviews & PRs" }] }
      ]
    }
  ];
};

export default function StackExplorer({ skills = [], className = "" }) {
  // pass through any skills prop (optional) but also use imported data in inferIcon
  const stacks = stackDefinitions(skills);

  const handleWheel = (e) => {
    // Only prevent page scroll if we can actually scroll horizontally
    const container = e.currentTarget;
    const canScrollLeft = container.scrollLeft > 0;
    const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth;

    if (canScrollLeft || canScrollRight) {
      e.stopPropagation();
    }
  };

  return (
    <div className={`${className}`}>
      {/* Scoped scrollbar styles for the horizontal scroll area */}
      <style>{`
        /* target the stack-scroll container's horizontal scrollbar */
        .stack-scroll {
          scrollbar-width: thin; /* firefox */
          scrollbar-color: rgba(124,58,237,0.9) rgba(255,255,255,0.04);
        }
        .stack-scroll::-webkit-scrollbar {
          height: 12px;
        }
        .stack-scroll::-webkit-scrollbar-track {
          background: linear-gradient(90deg, rgba(0,0,0,0.25), rgba(255,255,255,0.02));
          border-radius: 9999px;
        }
        .stack-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, rgba(124,58,237,0.95), rgba(56,189,248,0.9));
          border-radius: 9999px;
          border: 3px solid rgba(0,0,0,0.18); /* gives thumb a slight inset feel */
        }
        .stack-scroll::-webkit-scrollbar-thumb:hover {
          filter: brightness(1.05);
        }

        /* Small responsive tweak: thinner on small screens */
        @media (max-width: 640px) {
          .stack-scroll::-webkit-scrollbar { height: 8px; }
        }
      `}</style>

      <div className="relative rounded-3xl">
        {/* Header */}
        <div className="text-center mb-8 px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-cyan-300 to-purple-400 tracking-tight">
            Technology Stack Deep Dive
          </h3>
          <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-4 rounded-full"></div>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-light px-2">
            Scroll horizontally to explore each technology stack in detail.{" "}
            <span className="text-cyan-300 font-medium"> Just Scroll And GO.</span>
          </p>
        </div>

        {/* Scroll Hint */}
        <div className="flex justify-center mb-6 px-2">
          <div className="flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl border border-white/10">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm sm:text-base text-slate-400 font-medium">Drag to scroll horizontally</span>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          className="relative -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-x-auto overflow-y-visible stack-scroll"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
          onWheel={handleWheel}
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Gradient fade effects */}
          <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-l from-black/20 to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-6 sm:gap-8 pb-8" style={{ minWidth: "max-content" }}>
            {stacks.map((stack, idx) => (
              <div
                key={idx}
                className="min-w-[260px] sm:min-w-[320px] md:min-w-[360px] max-w-[400px] flex-shrink-0 transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                style={{
                  animationDelay: `${idx * 0.1}s`
                }}
              >
                <StackTree stack={stack} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer tip */}
        <div className="mt-6 sm:mt-8 text-center px-2">
          <div className="inline-flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl border border-white/10">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"></div>
            <span className="text-sm sm:text-base text-slate-400 font-medium">
              Each stack shows the complete technology ecosystem and common patterns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
