import * as XLSX from 'xlsx'

const ICON_MAP = [
  { match: /netflix/i,                  icon: 'movie',           tone: '#E50914' },
  { match: /spotify/i,                  icon: 'music_note',      tone: '#1DB954' },
  { match: /adobe/i,                    icon: 'brush',           tone: '#FF0000' },
  { match: /dropbox/i,                  icon: 'cloud',           tone: '#0061FF' },
  { match: /openai|chatgpt/i,           icon: 'auto_awesome',    tone: '#10A37F' },
  { match: /apple|icloud/i,             icon: 'cloud_done',      tone: '#A2AAAD' },
  { match: /notion/i,                   icon: 'sticky_note_2',   tone: '#FFFFFF' },
  { match: /figma/i,                    icon: 'design_services', tone: '#A259FF' },
  { match: /google/i,                   icon: 'cloud_done',      tone: '#4285F4' },
  { match: /zoom/i,                     icon: 'videocam',        tone: '#2D8CFF' },
  { match: /canva/i,                    icon: 'palette',         tone: '#00C4CC' },
  { match: /youtube/i,                  icon: 'smart_display',   tone: '#FF0000' },
  { match: /disney/i,                   icon: 'movie_filter',    tone: '#0E3B87' },
]

const PALETTE = [
  '#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B', '#EF4444',
  '#06B6D4', '#A855F7', '#EC4899', '#10B981', '#F97316',
]

export async function parseStatementFile(file) {
  const buffer = await file.arrayBuffer()
  const wb = XLSX.read(buffer, { type: 'array', cellDates: false })
  const sheet = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false })

  const records = extractRecords(rows)
  return detectSubscriptions(records)
}

/**
 * Extract debit transactions from a header-then-data spreadsheet.
 * Tolerates English or Hebrew headers commonly found in Israeli bank statements.
 */
function extractRecords(rows) {
  if (!rows.length) return []

  const headerRow = rows[0].map((c) => String(c ?? '').trim().toLowerCase())
  const findCol = (candidates) =>
    headerRow.findIndex((h) => candidates.some((c) => h.includes(c)))

  let dateIdx = findCol(['date', 'תאריך'])
  let descIdx = findCol(['description', 'merchant', 'תיאור', 'פרטי'])
  let debitIdx = findCol(['debit', 'amount', 'חיוב', 'חובה'])

  // Fallback to the first 4 columns if detection fails
  if (dateIdx < 0)  dateIdx  = 0
  if (descIdx < 0)  descIdx  = 2
  if (debitIdx < 0) debitIdx = 3

  const records = []
  for (let i = 1; i < rows.length; i += 1) {
    const r = rows[i]
    if (!r) continue
    const dateRaw = r[dateIdx]
    const desc = String(r[descIdx] ?? '').trim()
    const debitRaw = r[debitIdx]
    if (!desc || dateRaw == null || debitRaw == null || debitRaw === '') continue

    const debit = parseFloat(String(debitRaw).replace(/[^\d.-]/g, ''))
    if (!Number.isFinite(debit) || debit <= 0) continue

    const date = parseDate(dateRaw)
    if (!date) continue

    records.push({ date, description: desc, debit })
  }
  return records
}

function parseDate(value) {
  if (typeof value === 'number') {
    // Excel serial date
    const ms = (value - 25569) * 86400 * 1000
    const d = new Date(ms)
    return Number.isFinite(d.getTime()) ? d : null
  }
  const s = String(value).trim()
  // dd/mm/yyyy or dd-mm-yyyy
  const m = s.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})$/)
  if (m) {
    const day = Number(m[1])
    const month = Number(m[2]) - 1
    let year = Number(m[3])
    if (year < 100) year += 2000
    return new Date(year, month, day)
  }
  // ISO yyyy-mm-dd
  const iso = new Date(s)
  return Number.isFinite(iso.getTime()) ? iso : null
}

/**
 * Group records by merchant, keep groups that look recurring,
 * and emit subscription objects in the shape Slash already uses.
 */
function detectSubscriptions(records) {
  const groups = new Map()
  for (const r of records) {
    const key = normalizeMerchant(r.description)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(r)
  }

  const subs = []
  let paletteIndex = 0

  for (const [merchantKey, list] of groups) {
    if (list.length < 2) continue

    // Most common amount
    const amountCounts = new Map()
    for (const r of list) {
      const k = r.debit.toFixed(2)
      amountCounts.set(k, (amountCounts.get(k) || 0) + 1)
    }
    const [topAmount, topCount] = [...amountCounts.entries()].sort((a, b) => b[1] - a[1])[0]
    if (topCount / list.length < 0.5) continue // too noisy to call recurring

    const amount = parseFloat(topAmount)

    // Detect duplicate: 2+ matching charges in any single month
    const monthHits = new Map()
    for (const r of list) {
      if (Math.abs(r.debit - amount) > 0.01) continue
      const key = `${r.date.getFullYear()}-${r.date.getMonth()}`
      monthHits.set(key, (monthHits.get(key) || 0) + 1)
    }
    const hasDuplicate = [...monthHits.values()].some((c) => c >= 2)

    const lastCharge = list.reduce((acc, r) => (r.date > acc ? r.date : acc), list[0].date)
    const totalPaid = list.reduce((acc, r) => acc + r.debit, 0)

    const meta = ICON_MAP.find((m) => m.match.test(merchantKey))
    const tone = meta?.tone || PALETTE[paletteIndex++ % PALETTE.length]
    const icon = meta?.icon || 'subscriptions'

    const display = prettyName(merchantKey)
    subs.push({
      id: slugify(merchantKey),
      name: display,
      plan: 'Detected from statement',
      category: 'Detected',
      amount,
      billingCycle: 'monthly',
      status: hasDuplicate ? 'duplicate' : 'active',
      flagged: hasDuplicate,
      tone,
      icon,
      initials: display[0]?.toUpperCase() || '?',
      lastChargeDate: lastCharge.toISOString().slice(0, 10),
      lastUsage: '—',
      nextBilling: nextBillingFor(lastCharge),
      yearlyCost: amount * 12,
      totalPaid,
      warningLabel: hasDuplicate ? 'Duplicate charge detected' : null,
      recommendation: hasDuplicate
        ? `${display} was charged twice in the same month. Review the statement and dispute the duplicate.`
        : `${display} looks like a steady monthly charge of ₪${amount}. Keep it on if you still use it.`,
    })
  }

  return subs.sort((a, b) => b.amount - a.amount)
}

function normalizeMerchant(raw) {
  // collapse trailing reference codes — keep the leading brand word(s)
  return raw.replace(/\s+/g, ' ').trim().toUpperCase()
}

function prettyName(raw) {
  const cleaned = raw
    .replace(/^([A-Z .*\-/]+).*/i, '$1') // strip trailing tokens after the first whitespace block
    .replace(/[*.\\/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const word = cleaned.split(' ')[0] || raw
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
}

function nextBillingFor(lastDate) {
  const next = new Date(lastDate)
  next.setMonth(next.getMonth() + 1)
  return next.toLocaleString('en', { month: 'short', day: 'numeric' })
}
