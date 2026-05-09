# Slash, Site Map & Routing

> URL → Page Component mapping. This file is the source for React Router setup in `src/App.jsx`.

## Public Routes (no auth required)

| URL | Page Component | Description | Layout |
|---|---|---|---|
| `/` | `LandingPage` | Marketing entry point. Hero with value prop, before/after savings comparison, CTA to sign up. | `PublicLayout` |
| `/login` | `LoginPage` | Email + password (or Google) sign-in form. | `PublicLayout` |
| `/register` | `RegisterPage` | Account creation form, email + password + name. | `PublicLayout` |
| `/forgot-password` | `ForgotPasswordPage` | Request password reset via email. | `PublicLayout` |

## Authenticated Routes (would require auth in Module 8, accessible to all in Module 6)

| URL | Page Component | Description | Layout |
|---|---|---|---|
| `/onboarding` | `OnboardingPage` | 3-step intro: choose bank → export instructions → privacy explanation. | `AppLayout` |
| `/upload` | `UploadPage` | Drag-and-drop or file picker for Excel/CSV upload. | `AppLayout` |
| `/processing` | `ProcessingPage` | Animated progress bar (3-second fake animation in Module 6). Auto-routes to `/review`. | `AppLayout` |
| `/review` | `ReviewPage` | Confirm/reject AI-detected subscriptions. Filter chips, checkboxes, "approve all high-confidence" CTA. | `AppLayout` |
| `/dashboard` | `DashboardPage` | Main app screen. Hero number (potential annual savings), 4 quick actions, list of subscriptions with badges. | `AppLayout` |
| `/subscription/:id` | `SubscriptionDetailPage` | Single subscription view, charge history graph, language selector, "Generate cancellation letter" CTA, letter preview. | `AppLayout` |
| `/savings` | `SavingsReportPage` | Monthly savings breakdown, share button. | `AppLayout` |
| `/settings` | `SettingsPage` | Language toggle (HE/AR/RU/EN, currently HE-only), currency, GDPR data delete, file history. | `AppLayout` |

## Navigation transitions

```
PublicLayout pages
─────────────────
   [Landing] ──→ [Register] ──→ [Onboarding]
       │              │
       │              ↓
       └────────→ [Login] ──→ [Dashboard] (returning users)
                     │
                     ↓
               [Forgot Password]


AppLayout pages (linear, contextual nav)
────────────────────────────────────────
[Onboarding] ──→ [Upload] ──→ [Processing] ──→ [Review] ──→ [Dashboard]
                                                                │
                                                                ↓
                                                    ┌───────────┼───────────┐
                                                    ↓           ↓           ↓
                                          [Subscription   [Savings    [Settings]
                                            Detail]      Report]
```

## React Router v6 configuration (target)

```jsx
// src/App.jsx, target structure
<BrowserRouter>
  <Routes>
    {/* Public */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Route>

    {/* App */}
    <Route element={<AppLayout />}>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/processing" element={<ProcessingPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/subscription/:id" element={<SubscriptionDetailPage />} />
      <Route path="/savings" element={<SavingsReportPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

## Verification checklist

After routing is wired:
- [ ] Visiting `/` shows LandingPage
- [ ] Visiting `/dashboard` shows DashboardPage
- [ ] Clicking "Login" link in PublicLayout header navigates to `/login` without full page reload
- [ ] Clicking a SubscriptionCard in Dashboard navigates to `/subscription/sub_001`
- [ ] URL bar updates on every navigation
- [ ] Browser back button works
- [ ] Direct URL entry works (refresh on `/dashboard` still loads dashboard)
