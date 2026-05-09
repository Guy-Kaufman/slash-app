import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__brand-orb" aria-hidden="true">
            <span className="material-symbols-outlined filled">content_cut</span>
          </span>
          <span className="footer__brand-text">Slash</span>
        </div>

        <p className="footer__tagline">Cut your hidden expenses. Take back your money.</p>

        <nav className="footer__links" aria-label="Footer">
          <a href="#" className="footer__link">Privacy</a>
          <a href="#" className="footer__link">Terms</a>
          <a href="#" className="footer__link">Contact</a>
        </nav>

        <p className="footer__copy">© {new Date().getFullYear()} Slash. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
