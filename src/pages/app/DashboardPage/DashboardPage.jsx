import HeroAmount from '../../../components/page-specific/HeroAmount/HeroAmount'
import SubscriptionCard from '../../../components/page-specific/SubscriptionCard/SubscriptionCard'
import SectionHeader from '../../../components/shared/SectionHeader/SectionHeader'
import { useSubscriptions } from '../../../context/SubscriptionsContext'
import './DashboardPage.css'

function DashboardPage() {
  const { subscriptions, totals, hasUploaded, sourceLabel } = useSubscriptions()

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
