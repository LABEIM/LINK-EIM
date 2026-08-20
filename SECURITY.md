# Security Policy

The **Enterprise Infrastructure Management (EIM) Research Laboratory** takes the security of our infrastructure, research portals, pre-launch hubs, and open systems seriously. This Security Policy applies to **Maintain-EIM** (Central Coming Soon & Maintenance Hub) and outlines our supported versions, vulnerability reporting process, response timelines, and disclosure standards.

---

## Supported Versions

We actively provide security updates, dependency patches, and vulnerability fixes for the following branches:

| Version / Branch | Supported | Notes |
| :--- | :---: | :--- |
| `main` | :white_check_mark: | Actively monitored and deployed to production Cloudflare Pages |
| PR Previews / Preview Branches | :white_check_mark: | Validated via CI/CD pipelines before merging |
| Legacy / Deprecated Branches | :x: | Not maintained; upgrade to `main` immediately |

---

## Reporting a Vulnerability

> [!CAUTION]
> **Do not open public GitHub issues, discussions, or pull requests for suspected security vulnerabilities.**  
> Public disclosure exposes other users and lab systems before a fix can be coordinated and deployed.

If you discover a security vulnerability, please report it responsibly using one of the private channels below:

### Option 1: GitHub Private Vulnerability Reporting (Recommended)
If enabled on the repository:
1. Navigate to the [Security tab](https://github.com/LABEIM/Maintain-EIM/security) of this repository.
2. Click **Report a vulnerability** under **Private vulnerability reporting**.
3. Fill out the advisory form with complete details.

### Option 2: Email Reporting
Send an encrypted or private email directly to our security and laboratory team:
- **Lab Administration:** [lab@eimlab.org](mailto:lab@eimlab.org)
- **Subject Line:** `[SECURITY VULNERABILITY] Maintain-EIM: <Brief Description>`

---

## What to Include in Your Report

To help us investigate, triage, and remediate the issue efficiently, please include as much of the following information as possible:

1. **Vulnerability Type:** (e.g., Cross-Site Scripting (XSS), Content Security Policy bypass, URL Redirection / Header Injection, Subdomain Takeover risk, Denial of Service vector).
2. **Affected Component(s):** Specific file (`index.html`, `config.js`), edge router worker scripts, or configuration keys.
3. **Step-by-Step Reproduction:** Exact steps, URL parameters (e.g. `?site=...&mode=...`), payloads, or test scripts needed to reproduce the behavior.
4. **Proof of Concept (PoC):** Screenshots, request/response headers, HAR files, or reproducible code.
5. **Impact Assessment:** Explain the potential real-world impact (e.g., credential theft, unauthorized redirection, client-side tampering).
6. **Suggested Remediation:** Any patches or mitigation steps you recommend (optional).

---

## Response Timeline & Service Level Objectives (SLO)

We are committed to addressing security reports with urgency and transparency:

| Stage | Timeline | Description |
| :--- | :--- | :--- |
| **Acknowledgment** | **Within 24–48 hours** | We confirm receipt of your report and assign a maintainer. |
| **Initial Triage** | **Within 3 business days** | We validate reproducibility and determine severity score (CVSS). |
| **Remediation & Patching** | **7–14 business days** | A fix is engineered, peer-reviewed, and verified internally. |
| **Deployment & Release** | **Immediate upon patch** | Deployed to Cloudflare Pages & edge gateway without downtime. |
| **Public Disclosure** | **Coordinated (typically 30–90 days)** | Public advisory published in coordination with the reporter. |

---

## Scope & Guidelines

### In-Scope
- Cross-Site Scripting (XSS) or HTML injection via dynamic profile rendering or URL query parameters (`?site=`, `?lang=`, `?mode=`).
- Client-side DOM manipulation leading to unauthorized script execution or data leakage.
- Subdomain routing anomalies, open redirects, or header injection via Edge Worker logic.
- Exposed sensitive tokens, environment secrets, or private API keys committed to the repository.
- Supply-chain vulnerabilities in CDN dependencies (Lucide icons, Tailwind CDN).

### Out-of-Scope
- Denial of Service (DoS / DDoS) attacks targeting Cloudflare infrastructure or edge networks.
- Social engineering, phishing, or physical attacks targeting lab members or university staff.
- Reports from automated vulnerability scanners without a validated, reproducible Proof of Concept (PoC).
- Issues requiring physical access to a user's unlocked device or compromised browser extensions.
- Theoretical vulnerabilities without actionable exploitation paths.

---

## Security Practices in Maintain-EIM

To minimize security attack vectors, this project enforces the following architectural safeguards:

1. **Zero-Build Pure Static Architecture:** Eliminates server-side execution environments, database injection vectors, and complex runtime attack surfaces.
2. **Sanitized DOM Manipulation:** Dynamic configuration strings rendered into `index.html` utilize safe DOM property assignments (`textContent`, `innerText`, controlled `setAttribute`) rather than unescaped `innerHTML`.
3. **Strict HTTP Security Headers:** Enforced at the Cloudflare Edge Worker gateway:
   - `Content-Security-Policy (CSP)`
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
4. **Signed Commits:** All maintainer commits are cryptographically signed using GPG or SSH keys to prevent commit spoofing.
5. **Dependency Hygiene:** CDN scripts are pinned to secure, audited, and immutable distribution endpoints.

---

## Coordinated Vulnerability Disclosure & Recognition

The **EIM Research Laboratory** follows the principles of **Coordinated Vulnerability Disclosure (CVD)**:
- We ask researchers to give us reasonable time to investigate and remediate vulnerabilities before disclosing them publicly.
- In return, we pledge to communicate openly, credit researchers for their contributions (unless they prefer to remain anonymous), and avoid taking legal action against researchers acting in good faith.

### Security Hall of Fame
We deeply appreciate researchers and contributors who help keep our systems secure. Responsible disclosures will be formally credited in our GitHub Release Notes and laboratory security advisories.

---

## Contact Information

For any non-vulnerability security inquiries or questions regarding our security posture:
- **Email:** [lab@eimlab.org](mailto:lab@eimlab.org)
- **Organization Website:** [https://eimlab.org](https://eimlab.org)
- **Laboratory:** Enterprise Infrastructure Management (EIM) Research Laboratory, Telkom University
