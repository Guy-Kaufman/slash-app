import { useState } from 'react'
import { Link } from 'react-router-dom'
import GradientButton from '../../../components/shared/GradientButton/GradientButton'
import { supabase } from '../../../lib/supabaseClient'
import '../LoginPage/LoginPage.css'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    // We always show the same confirmation (don't reveal whether an email exists).
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })
    setBusy(false)
    setSent(true)
  }

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <span className="auth-page__orb" aria-hidden="true">
          <span className="material-symbols-outlined filled">lock_reset</span>
        </span>

        <header className="auth-page__header">
          <h1 className="auth-page__title">Reset password</h1>
          <p className="auth-page__sub">
            Enter the email tied to your account. We&apos;ll send a link to reset your password.
          </p>
        </header>

        {sent ? (
          <div className="auth-page__form">
            <p className="auth-page__sub">
              If <strong>{email}</strong> is registered, a reset link is on its way.
            </p>
            <Link to="/login" className="auth-page__inline-link">Back to sign in →</Link>
          </div>
        ) : (
          <form className="auth-page__form" onSubmit={handleSubmit}>
            <label className="auth-page__field">
              <span className="auth-page__label">Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="auth-page__input"
                required
              />
            </label>

            <GradientButton type="submit" disabled={busy}>
              {busy ? 'Sending…' : 'Send reset link'}
            </GradientButton>

            <Link to="/login" className="auth-page__inline-link">
              Back to sign in
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordPage
