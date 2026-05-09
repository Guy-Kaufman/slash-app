import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_USER } from '../../../data/subscriptions'
import { useSubscriptions } from '../../../context/SubscriptionsContext'
import './SettingsPage.css'

const PREFERENCES = [
  {
    id: 'language',
    icon: 'translate',
    title: 'Language',
    description: 'Hebrew, Arabic, or Russian for cancellation letters',
    value: 'English',
  },
  {
    id: 'currency',
    icon: 'attach_money',
    title: 'Currency',
    description: 'Used across the app',
    value: 'ILS (₪)',
  },
  {
    id: 'notifications',
    icon: 'notifications',
    title: 'Notifications',
    description: 'Alerts for new charges and price increases',
    toggle: true,
  },
]

const ACCOUNT = [
  { id: 'history', icon: 'history', title: 'Upload history', description: 'Past statements you analysed' },
  { id: 'export', icon: 'download', title: 'Export data', description: 'Download a copy of your subscriptions' },
  { id: 'delete', icon: 'delete', title: 'Reset uploaded data', description: 'Clear your imported statement and start over', danger: true },
]

function SettingsPage() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(true)
  const { hasUploaded, reset } = useSubscriptions()

  const handleAccountClick = (id) => {
    if (id === 'delete') {
      reset()
      navigate('/upload')
    }
  }

  return (
    <div className="settings-page">
      <header className="settings-page__profile">
        <div className="settings-page__avatar">{MOCK_USER.initials}</div>
        <div>
          <h2 className="settings-page__name">{MOCK_USER.name}</h2>
          <p className="settings-page__email">{MOCK_USER.email}</p>
        </div>
      </header>

      <section className="settings-page__group">
        <h3 className="settings-page__group-title">Preferences</h3>
        {PREFERENCES.map((row) => (
          <div className="settings-page__row" key={row.id}>
            <span className="settings-page__row-icon">
              <span className="material-symbols-outlined">{row.icon}</span>
            </span>
            <div className="settings-page__row-text">
              <p className="settings-page__row-title">{row.title}</p>
              <p className="settings-page__row-desc">{row.description}</p>
            </div>
            {row.toggle ? (
              <button
                type="button"
                role="switch"
                aria-checked={notifications}
                onClick={() => setNotifications((v) => !v)}
                className={`settings-page__toggle ${notifications ? 'settings-page__toggle--on' : ''}`}
              >
                <span className="settings-page__toggle-thumb" aria-hidden="true" />
              </button>
            ) : (
              <span className="settings-page__row-value">{row.value}</span>
            )}
          </div>
        ))}
      </section>

      <section className="settings-page__group">
        <h3 className="settings-page__group-title">Account</h3>
        {ACCOUNT.map((row) => (
          <button
            key={row.id}
            type="button"
            onClick={() => handleAccountClick(row.id)}
            className={`settings-page__row settings-page__row--button ${row.danger ? 'settings-page__row--danger' : ''}`}
          >
            <span className="settings-page__row-icon">
              <span className="material-symbols-outlined">{row.icon}</span>
            </span>
            <div className="settings-page__row-text">
              <p className="settings-page__row-title">{row.title}</p>
              <p className="settings-page__row-desc">{row.description}</p>
            </div>
            <span className="material-symbols-outlined settings-page__row-chevron">
              chevron_right
            </span>
          </button>
        ))}
      </section>

      <button
        type="button"
        className="settings-page__signout"
        onClick={() => navigate('/')}
      >
        Sign out
      </button>
    </div>
  )
}

export default SettingsPage
