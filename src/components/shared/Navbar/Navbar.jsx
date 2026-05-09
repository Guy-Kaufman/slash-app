import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand" aria-label="Slash home">
        <span className="navbar__logo-orb" aria-hidden="true">
          <span className="material-symbols-outlined filled">content_cut</span>
        </span>
        <span className="navbar__brand-text">Slash</span>
      </Link>

      <div className="navbar__links">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
        >
          Sign in
        </NavLink>
        <NavLink to="/register" className="navbar__link navbar__link--cta">
          Get started
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
