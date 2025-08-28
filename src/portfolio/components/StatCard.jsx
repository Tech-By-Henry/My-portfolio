// src/portfolio/components/StatCard.jsx
import React from 'react';

export default function StatCard({ stat }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 text-center shadow-2xl hover:shadow-purple-500/20 transform hover:scale-105 transition-all duration-500">
      <div className="text-4xl md:text-5xl font-black text-purple-400 mb-4">
        {stat.number}
      </div>
      <div className="text-slate-300 font-medium">{stat.label}</div>
    </div>
  );
}
