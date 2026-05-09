import { useState } from 'react'
import SubscriptionCard from '../../../components/page-specific/SubscriptionCard/SubscriptionCard'
import SectionHeader from '../../../components/shared/SectionHeader/SectionHeader'
import StatusBadge from '../../../components/shared/StatusBadge/StatusBadge'
import { useSubscriptions } from '../../../context/SubscriptionsContext'
import './SavingsReportPage.css'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'duplicate', label: 'Duplicates' },
  { id: 'unused', label: 'Unused' },
  { id: 'flagged', label: 'Needs review' },
]

function SavingsReportPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { subscriptions, totals } = useSubscriptions()

  const list = (() => {
    if (activeFilter === 'all') return subscriptions
    if (activeFilter === 'flagged') {
      return subscriptions.filter(
        (s) => s.flagged || s.status === 'warning' || s.status === 'duplicate' || s.status === 'unused',
      )
    }
    return subscriptions.filter((s) => s.status === activeFilter)
  })()

  return (
    <div className="savings-page">
      <header className="savings-page__hero">
        <p className="savings-page__label">Potential annual savings</p>
        <p className="savings-page__amount">
          <span className="savings-page__currency">₪</span>
          {totals.potentialSavings.toLocaleString()}
        </p>
        <StatusBadge
          variant="savings"
          label={`Across ${totals.flagged} flagged subscriptions`}
        />
      </header>

      <section className="savings-page__stats">
        <div className="savings-page__stat">
          <p className="savings-page__stat-value">{totals.count}</p>
          <p className="savings-page__stat-label">Total subs</p>
        </div>
        <div className="savings-page__stat">
          <p className="savings-page__stat-value savings-page__stat-value--success">
            {totals.active}
          </p>
          <p className="savings-page__stat-label">Active</p>
        </div>
        <div className="savings-page__stat">
          <p className="savings-page__stat-value savings-page__stat-value--warning">
            {totals.duplicate}
          </p>
          <p className="savings-page__stat-label">Duplicates</p>
        </div>
      </section>

      <div className="savings-page__filters" role="tablist">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter.id}
            className={`savings-page__filter ${activeFilter === filter.id ? 'savings-page__filter--active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <section className="savings-page__list">
        <SectionHeader title={`${list.length} subscriptions`} />
        <div className="savings-page__cards">
          {list.map((sub) => (
            <SubscriptionCard key={sub.id} subscription={sub} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default SavingsReportPage
