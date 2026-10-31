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
      <div className="not-found">
        <h1>Article Not Found</h1>
        <Link href="/blog">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="portfolio-shell">
      <Header variant="article" />

      <article className="article-main">
        <div className="article-meta">
          <span className="hero-accent">{post.category}</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="article-title">{post.title}</h1>

        <div className="article-tags">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>

        <div className="article-content">
          {post.content.map((section, index) => (
            <section key={`${section.heading}-${index}`}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
              {section.code && (
                <pre>
                  {section.code}
                </pre>
              )}
            </section>
          ))}
        </div>

        <div className="article-byline">
          <div>
            <strong>Written by Trilok Neupane</strong>
            <p>
              Web Developer &amp; Junior DevOps Engineer • Lalitpur, Nepal
            </p>
          </div>
          <Link
            href="/#contact"
            className="button-primary"
          >
            Get in Touch →
          </Link>
        </div>
      </article>
    </div>
  );
}
