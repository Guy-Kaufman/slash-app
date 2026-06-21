import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientButton from '../../../components/shared/GradientButton/GradientButton'
import SecondaryButton from '../../../components/shared/SecondaryButton/SecondaryButton'
import { useSubscriptions } from '../../../context/SubscriptionsContext'
import { parseStatementFile } from '../../../utils/parseStatement'
import { SUPPORTED_BANKS } from '../../../data/subscriptions'
import './UploadPage.css'

const ACCEPTED = '.xlsx,.xls,.csv'

function UploadPage() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const { setUploaded } = useSubscriptions()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleBrowseClick = () => inputRef.current?.click()

  const handleFile = async (file) => {
    if (!file) return
    setError(null)
    setBusy(true)
    try {
      const subs = await parseStatementFile(file)
      if (!subs.length) {
        setError(
          'We could not detect any recurring charges in this file. Try the demo file or check that your bank export uses the expected columns.',
        )
        setBusy(false)
        return
      }
      setUploaded(subs, file.name)
      navigate('/processing')
    } catch (err) {
      console.error(err)
      setError('Sorry, we could not read this file. Make sure it is an .xlsx, .xls, or .csv export.')
      setBusy(false)
    }
  }

  const handleInputChange = (event) => {
    const file = event.target.files?.[0]
    handleFile(file)
    event.target.value = '' // allow re-selecting same file
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragOver(false)
    const file = event.dataTransfer.files?.[0]
    handleFile(file)
  }

  return (
    <div className="upload-page">
      <header className="upload-page__hero">
        <p className="upload-page__step">Step 1 of 3</p>
        <h1 className="upload-page__title">
          Upload your <span className="upload-page__title-grad">bank transactions</span>
        </h1>
        <p className="upload-page__sub">
          We&apos;ll detect every recurring charge in seconds. Your file never leaves your device.
        </p>
      </header>

      <div
        role="button"
        tabIndex={0}
        onClick={handleBrowseClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleBrowseClick()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`upload-page__dropzone ${dragOver ? 'upload-page__dropzone--over' : ''} ${busy ? 'upload-page__dropzone--busy' : ''}`}
      >
        <span className="upload-page__cloud" aria-hidden="true">
          <span className="material-symbols-outlined">
            {busy ? 'progress_activity' : 'cloud_upload'}
          </span>
        </span>
        <span className="upload-page__drop-title">
          {busy ? 'Reading your statement…' : 'Drag & drop your file'}
        </span>
        <span className="upload-page__drop-sub">
          {busy ? 'Detecting recurring charges' : 'or click to browse — Excel or CSV'}
        </span>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          onChange={handleInputChange}
          className="upload-page__input"
          disabled={busy}
        />
      </div>

      {error ? <p className="upload-page__error">{error}</p> : null}

      <a
        className="upload-page__demo-link"
        href="/slash-demo-statement.xlsx"
        download
      >
        <span className="material-symbols-outlined">download</span>
        Download demo statement (.xlsx)
      </a>

      <div className="upload-page__trust">
        <span className="upload-page__trust-icon" aria-hidden="true">
          <span className="material-symbols-outlined filled">lock</span>
        </span>
        <div>
          <p className="upload-page__trust-title">Private by design</p>
          <p className="upload-page__trust-body">
            All processing happens locally in your browser. Nothing is uploaded to any server.
          </p>
        </div>
      </div>

      <section className="upload-page__banks">
        <h2 className="upload-page__banks-title">Supported banks</h2>
        <div className="upload-page__banks-list">
          {SUPPORTED_BANKS.map((bank) => (
            <div key={bank.id} className="upload-page__bank-tile" title={bank.name}>
              <img
                src={bank.logo}
                alt={bank.name}
                className="upload-page__bank-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <GradientButton onClick={handleBrowseClick} disabled={busy}>
        {busy ? 'Working…' : 'Choose file'}
      </GradientButton>

      <SecondaryButton variant="ghost" onClick={() => navigate('/dashboard')}>
        Skip for now
      </SecondaryButton>
    </div>
  )
}

export default UploadPage
