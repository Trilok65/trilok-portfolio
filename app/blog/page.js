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
    <div className="portfolio-shell">
      <Header variant="blog" />

      <main className="blog-main">
        <div className="blog-intro">
          <p className="section-index">01 // Engineering Log</p>
          <h1 className="blog-title">DevOps, Linux &amp; Web Engineering Notes</h1>
          <p className="blog-description">
          Practical guides, deployment checklists, and troubleshooting notes from my work
          building Next.js/WordPress platforms and managing Linux/CI-CD infrastructure.
          </p>
        </div>

        <div className="publishing-note">
          <p className="section-index">// Daily blog publishing</p>
          <p>
            To publish a new daily post, add a new object to <code>app/data/blogs.js</code> with:
            {" "}<code>slug, title, date, readTime, category, tags, excerpt, content</code>.
            {" "}Then save the file and run <code>npm run build</code> to confirm it renders correctly.
          </p>
        </div>

        <div className="blog-filters" aria-label="Filter articles by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`filter-button${selectedCategory === category ? " is-active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="blog-table">
          <div className="blog-table-head" aria-hidden="true">
            <span>Category</span>
            <span>Published</span>
            <span>Entry</span>
            <span>Read time</span>
          </div>
          {filtered.length === 0 ? (
            <p className="blog-empty">
              No blog posts in this category yet.
            </p>
          ) : filtered.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-row"
            >
              <span className="blog-meta blog-category">{post.category}</span>
              <span className="blog-meta">{post.date}</span>
              <span className="blog-entry">
                <span className="blog-entry-title">{post.title}</span>
                <span className="blog-excerpt">{post.excerpt}</span>
                <span className="blog-tags">
                  {post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                </span>
              </span>
              <span className="blog-readtime">
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")} /</span>
                {post.readTime}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
