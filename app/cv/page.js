"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPortfolioContent } from "../lib/portfolio-store";

export default function CVPage() {
  const [cvFile, setCvFile] = useState({ fileName: "", dataUrl: "" });

  useEffect(() => {
    const sync = () => {
      const content = getPortfolioContent();
      setCvFile({
        fileName: content.cvFileName || "",
        dataUrl: content.cvDataUrl || "",
      });
    };

    sync();
    window.addEventListener("portfolio-content-updated", sync);

    return () => window.removeEventListener("portfolio-content-updated", sync);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 print:bg-white print:p-0">
      <div className="mx-auto mb-6 flex max-w-4xl items-center justify-between rounded-xl bg-slate-900 px-5 py-3 text-white print:hidden">
        <Link href="/" className="font-mono text-sm text-emerald-400 hover:underline">
          ← Back to Portfolio
        </Link>
        <div className="flex items-center gap-3">
          {cvFile.dataUrl ? (
            <a
              href={cvFile.dataUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20"
            >
              Open uploaded CV
            </a>
          ) : null}
          <button
            onClick={() => window.print()}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            Save / Print as PDF (Ctrl+P)
          </button>
        </div>
      </div>

      {cvFile.dataUrl ? (
        <div className="mx-auto mb-6 max-w-4xl rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 print:hidden">
          Uploaded CV active: <span className="font-semibold text-emerald-100">{cvFile.fileName}</span>
        </div>
      ) : null}

      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-xl print:p-6 print:shadow-none sm:p-12">
        <header className="mb-5 border-b-2 border-slate-900 pb-4">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900">
            Trilok Neupane
          </h1>
          <p className="mt-0.5 text-base font-bold text-emerald-700">
            Junior DevOps Engineer | Web Developer &amp; IT Infrastructure
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
            <span>Lalitpur, Nepal</span>
            <span>•</span>
            <span>+977-9840878214</span>
            <span>•</span>
            <span>neupanetrilok44@gmail.com</span>
            <span>•</span>
            <span>linkedin.com/in/trilok-neupane-18517927a</span>
          </div>
        </header>

        <section className="mb-5">
          <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-slate-700">
            Solutions-focused BCA graduate (2026) and <strong>Web &amp; Junior DevOps Engineer</strong>{" "}
            with hands-on production experience building, deploying, and maintaining commercial websites and cloud-hosted applications. Skilled across modern JavaScript frameworks (<strong>React.js, Next.js</strong>), <strong>WordPress CMS</strong>, relational databases (<strong>MySQL</strong>), and <strong>DevOps/Linux infrastructure</strong> (CI/CD pipelines, Docker, Vercel, DNS/SSL management). Proven track record delivering live web platforms at <strong>Nepal Exporting IT</strong> and <strong>BR CODEX Pvt. Ltd.</strong>
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            Technical Skills
          </h2>
          <div className="space-y-1.5 text-xs text-slate-700">
            <p>
              <strong className="text-slate-900">DevOps, Cloud &amp; Infrastructure:</strong> Linux Administration (Ubuntu/Bash), Docker &amp; Containerization, CI/CD Workflows (GitHub Actions, Vercel), Virtualization (Vagrant/VirtualBox), DNS Routing, SSL/TLS, Web Server Deployment
            </p>
            <p>
              <strong className="text-slate-900">Frontend &amp; CMS Stack:</strong> JavaScript (ES6+), React.js, Next.js, Tailwind CSS, HTML5, CSS3, WordPress CMS (Custom Themes, Elementor, Optimization), Responsive UI
            </p>
            <p>
              <strong className="text-slate-900">Backend, Databases &amp; Networking:</strong> PHP, MySQL, Relational DB Design, OSI &amp; TCP/IP Models, IP Subnetting, SSH, Git &amp; GitHub, System Troubleshooting
            </p>
          </div>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            Professional Experience
          </h2>

          <div className="mb-3">
            <div className="flex flex-wrap items-baseline justify-between">
              <h3 className="text-xs font-bold text-slate-900">
                Web Developer &amp; Deployment Engineer — <span className="text-emerald-700">Nepal Exporting IT</span>
              </h3>
              <span className="text-[11px] text-slate-500">Khumaltar, Lalitpur | 2026 – Present</span>
            </div>
            <ul className="mt-1 list-inside list-disc space-y-1 text-xs text-slate-700">
              <li>Architected, developed, and deployed the official company production platform (<strong>nepalexportingit.com</strong>).</li>
              <li>Build and maintain client web properties across Next.js, React, Tailwind CSS, and WordPress CMS.</li>
              <li>Manage Vercel CI/CD staging and production pipelines, custom domain DNS cutovers, SSL certificates, and technical SEO.</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between">
              <h3 className="text-xs font-bold text-slate-900">
                Front-End Developer Intern — <span className="text-emerald-700">BR CODEX Pvt. Ltd.</span>
              </h3>
              <span className="text-[11px] text-slate-500">Talchhikhel, Lalitpur | Nov 2024 – Feb 2025</span>
            </div>
            <ul className="mt-1 list-inside list-disc space-y-1 text-xs text-slate-700">
              <li>Engineered responsive web interfaces across desktop, tablet, and mobile devices from planning to delivery.</li>
              <li>Integrated modern JavaScript frameworks, optimized page-load performance, and collaborated via Git/GitHub.</li>
            </ul>
          </div>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            Featured Live Production &amp; Full-Stack Projects
          </h2>
          <div className="space-y-2.5 text-xs text-slate-700">
            <div>
              <p className="font-bold text-slate-900">
                1. Nepal Exporting IT — Corporate &amp; Outsourcing Platform (https://www.nepalexportingit.com)
              </p>
              <p>Built and deployed the complete multi-page commercial web platform with tiered IT service catalogs, lead-capture forms, custom DNS, and automated cloud deployment.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">
                2. The Mind Podcast — Digital Media Platform (https://mindpodcast-yjj5.vercel.app → Launching as themind.com)
              </p>
              <p>Developed a Next.js/Tailwind digital media platform in final Vercel staging with automated Git CI/CD pipelines, responsive episode catalogs, and production DNS readiness.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">
                3. Teen Missions International — Non-Profit Portal Contributor (https://teenmissions.org)
              </p>
              <p>Contributed to WordPress front-end customization, responsive layout refinements, and CMS content structuring on a live international organization website.</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">
                4. Online Bike Rental &amp; Hospital Workflow Systems (PHP, MySQL, JavaScript)
              </p>
              <p>Designed normalized MySQL relational schemas and role-based PHP backends for automated vehicle fleet booking and hospital appointment management.</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section>
            <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900">
              Education
            </h2>
            <p className="text-xs font-bold text-slate-900">Bachelor of Computer Applications (BCA)</p>
            <p className="mb-1.5 text-[11px] text-slate-600">Caribbean College (Tribhuvan University) | Graduated 2026</p>
            <p className="text-xs font-bold text-slate-900">Higher Secondary Education (+2), Management</p>
            <p className="text-[11px] text-slate-600">Caribbean College, Nepal | Graduated 2020</p>
          </section>

          <section>
            <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900">
              Certifications &amp; Languages
            </h2>
            <p className="text-xs font-bold text-slate-900">3-Month IT Training — DevOps Engineering</p>
            <p className="mb-1.5 text-[11px] text-slate-600">TechAxis, Nepal (Linux, Networking, CI/CD, Git)</p>
            <p className="text-xs font-bold text-slate-900">Languages</p>
            <p className="text-[11px] text-slate-600">Nepali (Native) • English (Professional) • Hindi (Conversational)</p>
          </section>
        </div>
      </div>
    </div>
  );
}
