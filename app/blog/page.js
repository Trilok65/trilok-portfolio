"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import { getPortfolioContent } from "../lib/portfolio-store";

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState(getPortfolioContent().blogPosts);
  const categories = ["All", "DevOps & Cloud", "Linux & Systems", "Web Engineering"];

  useEffect(() => {
    const sync = () => {
      setPosts(getPortfolioContent().blogPosts);
    };

    sync();
    window.addEventListener("portfolio-content-updated", sync);

    return () => window.removeEventListener("portfolio-content-updated", sync);
  }, []);

  const filtered =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header variant="blog" />

      <main className="mx-auto max-w-5xl px-6 py-14">
        <p className="font-mono text-sm uppercase tracking-wider text-emerald-400">
          // Technical Knowledge Base
        </p>
        <h1 className="mt-2 mb-4 text-3xl font-extrabold sm:text-5xl">
          DevOps, Linux &amp; Web Engineering Notes
        </h1>
        <p className="mb-8 max-w-2xl text-base text-slate-400">
          Practical guides, deployment checklists, and troubleshooting notes from my work
          building Next.js/WordPress platforms and managing Linux/CI-CD infrastructure.
        </p>

        <div className="mb-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm text-slate-200">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
            // Daily blog publishing
          </p>
          <p className="leading-relaxed text-slate-300">
            To publish a new daily post, add a new object to <span className="font-mono text-emerald-300">app/data/blogs.js</span> with:
            <span className="mt-2 block font-mono text-xs text-slate-200">
              slug, title, date, readTime, category, tags, excerpt, content
            </span>
            Then save the file and run <span className="font-mono text-emerald-300">npm run build</span> to confirm it renders correctly.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-4 py-2 text-xs font-mono transition ${
                selectedCategory === category
                  ? "bg-emerald-500 font-bold text-slate-950"
                  : "border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-slate-400">
              No blog posts in this category yet.
            </p>
          ) : filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-emerald-500/50 sm:p-8"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-400">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="mb-2 text-xl font-bold text-slate-100 transition group-hover:text-emerald-400 sm:text-2xl">
                {post.title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-cyan-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
