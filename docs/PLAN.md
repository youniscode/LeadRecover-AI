# LeadRecover AI Planning Document

## Assumptions

1. **Single user, no auth.** The app is used by one local business owner on their own device. No login, no multi-tenancy.
2. **No backend.** All data persists in `localStorage`. A page refresh reloads data from the browser.
3. **No real AI.** The "Reply Generator" and "Review Request Generator" use template strings with lead/business name interpolation. No LLM, no API call.
4. **No payments.** Stripe and all monetization features are explicitly out of scope for MVP.
5. **Manual message delivery.** The user copies generated messages from the browser and pastes them into SMS/email/Google Reviews themselves.
6. **Internal lead capture only.** The lead form is accessed within the dashboard. There is no public-facing embed or widget.
7. **Windows development environment.** All commands and paths are Windows-compatible (PowerShell 5.1).
8. **Node.js: local LTS as detected by `node -v` (current: 24.11.1).** Dependencies will be pinned to stable versions via lockfile.
9. **Chrome/Edge desktop browsers.** Minimum viable target. No IE, no Safari-specific testing for MVP.
10. **Static "Pricing" page.** All features are listed as "Free". No actual pricing logic, no plan enforcement, no feature gating.

## MVP Scope

| What's In | What's Out |
|---|---|
| Vite + React 19 + TypeScript + Tailwind CSS | Backend / API server |
| Landing page (`/`) | Authentication / user accounts |
| Pricing page (`/pricing`) | Stripe / payments |
| Dashboard (`/dashboard`) | Real AI / LLM integration |
| Lead CRUD (create, list, detail, delete) | Public lead capture widget |
| Lead statuses: New → Contacted → Booked → Lost | Email / SMS sending |
| Reply message generator (templates) | CSV import / export |
| Google Review request generator (templates) | Activity / audit log |
| `localStorage` persistence | File attachments |
| Lightweight frontend logger (console-based) | Dark mode |
| Basic unit tests (Vitest + RTL) | E2E tests / Cypress |
| Mobile responsiveness (landing, pricing, dashboard, leads, tools) | i18n / localization |
| | PWA / service worker |
| | Storybook / component library |

## Rejected Complexity

| Rejected | Why |
|---|---|
| Zustand / Redux / Jotai | React Context + `useReducer` handles one state slice cleanly. |
| React Query / SWR | No async data fetching. `localStorage` reads are synchronous. |
| Formik / React Hook Form | Three small forms. Plain `useState` + `onSubmit` is simpler. |
| shadcn/ui / MUI / Radix | 4 UI primitives needed (Button, Card, Badge, Input). Hand-crafted with Tailwind. |
| `nanoid` / uuid | `crypto.randomUUID()` is built into all modern browsers. |
| React Router loaders / actions | No data fetching. Standard component-level state. |
| MSW / mocking library | Storage and templates are pure functions. No network to mock. |
| Sentry / error tracking | Console logging is sufficient for a single-user local app. |
| CSS modules / CSS-in-JS | Tailwind utility classes cover all styling needs. |
| Prettier / ESLint complex config | Default Vite TS template config is sufficient. |

## User Journey

```
1. LANDING (/) ────────────────────────────────────────────────
   User sees: hero section, feature highlights, "View Pricing" CTA.
   Click "View Pricing" → /pricing.
   Click "Get Started" → /dashboard.

2. PRICING (/pricing) ────────────────────────────────────────
   User sees: 3-tier cards (Free/Pro/Enterprise).
   All MVP features listed under "Free". "Start Free" CTA → /dashboard.

3. DASHBOARD (/dashboard) ────────────────────────────────────
   User sees:
     - Total leads count
     - Breakdown: New / Contacted / Booked / Lost
     - Quick action buttons: [+ New Lead] [View Leads] [Reply Generator] [Review Generator]
   First visit shows empty state ("No leads yet. Create your first lead.").

4. NEW LEAD (/leads/new) ─────────────────────────────────────
   Form fields: Name*, Phone*, Email, Business Name*, Notes
   On submit: validates required fields, creates Lead (status: "New"), redirects to /leads.
   *required fields

5. LEAD LIST (/leads) ────────────────────────────────────────
   Table columns: Name, Business, Status, Created, Actions (View).
   Filter bar: dropdown by status (All / New / Contacted / Booked / Lost).
   Sort: by created date (newest first).
   Empty state: "No leads match this filter."
   Click row → /leads/:id.

6. LEAD DETAIL (/leads/:id) ──────────────────────────────────
   Displays: all lead fields (read-only except status).
   Status dropdown: change between New / Contacted / Booked / Lost.
   Delete button: confirmation prompt, then remove + redirect to /leads.
   Back link → /leads.

7. REPLY GENERATOR (/tools/reply) ────────────────────────────
   Step 1: Select a lead from dropdown (searchable by name/business).
   Step 2: Select context (Price Inquiry / Scheduling / Follow-up / General).
   Step 3: Click "Generate Reply" → text area shows template message.
   Step 4: Click "Copy" to clipboard.
   Empty state if no leads exist: "Create a lead first."

8. REVIEW GENERATOR (/tools/review) ─────────────────────────
   Step 1: Select a lead from dropdown.
   Step 2: Click "Generate Review Request" → text area shows template.
   Step 3: Click "Copy" to clipboard.
   Empty state if no leads exist: "Create a lead first."
```

## Architecture

### Layered Dependency (top-level dependencies only)

```
App.tsx (router)
  │
  ├── features/*       (page components)
  │     │
  │     ├── store/LeadContext.tsx    (state + persistence)
  │     │     │
  │     │     └── lib/storage.ts     (localStorage wrapper)
  │     │
  │     └── lib/templates.ts         (message generation)
  │
  ├── components/*     (shared UI + layout)
  └── lib/logger.ts    (logging utility)
```

`types/lead.ts` is imported by all layers. No circular dependencies.

### Data Flow

```
User Action → dispatch(action) → reducer → new state → localStorage.setItem → re-render
                                                                                     │
Initial load ← localStorage.getItem ← dispatch(LOAD) ← useEffect on mount ←──────────┘
```

Single source of truth: React Context state. `localStorage` is synced on every state change via `useEffect`. No cache layer, no optimistic updates, no stale-while-revalidate.

## File Structure

```
leadrecover-ai/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── package.json
├── PROJECT_MAP.md
├── docs/
│   └── PLAN.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── lead.ts
    ├── lib/
    │   ├── logger.ts
    │   ├── storage.ts
    │   ├── storage.test.ts
    │   ├── templates.ts
    │   └── templates.test.ts
    ├── store/
    │   ├── LeadContext.tsx
    │   └── LeadContext.test.tsx
    ├── components/
    │   ├── Layout.tsx
    │   └── ui/
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Badge.tsx
    │       └── Input.tsx
    └── features/
        ├── landing/
        │   └── LandingPage.tsx
        ├── pricing/
        │   └── PricingPage.tsx
        ├── dashboard/
        │   └── DashboardPage.tsx
        ├── leads/
        │   ├── LeadListPage.tsx
        │   ├── LeadFormPage.tsx
        │   └── LeadDetailPage.tsx
        └── tools/
            ├── ReplyGeneratorPage.tsx
            └── ReviewGeneratorPage.tsx
```

## Milestones

### M1 — Project Scaffold
- `npm create vite` with React + TypeScript template
- Install: Tailwind CSS v4 + `@tailwindcss/vite`, react-router-dom, Vitest + testing deps
- Configure: `vite.config.ts` with `@tailwindcss/vite` plugin, `tsconfig`
- Verify: `npm run dev` starts, `npm run build` succeeds

### M2 — Core Types + Library Layer
- `src/types/lead.ts` — interfaces, type aliases, status array
- `src/lib/logger.ts` — lightweight frontend logger
- `src/lib/storage.ts` — localStorage wrapper with error handling
- `src/lib/templates.ts` — `generateReply()`, `generateReviewRequest()` pure functions

### M3 — State Layer
- `src/store/LeadContext.tsx` — Context, Provider, reducer, `localStorage` sync effect
- Export: `LeadProvider`, `useLeads()`, `useLead(id)`

### M4 — Shared UI Components + Layout
- `Button`, `Card`, `Badge`, `Input` primitives
- `Layout` — `PublicLayout` (minimal header + footer) and `AppLayout` (sidebar nav + header + `<Outlet/>`)
- `index.css` — Tailwind directives + base styles

### M5 — Routing + App Shell
- `src/main.tsx` — `StrictMode` + `LeadProvider` + router
- `src/App.tsx` — `createBrowserRouter` with all routes and layout nesting
- Verify: navigate between all routes, layout switches correctly

### M6 — Static Pages
- `LandingPage` — hero, feature grid, CTA buttons
- `PricingPage` — 3-tier cards, "Start Free" CTA → `/dashboard`

### M7 — Dashboard
- `DashboardPage` — summary cards, quick action buttons
- Empty state when no leads exist
- Status breakdown derived from `useLeads()`

### M8 — Lead CRUD
- `LeadListPage` — table, filter dropdown, sort, empty state
- `LeadFormPage` — controlled form, validation, submit → redirect
- `LeadDetailPage` — read-only fields, status dropdown, delete with confirmation

### M9 — Tool Pages
- `ReplyGeneratorPage` — lead selector, context selector, generate, copy
- `ReviewGeneratorPage` — lead selector, generate, copy

### M10 — Tests
- `templates.test.ts` — verify each context produces expected output, edge cases (empty name)
- `storage.test.ts` — get/set/remove, JSON parse failure, missing key
- `LeadContext.test.tsx` — add lead, update status, delete lead, initial load

### M11 — Documentation
- `PROJECT_MAP.md` (this file)

### M12 — Final Validation
- `npm run build` passes with no TypeScript errors
- `npm test` passes all tests
- Manual smoke test of full user journey

## Verification Criteria

| Criterion | How to Verify |
|---|---|
| All 8 routes render without error | Navigate to each route in dev server |
| Create lead → appears in list | Fill form, submit, check /leads table |
| Update lead status → persists | Change status on detail page, refresh, verify |
| Delete lead → removed from list | Delete, check /leads table, verify localStorage |
| Reply generator produces text | Select lead + context, click Generate, see output |
| Review generator produces text | Select lead, click Generate, see output |
| Copy button copies to clipboard | Click Copy, paste into text editor |
| Dashboard counts match leads | Create/delete leads, check dashboard numbers update |
| Empty states render correctly | Access each page with 0 leads |
| Data survives page refresh | Create lead, refresh browser, lead still in list |
| All pages are usable on mobile (320px+ width) | Resize browser to mobile width, verify no overflow, readable text, functional forms |
| `npm run build` succeeds | Run command, verify exit code 0 |
| `npm test` passes | Run command, verify all tests pass |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| `localStorage` quota exceeded (5-10 MB) | Very low for text-only leads | Log warning on `QuotaExceededError`. Notify user to export/delete. |
| `localStorage` cleared accidentally | Low | No mitigation for MVP. User data is local-only by design. |
| `crypto.randomUUID()` not supported | Low (Chrome/Edge only) | Use a fallback function that calls `Date.now().toString(36) + Math.random().toString(36)`. |
| No browser back/forward for modals | Low | All navigation is standard route transitions. No modal-based flows. |
| Concurrent tab data corruption | Low | `storage` event listener could sync across tabs (post-MVP). For MVP, last-write-wins is acceptable. |

## Approval Gate

**Before implementation begins, the following must be confirmed:**

- [ ] PROJECT_MAP.md and docs/PLAN.md reviewed and approved
- [ ] All assumptions validated by stakeholders
- [ ] Rejected complexity items accepted
- [ ] Milestone order and scope accepted
- [ ] Verification criteria accepted as sufficient for MVP sign-off

---

*Planning version: 1.0. Last updated: May 2026.*
