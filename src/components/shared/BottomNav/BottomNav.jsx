import { NavLink } from 'react-router-dom'
import './BottomNav.css'

const ITEMS = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/savings', icon: 'receipt_long', label: 'Subscriptions' },
  { to: '/settings', icon: 'settings', label: 'Settings' },
]

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`
          }
        >
          <span className="material-symbols-outlined bottom-nav__icon">
            {item.icon}
          </span>
          <span className="bottom-nav__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
