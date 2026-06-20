import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ScreenHeader from '../../../components/shared/ScreenHeader/ScreenHeader'
import StatusBadge from '../../../components/shared/StatusBadge/StatusBadge'
import SecondaryButton from '../../../components/shared/SecondaryButton/SecondaryButton'
import AIRecommendation from '../../../components/page-specific/AIRecommendation/AIRecommendation'
import { useSubscriptions } from '../../../context/SubscriptionsContext'
import { fetchRecommendation } from '../../../lib/recommend'
import './SubscriptionDetailPage.css'

function SubscriptionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { subscriptions } = useSubscriptions()

  const subscription = subscriptions.find((s) => s.id === id) || subscriptions[0]
  const isCut = subscription?.status === 'cut'

  // Bundled recommendation shows instantly; the AI one replaces it when ready.
  const [aiText, setAiText] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    if (!subscription) return
    let active = true
    /* eslint-disable react-hooks/set-state-in-effect */
    setAiText(null)
    setAiLoading(true)
    /* eslint-enable react-hooks/set-state-in-effect */
    fetchRecommendation(subscription).then((text) => {
      if (active) {
        setAiText(text)
        setAiLoading(false)
      }
    })
    return () => {
      active = false
    }
  }, [subscription?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!subscription) return null

  const handleCancel = () => navigate(`/review?cancel=${subscription.id}`)

  const showSaving = ['warning', 'duplicate', 'unused'].includes(subscription.status)

  const isFlagged =
    subscription.flagged ||
    subscription.status === 'warning' ||
    subscription.status === 'duplicate' ||
    subscription.status === 'unused'

  return (
    <div className="detail-page">
      <ScreenHeader label="Back to Subscriptions" backTo="/dashboard" />

      <main className="detail-page__main">
        <section className="detail-page__hero">
          <span className="detail-page__hero-glow" aria-hidden="true" />

          <div
            className="detail-page__logo"
            style={{ color: subscription.tone }}
            aria-hidden="true"
          >
            {subscription.initials}
          </div>

          <div className="detail-page__title">
            <h2 className="detail-page__name">{subscription.name}</h2>
            <div className="detail-page__price">
              <span className="detail-page__price-value">
                <span className="detail-page__currency">₪</span>
                {subscription.amount}
              </span>
              <span className="detail-page__price-cycle">/mo</span>
            </div>
          </div>

          {isFlagged ? (
            <StatusBadge
              variant="warning"
              label={subscription.warningLabel || 'Needs review'}
            />
          ) : (
            <StatusBadge variant="active" label="In good standing" />
          )}
        </section>

        <section className="detail-page__bento">
          <div className="detail-page__cell detail-page__cell--full">
            <div className="detail-page__cell-icon">
              <span className="material-symbols-outlined">history</span>
            </div>
            <div>
              <p className="detail-page__cell-label">Last usage</p>
              <p className="detail-page__cell-value">{subscription.lastUsage || '—'}</p>
            </div>
          </div>

          <div className="detail-page__cell">
            <div className="detail-page__cell-icon detail-page__cell-icon--small detail-page__cell-icon--primary">
              <span className="material-symbols-outlined">event</span>
            </div>
            <p className="detail-page__cell-label">Next billing</p>
            <p className="detail-page__cell-value">{subscription.nextBilling || '—'}</p>
          </div>

          <div className="detail-page__cell">
            <div className="detail-page__cell-icon detail-page__cell-icon--small detail-page__cell-icon--primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <p className="detail-page__cell-label">Yearly cost</p>
            <p className="detail-page__cell-value">
              ₪{subscription.yearlyCost.toLocaleString()}
            </p>
          </div>
        </section>

        <AIRecommendation
          text={aiText || subscription.recommendation}
          savingsAmount={showSaving ? subscription.yearlyCost : undefined}
          loading={aiLoading && !subscription.recommendation}
          live={!!aiText}
        />

        <div className="detail-page__actions">
          {isCut ? (
            <StatusBadge variant="cut" label="Cancelled — saved to your account" />
          ) : (
            <SecondaryButton variant="danger" onClick={handleCancel}>
              <span className="material-symbols-outlined">block</span>
              Cancel Subscription
            </SecondaryButton>
          )}

          <SecondaryButton onClick={() => navigate('/dashboard')}>
            {isCut ? 'Back to Subscriptions' : 'Keep Subscription'}
          </SecondaryButton>
        </div>
      </main>
    </div>
  )
}

export default SubscriptionDetailPage
