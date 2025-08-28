import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full mt-12">
      {/* Divider line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="grid grid-cols-3 items-center py-3 px-3 border-t border-white/10 bg-black/30">
        {/* Left spacer */}
        <div />

        {/* Centered copyright */}
        <p className="text-center text-xs sm:text-sm text-gray-400 col-start-2">
          © {year}. All rights reserved.
        </p>

        {/* Logo pinned to the right */}
        <div className="justify-self-end">
          <img
            src="/Logo.png"  // from public
            alt="Logo"
            loading="lazy"
            className="h-8 sm:h-9 w-auto object-contain opacity-90 hover:opacity-100 transition"
          />
        </div>
      </div>
    </footer>
  );
}
