import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { SUBSCRIPTIONS as DEFAULT_SUBS } from '../data/subscriptions'
import { supabase } from '../lib/supabaseClient'

const STORAGE_KEY = 'slash:subscriptions'
const SOURCE_KEY = 'slash:source'

const SubscriptionsContext = createContext(null)

// Supabase columns are snake_case; the app uses camelCase. Map DB rows → app shape.
function mapRow(row) {
  return {
    id: row.id,
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

export function SubscriptionsProvider({ children }) {
  const [parsed, setParsed] = useState(null)
  const [remote, setRemote] = useState(null)
  const [sourceLabel, setSourceLabel] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on first mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const src = localStorage.getItem(SOURCE_KEY)
      if (raw) {
        const stored = JSON.parse(raw)
        if (Array.isArray(stored) && stored.length) {
          setParsed(stored)
          if (src) setSourceLabel(src)
        }
      }
    } catch {
      // ignore corrupt cache
    }
    setHydrated(true)
  }, [])

  // Fetch subscriptions from Supabase. Used as the data source when the user
  // has not uploaded a statement; falls back silently to the bundled mock data.
  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .order('created_at', { ascending: true })
        if (active && !error && Array.isArray(data) && data.length) {
          setRemote(data.map(mapRow))
        }
      } catch {
        // Network or missing-table error — fall back to DEFAULT_SUBS.
      }
    })()
    return () => {
      active = false
    }
  }, [])

  const setUploaded = (subs, source) => {
    setParsed(subs)
    setSourceLabel(source || null)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subs))
      if (source) localStorage.setItem(SOURCE_KEY, source)
    } catch {
      // storage full / unavailable — fall back to in-memory only
    }
  }

  const reset = () => {
    setParsed(null)
    setSourceLabel(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(SOURCE_KEY)
    } catch {}
  }

  const value = useMemo(() => {
    // Priority: uploaded statement → Supabase data → bundled mock fallback.
    const list =
      parsed && parsed.length
        ? parsed
        : remote && remote.length
          ? remote
          : DEFAULT_SUBS
    const totals = computeTotals(list)
    return {
      subscriptions: list,
      hasUploaded: !!parsed,
      sourceLabel,
      totals,
      setUploaded,
      reset,
      hydrated,
    }
  }, [parsed, remote, sourceLabel, hydrated])

  return (
    <SubscriptionsContext.Provider value={value}>
      {children}
    </SubscriptionsContext.Provider>
  )
}

export function useSubscriptions() {
  const ctx = useContext(SubscriptionsContext)
  if (!ctx) throw new Error('useSubscriptions must be used inside SubscriptionsProvider')
  return ctx
}

function computeTotals(list) {
  return {
    monthlySpending: list.reduce(
      (acc, s) => acc + (s.billingCycle === 'monthly' ? s.amount : 0),
      0,
    ),
    potentialSavings: list.reduce(
      (acc, s) =>
        ['warning', 'duplicate', 'unused'].includes(s.status) || s.flagged
          ? acc + s.yearlyCost
          : acc,
      0,
    ),
    active: list.filter((s) => s.status === 'active').length,
    duplicate: list.filter((s) => s.status === 'duplicate').length,
    unused: list.filter((s) => s.status === 'unused').length,
    flagged: list.filter((s) => s.flagged || s.status !== 'active').length,
    count: list.length,
  }
}
