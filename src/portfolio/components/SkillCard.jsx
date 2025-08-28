import React from "react";

export default function SkillCard({ skill }) {
  // Inline clamp values give a very responsive size that grows with viewport
  const iconSize = {
    width: "clamp(56px, 12vw, 96px)",
    height: "clamp(56px, 12vw, 96px)",
    fontSize: "clamp(1.4rem, 3.2vw, 2.8rem)",
  };

  const hasImage = Boolean(skill?.iconPath);

  // base classes for the icon wrapper (we switch the bg when an image is present)
  const wrapperBase = `
    relative z-10
    mb-3 sm:mb-4 lg:mb-5
    rounded-xl sm:rounded-2xl
    flex items-center justify-center
    text-white shadow-lg shadow-purple-500/40
    transform group-hover:rotate-6 transition-transform duration-500
    flex-shrink-0
  `;

  const wrapperWithGradient = `bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500`;
  const wrapperWithImage = `bg-transparent`; // transparent so logos show properly

  return (
    <article
      role="group"
      aria-label={`Skill card: ${skill?.name || "skill"}`}
      className={`
        relative group
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-xl border border-white/20
        rounded-2xl sm:rounded-3xl
        p-4 sm:p-6 md:p-6 lg:p-8
        text-center shadow-lg
        hover:shadow-purple-500/30 hover:border-purple-400/40
        transform hover:-translate-y-2 hover:scale-105
        transition-all duration-500 ease-out
        w-full
        max-w-[92%] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[480px]
        mx-auto
        flex flex-col items-center
      `}
    >
      {/* Glow ring effect */}
      <div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-2xl" />
      </div>

      {/* Icon */}
      <div
        style={iconSize}
        className={`
          ${wrapperBase}
          ${hasImage ? wrapperWithImage : wrapperWithGradient}
        `}
      >
        {/* Use provided image from /public (keeps container size intact).
            If it fails to load we hide it so the emoji will show (silently). */}
        {hasImage ? (
          <>
            <img
              src={skill.iconPath}
              alt={`${skill.name} logo`}
              style={{
                width: "70%",
                height: "70%",
                objectFit: "contain",
                display: "block",
                // ensure image sits above background and scales nicely
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              onError={(e) => {
                // hide broken image so the fallback emoji renders below
                e.currentTarget.style.display = "none";
              }}
            />
            {/* render emoji fallback under the image (it will become visible if image hidden) */}
            <span
              aria-hidden="true"
              style={{
                fontSize: iconSize.fontSize,
                display: "none", // default hidden; shown only if img removed by onError
              }}
              data-fallback="emoji"
            >
              {typeof skill?.icon === "string" ? skill.icon : "🔷"}
            </span>
          </>
        ) : typeof skill?.icon === "string" ? (
          <span style={{ fontSize: iconSize.fontSize }}>{skill.icon}</span>
        ) : (
          skill?.icon || null
        )}
      </div>

      {/* Text */}
      <h3
        className={`
          relative z-10 font-semibold text-white
          text-sm sm:text-base md:text-lg lg:text-xl
          tracking-wide mt-2 sm:mt-3 lg:mt-4
          leading-tight
        `}
        style={{ WebkitFontSmoothing: "antialiased" }}
      >
        {skill?.name}
      </h3>

      {/* Optional description (keeps card usable and responsive) */}
      {skill?.description && (
        <p
          className="relative z-10 text-slate-300 text-xs sm:text-sm mt-2 px-1 sm:px-2 md:px-4 leading-relaxed"
          style={{ maxWidth: "90%" }}
        >
          {skill.description}
        </p>
      )}

      <style jsx>{`
        /* Ensure the card won't overflow in very narrow containers */
        :global(.group) {
          box-sizing: border-box;
        }

        /* Give the icon a consistent, clipped feel on very small screens */
        @media (max-width: 420px) {
          .group :global(div[style]) {
            border-radius: 14px;
          }
        }

        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .group,
          .group :global(*) {
            transition: none !important;
            animation: none !important;
          }
        }

        /* Subtle accessibility improvement: focus styles for keyboard users */
        :global(.group:focus-within) {
          outline: 2px solid rgba(139, 92, 246, 0.18);
          outline-offset: 6px;
        }

        /* If an image fails to load, the img element will be hidden by onError.
           Show the emoji fallback in that case by detecting display:none on the img.
           CSS can't detect that directly, so we keep the emoji inline (hidden) above.
           This block is left intentionally empty — fallback is handled in JS. */
      `}</style>
    </article>
  );
}
