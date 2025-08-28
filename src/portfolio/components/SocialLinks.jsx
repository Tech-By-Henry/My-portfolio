// src/portfolio/components/SocialLinks.jsx
import React from "react";

export default function SocialLinks({ socialLinks }) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-purple-400">
        Follow My Journey
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {socialLinks.map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-blue-500/20 transform hover:scale-105 transition-all duration-300 group"
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {social.icon}
            </div>
            <span className="text-slate-300 text-sm font-medium">{social.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}