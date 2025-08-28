// src/portfolio/components/StackTree.jsx
import React from "react";

/**
 * Recursive tree node renderer
 * node = { title: string, subtitle?: string, children?: [node] }
 */
function TreeNode({ node, level = 0 }) {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <div
        className={`
          flex items-center gap-3 py-2 px-3 rounded-xl shadow-sm
          ${level === 0 ? "bg-white/6 border border-white/8" : "bg-white/3"}
          w-full
        `}
        style={{ minWidth: 160 }}
      >
        {/* Bullet */}
        <div className="text-lg font-semibold text-purple-100 flex-shrink-0">•</div>

        {/* Title + subtitle */}
        <div className="text-sm break-words">
          <div className="font-semibold text-white leading-tight text-xs sm:text-sm md:text-base">
            {node.title}
          </div>
          {node.subtitle && (
            <div className="text-xs text-slate-300 mt-0.5">{node.subtitle}</div>
          )}
        </div>
      </div>

      {/* Children */}
      {node.children && node.children.length > 0 && (
        <div className="ml-3 sm:ml-6 border-l border-white/6 pl-3 sm:pl-4 mt-1 space-y-3 w-full">
          {node.children.map((child, i) => (
            <TreeNode node={child} key={i} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function StackTree({ stack }) {
  return (
    <div
      className="
        p-4 sm:p-6 
        bg-gradient-to-b from-black/40 to-white/2 
        rounded-2xl shadow-2xl 
        min-h-[220px] sm:min-h-[280px] 
        w-full
      "
    >
      {/* Scoped scrollbar styles for the tree scroll area */}
      <style>{`
        /* Firefox */
        .tree-scroll {
          scrollbar-width: thin;
          scrollbar-color: #7c3aed rgba(255,255,255,0.02);
        }
        /* WebKit (Chrome, Safari) */
        .tree-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .tree-scroll::-webkit-scrollbar-track {
          background: linear-gradient(180deg, rgba(0,0,0,0.18), rgba(255,255,255,0.02));
          border-radius: 9999px;
        }
        .tree-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(124,58,237,0.95), rgba(56,189,248,0.95));
          border-radius: 9999px;
          border: 2px solid rgba(0,0,0,0.14);
        }
        .tree-scroll::-webkit-scrollbar-thumb:hover {
          filter: brightness(1.06);
        }
        /* thinner on very small screens */
        @media (max-width: 640px) {
          .tree-scroll::-webkit-scrollbar { width: 6px; }
        }
      `}</style>

      {/* Header */}
      <h4
        className="
          text-lg sm:text-xl md:text-2xl 
          font-bold mb-4 text-white 
          flex items-center gap-2 sm:gap-3 flex-wrap
        "
      >
        <span className="text-xl sm:text-2xl md:text-3xl">
          {stack.icon || "🔧"}
        </span>
        <span className="truncate">{stack.name}</span>
      </h4>

      {/* Tree content with styled scrollbar */}
      <div
        className={`
          space-y-3 sm:space-y-4 w-full 
          max-h-[400px] overflow-auto tree-scroll
        `}
      >
        {Array.isArray(stack.tree) &&
          stack.tree.map((rootNode, idx) => (
            <TreeNode node={rootNode} key={idx} />
          ))}
      </div>
    </div>
  );
}
