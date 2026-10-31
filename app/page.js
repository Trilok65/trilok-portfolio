"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Terminal as TerminalIcon } from "lucide-react";
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

function CommandTerminal() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("Type a command or choose one above.");

  const runCommand = (input) => {
    const normalized = input.trim().toLowerCase();
    setCommand("");

    if (normalized === "help") {
      setOutput("Available commands: skills, work, contact");
      return;
    }

    const destinations = {
      skills: "skills",
      work: "projects",
      contact: "contact",
    };

    if (!destinations[normalized]) {
      setOutput(`Command not found: ${normalized || "(empty)"}. Try: skills, work, contact`);
      return;
    }

    setOutput(`Navigating to ${normalized}...`);
    document.getElementById(destinations[normalized])?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="terminal" aria-label="Interactive portfolio terminal">
      <div className="terminal-bar">
        <div className="terminal-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>trilok@workstation:~</span>
        <TerminalIcon size={13} aria-hidden="true" />
      </div>
      <div className="terminal-body">
        <p className="terminal-greeting">
          <strong>Environment ready.</strong><br />
          Web engineering · Linux · Docker · CI/CD
        </p>
        <ul className="terminal-command-list" aria-label="Available terminal commands">
          {["skills", "work", "contact"].map((item) => (
            <li key={item}>
              <button type="button" onClick={() => runCommand(item)}>
                <span className="terminal-prompt">$</span> {item}
              </button>
            </li>
          ))}
        </ul>
        <p className="terminal-history" role="status">{output}</p>
        <form
          className="terminal-form"
          onSubmit={(event) => {
            event.preventDefault();
            runCommand(command);
          }}
        >
          <label htmlFor="terminal-command">$</label>
          <input
            id="terminal-command"
            autoComplete="off"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            placeholder="type a command"
            aria-label="Type skills, work, or contact"
          />
        </form>
      </div>
    </div>
  );
}

function PipelineGraphic() {
  return (
    <svg
      className="pipeline-graphic"
      viewBox="0 0 360 118"
      role="img"
      aria-label="Continuous integration pipeline from commit through build and deploy"
    >
      <path className="pipeline-line" d="M42 40H318M42 40v35h276V40" fill="none" />
      <circle className="pipeline-node" cx="42" cy="40" r="7" />
      <circle className="pipeline-node" cx="134" cy="40" r="7" />
      <circle className="pipeline-node" cx="226" cy="40" r="7" />
      <circle className="pipeline-node" cx="318" cy="40" r="7" />
      <circle className="pipeline-pulse" cx="42" cy="40" r="3" />
      <circle className="pipeline-pulse" cx="134" cy="40" r="3" />
      <circle className="pipeline-pulse" cx="226" cy="40" r="3" />
      <circle className="pipeline-pulse" cx="318" cy="40" r="3" />
      <text className="pipeline-label" x="42" y="66" textAnchor="middle">COMMIT</text>
      <text className="pipeline-label" x="134" y="66" textAnchor="middle">BUILD</text>
      <text className="pipeline-label" x="226" y="66" textAnchor="middle">TEST</text>
      <text className="pipeline-label" x="318" y="66" textAnchor="middle">DEPLOY</text>
      <text className="pipeline-label" x="180" y="106" textAnchor="middle">AUTOMATED DELIVERY PIPELINE</text>
    </svg>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const projectsToShow = filteredProjects(activeTab, projects);

  return (
    <div className="portfolio-shell">
      <Header />

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Web engineering · DevOps · Lalitpur, Nepal
          </p>
          <h1 className="hero-title">
            <span className="hero-line-mask"><span className="hero-line">I build</span></span>
            <span className="hero-line-mask"><span className="hero-line"><span className="hero-accent">digital</span> experiences</span></span>
            <span className="hero-line-mask"><span className="hero-line">and bring them to <span className="hero-accent">production.</span></span></span>
          </h1>
          <p className="hero-description">
            <span className="hero-name">Trilok Neupane</span>
            Web developer and junior DevOps engineer working across Next.js, WordPress, Linux, and cloud deployments.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="button-primary">
              Explore my work <ArrowRight size={14} aria-hidden="true" />
            </a>
            <a href="mailto:neupanetrilok44@gmail.com" className="button-secondary">
              Hire Me <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-terminal-wrap">
          <CommandTerminal />
        </div>
      </section>

      <section className="stats-strip" aria-label="Portfolio at a glance">
        <div className="stat-cell">
          <p className="stat-value">03</p>
          <p className="stat-label">Live production sites</p>
        </div>
        <div className="stat-cell">
          <p className="stat-value">05</p>
          <p className="stat-label">Featured builds</p>
        </div>
        <div className="stat-cell">
          <p className="stat-value">Web + Ops</p>
          <p className="stat-label">From interface to deployment</p>
        </div>
      </section>

      <section id="projects" className="content-section">
        <div className="section-heading-row">
          <div>
            <p className="section-index">01 // Work</p>
            <h2 className="section-title">Projects made for the real world</h2>
          </div>
          <p className="section-aside">Selected production work, client platforms, and full-stack systems.</p>
        </div>
        <div className="project-filters" aria-label="Filter projects">
          {[
            { id: "all", label: "All Projects" },
            { id: "live", label: "Live Websites" },
            { id: "backend", label: "PHP / MySQL Systems" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className="filter-button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="project-list">
          {projectsToShow.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="project-row"
            >
              <div className="project-topline">
                <div className="project-meta">
                  <span className="project-index">
                    {String(index + 1).padStart(2, "0")} / {String(projectsToShow.length).padStart(2, "0")}
                  </span>
                  <span>{project.role}</span>
                  <span className="project-status">
                    {project.live && <span className="status-dot" aria-hidden="true" />}
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="project-title-wrap">
                <h3 className="project-title">{project.title}</h3>
                <ArrowUpRight className="project-arrow" size={20} aria-hidden="true" />
              </div>
              <p className="project-description">{project.description}</p>
              <ul className="project-tags" aria-label="Technology stack">
                {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
              </ul>
              <ul className="project-highlights">
                {project.highlights.map((item, i) => (
                  <li key={`${project.title}-${i}`}>{item}</li>
                ))}
              </ul>
              <div className="project-footer">
                <span>{project.domainLabel}</span>
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Visit Live Site <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                ) : (
                  <span>Full-Stack Database Build</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="content-section">
        <div className="section-heading-row">
          <div>
            <p className="section-index">02 // Capabilities</p>
            <h2 className="section-title">DevOps, Web Engineering &amp; CMS</h2>
          </div>
          <p className="section-aside">A practical toolkit spanning interfaces, infrastructure, and delivery.</p>
        </div>
        <div className="skills-grid">
          {skillCategories.map((group, idx) => (
            <article className="skill-card" key={idx}>
              <div className="skill-card-heading">
                <h3 className="skill-card-title">{group.title}</h3>
                <span className="skill-badge">{group.badge}</span>
              </div>
              <ul className="skill-list">
                {group.skills.map((skill, sIdx) => <li key={`${skill}-${sIdx}`}>{skill}</li>)}
              </ul>
            </article>
          ))}
          <article className="skill-card">
            <p className="graphic-card-title">Delivery / CI-CD</p>
            <PipelineGraphic />
          </article>
          <article className="skill-card">
            <p className="graphic-card-title">Infrastructure / Status</p>
            <div className="server-status">
              <span className="server-pulse" aria-hidden="true">
                <span className="status-dot" />
              </span>
              <div className="server-copy">
                <strong>Systems operational</strong>
                <span>LINUX · DOCKER · CLOUD</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="experience" className="content-section">
        <div className="section-heading-row">
          <div>
            <p className="section-index">03 // Experience</p>
            <h2 className="section-title">Work Experience &amp; Training</h2>
          </div>
        </div>
        <div className="experience-grid">
          <article className="experience-card">
            <span className="experience-date">
              2026 – Present • Current Role
            </span>
            <h3 className="experience-title">Web &amp; Deployment Engineer</h3>
            <p className="experience-org">Nepal Exporting IT • Khumaltar, Lalitpur</p>
            <ul className="experience-list">
              <li>Built and deployed nepalexportingit.com and The Mind Podcast staging setup.</li>
              <li>Manage Vercel CI/CD deployments, custom domain DNS cutovers, SSL, and technical SEO.</li>
            </ul>
          </article>

          <article className="experience-card">
            <span className="experience-date">Nov 2024 – Feb 2025</span>
            <h3 className="experience-title">Front-End Developer Intern</h3>
            <p className="experience-org">BR CODEX Pvt. Ltd. • Talchhikhel, Lalitpur</p>
            <ul className="experience-list">
              <li>Built responsive web interfaces across desktop, tablet, and mobile devices.</li>
              <li>Integrated JavaScript frameworks and optimized page load performance.</li>
            </ul>
          </article>

          <article className="experience-card">
            <span className="experience-date">3-Month Intensive + BCA (2026)</span>
            <h3 className="experience-title">DevOps Training &amp; BCA Degree</h3>
            <p className="experience-org">TechAxis &amp; Caribbean College (TU)</p>
            <ul className="experience-list">
              <li>Completed Linux, networking, CI/CD, and Git training at TechAxis.</li>
              <li>Graduated with a Bachelor of Computer Applications (BCA).</li>
            </ul>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
