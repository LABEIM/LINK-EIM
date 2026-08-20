/**
 * =========================================================================
 * Coming Soon & Maintenance Web Hub - Configuration
 * =========================================================================
 *
 * This configuration file powers the Central Coming Soon & Maintenance Hub
 * for Enterprise Infrastructure Management (EIM) Research Laboratory.
 *
 * Features Supported:
 * 1. Global / Standalone default configuration (used when no site query is given).
 * 2. Per-Site Custom Profiles (CONFIG.sites) selected via `?site=<slug>` or subdomain.
 * 3. Mode Presets (CONFIG.modes) selected via `?mode=maintenance` or `?mode=comingsoon`.
 * 4. Bilingual ({ en, id }) or plain string format for all text fields.
 *
 * =========================================================================
 */

const CONFIG = {
    // ---------------------------------------------------------------------
    // 1. Language & Internationalization (i18n) Settings
    // ---------------------------------------------------------------------
    i18n: {
        // [CONFIG] Enable (true) or disable (false) multi-language support
        enabled: true,

        // [CONFIG] Default language for first-time visitors: "en" | "id" | "system"
        defaultLanguage: "system",

        // [CONFIG] Show (true) or hide (false) the EN/ID language switcher in header
        showSwitcher: true,

        // [CONFIG] Supported language definitions
        languages: [
            { code: "en", label: "EN", title: "English" },
            { code: "id", label: "ID", title: "Bahasa Indonesia" }
        ]
    },

    // ---------------------------------------------------------------------
    // 2. Default Meta & SEO Settings
    // ---------------------------------------------------------------------
    meta: {
        // Browser tab title
        title: {
            en: "EIM Lab — Coming Soon",
            id: "EIM Lab — Segera Hadir"
        },

        // Search engine description shown on Google / preview cards
        description: {
            en: "Enterprise Infrastructure Management Research Laboratory - New web experience coming soon.",
            id: "Laboratorium Riset Enterprise Infrastructure Management - Pengalaman web baru segera hadir."
        },

        // Browser tab icon (URL or relative path)
        favicon: "https://eimlab.org/assets/brand/eim-favicon.png",

        // Social media link preview image (Open Graph & Twitter card)
        ogImage: "https://eimlab.org/assets/brand/eim-logo-horizontal.png",
    },

    // ---------------------------------------------------------------------
    // 3. Branding & Logo Settings
    // ---------------------------------------------------------------------
    branding: {
        logo: {
            // Main logo image URL or relative path
            src: "https://eimlab.org/assets/brand/eim-logo-horizontal.png",

            // Dark-mode specific logo
            srcDark: "https://eimlab.org/assets/email/logo-white.png",

            // Light-mode specific logo
            srcLight: "https://eimlab.org/assets/brand/eim-logo-horizontal.png",

            // Accessible description for screen readers and SEO
            alt: {
                en: "EIM Lab Logo",
                id: "Logo EIM Lab"
            },

            // URL when user clicks the logo
            href: "https://eimlab.org",

            // Set to true for square icon box (w-10 h-10), or false for wide horizontal logos
            useContainer: false,

            // SVG markup rendered if the logo image fails to load
            fallbackSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>`,
        },

        theme: {
            // Initial theme for first-time visitors: "system" | "dark" | "light"
            defaultMode: "system",

            // Show (true) or hide (false) the Sun/Moon toggle button in header
            showThemeToggle: true,
        }
    },

    // ---------------------------------------------------------------------
    // 4. Header Action Links (Top-Right Controls)
    // ---------------------------------------------------------------------
    headerLinks: {
        enabled: true,
        items: [
            {
                enabled: true,
                label: "GitHub",
                ariaLabel: {
                    en: "EIM Lab GitHub Organization",
                    id: "Organisasi GitHub EIM Lab"
                },
                href: "https://github.com/LABEIM",
                icon: "fa-brands fa-github",
                external: true
            }
        ]
    },

    // ---------------------------------------------------------------------
    // 5. Hero / Main Content
    // ---------------------------------------------------------------------
    content: {
        // Main headline
        headline: {
            en: "Something new is coming soon.",
            id: "Sesuatu yang baru akan segera hadir."
        },

        // Subheading description
        description: {
            en: "We are currently crafting a new web experience for EIM Lab research. Stay tuned for updates.",
            id: "Kami sedang membangun pengalaman web baru untuk riset EIM Lab. Nantikan pembaruan selanjutnya."
        },

        // Optional Countdown / Estimated Time Indicator
        countdown: {
            enabled: false,
            targetDate: "2026-09-01T00:00:00+07:00", // ISO-8601 format
            label: {
                en: "Estimated Launch",
                id: "Estimasi Peluncuran"
            },
            labels: {
                days: { en: "Days", id: "Hari" },
                hours: { en: "Hours", id: "Jam" },
                minutes: { en: "Minutes", id: "Menit" },
                seconds: { en: "Seconds", id: "Detik" }
            },
            expiredText: {
                en: "We are currently putting on the finishing touches. Live very soon!",
                id: "Kami sedang melakukan tahap penyelesaian. Segera hadir!"
            }
        },

        // Optional Call-to-Action button
        cta: {
            enabled: false,
            text: {
                en: "Get in Touch",
                id: "Hubungi Kami"
            },
            href: "mailto:lab@eimlab.org",
            icon: "fa-solid fa-arrow-right",
            external: false
        }
    },

    // ---------------------------------------------------------------------
    // 6. Footer Information
    // ---------------------------------------------------------------------
    footer: {
        copyright: {
            en: "Copyright © 2026 Enterprise Infrastructure Management Research Laboratory.",
            id: "Hak Cipta © 2026 Enterprise Infrastructure Management Research Laboratory."
        },
        address: {
            en: "TULT Building 8th Floor, Room TULT.08.09, Telkom University, Bandung, Indonesia",
            id: "Gedung TULT Lantai 8, Ruang TULT.08.09, Telkom University, Bandung, Indonesia"
        },
        quickLinks: [
            {
                label: {
                    en: "Lab Website",
                    id: "Website Lab"
                },
                href: "https://eimlab.org",
                external: true
            },
            {
                label: {
                    en: "Contact Us",
                    id: "Hubungi Kami"
                },
                href: "mailto:lab@eimlab.org",
                external: false
            }
        ],
        socialLinks: [
            {
                platform: "GitHub",
                ariaLabel: {
                    en: "EIM Lab GitHub Organization",
                    id: "Organisasi GitHub EIM Lab"
                },
                href: "https://github.com/LABEIM",
                icon: "fa-brands fa-github"
            },
            {
                platform: "Instagram",
                ariaLabel: {
                    en: "EIM Lab Instagram Profile",
                    id: "Profil Instagram EIM Lab"
                },
                href: "https://www.instagram.com/eimresearchlab/",
                icon: "fa-brands fa-instagram"
            },
            {
                platform: "LinkedIn",
                ariaLabel: {
                    en: "EIM Lab LinkedIn Company Page",
                    id: "Halaman LinkedIn EIM Lab"
                },
                href: "https://www.linkedin.com/company/keprofesian-enterprise-infrastructure-management-eim/",
                icon: "fa-brands fa-linkedin"
            }
        ]
    },

    // ---------------------------------------------------------------------
    // 7. Mode Presets (Coming Soon vs Maintenance Mode)
    // ---------------------------------------------------------------------
    modes: {
        maintenance: {
            meta: {
                title: {
                    en: "Maintenance — EIM Lab",
                    id: "Pemeliharaan — EIM Lab"
                },
                description: {
                    en: "Our systems are undergoing maintenance. Services will be restored shortly.",
                    id: "Sistem kami sedang dalam pemeliharaan. Layanan akan segera dipulihkan."
                }
            },
            content: {
                headline: {
                    en: "Maintenance in Progress",
                    id: "Pemeliharaan Sistem Sedang Berlangsung"
                },
                description: {
                    en: "We are currently performing routine upgrades, performance optimizations, and security updates.",
                    id: "Kami sedang melakukan pembaruan rutin, peningkatan performa, dan pembaruan keamanan."
                },
                countdown: {
                    label: {
                        en: "Estimated Completion",
                        id: "Estimasi Selesai"
                    }
                }
            }
        },
        comingsoon: {
            // Default coming soon settings match the base CONFIG
        }
    },

    // ---------------------------------------------------------------------
    // 8. Per-Site Custom Profiles Registry
    // ---------------------------------------------------------------------
    // Define project-specific overrides here.
    // Matched dynamically via URL query parameter `?site=<slug>` or subdomain.
    // Each profile only needs to specify what is UNIQUE to that project.
    // ---------------------------------------------------------------------
    sites: {
        "studygroup": {
            meta: {
                title: {
                    en: "EIM Lab — Study Group | Coming Soon",
                    id: "EIM Lab — Study Group | Segera Hadir"
                },
                description: {
                    en: "Enterprise Infrastructure Management Research Laboratory - Study Group coming soon.",
                    id: "Laboratorium Riset Enterprise Infrastructure Management - Study Group Segera Hadir."
                }
            },
            content: {
                headline: {
                    en: "Study Group is coming soon",
                    id: "Study Group Segera Hadir"
                },
                description: {
                    en: "Study Group for Enterprise Infrastructure Management Research Laboratory.",
                    id: "Study Group untuk Laboratorium Riset Enterprise Infrastructure Management."
                },
                countdown: {
                    enabled: false
                },
                cta: {
                    enabled: false
                }
            },
            headerLinks: {
                enabled: true,
                items: [
                    {
                        enabled: true,
                        label: "GitHub",
                        ariaLabel: {
                            en: "Study Group GitHub Repository",
                            id: "Repositori GitHub Study Group"
                        },
                        href: "https://github.com/LABEIM/SG-EIM",
                        icon: "fa-brands fa-github",
                        external: true
                    }
                ]
            }
        },

        "link": {
            meta: {
                title: {
                    en: "EIM Lab — Links | Coming Soon",
                    id: "EIM Lab — Portal Link | Segera Hadir"
                },
                description: {
                    en: "Enterprise Infrastructure Management Research Laboratory — Official Links Coming Soon.",
                    id: "Laboratorium Riset Enterprise Infrastructure Management — Portal Link Segera Hadir."
                }
            },
            content: {
                headline: {
                    en: "Official Links is coming soon",
                    id: "Portal Link Segera Hadir"
                },
                description: {
                    en: "Official Links for Enterprise Infrastructure Management Research Laboratory.",
                    id: "Portal Link untuk Laboratorium Riset Enterprise Infrastructure Management."
                },
                countdown: {
                    enabled: false
                },
                cta: {
                    enabled: false
                }
            },
            headerLinks: {
                enabled: true,
                items: [
                    {
                        enabled: true,
                        label: "GitHub",
                        ariaLabel: {
                            en: "LINK-EIM GitHub Repository",
                            id: "Repositori GitHub LINK-EIM"
                        },
                        href: "https://github.com/LABEIM/LINK-EIM",
                        icon: "fa-brands fa-github",
                        external: true
                    }
                ]
            }
        },

        "kuliahumum": {
            meta: {
                title: {
                    en: "EIM Lab — Public Lecture | Coming Soon",
                    id: "EIM Lab — Kuliah Umum | Segera Hadir"
                },
                description: {
                    en: "Enterprise Infrastructure Management Research Laboratory - Public Lecture coming soon.",
                    id: "Laboratorium Riset Enterprise Infrastructure Management - Kuliah Umum Segera Hadir."
                }
            },
            content: {
                headline: {
                    en: "Public Lecture is coming soon",
                    id: "Kuliah Umum Segera Hadir"
                },
                description: {
                    en: "Public Lecture for Enterprise Infrastructure Management Research Laboratory.",
                    id: "Kuliah Umum untuk Laboratorium Riset Enterprise Infrastructure Management."
                },
                countdown: {
                    enabled: false
                },
                cta: {
                    enabled: false
                }
            },
            headerLinks: {
                enabled: true,
                items: [
                    {
                        enabled: true,
                        label: "GitHub",
                        ariaLabel: {
                            en: "Public Lecture GitHub Repository",
                            id: "Repositori GitHub Kuliah Umum"
                        },
                        href: "https://github.com/LABEIM/KU-EIM",
                        icon: "fa-brands fa-github",
                        external: true
                    }
                ]
            }
        },

        // -----------------------------------------------------------------
        // [EXAMPLE / TEST PROFILES]
        // The profiles below ('smart-campus', 'sensor-net') are standard
        // example and test fixtures referenced across SETUP.md, README.md,
        // AGENTS.md, and local verification tests (?site=smart-campus).
        // DO NOT DELETE to prevent broken test links or documentation drift.
        // -----------------------------------------------------------------
        "smart-campus": {
            meta: {
                title: {
                    en: "EIM Lab — Smart Campus | Coming Soon",
                    id: "EIM Lab — Smart Campus | Segera Hadir"
                },
                description: {
                    en: "Enterprise Infrastructure Management Research Laboratory - Smart Campus IoT platform coming soon.",
                    id: "Laboratorium Riset Enterprise Infrastructure Management - Platform Smart Campus IoT Segera Hadir."
                }
            },
            content: {
                headline: {
                    en: "Smart Campus IoT is coming soon",
                    id: "Smart Campus IoT Segera Hadir"
                },
                description: {
                    en: "Next-generation IoT infrastructure and smart telemetry management for Telkom University campus.",
                    id: "Infrastruktur IoT generasi berikutnya dan manajemen telemetri cerdas untuk kampus Telkom University."
                },
                countdown: {
                    enabled: false
                },
                cta: {
                    enabled: false
                }
            },
            headerLinks: {
                enabled: true,
                items: [
                    {
                        enabled: true,
                        label: "GitHub",
                        ariaLabel: {
                            en: "Smart Campus GitHub Repository",
                            id: "Repositori GitHub Smart Campus"
                        },
                        href: "https://github.com/LABEIM/SmartCampus",
                        icon: "fa-brands fa-github",
                        external: true
                    }
                ]
            }
        },

        "sensor-net": {
            meta: {
                title: {
                    en: "EIM Lab — Sensor Network | Coming Soon",
                    id: "EIM Lab — Jaringan Sensor | Segera Hadir"
                },
                description: {
                    en: "Enterprise Infrastructure Management Research Laboratory - Wireless Sensor Network coming soon.",
                    id: "Laboratorium Riset Enterprise Infrastructure Management - Jaringan Sensor Nirkabel Segera Hadir."
                }
            },
            content: {
                headline: {
                    en: "Sensor Network is coming soon",
                    id: "Jaringan Sensor Segera Hadir"
                },
                description: {
                    en: "High-density wireless sensor mesh network research and real-time environmental telemetry.",
                    id: "Riset jaringan sensor nirkabel berdensitas tinggi dan telemetri lingkungan waktu nyata."
                },
                countdown: {
                    enabled: false
                },
                cta: {
                    enabled: false
                }
            },
            headerLinks: {
                enabled: true,
                items: [
                    {
                        enabled: true,
                        label: "GitHub",
                        ariaLabel: {
                            en: "Sensor Network GitHub Repository",
                            id: "Repositori GitHub Jaringan Sensor"
                        },
                        href: "https://github.com/LABEIM/SensorNet",
                        icon: "fa-brands fa-github",
                        external: true
                    }
                ]
            }
        }
    },

    // ---------------------------------------------------------------------
    // 9. Dynamic Resolver Helper
    // ---------------------------------------------------------------------
    /**
     * Resolves the active configuration by deeply merging:
     * 1. Global Default Config
     * 2. Active Mode Overrides (?mode=maintenance or ?mode=comingsoon)
     * 3. Active Site Profile (?site=<slug> or matched hostname)
     *
     * @param {string|URLSearchParams} [search] Optional search string or URLSearchParams
     * @returns {object} Fully merged configuration object
     */
    getResolvedConfig: function (search) {
        // Deep clone helper
        function deepClone(obj) {
            if (obj === null || typeof obj !== "object") return obj;
            if (Array.isArray(obj)) return obj.map(deepClone);
            const copy = {};
            for (const key of Object.keys(obj)) {
                if (key !== "sites" && key !== "modes" && key !== "getResolvedConfig") {
                    copy[key] = deepClone(obj[key]);
                }
            }
            return copy;
        }

        // Deep merge helper (source into target)
        function deepMerge(target, source) {
            if (!source || typeof source !== "object") return target;
            for (const key of Object.keys(source)) {
                const sVal = source[key];
                if (sVal === undefined) continue;

                if (sVal !== null && typeof sVal === "object" && !Array.isArray(sVal)) {
                    if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key])) {
                        target[key] = {};
                    }
                    deepMerge(target[key], sVal);
                } else if (Array.isArray(sVal)) {
                    target[key] = deepClone(sVal);
                } else {
                    target[key] = sVal;
                }
            }
            return target;
        }

        // 1. Start with base clone
        const resolved = deepClone(this);

        // 2. Parse search parameters & hostname
        let params = null;
        let hostname = "";
        if (typeof window !== "undefined") {
            params = search instanceof URLSearchParams ? search : new URLSearchParams(search !== undefined ? search : window.location.search);
            hostname = (window.location.hostname || "").toLowerCase();
        } else if (search) {
            params = search instanceof URLSearchParams ? search : new URLSearchParams(search);
        }

        const siteParam = params ? (params.get("site") || "").toLowerCase().trim() : "";
        const modeParam = params ? (params.get("mode") || "").toLowerCase().trim() : "";

        // 3. Apply mode overrides (e.g. maintenance)
        if (modeParam && this.modes && this.modes[modeParam]) {
            deepMerge(resolved, this.modes[modeParam]);
            resolved._activeMode = modeParam;
        } else {
            resolved._activeMode = "comingsoon";
        }

        // 4. Determine matching site profile
        let matchedSiteSlug = "";
        if (siteParam && this.sites && this.sites[siteParam]) {
            matchedSiteSlug = siteParam;
        } else if (hostname && this.sites) {
            const subdomain = hostname.split(".")[0];
            if (this.sites[subdomain]) {
                matchedSiteSlug = subdomain;
            } else if (this.sites[hostname]) {
                matchedSiteSlug = hostname;
            }
        }

        // 5. Apply site profile overrides
        if (matchedSiteSlug && this.sites[matchedSiteSlug]) {
            deepMerge(resolved, this.sites[matchedSiteSlug]);
            resolved._activeSite = matchedSiteSlug;
        } else {
            resolved._activeSite = siteParam || "default";
        }

        return resolved;
    }
};

// Expose CONFIG globally
if (typeof window !== "undefined") {
    window.CONFIG = CONFIG;
}

// Support CommonJS export for testing/Node environments
if (typeof module !== "undefined" && module.exports) {
    module.exports = CONFIG;
}
