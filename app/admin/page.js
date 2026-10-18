"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  addBlogPost,
  clearCvFile,
  createSlug,
  getPortfolioContent,
  removeBlogPost,
  setCvFile,
} from "../lib/portfolio-store";

const defaultBlogForm = {
  title: "",
  category: "DevOps & Cloud",
  excerpt: "",
  tags: "",
  contentHeading: "Daily learning update",
  contentBody: "",
};

export default function AdminPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [form, setForm] = useState(defaultBlogForm);
  const [posts, setPosts] = useState([]);
  const [cvFileName, setCvFileName] = useState("");
  const [notice, setNotice] = useState("Sign in to manage portfolio content.");

  useEffect(() => {
    const sync = () => {
      const content = getPortfolioContent();
      setPosts(content.blogPosts);
      setCvFileName(content.cvFileName || "");
    };

    sync();
    window.addEventListener("portfolio-content-updated", sync);
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => {
        if (response.ok) setIsUnlocked(true);
      })
      .catch(() => setNotice("Unable to verify admin session. Please try again."));

    return () => window.removeEventListener("portfolio-content-updated", sync);
  }, []);

  const handleUnlock = async () => {
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsUnlocked(true);
        setPassword("");
        setNotice("Admin access granted. You can add blog posts and upload a CV.");
        return;
      }

      setNotice("Unable to sign in. Check the password and try again.");
    } catch {
      setNotice("Unable to reach the admin service. Please try again.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    setIsUnlocked(false);
    setNotice("You have been signed out.");
  };

  const handleBlogSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.contentBody.trim()) {
      setNotice("Title and article content are required.");
      return;
    }

    const nextPost = {
      slug: createSlug(form.title),
      title: form.title.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      readTime: "3 min read",
      category: form.category,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      excerpt: form.excerpt.trim() || form.contentBody.slice(0, 120) + "...",
      content: [
        {
          heading: form.contentHeading.trim() || "Daily update",
          body: form.contentBody.trim(),
        },
      ],
    };

    addBlogPost(nextPost);
    setForm(defaultBlogForm);
    setNotice(`Blog post "${nextPost.title}" was added successfully.`);
  };

  const handleBlogDelete = (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      return;
    }

    removeBlogPost(post.slug);
    setNotice(`Blog post "${post.title}" was deleted.`);
  };

  const handleCvUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setCvFile(file.name, dataUrl);
      setCvFileName(file.name);
      setNotice(`${file.name} uploaded and is now live on the CV page.`);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleRemoveCv = () => {
    clearCvFile();
    setCvFileName("");
    setNotice("Uploaded CV was removed.");
  };

  if (!isUnlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-slate-100">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
            // Admin access
          </p>
          <h1 className="mb-6 text-3xl font-bold">Portfolio Admin</h1>

          <label className="mb-2 block text-sm text-slate-300">Access code</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter access code"
            className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-500"
          />

          <button
            type="button"
            onClick={handleUnlock}
            className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            Unlock Admin Panel
          </button>

          <p className="mt-4 text-sm text-slate-300">{notice}</p>

          <Link href="/" className="mt-6 inline-block text-sm text-emerald-400 hover:underline">
            ← Back to portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">// Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold">Admin Content Manager</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-emerald-400">
              Portfolio Home
            </Link>
            <Link href="/blog" className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-emerald-400">
              View Blog
            </Link>
            <button type="button" onClick={handleLogout} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-rose-400">
              Sign out
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
          {notice}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="mb-5 text-xl font-bold">Upload a new blog post</h2>

            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Blog title</label>
                <input
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
                  placeholder="e.g. Dockerizing Next.js for deployment"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Category</label>
                <select
                  value={form.category}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
                >
                  <option>DevOps & Cloud</option>
                  <option>Linux & Systems</option>
                  <option>Web Engineering</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
                  placeholder="Short summary for the blog card"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Tags (comma separated)</label>
                <input
                  value={form.tags}
                  onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
                  placeholder="Next.js, Docker, Linux"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Section heading</label>
                <input
                  value={form.contentHeading}
                  onChange={(event) => setForm((current) => ({ ...current, contentHeading: event.target.value }))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
                  placeholder="What did you learn?"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Article content</label>
                <textarea
                  value={form.contentBody}
                  onChange={(event) => setForm((current) => ({ ...current, contentBody: event.target.value }))}
                  rows={6}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
                  placeholder="Write your daily technical note here..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-400"
              >
                Publish blog post
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="mb-5 text-xl font-bold">Upload CV</h2>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center transition hover:border-emerald-500/60">
              <span className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
                // Upload PDF
              </span>
              <span className="text-sm text-slate-300">Click to select your CV file</span>
              <input type="file" accept=".pdf" onChange={handleCvUpload} className="hidden" />
            </label>

            {cvFileName ? (
              <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                <p className="font-semibold">Current CV:</p>
                <p className="mt-1 break-all">{cvFileName}</p>
                <button
                  type="button"
                  onClick={handleRemoveCv}
                  className="mt-3 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-rose-500 hover:text-rose-400"
                >
                  Remove uploaded CV
                </button>
              </div>
            ) : (
              <p className="mt-5 text-sm text-slate-400">No CV is uploaded yet.</p>
            )}

            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Current blog list
              </h3>
              <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
                {posts.length ? posts.map((post) => (
                  <div key={post.slug} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-300">
                    <span className="min-w-0 break-words">{post.title}</span>
                    <button
                      type="button"
                      onClick={() => handleBlogDelete(post)}
                      aria-label={`Delete ${post.title}`}
                      className="shrink-0 rounded-lg border border-rose-900 px-3 py-1.5 text-xs text-rose-300 transition hover:border-rose-500 hover:bg-rose-500/10"
                    >
                      Delete
                    </button>
                  </div>
                )) : (
                  <p className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-sm text-slate-400">
                    No blog posts yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
