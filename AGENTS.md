# AGENTS.md

## Section 1: Agent Operational Workflow

### 1.1 Startup Workflow
Before writing any code, the agent must complete these steps:
1. Confirm the working directory using `pwd`.
2. Inspect repository structure and key configuration files (`config.js`, `index.html`, `SETUP.md`).
3. Review recent repository history using `git log --oneline -5`.
4. Validate static assets and HTML syntax. Test locally using `python3 -m http.server 8000`.

### 1.2 Working Rules
1. Focus entirely on one feature or task at a time.
2. Ensure valid HTML5, responsive Tailwind styling, proper multilingual i18n key parity, dark/light mode compatibility, and high PageSpeed/Lighthouse score compliance (Performance, Accessibility, Best Practices, SEO).
3. Adhere to `.editorconfig` formatting standards (2 spaces, UTF-8, LF line endings, trimmed whitespace).
4. Keep all changes within scope.
5. When making configuration changes in `config.js` or UI adjustments in `index.html`, keep `SETUP.md` and `README.md` updated.
6. All templates inside `templates/` must be kept clean, robust, and well-documented.

### 1.3 Required Artifacts & Key Files
1. `config.js`: Central configuration registry containing `GLOBAL_CONFIG`, `SITE_PROFILES`, and `I18N_DICTIONARY`.
2. `index.html`: Dynamic single-page application with Pre-compiled Tailwind CSS (`css/style.min.css`), Countdown Timer, Profile Resolver, and Language Switcher.
3. `SETUP.md`: Complete Architectural SOP & Edge Gateway configuration guide.
4. `.editorconfig`: Cross-editor formatting specifications.
5. `templates/`: Base starter templates for bootstrapping new EIM lab web projects.

### 1.4 Definition Of Done
A feature achieves the status of completed only when all of the following conditions are met:
1. The target behavior is fully implemented and tested.
2. Verified locally across multiple test profiles (e.g. `?site=smart-campus`, `?mode=maintenance`, `?lang=id`).
3. Zero console errors or unhandled DOM exceptions.
4. Web audit compliance: Assets, layout shifts, meta tags, and contrast meet Google Lighthouse / PageSpeed target scores (>= 90 across Mobile & Desktop).
5. Documentation in `README.md` and `SETUP.md` is updated if new configuration keys or templates are introduced.

### 1.5 End Of Session Workflow
1. Confirm clean code with no trailing debug statements.
2. Record any notes or updates in the summary.

---

## Section 2: Tech Stack & Architecture

### 2.1 Framework & Core Stack
- **Architecture**: Zero-build static web hub
- **Styling**: Pre-compiled Standalone Tailwind CSS (`css/style.min.css`) + Custom responsive utility animations
- **Scripting**: Pure Vanilla JavaScript (ES6+)
- **Internationalization**: Client-side dictionary engine (`EN` / `ID`)
- **Hosting / CDN**: Cloudflare Pages (`maintenance-eim`) + Cloudflare Worker (`eim-edge-router`)
- **Icons**: Inline SVG icons registry (`SVG_ICONS`)
