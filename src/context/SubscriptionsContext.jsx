import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { supabase } from '../lib/supabaseClient'

const SubscriptionsContext = createContext(null)

// Supabase columns are snake_case; the app uses camelCase. Map DB rows → app shape.
function mapRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    plan: row.plan,
    category: row.category,
    amount: Number(row.amount),
    billingCycle: row.billing_cycle,
    status: row.status,
    flagged: row.flagged,
    tone: row.tone,
    icon: row.icon,
    initials: row.initials,
    lastChargeDate: row.last_charge_date,
    startDate: row.start_date,
    lastUsage: row.last_usage,
    nextBilling: row.next_billing,
    totalPaid: Number(row.total_paid),
    yearlyCost: Number(row.yearly_cost),
    warningLabel: row.warning_label,
    recommendation: row.recommendation,
  }
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}/
const isoDateOrNull = (v) =>
  typeof v === 'string' && ISO_DATE.test(v) ? v.slice(0, 10) : null

// App shape → DB insert row (with the owning user). Generates a fresh uuid for
// each row and keeps the original short id as `slug` (used for display only).
function toDbRow(sub, userId) {
  return {
    id: crypto.randomUUID(),
    user_id: userId,
    slug: sub.slug || sub.id || null,
    name: sub.name,
    plan: sub.plan ?? null,
    category: sub.category ?? null,
    amount: sub.amount ?? 0,
    billing_cycle: sub.billingCycle || 'monthly',
    status: sub.status || 'active',
    flagged: !!sub.flagged,
    tone: sub.tone ?? null,
    icon: sub.icon ?? null,
    initials: sub.initials ?? null,
    last_charge_date: isoDateOrNull(sub.lastChargeDate),
    start_date: isoDateOrNull(sub.startDate),
    last_usage: sub.lastUsage ?? null,
    next_billing: sub.nextBilling ?? null,
    total_paid: sub.totalPaid ?? 0,
    yearly_cost: sub.yearlyCost ?? (sub.amount ?? 0) * 12,
    warning_label: sub.warningLabel ?? null,
    recommendation: sub.recommendation ?? null,
  }
}

export function SubscriptionsProvider({ children }) {
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [subscriptions, setSubscriptions] = useState(null) // null until loaded
  const [sourceLabel, setSourceLabel] = useState(null)
  const [loadingData, setLoadingData] = useState(false)

  const user = session?.user ?? null

  // Track the auth session (initial + future changes).
  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setAuthReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  // Load the signed-in user's subscriptions (RLS scopes the query to them).
  // A brand-new account simply has none — the user starts with an empty
  // dashboard until they upload a statement of their own.
  const loadData = useCallback(async () => {
    setLoadingData(true)
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .order('created_at', { ascending: true })
      if (error) throw error
      setSubscriptions(data ? data.map(mapRow) : [])
    } catch {
      // Network/table error — show an empty state rather than fake data.
      setSubscriptions([])
    } finally {
      setLoadingData(false)
    }
  }, [])

  useEffect(() => {
    if (!authReady) return
    // Syncing app state with the Supabase session/data is a legit effect use.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (user) {
      loadData()
    } else {
      setSubscriptions(null)
      setSourceLabel(null)
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [authReady, user, loadData])

  // Replace the user's set with a freshly parsed statement.
  const setUploaded = useCallback(
    async (parsedSubs, source) => {
      if (!user) return { error: new Error('Not signed in.') }
      const rows = parsedSubs.map((s) => toDbRow(s, user.id))
      // Optimistic: show parsed data immediately.
      setSubscriptions(rows.map(mapRow))
      setSourceLabel(source || null)
      try {
        await supabase.from('subscriptions').delete().eq('user_id', user.id)
        const { data, error } = await supabase.from('subscriptions').insert(rows).select()
        if (error) throw error
        if (data) setSubscriptions(data.map(mapRow))
        return { error: null }
      } catch (error) {
        return { error }
      }
    },
    [user],
  )

  // Clear the user's imported data — back to an empty account.
  const reset = useCallback(async () => {
    if (!user) return
    setSourceLabel(null)
    try {
      await supabase.from('subscriptions').delete().eq('user_id', user.id)
    } catch {
      // ignore — clear locally regardless
    }
    setSubscriptions([])
  }, [user])

  // Cancel a subscription: flip status to "cut", record it in `cancellations`,
  // and roll the optimistic UI back if the write fails.
  const cancelSubscription = useCallback(
    async (id) => {
      if (!user) return { error: new Error('Not signed in.') }
      const target = subscriptions?.find((s) => s.id === id)
      if (!target) return { error: new Error('Subscription not found.') }

      const prev = subscriptions
      setSubscriptions((cur) =>
        cur.map((s) =>
          s.id === id ? { ...s, status: 'cut', flagged: false, warningLabel: null } : s,
        ),
      )

      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .update({ status: 'cut', flagged: false, warning_label: null })
          .eq('id', id)
          .select()
        // An RLS-blocked update succeeds with zero rows and no error.
        if (error || !data || data.length === 0) {
          throw error || new Error('The change was not saved (check permissions).')
        }
        // Ledger entry is best-effort: a missing table must not undo the cancel.
        try {
          await supabase.from('cancellations').insert({
            subscription_id: id,
            user_id: user.id,
            monthly_amount: target.amount,
            yearly_saving: target.yearlyCost,
            reason: target.warningLabel || target.status,
          })
        } catch {
          // ignore — the subscription itself is already cancelled
        }
        return { error: null }
      } catch (error) {
        setSubscriptions(prev)
        return { error }
      }
    },
    [user, subscriptions],
  )

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setSubscriptions(null)
    setSourceLabel(null)
  }, [])

  const value = useMemo(() => {
    const list = subscriptions || []
    return {
      session,
      user,
      authReady,
      loadingData,
      subscriptions: list,
      hasUploaded: !!sourceLabel,
      sourceLabel,
      totals: computeTotals(list),
      setUploaded,
      reset,
      cancelSubscription,
      signOut,
    }
  }, [
    session,
    user,
    authReady,
    loadingData,
    subscriptions,
    sourceLabel,
    setUploaded,
    reset,
    cancelSubscription,
    signOut,
  ])

  return (
    <SubscriptionsContext.Provider value={value}>
      {children}
    </SubscriptionsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSubscriptions() {
  const ctx = useContext(SubscriptionsContext)
  if (!ctx) throw new Error('useSubscriptions must be used inside SubscriptionsProvider')
  return ctx
}

function computeTotals(list) {
  return {
    monthlySpending: list.reduce(
      (acc, s) =>
        acc + (s.billingCycle === 'monthly' && s.status !== 'cut' ? s.amount : 0),
      0,
    ),
    potentialSavings: list.reduce(
      (acc, s) =>
        s.status !== 'cut' &&
        (['warning', 'duplicate', 'unused'].includes(s.status) || s.flagged)
          ? acc + s.yearlyCost
          : acc,
      0,
    ),
    active: list.filter((s) => s.status === 'active').length,
    duplicate: list.filter((s) => s.status === 'duplicate').length,
    unused: list.filter((s) => s.status === 'unused').length,
    cut: list.filter((s) => s.status === 'cut').length,
    flagged: list.filter((s) => s.status !== 'active' && s.status !== 'cut').length,
    count: list.length,
  }
}
