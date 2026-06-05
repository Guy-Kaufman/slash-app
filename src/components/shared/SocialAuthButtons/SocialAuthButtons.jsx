import './SocialAuthButtons.css'

const PROVIDERS = [
  {
    id: 'google',
    label: 'Continue with Google',
    icon: (
      <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 1 1 0-24c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 1 0 24 44a20 20 0 0 0 19.6-23.5z" />
        <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.6 5.1A20 20 0 0 0 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 38.5 44 33 44 24c0-1.2-.1-2.4-.4-3.5z" />
      </svg>
    ),
  },
  {
    id: 'microsoft',
    label: 'Continue with Microsoft',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="#F25022" d="M1 1h10.2v10.2H1z" />
        <path fill="#7FBA00" d="M12.8 1H23v10.2H12.8z" />
        <path fill="#00A4EF" d="M1 12.8h10.2V23H1z" />
        <path fill="#FFB900" d="M12.8 12.8H23V23H12.8z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'Continue with Facebook',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.4 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z" />
        <path fill="#FFFFFF" d="M16.7 15.5 17.2 12h-3.3V9.7c0-.9.5-1.8 1.9-1.8h1.5V5c0-.0-1.3-.2-2.6-.2-2.7 0-4.5 1.6-4.5 4.6V12h-3v3.5h3v8.4a12 12 0 0 0 3.8 0v-8.4h2.7z" />
      </svg>
    ),
  },
]

function SocialAuthButtons({ onSelect }) {
  return (
    <div className="social-auth">
      {PROVIDERS.map((provider) => (
        <button
          key={provider.id}
          type="button"
          className="social-auth__button"
          onClick={() => onSelect?.(provider.id)}
        >
          <span className="social-auth__icon">{provider.icon}</span>
          <span className="social-auth__label">{provider.label}</span>
        </button>
      ))}
    </div>
  )
}

export default SocialAuthButtons
