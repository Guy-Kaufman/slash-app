import { useState, useEffect } from 'react'
import './ProcessingAnimation.css'

const STATUS_TEXTS = [
  'מעלה את הקובץ...',
  'מנתח תנועות בנק...',
  'מזהה מנויים חוזרים...',
  'מסיים ניתוח...',
]

function ProcessingAnimation({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2
        if (next >= 25 && prev < 25) setStatusIndex(1)
        if (next >= 50 && prev < 50) setStatusIndex(2)
        if (next >= 75 && prev < 75) setStatusIndex(3)
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete && onComplete(), 200)
          return 100
        }
        return next
      })
    }, 60)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="processing-animation">
      <div className="processing-animation__spinner" />

      <div className="processing-animation__progress-wrap">
        <div
          className="processing-animation__progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="processing-animation__status">{STATUS_TEXTS[statusIndex]}</p>
      <p className="processing-animation__percent">מנתח {progress}%</p>
    </div>
  )
}

export default ProcessingAnimation
