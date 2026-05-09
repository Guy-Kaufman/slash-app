import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { SUBSCRIPTIONS as DEFAULT_SUBS } from '../data/subscriptions'

const STORAGE_KEY = 'slash:subscriptions'
const SOURCE_KEY = 'slash:source'

const SubscriptionsContext = createContext(null)

export function SubscriptionsProvider({ children }) {
  const [parsed, setParsed] = useState(null)
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
    const list = parsed && parsed.length ? parsed : DEFAULT_SUBS
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
  }, [parsed, sourceLabel, hydrated])

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
