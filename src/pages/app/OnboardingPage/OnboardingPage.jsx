import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientButton from '../../../components/shared/GradientButton/GradientButton'
import GlowBlob from '../../../components/shared/GlowBlob/GlowBlob'
import { ONBOARDING_STEPS } from '../../../data/subscriptions'
import './OnboardingPage.css'

function OnboardingPage() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const total = ONBOARDING_STEPS.length
  const step = ONBOARDING_STEPS[stepIndex]

  const handleNext = () => {
    if (stepIndex < total - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      navigate('/upload')
    }
  }

  const handleSkip = () => navigate('/upload')

  return (
    <div className="onboarding-page">
      <GlowBlob variant="purple" />
      <GlowBlob variant="blue" />

      <div className="onboarding-page__top">
        <button
          type="button"
          className="onboarding-page__skip"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>

      <main className="onboarding-page__main">
        <div className="onboarding-page__icon" aria-hidden="true">
          <span className="material-symbols-outlined filled">{step.icon}</span>
        </div>

        <h1 className="onboarding-page__title">{step.title}</h1>
        <p className="onboarding-page__body">{step.body}</p>

        <div className="onboarding-page__progress" role="tablist">
          {ONBOARDING_STEPS.map((_, idx) => (
            <span
              key={idx}
              className={`onboarding-page__dot ${idx === stepIndex ? 'onboarding-page__dot--active' : ''}`}
              aria-hidden="true"
            />
          ))}
        </div>
      </main>

      <div className="onboarding-page__cta">
        <GradientButton onClick={handleNext}>
          {stepIndex < total - 1 ? 'Next' : 'Get started'}
        </GradientButton>

        {stepIndex > 0 ? (
          <button
            type="button"
            className="onboarding-page__back"
            onClick={() => setStepIndex(stepIndex - 1)}
          >
            Back
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default OnboardingPage
