import './QuickActionsGrid.css'

function QuickActionsGrid({ onAdd, onCut, onUpload, onHistory }) {
  const actions = [
    { icon: '＋', label: 'הוסף', onClick: onAdd },
    { icon: '✂', label: 'חתוך', onClick: onCut },
    { icon: '↑', label: 'העלה', onClick: onUpload },
    { icon: '⏱', label: 'היסטוריה', onClick: onHistory },
  ]

  return (
    <div className="quick-actions-grid">
      {actions.map((action) => (
        <button
          key={action.label}
          className="quick-actions-grid__item"
          onClick={action.onClick}
          type="button"
        >
          <div className="quick-actions-grid__circle">
            <span className="quick-actions-grid__icon">{action.icon}</span>
          </div>
          <span className="quick-actions-grid__label">{action.label}</span>
        </button>
      ))}
    </div>
  )
}

export default QuickActionsGrid
