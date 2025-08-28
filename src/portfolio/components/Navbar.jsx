// src/portfolio/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import useScroll from "../hooks/useScroll";
import { Menu, X } from "lucide-react";

const NavLinks = ["home", "about", "projects", "skills", "stats", "contact"];

export default function Navbar() {
  const isNavbarScrolled = useScroll(50);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const mobileMenuRef = useRef(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
      setActive(id);
    }
  };

  useEffect(() => {
    // IntersectionObserver to set active link when a section is in viewport
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observers = [];
    const options = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) setActive(id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    NavLinks.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observers.push({ observer, el });
      }
    });

    return () => {
      observers.forEach(({ observer, el }) => {
        try {
          observer.unobserve(el);
        } catch (e) {
          /* noop */
        }
      });
      try {
        observer.disconnect();
      } catch (e) {
        /* noop */
      }
    };
  }, []);

  // Prevent page body scroll when mobile menu is open, but allow the menu itself to scroll.
  useEffect(() => {
    const originalOverflow = typeof window !== "undefined" ? document.body.style.overflow : "";
    const originalTouchAction = typeof window !== "undefined" ? document.body.style.touchAction : "";

    if (isOpen) {
      // lock body scroll
      document.body.style.overflow = "hidden";
      // allow touch scrolling inside the menu element while preventing default page panning
      document.body.style.touchAction = "none";
    } else {
      // restore
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    }

    // cleanup on unmount
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      }
    };
  }, [isOpen]);

  // Close on escape for accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Prevent overscroll bounce on iOS inside the menu by stopping touchmove on the body when touching outside menu.
  useEffect(() => {
    const onTouchMove = (e) => {
      // if menu is open and touch is outside the mobile menu container, prevent body scroll
      if (!isOpen) return;
      if (!mobileMenuRef.current) return;

      if (!mobileMenuRef.current.contains(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => document.removeEventListener("touchmove", onTouchMove);
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isNavbarScrolled ? "backdrop-blur-xl bg-black/60" : "backdrop-blur-0 bg-transparent"
        }`}
        style={{ height: "72px" }} /* increased height for breathing room */
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between py-2">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            aria-label="Go to home"
            className="flex items-center gap-3 focus:outline-none h-full"
          >
            <div className="flex items-center h-full">
              <img
                src="/Logo.png"
                alt="Henry logo"
                loading="eager"
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                style={{ maxHeight: "64px" }}
              />
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
            {NavLinks.map((item) => {
              const isActive = active === item;
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-200 px-3 lg:px-4 py-1 rounded-xl text-sm lg:text-base font-medium text-white relative focus:outline-none
                    ${isActive ? "bg-white/10 text-purple-300" : ""}
                    hover:bg-white/10 hover:text-purple-400`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Mobile Icon (spinning hamburger/X) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((s) => !s)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="p-2 rounded-md transition-transform duration-200 focus:outline-none text-white hover:text-purple-400 active:scale-95"
            >
              <div className="relative w-6 h-6">
                <Menu
                  strokeWidth={2}
                  className={`absolute inset-0 transform transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-180 opacity-0 scale-0" : "rotate-0 opacity-100 scale-100"
                  }`}
                />
                <X
                  strokeWidth={2}
                  className={`absolute inset-0 transform transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-180 opacity-0 scale-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - fixed overlay that scrolls independently */}
        <div
          className={`md:hidden fixed left-0 right-0 top-[72px] bottom-0 z-50 transition-all duration-300 ${
            isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
          }`}
          aria-hidden={!isOpen}
        >
          <div
            ref={mobileMenuRef}
            className={`h-full overflow-y-auto -webkit-overflow-scrolling-touch bg-black/95 backdrop-blur-2xl border border-white/10 m-2 rounded-2xl shadow-2xl`}
            style={{
              // ensure it's a true scrolling region on mobile (iOS)
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Mobile Menu Header */}
            <div className="p-3 border-b border-white/8 bg-gradient-to-r from-purple-600/6 to-cyan-600/6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-32 sm:w-36 overflow-hidden flex items-center justify-center">
                  <img
                    src="/favico.png"
                    alt="Henry favicon"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    style={{ maxHeight: "56px" }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">Henry's Portfolio</h3>
                  <p className="text-gray-400 text-xs truncate">Navigate through my work</p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-xs">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="p-2 space-y-1">
              {NavLinks.map((item, index) => {
                const isActive = active === item;
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`group w-full text-left p-3 rounded-lg transition-all duration-200 border border-transparent active:scale-[0.99]
                      ${isActive ? "bg-white/10" : ""}
                      hover:bg-gradient-to-r hover:from-purple-600/16 hover:to-cyan-600/16`}
                    style={{
                      animationDelay: `${index * 40}ms`,
                      transform: isOpen ? "translateX(0)" : "translateX(-10px)",
                      animation: isOpen ? `slideInMobile 0.28s ease-out ${index * 40}ms both` : "none",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-purple-600/30 transition-all duration-200 ${isActive ? "bg-white/5" : "bg-white/5"}`}>
                          <span className="text-xs text-purple-300 group-hover:text-white">
                            {item === "home"
                              ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                              : item === "about"
                              ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-slash-icon lucide-search-slash"><path d="m13.5 8.5-5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                              : item === "projects"
                              ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-kanban-icon lucide-folder-kanban"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/></svg>
                              : item === "skills"
                              ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cable-car-icon lucide-cable-car"><path d="M10 3h.01"/><path d="M14 2h.01"/><path d="m2 9 20-5"/><path d="M12 12V6.5"/><rect width="16" height="10" x="4" y="12" rx="3"/><path d="M9 12v5"/><path d="M15 12v5"/><path d="M4 17h16"/></svg>
                              : item === "stats"
                              ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-no-axes-combined-icon lucide-chart-no-axes-combined"><path d="M12 16v5"/><path d="M16 14v7"/><path d="M20 10v11"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18v3"/><path d="M8 14v7"/></svg>
                              : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-contact-icon lucide-contact"><path d="M16 2v2"/><path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><path d="M8 2v2"/><circle cx="12" cy="11" r="3"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <span className="capitalize text-white font-medium group-hover:text-purple-300 transition-colors duration-200 text-sm truncate">
                            {item}
                          </span>
                          <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-200 truncate">
                            {item === "home"
                              ? "Back to top"
                              : item === "about"
                              ? "Learn about me"
                              : item === "projects"
                              ? "See my work"
                              : item === "skills"
                              ? "My expertise"
                              : item === "stats"
                              ? "My achievements"
                              : "Get in touch"}
                          </p>
                        </div>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${isActive ? "bg-white/10" : "bg-white/5"} group-hover:bg-purple-600/30`}>
                        <span className="text-xs text-purple-300 group-hover:text-white">→</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/8 bg-gradient-to-r from-black/50 to-purple-900/12">
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-2">Ready to collaborate?</p>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-2 px-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-white font-medium text-sm hover:scale-102 transition-all duration-200 active:scale-99"
                >
                  Let's Work Together
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideInMobile {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
