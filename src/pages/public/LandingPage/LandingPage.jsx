import { useNavigate } from 'react-router-dom'
import GradientButton from '../../../components/shared/GradientButton/GradientButton'
import GlowBlob from '../../../components/shared/GlowBlob/GlowBlob'
import { useSubscriptions } from '../../../context/SubscriptionsContext'
import './LandingPage.css'

function LandingPage() {
  const navigate = useNavigate()
  const { session } = useSubscriptions()

  return (
    <div className="landing-page">
      <GlowBlob variant="purple" />
      <GlowBlob variant="blue" />

      <main className="landing-page__main">
        <div className="landing-page__center">
          <div className="landing-page__orb" aria-hidden="true">
            <span className="material-symbols-outlined filled">content_cut</span>
          </div>

          <div className="landing-page__copy">
            <h1 className="landing-page__title">Slash</h1>
            <p className="landing-page__tagline">Cut your hidden expenses</p>
          </div>
        </div>

        <div className="landing-page__cta">
          <GradientButton onClick={() => navigate(session ? '/dashboard' : '/register')}>
            Get Started
          </GradientButton>

          <button
            type="button"
            className="landing-page__signin"
            onClick={() => navigate('/login')}
          >
            I already have an account
          </button>
        </div>
      </main>
    </div>
  )
}

export default LandingPage
