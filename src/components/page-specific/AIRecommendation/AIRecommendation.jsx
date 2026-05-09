import './AIRecommendation.css'

function AIRecommendation({ text, savingsAmount }) {
  return (
    <div className="ai-recommendation">
      <div className="ai-recommendation__header">
        <span className="ai-recommendation__badge">AI</span>
        <span className="ai-recommendation__title">המלצת Slash AI</span>
      </div>
      <p className="ai-recommendation__body">
        {text}
        {savingsAmount && (
          <span className="ai-recommendation__savings"> חסכון שנתי: <strong>₪{savingsAmount.toLocaleString()}</strong></span>
        )}
      </p>
    </div>
  )
}

export default AIRecommendation
