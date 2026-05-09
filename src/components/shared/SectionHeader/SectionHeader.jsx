import { Link } from 'react-router-dom'
import './SectionHeader.css'

function SectionHeader({ title, action, actionLabel = 'View all', actionTo }) {
  const renderAction = () => {
    if (!action && !actionTo) return null
    if (actionTo) {
      return (
        <Link to={actionTo} className="section-header__action">
          {actionLabel}
        </Link>
      )
    }
    if (typeof action === 'function') {
      return (
        <button type="button" className="section-header__action" onClick={action}>
          {actionLabel}
        </button>
      )
    }
    return action
  }

  return (
    <header className="section-header">
      <h2 className="section-header__title">{title}</h2>
      {renderAction()}
    </header>
  )
}

export default SectionHeader
