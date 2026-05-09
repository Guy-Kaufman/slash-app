# CLAUDE.md, Slash project instructions

> Read this file first. Always. It defines the conventions for this project.

## Project context

**Slash** is a React + Vite frontend that helps Israeli users find and cancel forgotten subscriptions by uploading an Excel of bank transactions. This is **Module 6 (Frontend Development)** of a Full-Stack AI course taught by Yariv Gilad. The deliverable is a visual shell only, no backend, no real data, no auth.

## Required reading before any task

Before generating code, you must read these files in order:
1. `DESIGN.md` — Every color, font, spacing value
2. `PRD.md` — What the app does and the scope of Module 6
3. `SITEMAP.md` — Routes and page components
4. `COMPONENTS.md` — Component breakdown and build order

If you generate code without referencing these, you will guess, and guessing creates rework.

## Stack

- **Vite + React 18**
- **React Router v6**
- **shadcn/ui** for: Input, Select, Dialog, Toast, Checkbox, DropdownMenu (these only)
- **Custom CSS** with CSS variables for everything else. **No Tailwind.**
- **Heebo font** from Google Fonts (RTL primary)
- **JavaScript, not TypeScript** (the course uses JS for accessibility)

## Folder structure (mandatory)

```
src/
  layouts/
    PublicLayout/
    AppLayout/
  components/
    ui/                # shadcn primitives only
    shared/            # GradientButton, GlowBlob, AppHeader, etc.
    page-specific/     # SubscriptionCard, FileDropZone, etc.
  pages/
    public/            # LandingPage, LoginPage, RegisterPage, ForgotPasswordPage
    app/               # OnboardingPage, UploadPage, etc.
  styles/
    globals.css
  App.jsx
  main.jsx
```

Each component in its own folder: `ComponentName/ComponentName.jsx` + `ComponentName/ComponentName.css`.

## Hard rules (do NOT violate)

### CSS rules
1. **Never hardcode hex colors** in components. Always use a CSS variable from `globals.css`. If the variable doesn't exist, add it to `globals.css` first.
2. **Never hardcode spacing values** (padding, margin, gap). Use `var(--space-*)`.
3. **Never use Tailwind classes.** Custom CSS only.
4. **Never use inline styles** except for dynamic values (e.g. a progress bar width). Static styles go in the component's `.css` file.

### React rules
5. **One component per file.** No mega-files.
6. **Functional components with hooks only.** No class components.
7. **No global state libraries** in Module 6. `useState` per component is fine.
8. **No data fetching.** All data is hardcoded arrays imported from `src/data/mockData.js`.

### RTL & accessibility
9. **Direction is RTL by default.** `<html dir="rtl">` is set on `index.html`. All components must work RTL.
10. **All text in Hebrew** for Module 6, except technical strings in `globals.css`.
11. **Min touch target 44x44px** for buttons and links.
12. **Focus states** visible on all interactive elements (use `:focus-visible`).

### Mobile-first
13. **Default styles target mobile** (320-480px). Use `@media (min-width: 768px)` to add tablet/desktop adjustments.
14. **AppLayout caps at 480px max-width** even on desktop. Public pages can be full-width.
15. **Test at 375px before considering a component done.**

### File discipline
16. **No `console.log` in committed code.** Remove debug logs.
17. **No commented-out code.** Delete it.
18. **No unused imports.** Clean them up.

## How to execute a task

When the user gives you a task from `TASK_PLAN.md`:

1. **Read** the relevant `.md` files (DESIGN, COMPONENTS) to confirm specs
2. **Show** the files you're about to create/modify (don't just create silently)
3. **Build** one component at a time, fully complete (jsx + css)
4. **Stop** and let the user verify in browser before next task
5. **If something is unclear**, ask before guessing

## How to verify your own work

After building a component, you should be able to answer:
- Does it use only CSS variables, no hardcoded values?
- Does it work at 375px width?
- Is it in the right folder?
- Does it match the description in `COMPONENTS.md`?
- Is it imported correctly where it's used?

## What "done" means for a task

A task is done when:
- ✅ Component renders in browser without errors
- ✅ Visual matches DESIGN.md and the mockup (if provided)
- ✅ Works in mobile width (375px) without horizontal scroll
- ✅ All values come from CSS variables
- ✅ User has visually verified

## What to do when blocked

If the user's instruction is ambiguous:
- ❌ Don't pick the most likely interpretation and build
- ✅ Ask one specific clarifying question

If a value is missing from DESIGN.md:
- ❌ Don't make one up
- ✅ Ask the user, then add it to DESIGN.md before using it

If the mockup contradicts DESIGN.md:
- ✅ DESIGN.md wins. The mockup may be slightly off. Confirm with user.

## Commit etiquette (Git)

After each task is verified:
```
git add .
git commit -m "feat: [task number] [short description]"
```

Examples:
- `feat: 03 add globals.css with all design tokens`
- `feat: 12 build SubscriptionCard component`
- `feat: 30 wire DashboardPage with mock subscription data`

## What this project is NOT

- ❌ Not a backend project. No Express, no Node API, no database.
- ❌ Not a Next.js project. Vite + React only.
- ❌ Not a TypeScript project.
- ❌ Not using Tailwind.
- ❌ Not implementing real auth.
- ❌ Not building real Excel parsing logic.

## Final note

This project's quality is judged by how closely the visual matches the mockups, how cleanly the code is structured, and how smoothly the pages navigate. You are not judged on functionality. **A beautiful shell is the goal.**
