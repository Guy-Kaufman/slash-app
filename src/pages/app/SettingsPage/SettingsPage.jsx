import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSubscriptions } from '../../../context/SubscriptionsContext'
import './SettingsPage.css'

function deriveProfile(user) {
  const email = user?.email || 'you@email.com'
  const name = user?.user_metadata?.full_name || email.split('@')[0]
  const initials = name
    .split(/[\s.@_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('')
  return { email, name, initials: initials || email[0].toUpperCase() }
}

const PREFERENCES = [
  {
    id: 'language',
    icon: 'translate',
    title: 'Language',
    description: 'Interface language',
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
  const { user, reset, signOut } = useSubscriptions()
  const profile = deriveProfile(user)

  const handleAccountClick = async (id) => {
    if (id === 'delete') {
      await reset()
      navigate('/upload')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="settings-page">
      <header className="settings-page__profile">
        <div className="settings-page__avatar">{profile.initials}</div>
        <div>
          <h2 className="settings-page__name">{profile.name}</h2>
          <p className="settings-page__email">{profile.email}</p>
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
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  )
}

export default SettingsPage
