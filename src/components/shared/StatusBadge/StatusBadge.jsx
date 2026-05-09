import './StatusBadge.css'

const PRESETS = {
  active: { label: 'Active', icon: 'check_circle' },
  duplicate: { label: 'Duplicate', icon: 'content_copy' },
  unused: { label: 'Unused', icon: 'visibility_off' },
  cut: { label: 'Cut', icon: 'check' },
  warning: { label: 'Low usage detected', icon: 'warning' },
  savings: { label: 'yearly savings', icon: null, dot: true },
}

function StatusBadge({ variant = 'active', label, icon, children, dot, className = '' }) {
  const preset = PRESETS[variant] || {}
  const finalLabel = label || preset.label || children
  const finalIcon = icon ?? preset.icon
  const showDot = dot ?? preset.dot ?? false

  return (
    <span className={`status-badge status-badge--${variant} ${className}`}>
      {showDot ? <span className="status-badge__dot" aria-hidden="true" /> : null}
      {finalIcon ? (
        <span className="material-symbols-outlined status-badge__icon">{finalIcon}</span>
      ) : null}
      <span className="status-badge__label">{finalLabel}</span>
    </span>
  )
}

export default StatusBadge
