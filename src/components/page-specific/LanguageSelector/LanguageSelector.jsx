import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import './LanguageSelector.css'

const LANGUAGES = [
  { value: 'he', label: 'עברית' },
  { value: 'ar', label: 'العربية' },
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
]

function LanguageSelector({ value, onChange }) {
  return (
    <div className="language-selector">
      <span className="language-selector__label">שפת המכתב:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="בחר שפה" />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default LanguageSelector
