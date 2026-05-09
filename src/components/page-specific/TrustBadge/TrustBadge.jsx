import './TrustBadge.css'

function TrustBadge() {
  return (
    <div className="trust-badge">
      <div className="trust-badge__icon">🔒</div>
      <div className="trust-badge__content">
        <span className="trust-badge__title">פרטיות מלאה</span>
        <span className="trust-badge__body">העיבוד מתבצע מקומית, הקובץ לא נשמר בשרתים שלנו</span>
      </div>
    </div>
  )
}

export default TrustBadge
