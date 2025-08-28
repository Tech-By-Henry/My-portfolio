import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full mt-8">
      {/* thin divider to match your theme */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* compact bar: center text, logo at far right */}
      <div className="grid grid-cols-3 items-center py-3 px-3 border-t border-white/10 bg-black/20">
        {/* left spacer (empty) */}
        <div />

        {/* centered text */}
        <p className="text-center text-xs sm:text-sm text-gray-400 col-start-2">
          © {year}. All rights reserved.
        </p>

        {/* logo pinned to the far right */}
        <div className="justify-self-end">
          <img
            src="/Logo.png"            // from /public
            alt="Henry logo"
            loading="lazy"
            className="h-8 sm:h-9 w-auto object-contain opacity-90 hover:opacity-100 transition"
          />
        </div>
      </div>
    </footer>
  );
}
