// src/portfolio/components/Contact.jsx
import React from 'react';
import { socialLinks as socialLinksData } from '../data/skills';

/**
 * Contact
 * - Mobile/Tablet: Icon and header centered at top, content below arranged left to right
 * - Desktop: Maintains horizontal layout with icon on left
 * - Layout responsive based on screen size
 * - Supports: linkedin, upwork, github, twitter, email, call, follow, location
 */

function IconImg({ src, alt, fallback = '🔗', size = 28, className = '' }) {
  const [ok, setOk] = React.useState(true);

  const fontSize = `${Math.floor(size * 0.9)}px`;

  if (!src) {
    return (
      <span
        style={{
          display: 'inline-block',
          width: `${size}px`,
          height: `${size}px`,
          lineHeight: `${size}px`,
          textAlign: 'center',
          fontSize,
        }}
        className={className}
        aria-hidden="true"
      >
        {fallback}
      </span>
    );
  }

  if (ok) {
    return (
      <img
        src={encodeURI(src)}
        alt={alt || ''}
        onError={() => setOk(false)}
        style={{
          display: 'inline-block',
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
        }}
        className={className}
      />
    );
  }

  return (
    <span
      style={{
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
        textAlign: 'center',
        fontSize,
      }}
      className={className}
      aria-hidden="true"
    >
      {fallback}
    </span>
  );
}

/**
 * normalizeSocialSources
 */
function normalizeSocialSources(socialLinksProp = {}, socialLinksDataArr = []) {
  const result = {
    linkedin: { href: '#', label: 'LinkedIn', iconPath: '/linkedin.svg', icon: '💼' },
    upwork: { href: 'https://www.upwork.com/freelancers/~0105e7000766f5f7d2?mp_source=share', label: 'Upwork', iconPath: '/upwork.svg', icon: '🔧' },
    github: { href: '#', label: 'GitHub', iconPath: '/github.svg', icon: '💻' },
    twitter: { href: '#', label: 'Twitter', iconPath: '/x.svg', icon: '🐦' },
    email: { href: 'mailto:techbyhenry@gmail.com', label: 'Email', iconPath: '/email.svg', icon: '📧' },
    call: { href: 'tel:+2348143220785', label: 'Call', iconPath: '/call.svg', icon: '📞' },
    follow: { href: '#', label: 'Follow My Journey', iconPath: '/follow_my_journey.svg', icon: '💼' },
    location: { href: '#', label: 'Location', iconPath: '/location.svg', icon: '📍' },
  };

  // prefer explicit hrefs from props
  if (socialLinksProp && typeof socialLinksProp === 'object') {
    Object.keys(result).forEach((k) => {
      if (socialLinksProp[k]) result[k].href = socialLinksProp[k];
    });
  }

  // merge info from skills.js array
  if (Array.isArray(socialLinksDataArr)) {
    socialLinksDataArr.forEach((entry) => {
      if (!entry) return;
      const rawLabel = (entry.label || entry.name || '').toLowerCase();
      if (!rawLabel) return;

      const targetKey =
        rawLabel.includes('linkedin') ? 'linkedin' :
        rawLabel.includes('upwork') ? 'upwork' :
        rawLabel.includes('github') ? 'github' :
        rawLabel.includes('twitter') || rawLabel === 'x' ? 'twitter' :
        rawLabel.includes('email') ? 'email' :
        rawLabel.includes('call') || rawLabel.includes('phone') ? 'call' :
        rawLabel.includes('follow') || rawLabel.includes('journey') ? 'follow' :
        rawLabel.includes('location') ? 'location' :
        null;

      if (targetKey) {
        if (entry.href) result[targetKey].href = entry.href;
        if (entry.iconPath) result[targetKey].iconPath = entry.iconPath;
        if (entry.icon) result[targetKey].icon = entry.icon;
        if (entry.label) result[targetKey].label = entry.label;
      }
    });
  }

  return result;
}

export default function Contact({ socialLinks = {}, email = "techbyhenry@gmail.com" }) {
  const socials = normalizeSocialSources(socialLinks, socialLinksData);

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Drop me a line and let's create something amazing.
          </p>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {/* Email Card */}
          <div
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-4 md:p-6 shadow-md hover:bg-white/10 transition-all duration-300"
            role="group"
            aria-label="Email contact card"
          >
            {/* Mobile/Tablet Layout: Icon and header side by side at top */}
            <div className="md:hidden flex items-center gap-3 mb-4">
              <IconImg src={socials.email.iconPath} alt={socials.email.label} fallback="📧" size={24} />
              <h3 className="text-base font-semibold text-purple-300">Email Me</h3>
            </div>

            {/* Desktop Layout: Icon on left, content on right */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center">
                <IconImg src={socials.email.iconPath} alt={socials.email.label} fallback="📧" size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-purple-300">Email Me</h3>
              </div>
            </div>

            {/* Content arranged left to right (mobile/tablet) or continuation of desktop */}
            <div className="md:ml-20">
              <a
                href={socials.email.href || `mailto:${email}`}
                className="block text-white text-sm mt-1 hover:text-purple-300 whitespace-normal break-words"
                aria-label="Send email"
              >
                {email}
              </a>
              <div className="text-slate-400 text-xs mt-2">Best for detailed project discussions</div>
            </div>
          </div>

          {/* Phone Card */}
          <div
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-4 md:p-6 shadow-md hover:bg-white/10 transition-all duration-300"
            role="group"
            aria-label="Phone contact card"
          >
            {/* Mobile/Tablet Layout: Icon and header side by side at top */}
            <div className="md:hidden flex items-center gap-3 mb-4">
              <IconImg src={socials.call.iconPath} alt={socials.call.label} fallback="📞" size={24} />
              <h3 className="text-base font-semibold text-cyan-300">Call Me</h3>
            </div>

            {/* Desktop Layout: Icon on left, content on right */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center">
                <IconImg src={socials.call.iconPath} alt={socials.call.label} fallback="📞" size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-cyan-300">Call Me</h3>
              </div>
            </div>

            {/* Content arranged left to right (mobile/tablet) or continuation of desktop */}
            <div className="md:ml-20">
              <a
                href={socials.call.href}
                className="block text-white text-sm mt-1 hover:text-cyan-300 whitespace-normal"
                aria-label="Call phone number"
              >
                +234 814 322 0785
              </a>
              <div className="text-slate-400 text-xs mt-2">Quick chats and urgent matters</div>
            </div>
          </div>

          {/* Location Card */}
          <div
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-4 md:p-6 shadow-md"
            role="group"
            aria-label="Location card"
          >
            {/* Mobile/Tablet Layout: Icon and header side by side at top */}
            <div className="md:hidden flex items-center gap-3 mb-4">
              <IconImg src={socials.location.iconPath} alt={socials.location.label} fallback="📍" size={24} />
              <h3 className="text-base font-semibold text-green-300">Location</h3>
            </div>

            {/* Desktop Layout: Icon on left, content on right */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center">
                <IconImg src={socials.location.iconPath} alt={socials.location.label} fallback="📍" size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-green-300">Location</h3>
              </div>
            </div>

            {/* Content arranged left to right (mobile/tablet) or continuation of desktop */}
            <div className="md:ml-20">
              <p className="text-white text-sm mt-1 leading-relaxed whitespace-normal">Lagos, Nigeria</p>
              <div className="text-slate-400 text-xs mt-2 leading-relaxed">WAT timezone • Remote work available</div>
              
              {/* Additional content for tablet and desktop to fill space */}
              <div className="hidden sm:block mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                  <span>🌍</span>
                  <span>Global collaboration welcome</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <span>⏰</span>
                  <span>Available 9 AM - 6 PM WAT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-4 md:p-6 shadow-md">
            {/* Mobile/Tablet Layout: Icon and header side by side at top */}
            <div className="md:hidden flex items-center gap-3 mb-4">
              <IconImg src={socials.follow.iconPath} alt={socials.follow.label} fallback="💼" size={24} />
              <h3 className="text-base font-semibold text-yellow-300">Follow My Journey</h3>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center">
                <IconImg src={socials.follow.iconPath} alt={socials.follow.label} fallback="💼" size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-yellow-300">Follow My Journey</h3>
              </div>
            </div>

            {/* Content section */}
            <div className="md:ml-20">
              <p className="text-slate-400 text-xs md:text-sm mt-2 mb-3">Catch updates, open-source work, and short project notes.</p>

              {/* Links grid — arranged left to right */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {[
                  { key: 'linkedin', desc: 'Professional updates' },
                  { key: 'upwork', desc: 'Freelance gigs' },
                  { key: 'github', desc: 'Open-source' },
                  { key: 'twitter', desc: 'Micro-updates' },
                ].map(({ key, desc }) => {
                  const item = socials[key];
                  return (
                    <a
                      key={key}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-2 sm:p-3 rounded-lg bg-white/3 border border-white/6 hover:translate-y-[-2px] transition-transform text-sm w-full"
                      aria-label={`Open ${item.label}`}
                    >
                      <div className="flex-shrink-0">
                        <IconImg src={item.iconPath} alt={item.label} size={18} fallback={item.icon} />
                      </div>

                      <div className="min-w-0 text-left">
                        <div className="text-white font-medium whitespace-normal">{item.label}</div>
                        <div className="text-slate-400 text-xs sm:whitespace-normal">{desc}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">Ready to Start Your Project?</h3>
            <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-2xl mx-auto whitespace-normal">
              Whether you need a simple website or a complex application, I'm here to help turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={`mailto:${email}`}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl font-semibold text-white hover:scale-105 transform transition-all duration-200 text-center"
                aria-label="Send email CTA"
              >
                Send Email
              </a>
              <a
                href="tel:+2348143220785"
                className="w-full sm:w-auto px-6 py-3 bg-white/10 border border-white/20 rounded-2xl font-semibold text-white hover:bg-white/20 transform transition-all duration-200 text-center"
                aria-label="Call now CTA"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}