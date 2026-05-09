# Slash, Task Plan

> Build order for Module 6. Map to Yariv's 9-phase workflow. Each task is small enough to verify in the browser before moving on.

## How to use this file

1. Open Claude Code in this folder
2. Paste each task as a separate prompt to Claude Code
3. After each task completes, **verify in browser** before moving to the next
4. Commit to Git after every successful task

---

## Phase 1: Set up the spec ✅ (DONE before opening Claude Code)

These files are already in the project root:
- ✅ `DESIGN.md`
- ✅ `PRD.md`
- ✅ `SITEMAP.md`
- ✅ `COMPONENTS.md`
- ✅ `CLAUDE.md`
- ✅ `TASK_PLAN.md` (this file)
- ✅ `mockups/` folder with 4 reference images

---

## Phase 2: Scaffold the project

### Task 01: Create Vite + React project

**Prompt to Claude Code:**
> Read CLAUDE.md, then scaffold a Vite + React project in the current directory. Use JavaScript, not TypeScript. Set up the folder structure described in COMPONENTS.md exactly: `src/layouts/`, `src/components/ui/`, `src/components/shared/`, `src/components/page-specific/`, `src/pages/public/`, `src/pages/app/`, `src/styles/`, `src/data/`. Create empty placeholder files where needed. Set `<html dir="rtl" lang="he">` in `index.html`. Install React Router v6.

**Verify**:
- `npm run dev` starts without errors
- `http://localhost:5173` shows the default Vite welcome
- Folder structure matches COMPONENTS.md

**Commit**: `feat: 01 scaffold vite react project`

### Task 02: Install shadcn/ui primitives

**Prompt to Claude Code:**
> Install shadcn/ui in this project. Initialize it. Add only these components: input, select, dialog, toast, checkbox, dropdown-menu. Don't add a button, we're using our own custom GradientButton. The shadcn components go in `src/components/ui/`.

**Verify**:
- `src/components/ui/` contains the installed primitives
- Project still runs

**Commit**: `feat: 02 add shadcn/ui primitives`

---

## Phase 3: Generate global CSS variables

### Task 03: Create globals.css with all tokens

**Prompt to Claude Code:**
> Read DESIGN.md fully. Create `src/styles/globals.css` with every token defined as a CSS custom property on `:root`. Include: all colors, gradients, glow values, text colors, semantic colors, type scale (as font-size / font-weight pairs), spacing, border radius, shadows. Add `@import` for Heebo from Google Fonts. Set body to use `var(--color-bg)` background, white text, and Heebo. Set `direction: rtl` on html. Import this file in `src/main.jsx`.

**Verify**:
- `src/styles/globals.css` exists with ~50+ CSS variables
- Open the browser, page background is now dark navy `#0A0E1A`
- Text is white in Heebo
- Inspect element, see CSS variables on :root

**Commit**: `feat: 03 add globals.css with design tokens`

### Task 04: Create mock data file

**Prompt to Claude Code:**
> Create `src/data/mockData.js`. Export an array `MOCK_SUBSCRIPTIONS` with 14 items matching the shape defined in PRD.md (id, merchant, logo_color, logo_letter, amount, currency, frequency, status, confidence, category, first_charged, last_charged, total_paid_lifetime, is_duplicate_of, charge_history). Include realistic Israeli subscriptions: Netflix, Spotify (with a duplicate), Disney+, YouTube Premium, Gym Pass (dormant), Calm, Adobe Creative Cloud, Microsoft 365, iCloud+, Cellcom, Bezeq, Yes, Partner TV, ChatGPT Plus. Mix statuses: 9 active, 2 duplicates, 3 dormant. Also export MOCK_USER with name "גיא קאופמן" and avatar initials "GK".

**Verify**:
- File exists and exports both arrays
- 14 subscriptions, varied statuses
- All required fields present

**Commit**: `feat: 04 add mock data`

---

## Phase 4: Build the layout shells (atoms first)

### Task 05: Build GradientButton

**Prompt to Claude Code:**
> Read COMPONENTS.md and DESIGN.md sections on GradientButton. Create `src/components/shared/GradientButton/GradientButton.jsx` and `GradientButton.css`. The button uses `var(--gradient-primary)` background, `var(--shadow-button-primary)` shadow, `var(--radius-pill)` border radius, padding 16px 28px, white text in `var(--font-body-lg)` weight 600. Accepts `children`, `onClick`, `type`, `disabled` props. Add hover effect: `filter: brightness(1.1); transform: scale(1.02);` with 200ms transition.

**Verify**: Render `<GradientButton>בוא נתחיל</GradientButton>` somewhere temporarily and confirm visual.

**Commit**: `feat: 05 build GradientButton`

### Task 06: Build SecondaryButton

**Prompt to Claude Code:**
> Build `src/components/shared/SecondaryButton/`. Background `rgba(255,255,255,0.05)`, border `1px solid var(--color-border-emphasis)`, white text, padding 14px 28px, pill border radius. Same props interface as GradientButton.

**Commit**: `feat: 06 build SecondaryButton`

### Task 07: Build StatusBadge

**Prompt to Claude Code:**
> Build `src/components/shared/StatusBadge/`. Accepts `variant` prop: 'active' | 'duplicate' | 'dormant' | 'cut'. Each variant uses the corresponding CSS variables for bg/text/border (active uses --color-success-bg, --color-success-light, etc.). Padding 4px 12px, --radius-md, --font-caption. Hebrew labels: פעיל / כפילות / לא בשימוש / נחתך.

**Commit**: `feat: 07 build StatusBadge`

### Task 08: Build GlowBlob

**Prompt to Claude Code:**
> Build `src/components/shared/GlowBlob/`. Two variants: 'purple-top-right' and 'blue-bottom-left'. Each is an absolutely positioned div with a radial-gradient background using `var(--glow-purple)` or `var(--glow-blue)`. pointer-events: none. Sizes: purple 220-280px, blue 200-240px. Position via CSS, not props.

**Commit**: `feat: 08 build GlowBlob`

### Task 09: Build AppHeader

**Prompt to Claude Code:**
> Build `src/components/shared/AppHeader/`. Top bar with: Slash logo (a 32px square with `var(--gradient-primary)` background, white "/" character, font-weight 700) on the left, user avatar circle on the right (38px, gradient bg, displays initials from MOCK_USER), three-dot menu icon between them. Padding 18px 20px. Background transparent (content shows through to GlowBlobs).

**Commit**: `feat: 09 build AppHeader`

### Task 10: Build ScreenHeader

**Prompt to Claude Code:**
> Build `src/components/shared/ScreenHeader/`. Top bar for sub-pages: back arrow on the right (since RTL), optional step indicator in the center ("שלב 1 מתוך 3"), optional overflow menu on the left. Accepts `onBack`, `step`, `totalSteps`, `showMenu` props.

**Commit**: `feat: 10 build ScreenHeader`

### Task 11: Build PublicLayout

**Prompt to Claude Code:**
> Build `src/layouts/PublicLayout/PublicLayout.jsx`. Uses React Router's `<Outlet />` for child routes. Includes a simple Navbar (logo + Login/Sign up links) and Footer (Privacy, Terms, Contact). Mobile-first, responsive. Background `var(--color-bg)`.

**Commit**: `feat: 11 build PublicLayout`

### Task 12: Build AppLayout

**Prompt to Claude Code:**
> Build `src/layouts/AppLayout/AppLayout.jsx`. Uses `<Outlet />`. Includes AppHeader at top, two GlowBlob instances in background, then `<Outlet />` for the page content. **Critical**: AppLayout caps at max-width 480px and centers on screens > 768px. On mobile, fills full width. Background `var(--color-bg)`.

**Verify**: At 1440px desktop, the layout is a centered 480px column with empty space on either side. At 375px, fills full width.

**Commit**: `feat: 12 build AppLayout`

---

## Phase 5: Page-specific components (build before pages that use them)

### Task 13: Build SubscriptionCard

**Prompt to Claude Code:**
> Build `src/components/page-specific/SubscriptionCard/`. Accepts a subscription object (matching mock data shape). Displays: 40px logo square (background uses subscription.logo_color, white centered logo_letter), merchant name, frequency text under name, amount + currency on the left side (RTL), StatusBadge below amount. Uses gradient accent card style for active subs, warning gradient for duplicates, error gradient for dormant.

**Commit**: `feat: 13 build SubscriptionCard`

### Task 14: Build TrustBadge

**Prompt to Claude Code:**
> Build `src/components/page-specific/TrustBadge/`. Card with green tint (rgba(16,185,129,0.08) bg, success border), lock icon, "פרטיות מלאה" title, "העיבוד מתבצע מקומית, הקובץ לא נשמר בשרתים שלנו" body text.

**Commit**: `feat: 14 build TrustBadge`

### Task 15: Build OnboardingStep

**Prompt to Claude Code:**
> Build `src/components/page-specific/OnboardingStep/`. Accepts: title, description, illustration (placeholder div with gradient for now). Vertical center layout with large heading (use --font-display), supporting text below.

**Commit**: `feat: 15 build OnboardingStep`

### Task 16: Build HeroAmount

**Prompt to Claude Code:**
> Build `src/components/page-specific/HeroAmount/`. Centered display: small uppercase eyebrow text "חיסכון פוטנציאלי שנתי", huge ₪2,847 number (use --font-hero), pill below with gradient bg showing "↗ 14 מנויים | 3 כפילויות" with green and yellow text spans.

**Commit**: `feat: 16 build HeroAmount`

### Task 17: Build QuickActionsGrid

**Prompt to Claude Code:**
> Build `src/components/page-specific/QuickActionsGrid/`. 4 columns of icon buttons: הוסף (plus icon), חתוך (trash icon), העלה (upload icon), היסטוריה (clock icon). Each is 44px rounded square with rgba(255,255,255,0.06) bg, border rgba(255,255,255,0.08), white stroke icon, label below in --font-caption.

**Commit**: `feat: 17 build QuickActionsGrid`

### Task 18: Build FileDropZone

**Prompt to Claude Code:**
> Build `src/components/page-specific/FileDropZone/`. Large dashed-border container (1.5px dashed rgba(139,92,246,0.4)), gradient bg (linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.04))), 36px padding. Inside: 64px gradient icon circle with cloud-upload SVG, "גרור קובץ לכאן" headline, "XLSX, CSV עד 10MB" caption, SecondaryButton "בחר קובץ ידנית". Accepts onFileSelect prop. Module 6 stub: button click triggers a fake "file selected" state and routes to /processing after 500ms.

**Commit**: `feat: 18 build FileDropZone`

### Task 19: Build AIRecommendation

**Prompt to Claude Code:**
> Build `src/components/page-specific/AIRecommendation/`. Gradient card (rgba(168,85,247,0.12) to rgba(59,130,246,0.08), purple border). Top row: small "AI" badge in gradient square, "המלצת Slash AI" title. Body: text with the recommendation, where the savings amount is wrapped in a span with success color and weight 600.

**Commit**: `feat: 19 build AIRecommendation`

### Task 20: Build ChargeBreakdownCard

**Prompt to Claude Code:**
> Build `src/components/page-specific/ChargeBreakdownCard/`. Card with rows: each row shows label on right (RTL), value on left, separated by hairline (rgba(255,255,255,0.05)). Used in Subscription Detail to show monthly charge, duplicate charge, charging since, total wasted.

**Commit**: `feat: 20 build ChargeBreakdownCard`

### Task 21: Build LanguageSelector

**Prompt to Claude Code:**
> Build `src/components/page-specific/LanguageSelector/`. Use the shadcn Select primitive. 4 options: עברית, العربية, Русский, English. Currently only עברית is functional. Accepts value and onChange props.

**Commit**: `feat: 21 build LanguageSelector`

### Task 22: Build CancellationLetterPreview

**Prompt to Claude Code:**
> Build `src/components/page-specific/CancellationLetterPreview/`. Card showing a formal cancellation letter template with hardcoded merchant name, user name, date. Hebrew template should be a real legal-style letter. Accepts merchant prop. Below the letter: 3 buttons row with "העתק", "הורד PDF", "שלח במייל" (all stubs in Module 6).

**Commit**: `feat: 22 build CancellationLetterPreview`

### Task 23: Build ProcessingAnimation

**Prompt to Claude Code:**
> Build `src/components/page-specific/ProcessingAnimation/`. Centered spinner with progress bar 0% → 100% over 3 seconds. Below: rotating status texts "מעלה את הקובץ..." → "מנתח תנועות..." → "מזהה מנויים..." → "מסיים...". onComplete callback when 100%.

**Commit**: `feat: 23 build ProcessingAnimation`

---

## Phase 6: Build pages (one at a time, verify each)

### Task 24: Build LandingPage

**Prompt to Claude Code:**
> Build `src/pages/public/LandingPage/`. Hero with gradient text headline "תפסיק לשלם על מנויים ששכחת", subheadline, GradientButton "בוא נתחיל" routing to /register. Below hero: 3-card features section (Privacy, AI Detection, Cancellation Letters). Footer-style stats. This is the marketing entry, full-width on desktop.

**Verify**: Navigate to `/`, see landing page. Click "בוא נתחיל" routes to /register.

**Commit**: `feat: 24 build LandingPage`

### Task 25: Build LoginPage, RegisterPage, ForgotPasswordPage

**Prompt to Claude Code:**
> Build `src/pages/public/LoginPage/`, `src/pages/public/RegisterPage/`, `src/pages/public/ForgotPasswordPage/`. Each uses shadcn Input components, has appropriate fields, GradientButton for primary action, links between them. Submit handlers route to next step but don't authenticate.

**Verify**: All three pages render, links work between them.

**Commit**: `feat: 25 build auth pages`

### Task 26: Build OnboardingPage

**Prompt to Claude Code:**
> Build `src/pages/app/OnboardingPage/`. Uses local state for current step (1-3). Renders the OnboardingStep component with different content per step. Step 1: "ברוך הבא ל Slash" with welcome message. Step 2: "כך זה עובד" with 3 mini-steps. Step 3: "פרטיות תחילה" with TrustBadge. ScreenHeader with progress indicator. GradientButton at bottom: "הבא" on steps 1-2, "בוא נתחיל" on step 3 (routes to /upload).

**Verify**: Click through 3 steps, last button routes to /upload.

**Commit**: `feat: 26 build OnboardingPage`

### Task 27: Build UploadPage

**Prompt to Claude Code:**
> Build `src/pages/app/UploadPage/`. ScreenHeader, headline with gradient word "תנועות בנק", FileDropZone, TrustBadge below it, supported banks pills row. Click on FileDropZone triggers stub: routes to /processing after 500ms.

**Verify**: Page matches Mockup 2. Click drop zone, routes to processing.

**Commit**: `feat: 27 build UploadPage`

### Task 28: Build ProcessingPage

**Prompt to Claude Code:**
> Build `src/pages/app/ProcessingPage/`. Just the ProcessingAnimation component centered. onComplete routes to /review.

**Verify**: 3-second animation, then routes to /review.

**Commit**: `feat: 28 build ProcessingPage`

### Task 29: Build ReviewPage

**Prompt to Claude Code:**
> Build `src/pages/app/ReviewPage/`. Header summary "14 מנויים זוהו, חיסכון פוטנציאלי ₪2,847". Filter chips "הכל / כפילויות / לא בטוח". List of SubscriptionCards from MOCK_SUBSCRIPTIONS, each with a checkbox (use shadcn Checkbox). Bottom CTA: GradientButton "המשך ל Dashboard" routes to /dashboard.

**Verify**: 14 cards visible, filter chips work (filter the list), CTA routes correctly.

**Commit**: `feat: 29 build ReviewPage`

### Task 30: Build DashboardPage

**Prompt to Claude Code:**
> Build `src/pages/app/DashboardPage/`. AppHeader, HeroAmount, QuickActionsGrid, section header "המנויים שלך" with "הצג הכל" link, then list of 5-6 SubscriptionCards (the most expensive). Each card click routes to /subscription/:id.

**Verify**: Matches Mockup 3. Click a subscription routes to detail page.

**Commit**: `feat: 30 build DashboardPage`

### Task 31: Build SubscriptionDetailPage

**Prompt to Claude Code:**
> Build `src/pages/app/SubscriptionDetailPage/`. Uses useParams to get :id from URL, looks up subscription in MOCK_SUBSCRIPTIONS. ScreenHeader, hero with logo + merchant + duplicate warning badge if applicable, ChargeBreakdownCard, AIRecommendation, LanguageSelector, GradientButton "צור מכתב ביטול" (sets local state showLetter to true). When showLetter is true, render CancellationLetterPreview below.

**Verify**: Matches Mockup 4 + extends with letter generation. Test with id sub_002 (Spotify duplicate).

**Commit**: `feat: 31 build SubscriptionDetailPage`

### Task 32: Build SavingsReportPage

**Prompt to Claude Code:**
> Build `src/pages/app/SavingsReportPage/`. Hero with total savings figure, monthly breakdown chart (use a simple HTML/CSS bar chart or recharts if installed), share button (stub).

**Commit**: `feat: 32 build SavingsReportPage`

### Task 33: Build SettingsPage

**Prompt to Claude Code:**
> Build `src/pages/app/SettingsPage/`. Sections: Account (display MOCK_USER name and email), Language (LanguageSelector), Currency (Select with ILS/USD/EUR), Privacy (TrustBadge + "Delete my data" destructive button), File History (list of upload dates).

**Commit**: `feat: 33 build SettingsPage`

---

## Phase 7: Wire up routing

### Task 34: Configure React Router in App.jsx

**Prompt to Claude Code:**
> Update `src/App.jsx` to use BrowserRouter with the route structure exactly as defined in SITEMAP.md. Wrap public routes in PublicLayout, app routes in AppLayout.

**Verify**: Every route from SITEMAP.md works. URL bar updates. Back button works.

**Commit**: `feat: 34 wire react router`

### Task 35: Add navigation links

**Prompt to Claude Code:**
> Update Navbar in PublicLayout to use react-router Link components. Update AppHeader to make the logo a Link to /dashboard. Update each SubscriptionCard click to navigate. Make sure no full page reloads happen on navigation.

**Verify**: Click around the entire app. URL changes, no page reloads.

**Commit**: `feat: 35 wire navigation links`

---

## Phase 8: Responsive verification

### Task 36: Mobile width pass

**Prompt to Claude Code:**
> Open DevTools, set viewport to 375px (iPhone SE). Walk through every page. List any horizontal scroll, overlapping text, broken layouts. Fix them.

**Verify checklist**:
- [ ] No horizontal scroll on any page at 375px
- [ ] AppHeader doesn't overlap content
- [ ] Buttons are tappable (min 44px)
- [ ] Text doesn't get cut off
- [ ] Drop zone fits screen

**Commit**: `fix: 36 mobile responsive issues`

### Task 37: Desktop width pass

**Prompt to Claude Code:**
> Set viewport to 1440px. AppLayout pages must show as a centered 480px column with the GlowBlobs visible on either side. PublicLayout pages can be full-width with content max-width 1200px.

**Verify checklist**:
- [ ] App pages are centered 480px columns
- [ ] Public pages adapt to wider viewport
- [ ] No empty white space, GlowBlobs fill background

**Commit**: `fix: 37 desktop responsive`

---

## Phase 9: Visual verification

### Task 38: Side-by-side comparison

**Prompt to Claude Code:**
> Open `mockups/mockup-onboarding.png`, `mockup-upload.png`, `mockup-dashboard.png`, `mockup-subscription-detail.png` side-by-side with the running app. List every visual difference. Fix in priority order: colors > spacing > typography > layout.

**Verify**: Each page is within 5% visual match of the mockup.

**Commit**: `fix: 38 visual fidelity pass`

### Task 39: Final cleanup

**Prompt to Claude Code:**
> Search the entire codebase for: hardcoded hex colors, hardcoded pixel values, console.log statements, commented-out code, unused imports. Fix all instances.

**Verify checklist**:
- [ ] grep "#[0-9A-Fa-f]{6}" finds nothing in src/components or src/pages (only globals.css)
- [ ] No console.log
- [ ] No /* commented-out */
- [ ] All imports used

**Commit**: `chore: 39 final cleanup`

### Task 40: Push to GitHub

**Prompt to Claude Code:**
> Initialize git if not already, push to a new public GitHub repo named "slash-app". Don't commit node_modules. Make sure .gitignore is set correctly.

**Submit**: GitHub repo URL pasted into Lesson 6 assignment Part 3.

---

## Exit criteria for Module 6

- [ ] All 12 pages render
- [ ] Every link navigates correctly
- [ ] No errors in browser console
- [ ] Mobile (375px) and desktop (1440px) both look clean
- [ ] All values come from CSS variables
- [ ] GitHub repo public and submitted to Yariv

When all boxes checked, you have a complete Module 6 deliverable AND a foundation for Module 7 (Data Design).
