import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlowBlob from '../../../components/shared/GlowBlob/GlowBlob'
import './ProcessingPage.css'

const STEPS = [
  'Reading your file…',
  'Detecting recurring charges…',
  'Spotting duplicates and unused services…',
  'Wrapping up — almost there.',
]

function ProcessingPage() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1))
    }, 750)

    const finishTimer = setTimeout(() => {
      navigate('/dashboard')
    }, 3000)

    return () => {
      clearInterval(stepInterval)
      clearTimeout(finishTimer)
    }
  }, [navigate])

  return (
    <div className="processing-page">
      <GlowBlob variant="purple" />
      <GlowBlob variant="blue" />

      <div className="processing-page__content">
        <div className="processing-page__loader" aria-hidden="true">
          <span className="processing-page__loader-ring" />
          <span className="processing-page__loader-orb">
            <span className="material-symbols-outlined filled">content_cut</span>
          </span>
        </div>

        <h1 className="processing-page__title">Analysing your statement</h1>
        <p className="processing-page__step" aria-live="polite">
          {STEPS[stepIndex]}
        </p>
      </div>
    </div>
  )
}

export default ProcessingPage
