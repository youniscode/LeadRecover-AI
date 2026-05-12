# LeadRecover AI — Project Map

> **Status:** MVP complete. Bilingual (EN/FR) with simple translation system.

## [TECH_STACK]

| Layer | Technology | Version Strategy | Purpose |
|---|---|---|---|---|
| Runtime | Node.js | Local LTS (`node -v`) | Development server, build tooling |
| Framework | React | Latest stable React 19 | UI component model |
| Build | Vite | Latest stable at install | Dev server, HMR, bundling |
| Language | TypeScript | Latest stable | Static typing |
| Styling | Tailwind CSS | Latest stable v4 | Utility-first CSS |
| Routing | react-router-dom | Latest stable v7 | Client-side SPA routing |
| Testing | Vitest | Latest stable | Unit + integration tests |
| Testing | @testing-library/react | Latest stable | Component testing |
| Testing | @testing-library/jest-dom | Latest stable | DOM matchers |
| Testing | jsdom | Latest stable | DOM environment |
| Persistence | Web API (localStorage) | — | All data storage |
| Logging | console (vanilla) | — | Lightweight frontend logger |

All versions pinned via `package-lock.json` at install time. No deprecated or unstable imports.

| Dependency | Installed Version |
|---|---|
| `vite` | 8.0.12 |
| `react` | 19.2.6 |
| `react-dom` | 19.2.6 |
| `react-router-dom` | 7.6.3 |
| `tailwindcss` | 4.1.6 |
| `@tailwindcss/vite` | 4.1.6 |
| `typescript` | 6.0.2 |
| `vitest` | 3.2.4 |
| `@testing-library/react` | 16.3.0 |
| `@testing-library/jest-dom` | 6.6.3 |
| `jsdom` | 26.1.0 |

---

## [SYSTEM_FLOW]

```
User Browser
    │
    ├── Landing Page (/) ──CTA──> Pricing (/pricing) ──CTA──> Dashboard (/dashboard)
    │
    └── App (internal app shell, no authentication)
            │
            ├── Dashboard ───> /leads
            │                  ├── /leads/new      (create lead)
            │                  ├── /leads          (list + filter)
            │                  └── /leads/:id      (detail, status change, delete)
            │
            ├── Dashboard ───> /tools/reply       (select lead → template reply)
            └── Dashboard ───> /tools/review      (select lead → template review)
```

**No data leaves the browser.** All reads/writes hit `localStorage` only. No network requests, no API calls, no backend, no authentication, no payments.

---

## [ARCHITECTURE]

### Guiding Principles

- Feature-based directory structure.
- Shared/core code only when reused across features.
- Minimum file count — no excessive splitting.
- No external i18n library. Simple dictionary-based translation system with React Context.
- No external state management library. React Context + `useReducer`.
- No form library. Plain `useState` + native form validation.
- No UI component library. 4 hand-crafted primitives with Tailwind.
- No data fetching layer. `localStorage` reads are synchronous.

### Directory Tree

```
leadrecover-ai/
├── index.html                        # Vite entry HTML
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── package.json
├── PROJECT_MAP.md
├── docs/
│   └── PLAN.md
└── src/
    ├── main.tsx                      # React entry, providers
    ├── App.tsx                       # Router definition
    ├── index.css                     # Tailwind directives + globals
    ├── test-setup.ts                 # Vitest setup importing @testing-library/jest-dom/vitest
    │
    ├── types/
    │   └── lead.ts                   # Lead, LeadStatus, LeadFormData
    │
    ├── lib/
    │   ├── logger.ts                 # Lightweight frontend logger
    │   ├── storage.ts                # localStorage wrapper
    │   ├── templates.ts              # Message template functions
    │   └── translations.ts           # EN/FR dictionaries (no i18n library)
    │
    ├── store/
    │   ├── LeadContext.tsx            # Context + useReducer + localStorage sync
    │   └── LanguageContext.tsx        # Language state + t() hook + persistence
    │
    ├── components/
    │   ├── Layout.tsx                # PublicLayout + AppLayout (Outlet)
    │   └── ui/
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Badge.tsx
    │       └── Input.tsx
    │
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

**Total: ~42 source files.**

---

## [ROUTES]

| Path | Component | Layout | Purpose |
|---|---|---|---|
| `/` | `LandingPage` | PublicLayout | Marketing hero + features |
| `/pricing` | `PricingPage` | PublicLayout | Pricing tiers, CTA to dashboard |
| `/dashboard` | `DashboardPage` | AppLayout | Summary cards + quick actions |
| `/leads` | `LeadListPage` | AppLayout | Table, filter by status |
| `/leads/new` | `LeadFormPage` | AppLayout | Create lead form |
| `/leads/:id` | `LeadDetailPage` | AppLayout | View, edit status, delete |
| `/tools/reply` | `ReplyGeneratorPage` | AppLayout | Select lead → reply message |
| `/tools/review` | `ReviewGeneratorPage` | AppLayout | Select lead → review request |

Router implementation: `createBrowserRouter` from react-router-dom v7. No nested route configs beyond layout nesting.

---

## [STATE_MODEL]

### Types (`types/lead.ts`)

```ts
type LeadStatus = 'New' | 'Contacted' | 'Booked' | 'Lost';

interface Lead {
  id: string;             // crypto.randomUUID()
  name: string;
  phone: string;
  email: string;
  businessName: string;
  notes: string;
  status: LeadStatus;
  createdAt: string;      // ISO 8601
  updatedAt: string;      // ISO 8601
}

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  businessName: string;
  notes: string;
}
```

### Reducer (`store/LeadContext.tsx`)

```ts
type LeadAction =
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'UPDATE_STATUS'; payload: { id: string; status: LeadStatus } }
  | { type: 'DELETE_LEAD'; payload: { id: string } }
  | { type: 'LOAD'; payload: Lead[] };
```

### Context Shape

```ts
interface LeadContextValue {
  leads: Lead[];
  loaded: boolean;
  addLead: (data: LeadFormData) => void;
  updateStatus: (id: string, status: LeadStatus) => void;
  deleteLead: (id: string) => void;
  getLeadById: (id: string) => Lead | undefined;
}
```

## [LANGUAGE]

### Strategy: Simple Dictionary-Based Translation

File: `src/lib/translations.ts`

- No i18next or external i18n library.
- Two flat dictionaries (`en` and `fr`) with nested keys.
- `t(key)` function does dot-path lookup via `getNested()`.
- Template messages (reply/review) are stored as lambda functions inside the dictionaries for language-specific text.
- Context labels and status labels are part of the dictionary.

### Provider (`store/LanguageContext.tsx`)

```ts
interface LanguageContextValue {
  lang: Language;       // 'en' | 'fr'
  setLang: (lang: Language) => void;
  t: (key: string) => string;  // dot-path lookup
}
```

- Default language: `fr`.
- Persisted to localStorage under `leadrecover:language`.
- Reads persisted value on mount via `useEffect`.
- `FR | EN` switcher rendered in both `PublicLayout` and `AppLayout` headers.

No fine-grained selectors. No derived state outside of component-level `useMemo`.

---

---

## [STORAGE_MODEL]

| Key | Value | Format | Notes |
|---|---|---|---|
| `leadrecover:leads` | `Lead[]` | JSON array | Full lead list |
| `leadrecover:version` | `"1"` | string | Schema version for future migrations |
| `leadrecover:language` | `"fr"` \| `"en"` | string | Language preference (default: fr) |

### Wrapper (`lib/storage.ts`)

```ts
function get<T>(key: string): T | null     // JSON.parse with error handling
function set<T>(key: string, value: T): void // JSON.stringify with error handling
function remove(key: string): void
```

All operations wrapped in `try/catch`. On parse failure, log warning and return `null`. On serialize failure, log error and no-op.

---

## [LOGGING]

### Strategy: Lightweight Frontend Logger

File: `src/lib/logger.ts`

```ts
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_MAP: Record<LogLevel, number> = {
  debug: 0, info: 1, warn: 2, error: 3,
};

const currentLevel: LogLevel =
  import.meta.env.MODE === 'development' ? 'debug' : 'warn';

function shouldLog(level: LogLevel): boolean {
  try {
    return LEVEL_MAP[level] >= LEVEL_MAP[currentLevel];
  } catch {
    return false;
  }
}

const log = (level: LogLevel) => (msg: string, data?: unknown) => {
  if (!shouldLog(level)) return;
  const fn = console[level] ?? console.log;
  fn(`[LR] ${msg}`, data ?? '');
};

export const logger = {
  debug: log('debug'),
  info:  log('info'),
  warn:  log('warn'),
  error: log('error'),
};
```

- Console-based. No network transport. No persistence.
- Prefix `[LR]` for DevTools filtering.
- Level filtering suppresses debug/info in production.
- Never blocks UI — `console` methods are synchronous and fast.
- Runtime-safe: catches any edge case in the shouldLog check.

---

## [FEATURES]

| Feature | Files | Complexity | Depends On |
|---|---|---|---|
| Landing page | `LandingPage.tsx` | Static HTML + Tailwind | LanguageContext, Layout, Button |
| Pricing page | `PricingPage.tsx` | Static HTML + Tailwind | LanguageContext, Layout, Button, Card |
| Dashboard | `DashboardPage.tsx` | Derived counts from context | LanguageContext, LeadContext, Card, Badge |
| Lead list | `LeadListPage.tsx` | Table, filter, sort | LanguageContext, LeadContext, Badge |
| Lead form | `LeadFormPage.tsx` | Controlled form, validation | LanguageContext, LeadContext, Input, Button |
| Lead detail | `LeadDetailPage.tsx` | Status dropdown, delete button | LanguageContext, LeadContext, Badge, Button |
| Reply generator | `ReplyGeneratorPage.tsx` | Select lead + context → copy text | LanguageContext, LeadContext, translations |
| Review generator | `ReviewGeneratorPage.tsx` | Select lead → copy text | LanguageContext, LeadContext, translations |

### Message Templates (`lib/templates.ts`)

Both generators return ready-to-copy plain-text strings. No AI, no API calls.

- `generateReply(lead: Lead, context: string): string` — context options: `price_inquiry`, `scheduling`, `follow_up`, `general`
- `generateReviewRequest(lead: Lead): string` — single template with lead/business name interpolation

---

## [TESTING]

| Suite | File | Scope |
|---|---|---|
| Template tests | `src/lib/templates.test.ts` | 23 tests: all 4 contexts, uniqueness, edge cases |
| Storage tests | `src/lib/storage.test.ts` | 9 tests: round-trip, remove, JSON errors, primitives |
| LeadContext tests | `src/store/LeadContext.test.tsx` | 8 tests: add/update/delete/get/persist/error paths |

**No E2E tests.** No snapshot tests. Component-level tests added only if bugs arise.

Commands:

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + Vite production build |
| `npm run preview` | Serve production build locally |
| `npm test` | Vitest single run |

---

## [ORPHANS & PENDING]

### Orphans (Explicitly Out of Scope)

| Item | Rationale |
|---|---|
| Authentication / multi-user | Single local business owner |
| Backend / API server | All data in localStorage |
| Real AI / LLM integration | Templates are static strings |
| Stripe / payments | No monetization in MVP |
| Email / SMS sending | Out of scope; user copies message manually |
| Public lead capture widget | Internal form only |
| File attachments | Unnecessary for MVP |
| Import / export (CSV) | Post-MVP |
| Activity log / audit trail | Post-MVP |
| Dark mode | Post-MVP |

### Not Yet Implemented (M11–M12)

| Milestone | Key Deliverables |
|---|---|
| M11 | Documentation finalization |
| M12 | Final build + test validation |

### Resolved Decisions

| Decision | Chosen Approach |
|---|---|
| Tailwind config | Tailwind v4 with `@tailwindcss/vite` plugin. No `tailwind.config` file. |
| ID generation | `crypto.randomUUID()` — built-in, no dependency. |
| Router API | `createBrowserRouter` from react-router-dom v7. |
| Test convention | Co-located `*.test.ts` / `*.test.tsx` files next to source. |
| i18n approach | No external library. Simple `{ en, fr }` dictionary + `t(key)` dot-path lookup via React Context. Default: French. Persisted to localStorage `leadrecover:language`. |
