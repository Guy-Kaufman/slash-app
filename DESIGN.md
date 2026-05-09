# Slash — Design System

Source of truth for the Slash fintech app visual language.
Aligned with the Stitch export in `stitch_markdown_app_designer 2/`.

---

## Product

**Slash** — a modern dark-mode fintech mobile app that helps users detect forgotten subscriptions, duplicated charges, unused services, and generate cancellation letters.

## Visual direction

- Dark navy fintech background (`#0B1437`)
- Clean and minimal mobile-first interface
- Premium but friendly feeling
- Large financial numbers (hero typography)
- Rounded surface cards (12px–16px corners)
- Blue → purple gradients on primary CTAs
- Green highlights for savings and positive actions
- Red highlights for warnings and dropped subscriptions
- Material Symbols Outlined line icons
- High contrast between text and background

---

## Colors

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-bg` | `#0B1437` | App background |
| `--color-surface` | `#111C44` | Cards, content sections, subscription blocks |
| `--color-surface-bright` | `#363941` | Elevated icon chips inside cards |
| `--color-border-subtle` | `#1B254B` | Hairline borders inside cards |
| `--color-text-primary` | `#FFFFFF` | Headings, hero numbers, primary content |
| `--color-text-muted` | `#A3AED0` | Labels, descriptions, placeholders, inactive nav |
| `--color-primary` | `#3B82F6` | Primary brand blue (start of CTA gradient) |
| `--color-primary-soft` | `#adc6ff` | Soft brand blue for icon labels and "Manage" links |
| `--color-secondary` | `#8B5CF6` | Brand violet (end of CTA gradient) |
| `--color-primary-container` | `#4d8eff` | Gradient start on confirm cancellation CTA |
| `--color-secondary-container` | `#571bc1` | Gradient end on confirm cancellation CTA |
| `--color-accent-success` | `#22C55E` | Savings, positive numbers, success states |
| `--color-accent-error` | `#EF4444` | Warnings, expensive subscriptions, danger CTAs |

### Gradients

| Token | Value | Usage |
| --- | --- | --- |
| `--gradient-primary` | `linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)` | Logo orb, primary CTA buttons |
| `--gradient-confirm` | `linear-gradient(90deg, #4d8eff 0%, #571bc1 100%)` | Confirm cancellation CTA |
| `--gradient-success-line` | `linear-gradient(90deg, rgba(34,197,94,0.4) 0%, #22C55E 50%, rgba(34,197,94,0.4) 100%)` | Top accent line on savings card |

### Glows

| Token | Value | Usage |
| --- | --- | --- |
| `--glow-purple` | `rgba(139, 92, 246, 0.20)` | Top-left blob behind welcome |
| `--glow-blue` | `rgba(59, 130, 246, 0.20)` | Bottom-right blob behind welcome |
| `--glow-success` | `rgba(34, 197, 94, 0.05)` | Ambient glow behind cancel confirmation |

---

## Typography

- **Font family:** Inter (loaded from Google Fonts, weights 400/500/700)
- All sizes in pixels with explicit line-height.

| Token | Size | Weight | Line-height | Usage |
| --- | --- | --- | --- | --- |
| `--font-size-heading-1` | `28px` | 700 | 1.3 | Page titles, hero text, "Slash" wordmark |
| `--font-size-hero-num` | `32px` | 700 | 1.2 | Monthly spending, savings numbers |
| `--font-size-body` | `16px` | 400 | 1.5 | Default copy, subscription names |
| `--font-size-label` | `13px` | 500 | 1.4 | Labels, captions, button text, nav labels |

---

## Spacing (8px scale)

| Token | Value |
| --- | --- |
| `--space-1` | `4px` |
| `--space-2` | `8px`  *(sm / base)* |
| `--space-3` | `12px` |
| `--space-4` | `16px` *(md / section-gap / gap-between-cards)* |
| `--space-5` | `20px` *(card-padding)* |
| `--space-6` | `24px` *(lg)* |
| `--space-8` | `32px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |

---

## Radii

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-sm` | `8px` | Small chips, inputs |
| `--radius-md` | `12px` | Cards, buttons |
| `--radius-lg` | `16px` | Large action buttons |
| `--radius-xl` | `20px` | Hero cards |
| `--radius-pill` | `9999px` | Pills, status badges |
| `--radius-full` | `50%` | Circular avatars and icon orbs |

---

## Shadows

| Token | Value | Usage |
| --- | --- | --- |
| `--shadow-card` | `0 4px 20px rgba(0,0,0,0.4)` | Surface cards |
| `--shadow-button` | `0 8px 24px rgba(59,130,246,0.35)` | Primary CTA |
| `--shadow-success` | `0 8px 30px rgba(34,197,94,0.05)` | Savings highlight card |
| `--shadow-icon-orb` | `0 4px 20px rgba(0,0,0,0.4)` | Welcome orb |

---

## Components

### Buttons

- **Primary CTA** — full-width, 56px tall, `--radius-md`, gradient background `--gradient-primary`, white bold label, soft shadow.
- **Confirm CTA** — gradient `--gradient-confirm`, used on cancel confirmation.
- **Secondary** — surface background, 1px subtle border, white label, same radius.
- **Danger** — surface background, 1px `accent-error/50` border, accent-error label and icon.

### Cards

- Background `--color-surface`, padding `--space-5` (20px), radius `--radius-md` (12px), `--shadow-card`.
- Subscription cards include: circular tinted icon (brand color @ 20% opacity), name + sub-label, price + side action.
- Warning cards add a 1px error border and a 4px error left bar.

### Inputs

- Surface background, subtle border, white text, muted placeholder, `--radius-sm` corners, generous padding for mobile.

### Badges & pills

- `--radius-pill`, small horizontal padding, `--font-size-label`.
- Success pill: `accent-success/10` bg, `accent-success` text.
- Warning pill: `error-container/20` bg, error border, error text.

### Bottom nav

- Fixed to the bottom on mobile, surface background, top border `--color-border-subtle`, three items.
- Active item: `--color-primary-soft`. Inactive: `--color-text-muted`.

### Icons

- Material Symbols Outlined, default 24px, optionally filled.

---

## Screens covered

1. **Welcome / Landing** — gradient orb, wordmark, tagline, primary CTA pinned to bottom.
2. **Subscriptions Dashboard** — top app bar, hero monthly amount, savings pill, list of subscription cards, bottom nav.
3. **Subscription Details** — top app bar, contextual back, hero card with logo + price + status pill, bento grid (last usage / next billing / yearly cost), Cancel + Keep CTAs.
4. **Cancel Confirmation** — ambient success glow, shield icon orb with pulsing rings, message, savings highlight card with success accent line, Confirm + Go Back CTAs.

The remaining screens (Login, Register, Forgot Password, Onboarding, Upload, Processing, Review, Savings, Settings) reuse the same tokens and component patterns even where the Stitch export is not pixel-defined.

---

## Accessibility

- Body copy ≥16px.
- Strong contrast between text and background (WCAG AA at minimum).
- Buttons ≥44×44px touch target; primary CTAs are 56px tall.
- Focus visible via `:focus-visible` outline (primary blue, 2px).
- Status never relies on color alone — every state pairs an icon or label.
