import './ChargeBreakdownCard.css'

function ChargeBreakdownCard({ rows }) {
  return (
    <div className="charge-breakdown-card">
      {rows.map((row, index) => (
        <div key={index} className="charge-breakdown-card__row">
          <span className="charge-breakdown-card__label">{row.label}</span>
          <span className={`charge-breakdown-card__value${row.highlight ? ` charge-breakdown-card__value--${row.highlight}` : ''}`}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ChargeBreakdownCard
