import SecondaryButton from '../../shared/SecondaryButton/SecondaryButton'
import './CancellationLetterPreview.css'

function CancellationLetterPreview({ merchant, language = 'he' }) {
  const today = new Date().toLocaleDateString('he-IL')

  return (
    <div className="letter-preview">
      <span className="letter-preview__header">תצוגה מקדימה של המכתב</span>
      <div className="letter-preview__body">
        <p>לכבוד,</p>
        <p>מחלקת שירות לקוחות - {merchant}</p>
        <br />
        <p>הנדון: בקשה לביטול מנוי</p>
        <br />
        <p>
          אני הח&quot;מ, גיא קאופמן, מבקש/ת לבטל את המנוי שלי לשירות {merchant} לאלתר.
        </p>
        <br />
        <p>אבקש אישור בכתב על ביטול המנוי וחדילה מחיובים עתידיים.</p>
        <br />
        <p>בכבוד רב,</p>
        <p>גיא קאופמן</p>
        <p>{today}</p>
      </div>

      <div className="letter-preview__actions">
        <SecondaryButton className="letter-preview__action-btn" onClick={() => {}}>
          העתק
        </SecondaryButton>
        <SecondaryButton className="letter-preview__action-btn" onClick={() => {}}>
          הורד PDF
        </SecondaryButton>
        <SecondaryButton className="letter-preview__action-btn" onClick={() => {}}>
          שלח במייל
        </SecondaryButton>
      </div>
    </div>
  )
}

export default CancellationLetterPreview
