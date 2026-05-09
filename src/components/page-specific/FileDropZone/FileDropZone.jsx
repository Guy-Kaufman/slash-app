import { useRef, useState } from 'react'
import SecondaryButton from '../../shared/SecondaryButton/SecondaryButton'
import './FileDropZone.css'

function FileDropZone({ onFileSelect }) {
  const [fileSelected, setFileSelected] = useState(false)
  const inputRef = useRef(null)

  function handleButtonClick() {
    inputRef.current?.click()
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(true)
      setTimeout(() => {
        onFileSelect && onFileSelect(e.target.files[0])
      }, 500)
    }
  }

  return (
    <div className="file-drop-zone">
      <div className="file-drop-zone__icon-circle">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 20V10M14 10L10 14M14 10L18 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 22C4.34 22 3 20.66 3 19C3 17.54 4.04 16.32 5.43 16.06C5.15 15.41 5 14.72 5 14C5 11.24 7.24 9 10 9C10.33 9 10.66 9.04 10.97 9.1C11.9 7.23 13.83 6 16 6C19.31 6 22 8.69 22 12C22 12.34 21.97 12.68 21.92 13H22C23.66 13 25 14.34 25 16C25 17.66 23.66 19 22 19H6V22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {fileSelected ? (
        <div className="file-drop-zone__selected">
          <span className="file-drop-zone__check">✓</span>
          <span className="file-drop-zone__selected-text">קובץ נבחר בהצלחה</span>
        </div>
      ) : (
        <>
          <h3 className="file-drop-zone__title">גרור קובץ לכאן</h3>
          <p className="file-drop-zone__caption">XLSX, CSV עד 10MB</p>
          <SecondaryButton onClick={handleButtonClick} className="file-drop-zone__btn">
            בחר קובץ ידנית
          </SecondaryButton>
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.csv"
        className="file-drop-zone__input"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default FileDropZone
