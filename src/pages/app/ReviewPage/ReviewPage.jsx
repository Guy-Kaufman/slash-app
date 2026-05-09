import { useNavigate, useSearchParams } from 'react-router-dom'
import GradientButton from '../../../components/shared/GradientButton/GradientButton'
import SecondaryButton from '../../../components/shared/SecondaryButton/SecondaryButton'
import GlowBlob from '../../../components/shared/GlowBlob/GlowBlob'
import { getSubscriptionById, SUBSCRIPTIONS } from '../../../data/subscriptions'
import './ReviewPage.css'

function ReviewPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const cancelId = params.get('cancel')
  const subscription = getSubscriptionById(cancelId) || SUBSCRIPTIONS[0]

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

          <h1 className="review-page__title">Review your plan</h1>
          <p className="review-page__copy">
            Cancelling your {subscription.name} subscription means you will immediately
            lose your protected rate.
          </p>

          <div className="review-page__highlight">
            <span className="review-page__highlight-line" aria-hidden="true" />

            <span className="material-symbols-outlined review-page__highlight-icon">
              trending_up
            </span>
            <p className="review-page__highlight-label">You are walking away from</p>
            <p className="review-page__highlight-amount">
              ₪{subscription.yearlyCost.toLocaleString()}
            </p>

            <span className="review-page__highlight-pill">
              <span className="review-page__highlight-dot" aria-hidden="true" />
              yearly savings
            </span>
          </div>
        </div>

        <div className="review-page__actions">
          <GradientButton
            variant="confirm"
            onClick={() => navigate('/dashboard')}
          >
            Confirm Cancellation
          </GradientButton>
          <SecondaryButton onClick={() => navigate(-1)}>
            Go Back
          </SecondaryButton>
        </div>
      </main>
    </div>
  )
}

export default ReviewPage
