"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import { getPortfolioContent } from "../../lib/portfolio-store";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const syncPost = () => {
      const content = getPortfolioContent();
      const found = content.blogPosts.find((item) => item.slug === slug);
      setPost(found || null);
    };

    syncPost();
    window.addEventListener("portfolio-content-updated", syncPost);

    return () => window.removeEventListener("portfolio-content-updated", syncPost);
  }, [slug]);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-slate-100">
        <h1 className="mb-4 text-2xl font-bold">Article Not Found</h1>
        <Link href="/blog" className="font-mono text-emerald-400 underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header variant="article" />

      <article className="mx-auto max-w-3xl px-6 py-14">
        <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
          <span className="rounded border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-emerald-400">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mb-10 flex flex-wrap gap-2 border-b border-slate-800 pb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-xs text-cyan-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="space-y-8">
          {post.content.map((section, index) => (
            <div key={`${section.heading}-${index}`} className="space-y-3">
              <h2 className="text-xl font-bold text-slate-100">{section.heading}</h2>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{section.body}</p>
              {section.code && (
                <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs leading-relaxed text-emerald-400">
                  {section.code}
                </pre>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold text-slate-100">Written by Trilok Neupane</p>
            <p className="text-xs text-slate-400">
              Web Developer &amp; Junior DevOps Engineer • Lalitpur, Nepal
            </p>
          </div>
          <Link
            href="/#contact"
            className="rounded-lg bg-emerald-500 px-4 py-2 font-mono text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            Get in Touch →
          </Link>
        </div>
      </article>
    </div>
  );
}
