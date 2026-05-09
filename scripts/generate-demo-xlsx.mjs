/**
 * Generates `public/slash-demo-statement.xlsx`.
 *
 * Run with: `node scripts/generate-demo-xlsx.mjs`
 * (re-runnable; output is deterministic thanks to a fixed seed.)
 */

import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as XLSX from 'xlsx'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '..', 'public', 'slash-demo-statement.xlsx')

// Seeded pseudo-random — reproducible output every run
let seed = 42
const rand = () => {
  seed = (seed * 9301 + 49297) % 233280
  return seed / 233280
}

const RECURRING = [
  { name: 'NETFLIX.COM',      amount: 55,  day: 12 },
  { name: 'SPOTIFY P12345',   amount: 35,  day: 1  },
  { name: 'ADOBE *CC',        amount: 120, day: 5  },
  { name: 'DROPBOX*PLUS',     amount: 40,  day: 22 },
  { name: 'OPENAI *CHATGPT',  amount: 74,  day: 4  },
  { name: 'APPLE.COM/BILL',   amount: 12,  day: 29 },
  { name: 'NOTION LABS',      amount: 32,  day: 2  },
  { name: 'FIGMA INC',        amount: 60,  day: 28 },
]

const ONE_OFF = [
  { name: 'SUPER YUDA',        min: 150, max: 350 },
  { name: 'CAFE GRAZIE',       min: 30,  max: 75  },
  { name: 'PAYBOX P. KAUFMAN', min: 80,  max: 250 },
  { name: 'SHELL SAPIR',       min: 200, max: 500 },
  { name: 'CARDOM TLV',        min: 50,  max: 150 },
  { name: 'BUYME GIFT',        min: 100, max: 300 },
]

const formatDate = (d) =>
  `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
const parseDMY = (s) => {
  const [d, m, y] = s.split('/').map(Number)
  return new Date(y, m - 1, d)
}

const rows = [['Date', 'Value Date', 'Description', 'Debit (₪)', 'Credit (₪)', 'Balance (₪)']]
let balance = 12_000

const startDate = new Date(2026, 0, 1) // 1 Jan 2026
const months = 4 // Jan – Apr

for (let m = 0; m < months; m += 1) {
  const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + m, 1)
  const y = monthDate.getFullYear()
  const mIdx = monthDate.getMonth()

  // Salary on 28th
  const salary = new Date(y, mIdx, 28)
  balance += 12_000
  rows.push([
    formatDate(salary),
    formatDate(salary),
    'Salary - ACME Ltd',
    '',
    '12,000.00',
    balance.toFixed(2),
  ])

  // Recurring charges — clamp day so it never rolls over to the next month
  const lastDayOfMonth = new Date(y, mIdx + 1, 0).getDate()
  for (const r of RECURRING) {
    const day = Math.min(r.day, lastDayOfMonth)
    const date = new Date(y, mIdx, day)
    balance -= r.amount
    rows.push([
      formatDate(date),
      formatDate(date),
      r.name,
      r.amount.toFixed(2),
      '',
      balance.toFixed(2),
    ])
  }

  // Adobe duplicate in February only — flagged by detector
  if (m === 1) {
    const date = new Date(y, mIdx, 18)
    balance -= 120
    rows.push([
      formatDate(date),
      formatDate(date),
      'ADOBE *CC',
      '120.00',
      '',
      balance.toFixed(2),
    ])
  }

  // 6 one-off charges per month, varied days
  for (let i = 0; i < 6; i += 1) {
    const day = 1 + Math.floor(rand() * 27)
    const merch = ONE_OFF[(i + m) % ONE_OFF.length]
    const amount = merch.min + Math.floor(rand() * (merch.max - merch.min))
    const date = new Date(y, mIdx, day)
    balance -= amount
    rows.push([
      formatDate(date),
      formatDate(date),
      merch.name,
      amount.toFixed(2),
      '',
      balance.toFixed(2),
    ])
  }
}

// Sort all data rows by date ascending
const header = rows[0]
const data = rows.slice(1).sort((a, b) => parseDMY(a[0]) - parseDMY(b[0]))
const final = [header, ...data]

const ws = XLSX.utils.aoa_to_sheet(final)
ws['!cols'] = [
  { wch: 12 },
  { wch: 12 },
  { wch: 30 },
  { wch: 12 },
  { wch: 12 },
  { wch: 14 },
]
const wb = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb, ws, 'Statement')

const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
writeFileSync(out, buf)
console.log(`Wrote ${out} — ${data.length} transactions`)
