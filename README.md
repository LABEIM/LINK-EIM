# LINK-EIM

[![License: All Rights Reserved](https://img.shields.io/badge/License-All_Rights_Reserved-red.svg)](LICENSE)
[![CI/CD](https://github.com/LABEIM/LINK-EIM/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/LABEIM/LINK-EIM/actions)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![Security Policy](https://img.shields.io/badge/Security-Policy-brightgreen.svg)](SECURITY.md)
[![Website](https://img.shields.io/badge/Website-eimlab.org-0284c7.svg)](https://eimlab.org)
[![Organization](https://img.shields.io/badge/Org-LABEIM-6366f1.svg)](https://eimlab.org)

A self-hosted link hub for the Enterprise Infrastructure Management (EIM) Research Laboratory — one fast, privacy-respecting page that gathers every official lab destination: website, laboratory information, research, and social channels.

[**Live Website**](https://link.eimlab.org) · [**EIM Research Lab**](https://eimlab.org) · [**Report Issue**](https://github.com/LABEIM/LINK-EIM/issues)

---

## About This Project

**LINK-EIM** is the official link-in-bio page for the EIM Research Laboratory at Telkom University. Rather than relying on a third-party service like Linktree, the lab hosts its own lightweight, fully self-contained hub at [`link.eimlab.org`](https://link.eimlab.org), keeping every link, asset, and visitor interaction under laboratory control with no external tracking.

The page brings all of the lab's public destinations into a single, easy-to-share URL:

- **Lab Website** — the main portal and entry point at [`eimlab.org`](https://eimlab.org).
- **Laboratory Information** — who we are, our research focus, facilities, and how to reach the team.
- **Research & Publications** — ongoing projects, published papers, and academic output.
- **People** — faculty, researchers, and student members of the laboratory.
- **News & Announcements** — the latest updates, events, and opportunities.
- **Social & Contact** — official social channels and the lab contact email.

The project is built around three priorities: **speed** (a prerendered public page and minimal client-side JavaScript), **accessibility** (semantic HTML, keyboard support, and WCAG AA contrast), and **privacy** (no third-party trackers, all assets self-hosted). It is designed to be deployable on the lab's own infrastructure and editable by the team without any proprietary dependency.

- **Status:** In Active Development
- **Maintained by:** Enterprise Infrastructure Management (EIM) Research Laboratory, Telkom University
- **Target Launch:** Q4 2026

---

## Tech Stack & Development

- **Framework:** [Astro](https://astro.build) 7. The public page is prerendered; the Keystatic admin and API routes are server-rendered by the Cloudflare adapter.
- **Styling:** Tailwind CSS v4 with semantic design tokens — a centered rounded card on the lab's deep teal-black canvas, warm bone text, a single teal accent, and self-hosted Instrument Serif plus IBM Plex Sans/Mono.
- **Content:** Managed with [Keystatic](https://keystatic.com). Site settings live in [`src/content/site.yaml`](src/content/site.yaml), link groups in [`src/content/groups/`](src/content/groups/); [`src/data/site.ts`](src/data/site.ts) validates and loads them at build time.

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:4321/ (admin at /keystatic)
npm run build    # build to dist/client (assets) and dist/server (Cloudflare Worker)
npm run check    # Astro/TypeScript diagnostics
```

All public metadata (`llms.txt`, `llms-full.txt`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`) lives in `public/` and is copied verbatim into the build.

### Editing Content

Open `/keystatic` on a running site and sign in with Keystatic Cloud. The Cloud project is read from `PUBLIC_KEYSTATIC_CLOUD_PROJECT` (`team/project`); set it in the build environment and locally in `.env`. Changes are committed to this repository through Keystatic Cloud's GitHub App. The YAML files under `src/content/` can also be edited directly — the build fails with a field-level error if a required value is missing or an icon is unknown.

### Deployment

Because the CMS admin is authenticated and server-rendered, the site now builds as a Cloudflare Worker with static assets:

```bash
npm run build
npx wrangler deploy --config dist/server/wrangler.json
```

The generated config serves `dist/client` through the `ASSETS` binding, provisions the `SESSION` KV namespace on deploy, and declares the `IMAGES` binding. The Cloudflare custom domain for `link.eimlab.org` must point at this Worker. The shared Pages deployment in `.github/workflows/ci-cd.yml` still targets a static `dist/` directory and is not compatible with this layout; do not publish this branch to production until the Worker deploy and domain cutover are done. Serving `dist/client` alone still works for the public page but returns 404 for `/keystatic`.

---

## Community & Contributing

We are committed to fostering an open, welcoming, and harassment-free environment for all researchers, developers, and contributors. All participants and team members are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

For contribution workflows, git branching standards, and Pull Request guidelines, please refer to our [Contributing Guide](CONTRIBUTING.md).

To report security vulnerabilities responsibly, please review our [Security Policy](SECURITY.md).

For concerns or incident reports, please contact the project team or laboratory administration at [`lab@eimlab.org`](mailto:lab@eimlab.org).

---

## License & Ownership

Copyright (c) 2026 **Enterprise Infrastructure Management (EIM) Research Laboratory**, Telkom University.  
**All Rights Reserved.**

This repository, its source code, website design, assets, and documentation are proprietary and confidential to Enterprise Infrastructure Management (EIM) Research Laboratory. Unauthorized copying, modification, distribution, public display, or re-hosting is strictly prohibited without prior written consent. See [LICENSE](LICENSE) for full terms.
