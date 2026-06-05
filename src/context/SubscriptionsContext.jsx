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

  // Persist a change back to Supabase. Updates local state optimistically,
  // writes the (camelCase → snake_case mapped) patch to the row, and reverts
  // the optimistic update if the write fails.
  const updateStatus = async (id, patch) => {
    const apply = (list) =>
      list ? list.map((s) => (s.id === id ? { ...s, ...patch } : s)) : list

    // Snapshot both sources so we can roll back if the write fails.
    const prevRemote = remote
    const prevParsed = parsed

    setRemote((cur) => apply(cur))
    setParsed((cur) => {
      const next = apply(cur)
      if (next && next !== cur) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {}
      }
      return next
    })

    const dbPatch = {}
    if ('status' in patch) dbPatch.status = patch.status
    if ('flagged' in patch) dbPatch.flagged = patch.flagged
    if ('warningLabel' in patch) dbPatch.warning_label = patch.warningLabel

    // .select() returns the affected rows. An RLS-blocked update succeeds with
    // zero rows and no error — so treat "no rows changed" as a failure, else
    // the UI would celebrate a write that never happened.
    const { data, error } = await supabase
      .from('subscriptions')
      .update(dbPatch)
      .eq('id', id)
      .select()

    const wroteNothing = !error && (!data || data.length === 0)
    if (error || wroteNothing) {
      setRemote(prevRemote)
      setParsed(prevParsed)
      if (prevParsed) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(prevParsed))
        } catch {}
      }
      return {
        error:
          error ||
          new Error('No rows were updated — the change was not saved (check permissions).'),
      }
    }
    return { error: null }
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
      updateStatus,
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
