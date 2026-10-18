"use client";

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const skillCategories = [
  {
    title: "DevOps & Cloud Infrastructure",
    badge: "Operations",
    skills: [
      "Linux Admin (Ubuntu/Bash)",
      "Vercel & Cloud CI/CD",
      "Docker & Containerization",
      "Git & GitHub Actions",
      "DNS & SSL Cutovers",
      "Vagrant & VirtualBox",
    ],
  },
  {
    title: "Modern Web & CMS Stack",
    badge: "Production",
    skills: [
      "Next.js & React.js",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "WordPress & Elementor",
      "HTML5 / CSS3",
      "Technical SEO & Core Web Vitals",
    ],
  },
  {
    title: "Backend, DB & Networking",
    badge: "Core Systems",
    skills: [
      "PHP & MySQL",
      "Relational DB Schema Design",
      "OSI & TCP/IP Models",
      "IP Subnetting & SSH",
      "System Troubleshooting",
      "Cybersecurity Fundamentals",
    ],
  },
];

const projects = [
  {
    title: "Nepal Exporting IT — Official Corporate & Outsourcing Platform",
    category: "live",
    status: "Live Production",
    role: "Lead Web & Deployment Engineer",
    stack: ["Next.js", "React", "Tailwind CSS", "Custom DNS/SSL", "CI/CD"],
    description:
      "Architected, developed, and deployed the commercial website for Nepal Exporting IT (Khumaltar, Lalitpur), serving international and domestic B2B software outsourcing clients.",
    highlights: [
      "Full lifecycle ownership: UI/UX build, multi-page routing, custom DNS records, and SSL security",
      "Engineered tiered service catalogs (Web, Mobile, Odoo ERP, Maintenance) and lead-capture flows",
    ],
    live: "https://www.nepalexportingit.com/",
    domainLabel: "nepalexportingit.com",
  },
  {
    title: "The Mind Podcast — Digital Media & Episode Platform",
    category: "live",
    status: "Staging • Launching as themind.com",
    role: "Full-Stack Frontend & Deployment Engineer",
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel Staging CI/CD", "DNS Cutover"],
    description:
      "Built and deployed a high-speed digital media and podcast streaming platform currently in final client staging on Vercel, prepared for production domain cutover to themind.com.",
    highlights: [
      "Automated GitHub-to-Vercel CI/CD pipeline for instant client UAT previews",
      "Responsive episode showcases, media streaming layouts, and mobile-first navigation",
    ],
    live: "https://mindpodcast-yjj5.vercel.app/",
    domainLabel: "mindpodcast-yjj5.vercel.app (→ themind.com)",
  },
  {
    title: "Teen Missions International — Global Non-Profit Web Portal",
    category: "live",
    status: "Live Contribution",
    role: "WordPress Developer (Contributor)",
    stack: ["WordPress CMS", "PHP", "Custom CSS/JS", "Responsive Layout"],
    description:
      "Contributed to front-end customization, responsive layout refinements, and CMS content structuring on a live international youth mission organization website.",
    highlights: [
      "Collaborated on a high-traffic international production WordPress platform",
      "Delivered responsive cross-device UI improvements and structured page components",
    ],
    live: "https://teenmissions.org/",
    domainLabel: "teenmissions.org",
  },
  {
    title: "Online Bike Rental & Fleet Booking System",
    category: "backend",
    status: "Full-Stack System",
    role: "Backend & Database Developer",
    stack: ["PHP", "MySQL", "JavaScript", "Relational DB Design"],
    description:
      "Full-stack vehicle rental and fleet management platform built with user authentication, automated booking workflows, and inventory management.",
    highlights: [
      "Normalized MySQL database schema handling concurrent booking transactions",
      "End-to-end user profile and rental lifecycle tracking",
    ],
    live: null,
    domainLabel: "PHP + MySQL Architecture",
  },
  {
    title: "Hospital Appointment & Workflow Management System",
    category: "backend",
    status: "Full-Stack System",
    role: "System Designer & Developer",
    stack: ["PHP", "MySQL", "JavaScript", "System Architecture"],
    description:
      "Role-based healthcare management portal streamlining patient registration, doctor scheduling, and internal clinical workflows.",
    highlights: [
      "Role-based access controls for administrators, doctors, and patients",
      "Strict input validation and relational data integrity",
    ],
    live: null,
    domainLabel: "Healthcare Workflow System",
  },
];

const filteredProjects = (activeTab, items) =>
  activeTab === "all" ? items : items.filter((p) => p.category === activeTab);

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const projectsToShow = filteredProjects(activeTab, projects);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header />

      <section className="hero-photo relative isolate flex min-h-[620px] items-center overflow-hidden border-b border-white/10 sm:min-h-[700px]">
        <div className="pointer-events-none absolute inset-0 bg-slate-950/55" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 text-center sm:py-28">
          <p className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-xs font-semibold uppercase text-cyan-200">
            <span className="size-2 rounded-full bg-emerald-400" />
            Web engineering · DevOps · Lalitpur, Nepal
          </p>
          <h1 className="mx-auto mt-7 max-w-5xl font-extrabold leading-[1.05] text-white">
            <span className="block text-2xl font-semibold text-white/85 sm:text-3xl">I build</span>
            <span className="mt-2 block text-4xl sm:text-7xl">
              <span className="text-cyan-300">digital</span> experiences
            </span>
            <span className="mt-3 block text-2xl font-semibold sm:text-4xl">
              and bring them to <span className="text-cyan-300 underline decoration-cyan-300/50 decoration-2 underline-offset-8">production.</span>
            </span>
          </h1>
          <div className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            <p className="font-semibold text-white">Trilok Neupane</p>
            <p className="mt-1 text-slate-300">
              Web developer and junior DevOps engineer working across Next.js, WordPress, Linux, and cloud deployments.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#projects" className="rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
              Explore my work
            </a>
            <a href="mailto:neupanetrilok44@gmail.com" className="rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60">
              Hire Me
            </a>
          </div>

        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b1224]">
        <div className="mx-auto grid max-w-6xl gap-px px-6 py-5 sm:grid-cols-3">
          <div className="px-4 py-3 text-center sm:text-left">
            <p className="text-2xl font-extrabold text-white">03</p>
            <p className="mt-1 text-xs uppercase text-slate-400">Live production sites</p>
          </div>
          <div className="border-white/10 px-4 py-3 text-center sm:border-l sm:text-left">
            <p className="text-2xl font-extrabold text-white">05</p>
            <p className="mt-1 text-xs uppercase text-slate-400">Featured builds</p>
          </div>
          <div className="border-white/10 px-4 py-3 text-center sm:border-l sm:text-left">
            <p className="text-2xl font-extrabold text-white">Web + Ops</p>
            <p className="mt-1 text-xs uppercase text-slate-400">From interface to deployment</p>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-sm uppercase tracking-wider text-emerald-400">
              // Selected work
            </p>
            <h2 className="mt-1 text-3xl font-bold">Projects made for the real world</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Projects" },
              { id: "live", label: "Live Websites" },
              { id: "backend", label: "PHP / MySQL Systems" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-4 py-2 text-xs font-mono transition ${
                  activeTab === tab.id
                    ? "bg-emerald-500 font-bold text-slate-950"
                    : "border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projectsToShow.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className="flex min-h-[420px] min-w-0 flex-col justify-between rounded-xl border border-white/10 bg-[#101a34] p-6 transition hover:border-cyan-200/40 hover:bg-[#14203e]"
            >
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-400">{project.role}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-mono ${
                      project.live
                        ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {project.live ? `● ${project.status}` : project.status}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-slate-100">{project.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{project.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-slate-950 border border-slate-800 px-2.5 py-1 font-mono text-xs text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="mb-6 space-y-1.5 text-xs text-slate-300">
                  {project.highlights.map((item, i) => (
                    <li key={`${project.title}-${i}`} className="flex items-start gap-2">
                      <span className="text-emerald-400">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4 text-xs font-mono">
                <span className="max-w-[200px] truncate text-slate-400">{project.domainLabel}</span>
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-emerald-500 px-4 py-2 font-bold text-slate-950 transition hover:bg-emerald-400"
                  >
                    Visit Live Site ↗
                  </a>
                ) : (
                  <span className="text-slate-500">Full-Stack Database Build</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
        <div className="mb-10">
          <p className="font-mono text-sm uppercase tracking-wider text-emerald-400">
              // What I work with
          </p>
          <h2 className="mt-1 text-3xl font-bold">DevOps, Web Engineering &amp; CMS</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((group, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-[#101a34] p-6 transition hover:border-cyan-200/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-100">{group.title}</h3>
                <span className="rounded bg-slate-800 px-2.5 py-1 font-mono text-xs text-emerald-400">
                  {group.badge}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={`${skill}-${sIdx}`}
                    className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
        <div className="mb-10">
          <p className="font-mono text-sm uppercase tracking-wider text-emerald-400">
            // Career Progression
          </p>
          <h2 className="mt-1 text-3xl font-bold">Work Experience &amp; Training</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-3 rounded-2xl border border-emerald-500/40 bg-slate-900/50 p-6">
            <span className="rounded bg-emerald-500/15 px-2.5 py-1 font-mono text-xs text-emerald-400">
              2026 – Present • Current Role
            </span>
            <h3 className="text-xl font-bold">Web &amp; Deployment Engineer</h3>
            <p className="text-sm text-slate-400">Nepal Exporting IT • Khumaltar, Lalitpur</p>
            <ul className="list-inside list-disc space-y-2 pt-2 text-xs text-slate-300">
              <li>Built and deployed nepalexportingit.com and The Mind Podcast staging setup.</li>
              <li>Manage Vercel CI/CD deployments, custom domain DNS cutovers, SSL, and technical SEO.</li>
            </ul>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <span className="font-mono text-xs text-slate-400">Nov 2024 – Feb 2025</span>
            <h3 className="text-xl font-bold">Front-End Developer Intern</h3>
            <p className="text-sm text-slate-400">BR CODEX Pvt. Ltd. • Talchhikhel, Lalitpur</p>
            <ul className="list-inside list-disc space-y-2 pt-2 text-xs text-slate-300">
              <li>Built responsive web interfaces across desktop, tablet, and mobile devices.</li>
              <li>Integrated JavaScript frameworks and optimized page load performance.</li>
            </ul>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <span className="font-mono text-xs text-cyan-400">3-Month Intensive + BCA (2026)</span>
            <h3 className="text-xl font-bold">DevOps Training &amp; BCA Degree</h3>
            <p className="text-sm text-slate-400">TechAxis &amp; Caribbean College (TU)</p>
            <ul className="list-inside list-disc space-y-2 pt-2 text-xs text-slate-300">
              <li>Completed Linux, networking, CI/CD, and Git training at TechAxis.</li>
              <li>Graduated with a Bachelor of Computer Applications (BCA).</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
