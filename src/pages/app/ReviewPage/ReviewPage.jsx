import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import GradientButton from '../../../components/shared/GradientButton/GradientButton'
import SecondaryButton from '../../../components/shared/SecondaryButton/SecondaryButton'
import GlowBlob from '../../../components/shared/GlowBlob/GlowBlob'
import { useSubscriptions } from '../../../context/SubscriptionsContext'
import './ReviewPage.css'

function ReviewPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const cancelId = params.get('cancel')
  const { subscriptions, cancelSubscription } = useSubscriptions()
  const [busy, setBusy] = useState(false)

  const subscription =
    subscriptions.find((s) => s.id === cancelId) || subscriptions[0]

  if (!subscription) {
    return (
      <div className="review-page">
        <main className="review-page__main">
          <p className="review-page__copy">Nothing to review.</p>
          <SecondaryButton onClick={() => navigate('/dashboard')}>
            Back to Subscriptions
          </SecondaryButton>
        </main>
      </div>
    )
  }

  const handleConfirm = async () => {
    setBusy(true)
    const { error } = await cancelSubscription(subscription.id)
    setBusy(false)
    if (error) {
      toast.error('Could not cancel — please try again.')
      return
    }
    toast.success(`${subscription.name} cancelled and saved to your account.`)
    navigate('/dashboard')
  }

  return (
    <div className="review-page">
      <GlowBlob variant="success" />

      <main className="review-page__main">
        <div className="review-page__content">
          <div className="review-page__shield" aria-hidden="true">
            <span className="review-page__pulse review-page__pulse--1" />
            <span className="review-page__pulse review-page__pulse--2" />
            <span className="review-page__shield-orb">
              <span className="material-symbols-outlined filled">shield_lock</span>
            </span>
          </div>

          <h1 className="review-page__title">Confirm cancellation</h1>
          <p className="review-page__copy">
            We&apos;ll mark <strong>{subscription.name}</strong> as cancelled and record
            it in your savings ledger.
          </p>

          <div className="review-page__highlight">
            <span className="review-page__highlight-line" aria-hidden="true" />

            <span className="material-symbols-outlined review-page__highlight-icon">
              savings
            </span>
            <p className="review-page__highlight-label">You&apos;ll save</p>
            <p className="review-page__highlight-amount">
              ₪{subscription.yearlyCost.toLocaleString()}
            </p>

            <span className="review-page__highlight-pill">
              <span className="review-page__highlight-dot" aria-hidden="true" />
              per year
            </span>
          </div>
        </div>

        <div className="review-page__actions">
          <GradientButton variant="confirm" onClick={handleConfirm} disabled={busy}>
            {busy ? 'Cancelling…' : 'Confirm Cancellation'}
          </GradientButton>
          <SecondaryButton onClick={() => navigate(-1)}>Go Back</SecondaryButton>
        </div>
      </main>
    </div>
  )
}

export default ReviewPage
