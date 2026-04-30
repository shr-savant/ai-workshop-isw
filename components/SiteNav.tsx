"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/hub",      label: "🏠 Home" },
  { href: "/kit",      label: "📋 AI Starter Kit" },
  { href: "/playground", label: "🧪 Playground" },
  { href: "/prompts",  label: "📚 Prompts" },
  { href: "/schedule.html", label: "🗓 Schedule" },
  { href: "/shrikant_curie_medical.html", label: "🏥 Curie Medical" },
  { href: "/recipe_keeper.html", label: "🍳 Recipe Keeper" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav">
      <span className="site-nav-brand">LEAP 2026 · AI Workshop</span>
      <div className="site-nav-links">
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
    </nav>
  );
}
