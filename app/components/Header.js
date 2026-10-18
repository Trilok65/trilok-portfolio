"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header({ variant = "home" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (variant === "article") {
    return (
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/blog" className="text-sm font-mono text-emerald-400 hover:underline">
            ← All Engineering Articles
          </Link>
          <Link href="/" className="text-xs font-mono text-slate-400 hover:text-slate-200">
            Portfolio Home
          </Link>
        </div>
      </header>
    );
  }

  if (variant === "blog") {
    return (
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-mono text-lg font-bold tracking-tight">
            ← trilok<span className="text-emerald-400">@blog</span>:~#
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-mono text-slate-200 transition hover:border-emerald-400">
              Admin
            </Link>
            <Link
              href="/cv"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              View / Print CV
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090e1b]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Trilok Neupane home">
            <span className="font-mono text-xl font-black text-cyan-300">&lt;/&gt;</span>
            <span className="text-base font-bold text-white sm:text-lg">
              Trilok<span className="text-cyan-300"> Neupane</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            <a href="#projects" className="transition hover:text-cyan-300">Projects</a>
            <a href="#skills" className="transition hover:text-cyan-300">Expertise</a>
            <Link href="/blog" className="transition hover:text-cyan-300">Articles</Link>
            <a href="#experience" className="transition hover:text-cyan-300">Experience</a>
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/cv"
              className="hidden rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 sm:inline-flex"
            >
              View CV
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-white/15 text-white transition hover:border-cyan-300 hover:text-cyan-300 md:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="grid gap-1 border-t border-white/10 px-6 py-3 text-sm text-slate-200 md:hidden">
            <a href="#projects" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-white/5">Projects</a>
            <a href="#skills" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-white/5">Expertise</a>
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-white/5">Articles</Link>
            <a href="#experience" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-white/5">Experience</a>
            <Link href="/cv" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-cyan-300 hover:bg-white/5">View CV</Link>
          </nav>
        )}
      </header>
    </>
  );
}