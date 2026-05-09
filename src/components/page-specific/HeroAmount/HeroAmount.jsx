import './HeroAmount.css'

function HeroAmount({
  amount,
  label = 'Monthly subscription spending',
  savings,
  savingsLabel = 'potential savings',
}) {
  return (
    <section className="hero-amount">
      <p className="hero-amount__label">{label}</p>
      <div className="hero-amount__number">
        <span className="hero-amount__currency">₪</span>
        <span>{Number(amount).toLocaleString()}</span>
      </div>
      {typeof savings === 'number' ? (
        <div className="hero-amount__savings">
          <span className="material-symbols-outlined">trending_down</span>
          <span>
            ₪{savings.toLocaleString()} {savingsLabel}
          </span>
        </div>
      ) : null}
    </section>
  )
}

export default HeroAmount
