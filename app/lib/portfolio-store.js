import { blogPosts as fallbackBlogPosts } from "../data/blogs";

const STORAGE_KEY = "trilok-portfolio-content";

export function getPortfolioContent() {
  if (typeof window === "undefined") {
    return {
      blogPosts: fallbackBlogPosts,
      cvDataUrl: "",
      cvFileName: "",
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {
        blogPosts: fallbackBlogPosts,
        cvDataUrl: "",
        cvFileName: "",
      };
    }

    const parsed = JSON.parse(raw);

    return {
      blogPosts: Array.isArray(parsed.blogPosts) ? parsed.blogPosts : fallbackBlogPosts,
      cvDataUrl: parsed.cvDataUrl || "",
      cvFileName: parsed.cvFileName || "",
    };
  } catch (error) {
    return {
      blogPosts: fallbackBlogPosts,
      cvDataUrl: "",
      cvFileName: "",
    };
  }
}

export function savePortfolioContent(nextContent) {
  if (typeof window === "undefined") {
    return nextContent;
  }

  const current = getPortfolioContent();
  const updated = {
    ...current,
    ...nextContent,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("portfolio-content-updated"));

  return updated;
}

export function addBlogPost(post) {
  const current = getPortfolioContent();
  const allPosts = [post, ...current.blogPosts.filter((item) => item.slug !== post.slug)];

  return savePortfolioContent({
    blogPosts: allPosts,
  }).blogPosts;
}

export function removeBlogPost(slug) {
  const current = getPortfolioContent();

  return savePortfolioContent({
    blogPosts: current.blogPosts.filter((post) => post.slug !== slug),
  }).blogPosts;
}

export function setCvFile(fileName, dataUrl) {
  return savePortfolioContent({
    cvFileName: fileName,
    cvDataUrl: dataUrl,
  });
}

export function clearCvFile() {
  return savePortfolioContent({
    cvFileName: "",
    cvDataUrl: "",
  });
}

export function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
