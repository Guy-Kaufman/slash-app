import './AIRecommendation.css'

function AIRecommendation({ text, savingsAmount, loading = false, live = false }) {
  return (
    <div className="ai-recommendation">
      <div className="ai-recommendation__header">
        <span className="ai-recommendation__badge">AI</span>
        <span className="ai-recommendation__title">
          Slash AI recommendation
          {live ? <span className="ai-recommendation__live"> · live</span> : null}
        </span>
      </div>
      <p className={`ai-recommendation__body ${loading ? 'ai-recommendation__body--loading' : ''}`}>
        {loading ? 'Analysing this subscription…' : text}
        {!loading && savingsAmount ? (
          <span className="ai-recommendation__savings">
            {' '}
            Estimated yearly saving: <strong>₪{savingsAmount.toLocaleString()}</strong>
          </span>
        ) : null}
      </p>
    </div>
  )
}

export default AIRecommendation
