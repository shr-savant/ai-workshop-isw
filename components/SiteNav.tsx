"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/hub",                          label: "🏠 Home" },
  { href: "/kit",                          label: "📋 AI Starter Kit" },
  { href: "/playbook.html",               label: "📖 Playbook" },
  { href: "/playground",                  label: "🧪 Playground" },
  { href: "/prompts",                     label: "📚 Prompts" },
{ href: "/shrikant_curie_medical.html", label: "🏥 Curie Medical" },
  { href: "/recipe_keeper.html",          label: "🍳 Recipe Keeper" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".site-nav")) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  return (
    <nav className="site-nav">
      <span className="site-nav-brand">LEAP 2026 · AI Workshop</span>

      {/* Desktop links */}
      <div className="site-nav-links desktop-links">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`site-nav-link${pathname === href || pathname.startsWith(href + "/") ? " current" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Hamburger button — mobile only */}
      <button
        className={`nav-hamburger${open ? " is-open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="mobile-menu">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`mobile-link${pathname === href || pathname.startsWith(href + "/") ? " current" : ""}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .site-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.5rem; height: 3.25rem;
          flex-wrap: wrap;
        }

        /* Hamburger — hidden on desktop */
        .nav-hamburger {
          display: none;
          flex-direction: column; justify-content: center; gap: 5px;
          width: 36px; height: 36px; padding: 6px;
          background: none; border: 1px solid var(--border);
          border-radius: 8px; cursor: pointer;
          flex-shrink: 0;
        }
        .nav-hamburger span {
          display: block; height: 2px; background: var(--ink);
          border-radius: 2px; transition: transform 0.2s, opacity 0.2s;
        }
        .nav-hamburger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-hamburger.is-open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile dropdown */
        .mobile-menu {
          display: none;
          position: absolute; top: 3.25rem; left: 0; right: 0;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          flex-direction: column; padding: 0.5rem 0;
          z-index: 49;
        }
        .mobile-link {
          display: block; padding: 0.75rem 1.5rem;
          font-size: 0.9375rem; font-weight: 500;
          color: var(--ink); text-decoration: none;
          transition: background 0.12s;
          border-left: 3px solid transparent;
        }
        .mobile-link:hover { background: var(--paper); }
        .mobile-link.current {
          color: var(--blue); background: var(--blue-bg);
          border-left-color: var(--blue);
        }

        @media (max-width: 768px) {
          .site-nav { position: sticky; }
          .desktop-links { display: none !important; }
          .nav-hamburger { display: flex; }
          .mobile-menu { display: flex; }
        }
      `}</style>
    </nav>
  );
}
