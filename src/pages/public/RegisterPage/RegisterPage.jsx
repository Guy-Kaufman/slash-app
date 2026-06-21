import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import GradientButton from '../../../components/shared/GradientButton/GradientButton'
import SocialAuthButtons from '../../../components/shared/SocialAuthButtons/SocialAuthButtons'
import { supabase } from '../../../lib/supabaseClient'
import '../LoginPage/LoginPage.css'

function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    setBusy(false)
    if (error) {
      toast.error(error.message || 'Could not create the account. Try a different email.')
      return
    }
    // When email confirmation is enabled, signUp returns no session.
    if (!data.session) {
      toast.success('Account created — check your inbox to confirm, then sign in.')
      navigate('/login')
      return
    }
    navigate('/onboarding')
  }

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <span className="auth-page__orb" aria-hidden="true">
          <span className="material-symbols-outlined filled">content_cut</span>
        </span>

        <header className="auth-page__header">
          <h1 className="auth-page__title">Create your account</h1>
          <p className="auth-page__sub">
            Find every recurring charge in less than three minutes.
          </p>
        </header>

        <SocialAuthButtons dividerText="or sign up with email" />

        <form className="auth-page__form" onSubmit={handleSubmit}>
          <label className="auth-page__field">
            <span className="auth-page__label">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="auth-page__input"
              required
            />
          </label>

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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              minLength={8}
              className="auth-page__input"
              required
            />
          </label>

          <GradientButton type="submit" disabled={busy}>
            {busy ? 'Creating account…' : 'Create account'}
          </GradientButton>
        </form>

        <p className="auth-page__alt">
          Already have an account? <Link to="/login" className="auth-page__inline-link">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
