export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-main">
        <div>
          <p className="section-index">04 // Contact</p>
          <h2 className="footer-title">Let&apos;s Build &amp; Deploy Your Next Platform</h2>
          <p className="footer-copy">
            Available for Junior DevOps, Full-Stack Web (Next.js / WordPress), and IT
            Infrastructure roles in Kathmandu Valley or Remote.
          </p>
        </div>
        <div className="footer-links">
          <a href="mailto:neupanetrilok44@gmail.com">Email</a>
          <a href="https://github.com/Trilok65" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://wa.me/9779840878214" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href="https://linkedin.com/in/trilok-neupane-18517927a" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-meta">© {new Date().getFullYear()} Trilok Neupane</p>
        <p className="footer-meta">Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
