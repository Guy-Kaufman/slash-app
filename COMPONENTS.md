# Slash, Component Breakdown

> What lives where, and which components are shared vs. unique. This file feeds Part 1 of the Lesson 6 assignment AND Claude Code's component generation.

## Component types (Yariv's three questions)

| Type | Question | Examples |
|---|---|---|
| **Shared** | Appears on multiple pages? | `Navbar`, `Footer`, `AppHeader` |
| **Reusable** | Repeats within a page? | `SubscriptionCard`, `StatusBadge`, `OnboardingStep` |
| **Section** | Self-contained block with one job? | `HeroSection`, `FileDropZone`, `AIRecommendation` |

## Folder structure

```
src/
  layouts/
    PublicLayout/
      PublicLayout.jsx
      PublicLayout.css
    AppLayout/
      AppLayout.jsx
      AppLayout.css
  components/
    ui/                          # shadcn/ui primitives
      input.jsx
      select.jsx
      dialog.jsx
      checkbox.jsx
      toast.jsx
    shared/                      # appears on many pages
      GradientButton/
      SecondaryButton/
      StatusBadge/
      GlowBlob/
      AppHeader/
      Navbar/
      Footer/
      ScreenHeader/
    page-specific/               # used in one or two pages
      SubscriptionCard/
      AIRecommendation/
      FileDropZone/
      TrustBadge/
      HeroAmount/
      QuickActionsGrid/
      OnboardingStep/
      ProcessingAnimation/
      ChargeHistoryChart/
      CancellationLetterPreview/
      LanguageSelector/
      SavingsCounter/
      FilterChips/
  pages/
    public/
      LandingPage/
      LoginPage/
      RegisterPage/
      ForgotPasswordPage/
    app/
      OnboardingPage/
      UploadPage/
      ProcessingPage/
      ReviewPage/
      DashboardPage/
      SubscriptionDetailPage/
      SavingsReportPage/
      SettingsPage/
  styles/
    globals.css
  App.jsx
  main.jsx
```

## Component breakdown by page (4 featured pages)

### Page 1: Onboarding (`/onboarding`)

Goal: Welcome the user, explain how Slash works in 3 steps, route them to Upload.

| Component | Type | Used in | Description |
|---|---|---|---|
| `AppLayout` | Shared (Layout) | All app pages | Wraps content with status bar + header + glow blobs background |
| `GlowBlob` | Shared | All app pages | Decorative purple/blue radial gradient blobs |
| `AppHeader` | Shared | All app pages | Top bar: Slash logo + dark mode toggle |
| `OnboardingStep` | Reusable | Onboarding | Single step UI, used 3x. Heading + image/icon + body text |
| `OnboardingProgress` | Section | Onboarding | "Step 1 of 3" indicator with dots |
| `GradientButton` | Shared | Most pages | "Next" CTA, primary purple-blue gradient pill |
| `SecondaryButton` | Shared | Most pages | "Skip" or "Back" buttons |

### Page 2: Upload (`/upload`)

Goal: Get the user to upload an Excel file with reassurance about privacy.

| Component | Type | Used in | Description |
|---|---|---|---|
| `AppLayout` | Shared | All app pages | Layout wrapper |
| `GlowBlob` | Shared | All app pages | Background decoration |
| `ScreenHeader` | Shared | Most app pages | Back arrow + step indicator ("Step 1 of 3") |
| `UploadHero` | Section | Upload only | Headline with gradient text "Upload your bank statements" |
| `FileDropZone` | Section | Upload | Dashed-border drag area with cloud icon, "Drag file here" text, secondary "Choose file" button |
| `TrustBadge` | Reusable | Upload, Settings | Lock icon + "Full privacy" reassurance card |
| `SupportedBanksList` | Section | Upload | Pills showing "Leumi", "Hapoalim", "Discount", etc. |

### Page 3: Dashboard (`/dashboard`)

Goal: Main app surface. Show savings potential and let user act on subscriptions.

| Component | Type | Used in | Description |
|---|---|---|---|
| `AppLayout` | Shared | All app pages | Layout wrapper |
| `GlowBlob` | Shared | All app pages | Background decoration |
| `AppHeader` | Shared | App pages | Logo + user avatar + menu icon |
| `HeroAmount` | Section | Dashboard | Centered hero ₪2,847 with "Annual potential savings" label and pill showing 14 subscriptions / 3 duplicates |
| `QuickActionsGrid` | Section | Dashboard | 2x2 grid of icon buttons: Add, Cut, Upload, History |
| `SubscriptionCard` | Reusable | Dashboard, Review | Logo letter in colored square + name + frequency + amount + status badge. Renders 14x in Dashboard |
| `StatusBadge` | Reusable | Dashboard, Review, Subscription Detail | Colored pill: Active / Duplicate / Dormant / Cut |
| `SectionHeader` | Reusable | Dashboard, Savings | "Your subscriptions" title + "Show all →" link |

### Page 4: Subscription Detail (`/subscription/:id`)

Goal: Show full info on a subscription and generate a cancellation letter (the USP).

| Component | Type | Used in | Description |
|---|---|---|---|
| `AppLayout` | Shared | All app pages | Layout wrapper |
| `GlowBlob` | Shared | All app pages | Background decoration |
| `ScreenHeader` | Shared | App pages | Back arrow + overflow menu |
| `SubscriptionHero` | Section | Subscription Detail | Big logo square + merchant name + duplicate warning badge |
| `ChargeBreakdownCard` | Section | Subscription Detail | List: monthly charge, duplicate charge, charging since, total wasted |
| `AIRecommendation` | Section | Subscription Detail | Gradient card with "AI" badge + recommendation text + savings highlight |
| `LanguageSelector` | Reusable | Subscription Detail, Settings | Dropdown for HE / AR / RU |
| `CancellationLetterPreview` | Section | Subscription Detail | Generated letter in selected language, with merchant + user fields filled |
| `LetterActionButtons` | Section | Subscription Detail | "Copy", "Download PDF", "Send via Email" buttons |
| `GradientButton` | Shared | Most pages | Primary CTA "Generate cancellation letter" |

## Cross-page component reuse map

This shows which components are TRULY shared (worth building once):

| Component | Onboarding | Upload | Dashboard | Subscription Detail | Total uses |
|---|---|---|---|---|---|
| `AppLayout` | ✅ | ✅ | ✅ | ✅ | 4 (every app page) |
| `GlowBlob` | ✅ | ✅ | ✅ | ✅ | 4 |
| `AppHeader` | ✅ | ✅ | ✅ | ✅ | 4 |
| `ScreenHeader` | | ✅ | | ✅ | 2 |
| `GradientButton` | ✅ | ✅ | ✅ | ✅ | 4 |
| `SecondaryButton` | ✅ | ✅ | | ✅ | 3 |
| `StatusBadge` | | | ✅ | ✅ | 2 (also used in Review) |
| `SubscriptionCard` | | | ✅ | | 1 (also used in Review) |
| `LanguageSelector` | | | | ✅ | 1 (also used in Settings) |
| `TrustBadge` | | ✅ | | | 1 (also used in Settings) |

## Component build order (atoms → molecules → pages)

This is the order Claude Code should build in:

**Phase A: Atoms (smallest, used by everything else)**
1. `globals.css` (tokens)
2. `GradientButton`
3. `SecondaryButton`
4. `StatusBadge`
5. `GlowBlob`

**Phase B: Layout shells**
6. `AppHeader`
7. `ScreenHeader`
8. `Navbar` (for PublicLayout)
9. `Footer` (for PublicLayout)
10. `PublicLayout`
11. `AppLayout`

**Phase C: Molecules (compose atoms)**
12. `SubscriptionCard`
13. `TrustBadge`
14. `OnboardingStep`
15. `FilterChips`
16. `LanguageSelector`

**Phase D: Sections (full page blocks)**
17. `HeroAmount`
18. `QuickActionsGrid`
19. `FileDropZone`
20. `AIRecommendation`
21. `ChargeBreakdownCard`
22. `CancellationLetterPreview`
23. `ProcessingAnimation`

**Phase E: Pages (assemble sections)**
24. `LandingPage`
25. `LoginPage`, `RegisterPage`, `ForgotPasswordPage`
26. `OnboardingPage`
27. `UploadPage`
28. `ProcessingPage`
29. `ReviewPage`
30. `DashboardPage`
31. `SubscriptionDetailPage`
32. `SavingsReportPage`
33. `SettingsPage`

**Phase F: Wire it together**
34. `App.jsx` with React Router
35. Test every route
36. Responsive verification

## Component naming convention

- PascalCase folders and files: `SubscriptionCard/`
- One folder per component, contains:
  - `ComponentName.jsx`
  - `ComponentName.css`
  - (optional) `index.js` re-export

## Component anti-patterns to avoid

❌ Don't build `<SubscriptionCardLogo>`, `<SubscriptionCardAmount>`, `<SubscriptionCardBadge>` as separate components. The `SubscriptionCard` is one cohesive unit.

❌ Don't inline the GlowBlob in every screen. Build it once, import it.

❌ Don't use Tailwind utility classes on the components. Use CSS variables in the component's own .css file.

❌ Don't build a generic `<Card>` and try to make every card type a variant. We have 3 distinct card patterns (standard, gradient accent, alert), each is its own component.
