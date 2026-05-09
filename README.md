# Slash — Cut your hidden expenses

A modern dark-mode fintech web app that helps users detect forgotten subscriptions, duplicated charges, unused services, and generate cancellation letters from a bank statement.

This is **Module 6 (Frontend Development)** of the Full-Stack AI course taught by Yariv Gilad. The deliverable is a frontend-only React + Vite shell, built directly from a Stitch design export, with no backend.

## Stack

- **React 18 + Vite** (JavaScript, not TypeScript)
- **React Router v6** for routing
- **Custom CSS** with CSS variables (no Tailwind, no UI framework on top)
- **Inter** typeface + **Material Symbols Outlined** icons (Google Fonts)
- **xlsx** (SheetJS) — local-only Excel/CSV parsing
- **shadcn/ui** primitives (Input, Select, Dialog, Toast, Checkbox, DropdownMenu)

## Run it

```bash
npm install
npm run dev
```

The app boots at <http://localhost:5173/>. No env vars, no backend, no auth.

## Walking the flow

1. `/` — Welcome screen, click **Get Started**
2. `/onboarding` — 3-step intro
3. `/upload` — drag & drop a statement, **or** click **Download demo statement (.xlsx)** to grab a realistic example
4. `/processing` — short loading animation
5. `/dashboard` — hero monthly amount, savings pill, top subscription cards
6. `/subscription/:id` — detail card with last-usage / next-billing / yearly cost + Cancel CTA
7. `/review?cancel=:id` — cancel-confirmation screen with savings highlight
8. `/savings` — full subscription list with filter chips
9. `/settings` — profile, preferences, **Reset uploaded data** to start over

Auth pages (`/login`, `/register`, `/forgot-password`) are visual shells — submit just navigates onward.

## How the demo statement works

```bash
node scripts/generate-demo-xlsx.mjs
```

This (re)generates [`public/slash-demo-statement.xlsx`](public/slash-demo-statement.xlsx) — 4 months of transactions with 8 recurring merchants (Netflix, Spotify, Adobe, Dropbox, ChatGPT, iCloud, Notion, Figma) plus realistic noise (groceries, gas, etc.) and an intentional Adobe duplicate in February.

When you upload that file (or your own bank export) on `/upload`:

1. [`src/utils/parseStatement.js`](src/utils/parseStatement.js) reads the file in the browser (no upload to any server) and groups debit transactions by merchant.
2. A merchant counts as recurring when ≥2 charges share the same amount in ≥50% of occurrences.
3. A merchant is flagged as a duplicate if 2+ matching charges land in the same calendar month.
4. The detected list is stored in a [`SubscriptionsContext`](src/context/SubscriptionsContext.jsx) (with `localStorage` persistence) so Dashboard, Subscription Detail, and Savings all read the same data.
5. **Settings → Reset uploaded data** clears the parsed list and falls back to the built-in demo dataset.

The parser tolerates Hebrew column headers (`תאריך`, `תיאור`, `חיוב`), Excel serial dates, and `dd/mm/yyyy` strings.

## Project structure

```
slash_app/
  DESIGN.md                  ← design system, every token is mirrored in globals.css
  COMPONENTS.md              ← per-page component breakdown
  SITEMAP.md                 ← routes
  TASK_PLAN.md               ← assignment task plan
  public/
    slash-demo-statement.xlsx
  scripts/
    generate-demo-xlsx.mjs
  src/
    main.jsx
    App.jsx
    styles/globals.css       ← CSS variables: colors, gradients, spacing, type scale
    context/
      SubscriptionsContext.jsx
    data/
      subscriptions.js       ← built-in demo dataset (used if nothing uploaded)
    utils/
      parseStatement.js
    layouts/
      PublicLayout/          ← Navbar + Footer for marketing pages
      AppLayout/             ← AppHeader + BottomNav for the app shell
    components/
      shared/                ← AppHeader, BottomNav, Footer, Navbar, GlowBlob,
                               GradientButton, SecondaryButton, ScreenHeader,
                               SectionHeader, StatusBadge
      page-specific/         ← HeroAmount, SubscriptionCard, FileDropZone,
                               LanguageSelector, ChargeBreakdownCard, …
      ui/                    ← shadcn primitives (Input, Select, Dialog, …)
    pages/
      public/                ← LandingPage, LoginPage, RegisterPage, ForgotPasswordPage
      app/                   ← OnboardingPage, UploadPage, ProcessingPage, ReviewPage,
                               DashboardPage, SubscriptionDetailPage, SavingsReportPage,
                               SettingsPage
```

Every component lives in its own folder with a colocated `.css` file. No hardcoded colors or spacing inside components — everything goes through CSS variables defined in [`src/styles/globals.css`](src/styles/globals.css).

## Design source

The app visually matches the Stitch export in [`DESIGN.md`](DESIGN.md). Four canonical screens were translated 1:1:

- **Welcome** → [LandingPage](src/pages/public/LandingPage/LandingPage.jsx)
- **Subscriptions Dashboard** → [DashboardPage](src/pages/app/DashboardPage/DashboardPage.jsx)
- **Subscription Details** → [SubscriptionDetailPage](src/pages/app/SubscriptionDetailPage/SubscriptionDetailPage.jsx)
- **Cancel Confirmation** → [ReviewPage](src/pages/app/ReviewPage/ReviewPage.jsx)

The other 8 screens reuse the same tokens and component patterns.

## Routes

| URL | Page |
| --- | --- |
| `/` | LandingPage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/onboarding` | OnboardingPage |
| `/upload` | UploadPage |
| `/processing` | ProcessingPage |
| `/review` | ReviewPage |
| `/dashboard` | DashboardPage |
| `/subscription/:id` | SubscriptionDetailPage |
| `/savings` | SavingsReportPage |
| `/settings` | SettingsPage |

## License

MIT
