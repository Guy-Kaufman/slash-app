import { useNavigate } from 'react-router-dom'
import HeroAmount from '../../../components/page-specific/HeroAmount/HeroAmount'
import SubscriptionCard from '../../../components/page-specific/SubscriptionCard/SubscriptionCard'
import SectionHeader from '../../../components/shared/SectionHeader/SectionHeader'
import GradientButton from '../../../components/shared/GradientButton/GradientButton'
import { useSubscriptions } from '../../../context/SubscriptionsContext'
import './DashboardPage.css'

function DashboardPage() {
  const navigate = useNavigate()
  const { subscriptions, totals, hasUploaded, sourceLabel, loadingData } =
    useSubscriptions()

  if (loadingData && subscriptions.length === 0) {
    return (
      <div className="dashboard-page">
        <p className="dashboard-page__loading">Loading your subscriptions…</p>
      </div>
    )
  }

  // Fresh account (or after a reset): nothing imported yet.
  if (subscriptions.length === 0) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-page__empty">
          <span className="dashboard-page__empty-icon" aria-hidden="true">
            <span className="material-symbols-outlined">receipt_long</span>
          </span>
          <h2 className="dashboard-page__empty-title">No subscriptions yet</h2>
          <p className="dashboard-page__empty-text">
            Upload your bank statement and Slash will detect every recurring
            charge, duplicate, and unused service — automatically.
          </p>
          <GradientButton onClick={() => navigate('/upload')}>
            Upload a statement
          </GradientButton>
        </div>
      </div>
    )
  }

  // Show top 4 by amount on the dashboard
  const featured = [...subscriptions].sort((a, b) => b.amount - a.amount).slice(0, 4)

  return (
    <div className="dashboard-page">
      <HeroAmount
        amount={totals.monthlySpending}
        label="Monthly subscription spending"
        savings={Math.round(totals.potentialSavings / 12) || undefined}
      />

      <section className="dashboard-page__list">
        <SectionHeader
          title={hasUploaded ? `Your subscriptions (${totals.count})` : 'Your subscriptions'}
          actionTo="/savings"
        />

        {hasUploaded && sourceLabel ? (
          <p className="dashboard-page__source">
            Detected from <strong>{sourceLabel}</strong>
          </p>
        ) : null}

        <div className="dashboard-page__cards">
          {featured.map((sub) => (
            <SubscriptionCard key={sub.id} subscription={sub} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
