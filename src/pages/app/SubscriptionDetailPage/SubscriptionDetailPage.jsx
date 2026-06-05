import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import ScreenHeader from '../../../components/shared/ScreenHeader/ScreenHeader'
import StatusBadge from '../../../components/shared/StatusBadge/StatusBadge'
import SecondaryButton from '../../../components/shared/SecondaryButton/SecondaryButton'
import { useSubscriptions } from '../../../context/SubscriptionsContext'
import './SubscriptionDetailPage.css'

function SubscriptionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { subscriptions, updateStatus } = useSubscriptions()
  const [busy, setBusy] = useState(false)

  const subscription = subscriptions.find((s) => s.id === id) || subscriptions[0]
  const isCut = subscription.status === 'cut'

  const handleCancel = async () => {
    setBusy(true)
    const { error } = await updateStatus(subscription.id, {
      status: 'cut',
      flagged: false,
      warningLabel: null,
    })
    setBusy(false)
    if (error) {
      toast.error('Could not cancel — please try again.')
      return
    }
    toast.success(`${subscription.name} cancelled and saved to your account.`)
    navigate('/dashboard')
  }

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

        <p className="detail-page__recommendation">{subscription.recommendation}</p>

        <div className="detail-page__actions">
          {isCut ? (
            <StatusBadge variant="cut" label="Cancelled — saved to your account" />
          ) : (
            <SecondaryButton variant="danger" onClick={handleCancel} disabled={busy}>
              <span className="material-symbols-outlined">block</span>
              {busy ? 'Cancelling…' : 'Cancel Subscription'}
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
