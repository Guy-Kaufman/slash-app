import { useNavigate } from 'react-router-dom'
import './SubscriptionCard.css'

function SubscriptionCard({ subscription, onClick, className = '' }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) return onClick(subscription)
    navigate(`/subscription/${subscription.id}`)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  const isCut = subscription.status === 'cut'
  const isWarning = !isCut && (subscription.status === 'warning' || subscription.status === 'duplicate')
  const tone = subscription.tone || subscription.logoColor || '#3B82F6'
  const actionLabel = subscription.actionLabel || (isCut ? 'Cancelled' : isWarning ? 'Review' : 'Manage')

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={[
        'subscription-card',
        isWarning ? 'subscription-card--warning' : '',
        isCut ? 'subscription-card--cut' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {isWarning ? <span className="subscription-card__bar" aria-hidden="true" /> : null}

      <div className="subscription-card__left">
        <div
          className="subscription-card__icon"
          style={{
            backgroundColor: `${tone}33`,
            color: tone,
          }}
          aria-hidden="true"
        >
          <span className="material-symbols-outlined">{subscription.icon || 'subscriptions'}</span>
        </div>

        <div className="subscription-card__info">
          <h3 className="subscription-card__name">{subscription.name}</h3>
          {isWarning ? (
            <p className="subscription-card__sub subscription-card__sub--warn">
              <span className="material-symbols-outlined">warning</span>
              {subscription.warningLabel || 'Needs review'}
            </p>
          ) : (
            <p className="subscription-card__sub">{subscription.plan}</p>
          )}
        </div>
      </div>

      <div className="subscription-card__right">
        <span className="subscription-card__price">₪{subscription.amount}</span>
        <span className={`subscription-card__action ${isWarning ? 'subscription-card__action--warn' : ''}`}>
          {actionLabel}
        </span>
      </div>
    </div>
  )
}

export default SubscriptionCard
