import './OnboardingStep.css'

function OnboardingStep({ title, description, icon }) {
  return (
    <div className="onboarding-step">
      <div className="onboarding-step__illustration">
        {icon}
      </div>
      <h1 className="onboarding-step__title">{title}</h1>
      <p className="onboarding-step__description">{description}</p>
    </div>
  )
}

export default OnboardingStep
