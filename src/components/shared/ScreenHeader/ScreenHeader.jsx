import { useNavigate } from 'react-router-dom'
import './ScreenHeader.css'

function ScreenHeader({ label = 'Back', backTo, onBack, step, totalSteps, showMenu = false, onMenuClick }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) return onBack()
    if (backTo) return navigate(backTo)
    navigate(-1)
  }

  return (
    <div className="screen-header">
      <button
        type="button"
        className="screen-header__back"
        onClick={handleBack}
        aria-label="Back"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      <span className="screen-header__label">{label}</span>

      <div className="screen-header__end">
        {step && totalSteps ? (
          <span className="screen-header__step">
            Step {step} of {totalSteps}
          </span>
        ) : null}

        {showMenu ? (
          <button
            type="button"
            className="screen-header__menu"
            onClick={onMenuClick}
            aria-label="More options"
          >
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default ScreenHeader
