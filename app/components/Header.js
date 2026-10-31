"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header({ variant = "home" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (variant === "article") {
    return (
      <header className="site-header">
        <div className="article-nav">
          <Link href="/blog">← All Engineering Articles</Link>
          <Link href="/">Portfolio Home</Link>
        </div>
      </header>
    );
  }

  if (variant === "blog") {
    return (
      <header className="site-header">
        <div className="article-nav">
          <Link href="/" className="blog-brand">
            ← trilok<span className="hero-accent">@blog</span>:~#
          </Link>
          <div className="blog-header-actions">
            <Link href="/admin" className="site-header-action">
              Admin
            </Link>
            <Link href="/cv" className="site-header-action">
              View / Print CV
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="Trilok Neupane home">
          <span className="brand-mark">&lt;/&gt;</span>
          <span className="brand-name">Trilok Neupane</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#projects">Projects</a>
          <a href="#skills">Expertise</a>
          <Link href="/blog">Articles</Link>
          <a href="#experience">Experience</a>
        </nav>
        <Link href="/cv" className="site-header-action">
          View CV
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="menu-toggle"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#skills" onClick={closeMenu}>Expertise</a>
          <Link href="/blog" onClick={closeMenu}>Articles</Link>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <Link href="/cv" onClick={closeMenu}>View CV</Link>
        </nav>
      )}
    </header>
  );
}
