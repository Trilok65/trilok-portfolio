export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-900 bg-slate-900/30">
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-16 text-center">
        <p className="font-mono text-sm text-emerald-400">// Ready to Join Your Team</p>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Let&apos;s Build &amp; Deploy Your Next Platform
        </h2>
        <p className="mx-auto max-w-xl text-sm text-slate-400 sm:text-base">
          Available for Junior DevOps, Full-Stack Web (Next.js / WordPress), and IT
          Infrastructure roles in Kathmandu Valley or Remote.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="mailto:neupanetrilok44@gmail.com"
            className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            neupanetrilok44@gmail.com
          </a>
          <a
            href="https://github.com/Trilok65"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400"
          >
            GitHub: Trilok65
          </a>
          <a
            href="https://wa.me/9779840878214"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
          >
            WhatsApp: +977-9840878214
          </a>
          <a
            href="https://linkedin.com/in/trilok-neupane-18517927a"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-emerald-400"
          >
            LinkedIn
          </a>
        </div>

        <p className="pt-8 font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} Trilok Neupane • Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}