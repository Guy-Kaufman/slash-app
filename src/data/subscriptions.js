import leumiLogo from '../assets/banks/leumi.png'
import hapoalimLogo from '../assets/banks/hapoalim.jpg'
import discountLogo from '../assets/banks/discount.png'
import mizrahiLogo from '../assets/banks/mizrahi.png'
import firstInternationalLogo from '../assets/banks/first-international.png'
import yahavLogo from '../assets/banks/yahav.png'

/**
 * Slash — dummy subscription data.
 * No backend connection. All data is placeholder.
 *
 * Each subscription:
 * - id: string
 * - name: brand name shown on cards
 * - plan: e.g. "Premium Plan"
 * - category: human-readable category
 * - amount: monthly cost in ILS (₪)
 * - billingCycle: 'monthly' | 'yearly'
 * - status: 'active' | 'duplicate' | 'unused' | 'cut' | 'warning'
 * - tone: brand color used for icon tint
 * - icon: Material Symbols icon name
 * - initials: fallback wordmark
 * - lastChargeDate: most recent charge (ISO date)
 * - startDate: first charge (ISO date)
 * - lastUsage: human-readable
 * - nextBilling: human-readable
 * - totalPaid: lifetime spend (₪)
 * - yearlyCost: amount * 12 by default
 * - recommendation: AI suggestion text
 * - warningLabel: optional pill text for review tone
 */

export const SUBSCRIPTIONS = [
  {
    id: 'netflix',
    name: 'Netflix',
    plan: 'Premium Plan',
    category: 'Entertainment',
    amount: 55,
    billingCycle: 'monthly',
    status: 'active',
    flagged: true,
    tone: '#E50914',
    icon: 'movie',
    initials: 'N',
    lastChargeDate: '2026-04-12',
    startDate: '2022-03-15',
    lastUsage: '2 weeks ago',
    nextBilling: 'Oct 12',
    totalPaid: 2200,
    yearlyCost: 660,
    warningLabel: 'Low usage detected',
    recommendation:
      'You have not used Netflix in the last 14 days. Cancelling now would save you ₪660 a year.',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    plan: 'Family Plan',
    category: 'Music',
    amount: 35,
    billingCycle: 'monthly',
    status: 'active',
    tone: '#1DB954',
    icon: 'music_note',
    initials: 'S',
    lastChargeDate: '2026-05-01',
    startDate: '2021-11-10',
    lastUsage: 'today',
    nextBilling: 'Nov 1',
    totalPaid: 1890,
    yearlyCost: 420,
    recommendation: 'You use Spotify daily — keep this one.',
  },
  {
    id: 'adobe',
    name: 'Adobe',
    plan: 'Creative Cloud',
    category: 'Work',
    amount: 120,
    billingCycle: 'monthly',
    status: 'duplicate',
    tone: '#FF0000',
    icon: 'brush',
    initials: 'A',
    lastChargeDate: '2026-05-01',
    startDate: '2024-06-01',
    lastUsage: '4 weeks ago',
    nextBilling: 'Nov 1',
    totalPaid: 2400,
    yearlyCost: 1440,
    warningLabel: 'Price Increase',
    recommendation:
      'Adobe raised the monthly price last cycle. We detected a duplicate billing — review now.',
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    plan: 'Plus 2TB',
    category: 'Storage',
    amount: 40,
    billingCycle: 'monthly',
    status: 'active',
    tone: '#0061FF',
    icon: 'cloud',
    initials: 'D',
    lastChargeDate: '2026-04-22',
    startDate: '2023-02-01',
    lastUsage: '3 days ago',
    nextBilling: 'Nov 22',
    totalPaid: 1480,
    yearlyCost: 480,
    recommendation: 'Storage almost full — keep this plan.',
  },
  {
    id: 'canva',
    name: 'Canva',
    plan: 'Pro',
    category: 'Design',
    amount: 22,
    billingCycle: 'monthly',
    status: 'active',
    tone: '#00C4CC',
    icon: 'palette',
    initials: 'C',
    lastChargeDate: '2026-05-03',
    startDate: '2023-08-01',
    lastUsage: '1 day ago',
    nextBilling: 'Nov 3',
    totalPaid: 528,
    yearlyCost: 264,
    recommendation: 'Used regularly — no action needed.',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    plan: 'Plus',
    category: 'AI',
    amount: 74,
    billingCycle: 'monthly',
    status: 'active',
    tone: '#10A37F',
    icon: 'auto_awesome',
    initials: 'C',
    lastChargeDate: '2026-05-04',
    startDate: '2023-02-01',
    lastUsage: 'today',
    nextBilling: 'Nov 4',
    totalPaid: 2664,
    yearlyCost: 888,
    recommendation: 'You use ChatGPT every weekday — keep.',
  },
  {
    id: 'icloud',
    name: 'Apple iCloud',
    plan: '200GB',
    category: 'Storage',
    amount: 12,
    billingCycle: 'monthly',
    status: 'active',
    tone: '#A2AAAD',
    icon: 'icloud',
    initials: 'i',
    lastChargeDate: '2026-04-29',
    startDate: '2020-10-01',
    lastUsage: 'today',
    nextBilling: 'Oct 29',
    totalPaid: 720,
    yearlyCost: 144,
    recommendation: 'Backups are running — keep.',
  },
  {
    id: 'google-one',
    name: 'Google One',
    plan: '2TB',
    category: 'Storage',
    amount: 38,
    billingCycle: 'monthly',
    status: 'duplicate',
    tone: '#4285F4',
    icon: 'cloud_done',
    initials: 'G',
    lastChargeDate: '2026-05-01',
    startDate: '2024-01-01',
    lastUsage: '6 weeks ago',
    nextBilling: 'Nov 1',
    totalPaid: 760,
    yearlyCost: 456,
    warningLabel: 'Duplicate of iCloud',
    recommendation:
      'You also have Apple iCloud. Most of your files live there — drop Google One to save ₪456/year.',
  },
  {
    id: 'monday',
    name: 'Monday.com',
    plan: 'Pro',
    category: 'Work',
    amount: 85,
    billingCycle: 'monthly',
    status: 'unused',
    tone: '#FFCC00',
    icon: 'view_kanban',
    initials: 'M',
    lastChargeDate: '2026-04-10',
    startDate: '2023-09-15',
    lastUsage: '3 months ago',
    nextBilling: 'Nov 10',
    totalPaid: 1700,
    yearlyCost: 1020,
    warningLabel: 'Not used recently',
    recommendation: 'No activity in 90 days — strong candidate to cut.',
  },
  {
    id: 'notion',
    name: 'Notion',
    plan: 'Plus',
    category: 'Work',
    amount: 32,
    billingCycle: 'monthly',
    status: 'active',
    tone: '#FFFFFF',
    icon: 'sticky_note_2',
    initials: 'N',
    lastChargeDate: '2026-05-02',
    startDate: '2022-06-01',
    lastUsage: 'today',
    nextBilling: 'Nov 2',
    totalPaid: 1024,
    yearlyCost: 384,
    recommendation: 'Used daily — keep.',
  },
  {
    id: 'figma',
    name: 'Figma',
    plan: 'Professional',
    category: 'Design',
    amount: 60,
    billingCycle: 'monthly',
    status: 'active',
    tone: '#A259FF',
    icon: 'design_services',
    initials: 'F',
    lastChargeDate: '2026-04-28',
    startDate: '2022-01-01',
    lastUsage: '2 days ago',
    nextBilling: 'Oct 28',
    totalPaid: 2160,
    yearlyCost: 720,
    recommendation: 'Active project use — keep.',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    plan: 'Pro',
    category: 'Work',
    amount: 50,
    billingCycle: 'monthly',
    status: 'unused',
    tone: '#2D8CFF',
    icon: 'videocam',
    initials: 'Z',
    lastChargeDate: '2026-04-20',
    startDate: '2020-04-01',
    lastUsage: '5 months ago',
    nextBilling: 'Nov 20',
    totalPaid: 2400,
    yearlyCost: 600,
    warningLabel: 'No calls in 5 months',
    recommendation: 'Free tier covers your usage — consider cancelling.',
  },
  {
    id: 'wix',
    name: 'Wix',
    plan: 'Premium',
    category: 'Hosting',
    amount: 65,
    billingCycle: 'monthly',
    status: 'active',
    tone: '#FAAD4D',
    icon: 'language',
    initials: 'W',
    lastChargeDate: '2026-04-15',
    startDate: '2022-11-01',
    lastUsage: 'this week',
    nextBilling: 'Oct 15',
    totalPaid: 2080,
    yearlyCost: 780,
    recommendation: 'Active site — keep.',
  },
  {
    id: 'elementor',
    name: 'Elementor',
    plan: 'Advanced',
    category: 'Design',
    amount: 28,
    billingCycle: 'monthly',
    status: 'duplicate',
    tone: '#92003B',
    icon: 'extension',
    initials: 'E',
    lastChargeDate: '2026-04-30',
    startDate: '2024-03-01',
    lastUsage: '8 weeks ago',
    nextBilling: 'Oct 30',
    totalPaid: 364,
    yearlyCost: 336,
    warningLabel: 'Overlaps with Wix',
    recommendation: 'Wix already covers what you need from Elementor.',
  },
]

export const TOTALS = {
  monthlySpending: SUBSCRIPTIONS.reduce(
    (acc, s) => acc + (s.billingCycle === 'monthly' ? s.amount : 0),
    0,
  ),
  potentialSavings: SUBSCRIPTIONS.reduce(
    (acc, s) =>
      ['warning', 'duplicate', 'unused'].includes(s.status)
        ? acc + s.yearlyCost
        : acc,
    0,
  ),
  active: SUBSCRIPTIONS.filter((s) => s.status === 'active').length,
  duplicate: SUBSCRIPTIONS.filter((s) => s.status === 'duplicate').length,
  unused: SUBSCRIPTIONS.filter((s) => s.status === 'unused').length,
  count: SUBSCRIPTIONS.length,
}

export const SUPPORTED_BANKS = [
  { id: 'leumi', name: 'Bank Leumi', logo: leumiLogo },
  { id: 'hapoalim', name: 'Bank Hapoalim', logo: hapoalimLogo },
  { id: 'discount', name: 'Discount Bank', logo: discountLogo },
  { id: 'mizrahi', name: 'Mizrahi-Tefahot', logo: mizrahiLogo },
  { id: 'first-international', name: 'First International', logo: firstInternationalLogo },
  { id: 'yahav', name: 'Bank Yahav', logo: yahavLogo },
]

export const ONBOARDING_STEPS = [
  {
    icon: 'upload_file',
    title: 'Upload your statement',
    body:
      'Drop in an Excel or CSV from your bank. Slash analyses recurring charges in seconds — locally and privately.',
  },
  {
    icon: 'auto_awesome',
    title: 'See every subscription',
    body:
      'We surface duplicates, unused services, and price hikes you might have missed. Nothing leaves your device.',
  },
  {
    icon: 'task_alt',
    title: 'Cut what you don\'t use',
    body:
      'Generate a polished cancellation letter in Hebrew, Arabic, or Russian — and watch your savings add up.',
  },
]

export const MOCK_USER = {
  name: 'Guy Kaufman',
  email: 'guy@example.com',
  initials: 'GK',
}

export function getSubscriptionById(id) {
  return SUBSCRIPTIONS.find((s) => s.id === id) || null
}

export default SUBSCRIPTIONS
