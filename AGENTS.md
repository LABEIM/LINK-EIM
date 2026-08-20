# AGENTS.md

<!-- 
================================================================================
INSTRUCTIONS FOR NEW PROJECTS:
1. Replace all placeholders in brackets (e.g. [PROJECT_NAME], [BUILD_COMMAND], [FRAMEWORK])
   with the specific configuration of your repository.
2. Adjust or remove any sections, rules, or tech stack items that do not apply.
3. Keep this file maintained as an active source of truth for AI agents and developers.
================================================================================
-->

## Section 1: Agent Operational Workflow

### 1.1 Startup Workflow
Before writing any code, the agent must complete these steps:
1. Confirm the working directory using `pwd`.
2. Inspect the repository structure and key configuration files (e.g. `package.json`, `[CONFIG_FILE]`, `src/`) to understand the current architecture and state.
3. Review recent repository history by checking the last 5 commits using `git log --oneline -5`.
4. Run baseline build/verification using `[BUILD_COMMAND]` (e.g. `npm run build` or `npm test`) before starting new work. If baseline verification fails, fix that issue first before stacking new feature work on top of a broken starting state.

### 1.2 Working Rules
1. Focus entirely on one feature or task at a time.
2. Do not mark a task or feature complete just because code was added. Ensure it compiles, passes linting/tests, and is verified.
3. Adhere to `.editorconfig` and project linter/formatter conventions.
4. Keep all changes within the selected task scope unless a critical blocker forces a narrow supporting fix.
5. Do not silently alter verification rules or relax tests during implementation.
6. Prefer durable repository artifacts and updated documentation over transient chat summaries.
7. When making structural updates, dependency version bumps, framework configuration changes, schema updates, or directory layout shifts, the agent must update corresponding repository documentation (`AGENTS.md`, `README.md`, `DEPLOYMENT.md`) and TypeScript interfaces / data models (`[TYPES_FILE]`) to reflect the new state.

### 1.3 Required Artifacts & Key Files
<!-- List the core architectural files, configuration files, and schemas that define this project -->
1. `package.json` (or equivalent manifest): Main repository dependencies, runtime constraints, and script targets.
2. `[FRAMEWORK_CONFIG]`: Central framework configuration (e.g. `astro.config.mjs`, `next.config.ts`, `vite.config.ts`).
3. `[DATA_MODELS_SCHEMA]`: Database schema, validation rules, or content config (e.g. `prisma/schema.prisma`, `src/content.config.ts`, Zod schemas).
4. `[CORE_ENTRY_POINT]`: Core entry point or routing root (e.g. `src/app/`, `src/pages/`, `src/main.ts`).

### 1.4 Definition Of Done
A feature achieves the status of completed only when all of the following conditions are met:
1. The target behavior is fully implemented and satisfies requirements.
2. The project compiles/builds successfully locally using `[BUILD_COMMAND]` (e.g. `npm run build`).
3. Diagnostics, linter, and type checks run successfully with zero errors using `[LINT_COMMAND]` (e.g. `npm run lint` or `npx tsc --noEmit`).
4. Automated unit/integration tests pass using `[TEST_COMMAND]` (e.g. `npm test`).
5. If testing dynamic logic, client UI, or API endpoints, manually verify correct DOM rendering, HTTP status codes, and fallback states.
6. Web audit compliance: Client UI pages meet Google Lighthouse / PageSpeed audit benchmarks (Target: >= 90 across Performance, Accessibility, Best Practices, and SEO).

### 1.5 End Of Session Workflow
Before ending a session, the agent must perform these tasks:
1. Confirm no trailing linter, compiler, or type errors remain by running validation tasks.
2. Explicitly record any unresolved risk, technical debt, or workflow blocker in the session handoff.
3. Commit the changes with a descriptive message adhering to the Conventional Commits specification once the work is in a safe state.

---

## Section 2: Tech Stack & Architecture

### 2.1 Framework & Core Stack
<!-- Update with the project's specific technologies and version constraints -->
- **Framework**: [e.g. Next.js 15 / Astro 7 / Vite 6 + React 19 / Fastify / Django 5]
- **Language**: [e.g. TypeScript 5.x / JavaScript ES2024 / Python 3.12]
- **UI Components & Library**: [e.g. React 19 / Vue 3 / Svelte 5 / Radix UI / Shadcn UI / Native HTML5]
- **Styling**: [e.g. Tailwind CSS v4 / Vanilla CSS (`src/styles/`) / CSS Modules]
- **State Management & Data Fetching**: [e.g. TanStack Query / Zustand / Redux Toolkit / React Context / Fetch API]
- **Database / CMS / ORM** (if applicable): [e.g. PostgreSQL + Prisma / Keystatic CMS / SQLite / Supabase / None (Static)]
- **Typography & Icons**: [e.g. Lucide Icons / `@fontsource/inter`, `@fontsource/montserrat`]
- **Runtime & Package Manager**: [e.g. Node.js `>=20.x` / Bun / Deno, `npm` / `pnpm` / `yarn`]

### 2.2 Directory Layout & Component Roles
<!-- Map out the primary directory structure and module boundaries -->
- `[FRAMEWORK_CONFIG]`: Core configuration file for build, integrations, aliases, and deployment targets.
- `src/components/`: Reusable, modular UI components (buttons, navbar, modal, cards).
- `src/pages/` or `src/app/`: File-system routing directories, page views, and API routes.
- `src/layouts/`: Base wrapper page layouts and metadata providers.
- `src/styles/`: Modular design system, CSS variables, tokens, and stylesheets.
- `src/utils/` or `src/lib/`: Business logic, helper functions, and shared utilities.
- `src/types/`: Central TypeScript interfaces, data models, and API payload contracts.
- `public/`: Static assets, logos, favicon, and fonts.

### 2.3 Role-Based Access Control & Security Scoping
- **Authentication**: [e.g. None (Public Static Application) / NextAuth / Supabase Auth / JWT Session Cookies]
- **Authorization / RBAC**: [e.g. Public / Admin / Member / Role-based permission gates]
- **Protected Routes**: [e.g. None / `/dashboard/*`, `/admin/*`]

### 2.4 Service & Business Logic Layer
- **API Endpoints**: [e.g. Serverless Route Handlers (`src/app/api/`), Fastify REST API, or Cloudflare Worker endpoints]
- **External Services & Integrations**: [e.g. Cloudflare Pages, Google Apps Script, Webhooks, Resend / SMTP]

---

## Section 3: Privacy, Security & Specifications

### 3.1 Privacy & Environment Safety
1. Do not hardcode personal user data, private keys, or credentials in source code, comments, or documentation. Keep contact references public and generic.
2. Secrets management: Never commit active environment secrets. Keep `.env`, `.env.local`, and credential files excluded via `.gitignore`. Provide documented template examples in `.env.example`.

### 3.2 Security Rules
1. **Input Sanitization & Injection Prevention**: Sanitize and escape all dynamic user inputs. Validate incoming request payloads with strict schemas (e.g. Zod).
2. **CORS & Security Headers**: Enforce restrictive CORS policies and recommended security headers (CSP, HSTS, X-Frame-Options).
3. **Session & Token Storage**: Store sensitive authentication tokens in secure, HTTP-only cookies rather than client-accessible local storage.

### 3.3 Database Status & State Codes (If Applicable)
- [e.g. Migrations managed via Prisma / Static Markdown collection / REST API / Not Applicable]

---

## Section 4: Development, Testing & Operations

### 4.1 Best Coding Practices & Standards
1. **TypeScript & Type Safety**:
   - Strict typing: Avoid `any` types; use explicit TypeScript interfaces, strict return types, and proper Zod/runtime validation schemas.
   - Data contracts: Maintain shared interfaces in `src/types/` or `src/utils/types.ts` rather than redefining data structures locally.
2. **Clean Code & Maintainability**:
   - DRY & Single Responsibility: Keep components and helper functions modular, readable, and focused on a single responsibility.
   - Clear naming: Use descriptive, self-documenting names for variables, functions, and components.
   - Defensive coding & error handling: Handle edge cases, network timeouts, and missing data gracefully. Never swallow exceptions silently without logging or fallback UI.
3. **Performance & Core Web Vitals (PageSpeed / Lighthouse)**:
   - Asset optimization: Optimize and lazy-load non-critical media assets (images, fonts, third-party libraries); specify explicit `width`/`height` on images to prevent Cumulative Layout Shift (CLS).
   - Core Web Vitals: Optimize for fast Largest Contentful Paint (LCP), minimal CLS, and low Interaction to Next Paint (INP).
   - Island architecture / Minimal JS: Minimize client-side JavaScript execution; prefer static rendering where dynamic interactivity is not required. Defer non-critical scripts.
4. **Accessibility (a11y) & SEO**:
   - Semantic HTML: Enforce HTML5 semantic tags (`<main>`, `<header>`, `<footer>`, `<nav>`, `<article>`, `<section>`).
   - Accessible UI: Ensure all interactive elements have accessible labels (`aria-label`), keyboard navigation support, and meaningful `alt` text for images. Maintain minimum 48x48px touch target sizes on mobile.
   - Color contrast: Maintain WCAG AA compliant contrast ratios in both light and dark themes.
   - Heading hierarchy & Meta: Maintain a single `<h1>` per page, structured heading levels (`<h2>` -> `<h3>`), valid OpenGraph/Twitter cards, and canonical links.
5. **Modular CSS & Styling**:
   - Component styles: Keep styles scoped or organized cleanly in dedicated component stylesheets or Tailwind utility classes.
   - Design system tokens: Use consistent CSS variables / theme tokens for colors, spacing, and typography instead of magic numbers or raw hex values.
6. **Formatting & Commit Conventions**:
   - Indentation: 2 spaces for HTML, CSS, JS, TS, Astro, JSON, and YAML configurations.
   - Formatting: Enforced using standard framework formatters (e.g. Prettier, ESLint).
   - Commit conventions: All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`).

### 4.2 Testing & Portability
1. **Verification Commands**: 
   - Run type checks and framework linting: `[LINT_COMMAND]` (e.g. `npm run lint` / `npx tsc --noEmit`)
   - Run automated tests: `[TEST_COMMAND]` (e.g. `npm test`)
   - Run production compilation test: `[BUILD_COMMAND]` (e.g. `npm run build`)
2. **Test Isolation**: Local development environments must run on isolated local ports without conflicting with existing services.

### 4.3 Containerization & Ports (If Applicable)
- **Dev Server**: Standard local host port `http://localhost:[PORT]` (e.g. `http://localhost:3000` or `http://localhost:4321`).
- **Production / Deployment Target**: [e.g. Cloudflare Pages / Docker Container / Vercel].
