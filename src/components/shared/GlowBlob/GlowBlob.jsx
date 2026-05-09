import './GlowBlob.css'

function GlowBlob({ variant = 'purple' }) {
  return <div className={`glow-blob glow-blob--${variant}`} aria-hidden="true" />
}

export default GlowBlob
