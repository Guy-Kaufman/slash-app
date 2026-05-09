import { Link } from 'react-router-dom'
import './AppHeader.css'

const AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBQbFzufpJvaEx16XdO9JDlnIqzEVITZWnYxh01pCrtbWtYCKM64sVN_nMfxpNhIQ-5vkgI6qNYrTB7ENQNmpnocogVySeZjzsIjyLsD8ObnQv_lrcw7DE7PvDZNeqEb6eCPvcmBJSKzMAXVAsSl26uyVmOI-cdL7wSaV1skDVTJ9SLuHh_AIbD0YDn2-89pIotP9FSt-l1QF38ORZ3uIwU03GM-JliImJwmL4t2axGKKLYhNS32gLFOK1aRFPSVxP76VeQy0cnhRw'

function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/upload" className="app-header__icon-btn" aria-label="Wallet">
        <span className="material-symbols-outlined">account_balance_wallet</span>
      </Link>

      <Link to="/dashboard" className="app-header__brand">
        Slash
      </Link>

      <Link to="/settings" className="app-header__avatar" aria-label="Account">
        <img src={AVATAR_URL} alt="" />
      </Link>
    </header>
  )
}

export default AppHeader
