import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import GradientButton from '../../../components/shared/GradientButton/GradientButton'
import SocialAuthButtons from '../../../components/shared/SocialAuthButtons/SocialAuthButtons'
import { supabase } from '../../../lib/supabaseClient'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) {
      toast.error(error.message || 'Could not sign in — check your details and try again.')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <span className="auth-page__orb" aria-hidden="true">
          <span className="material-symbols-outlined filled">content_cut</span>
        </span>

        <header className="auth-page__header">
          <h1 className="auth-page__title">Welcome back</h1>
          <p className="auth-page__sub">Sign in to keep cutting hidden expenses.</p>
        </header>

        <SocialAuthButtons />

        <div className="auth-page__divider" role="separator">
          <span>or continue with email</span>
        </div>

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

          <label className="auth-page__field">
            <span className="auth-page__label">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="auth-page__input"
              required
            />
          </label>

          <Link to="/forgot-password" className="auth-page__inline-link">
            Forgot your password?
          </Link>

          <GradientButton type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </GradientButton>
        </form>

        <p className="auth-page__alt">
          New to Slash? <Link to="/register" className="auth-page__inline-link">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
