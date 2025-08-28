// src/portfolio/components/Stats.jsx
import React from 'react';
import StatCard from './StatCard';

export default function Stats({ stats }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 border-t border-b border-white/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Developer Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <StatCard key={idx} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
