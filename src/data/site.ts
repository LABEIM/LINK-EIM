/**
 * Single source of truth for the link hub.
 *
 * Keystatic-friendly shape: plain, serialisable objects and arrays — no functions,
 * no imports. Swap this module for `keystatic` collections later without touching
 * the page template.
 */

export type IconName =
  | 'arrow-up-right'
  | 'book-open'
  | 'calendar'
  | 'clipboard-check'
  | 'file-text'
  | 'flask-conical'
  | 'github'
  | 'globe'
  | 'graduation-cap'
  | 'info'
  | 'instagram'
  | 'linkedin'
  | 'mail'
  | 'map-pin'
  | 'newspaper'
  | 'users';

export interface LinkItem {
  label: string;
  description?: string;
  href: string;
  icon: IconName;
}

export interface LinkGroup {
  title: string;
  links: LinkItem[];
}

export const site = {
  name: 'EIM Lab',
  fullName: 'Enterprise Infrastructure Management',
  tagline:
    'Research lab at Telkom University for enterprise networks, cybersecurity, cloud, and enterprise systems.',
  institution: 'Telkom University',
  faculty: 'S1 Information Systems, School of Industrial Engineering (FRI)',
  url: 'https://link.eimlab.org',
  labUrl: 'https://eimlab.org',
  email: 'lab@eimlab.org',
  address: 'Gedung TULT, 8th Floor, Room TULT.08.09, Bandung, Indonesia',
  hours: 'Monday–Friday, 08.00–17.00 WIB',
  socials: {
    instagram: 'https://www.instagram.com/eimresearchlab/',
    linkedin:
      'https://www.linkedin.com/company/keprofesian-enterprise-infrastructure-management-eim/',
    github: 'https://github.com/LABEIM',
  },
  status: {
    label: 'Assistant Recruitment Open',
    href: 'https://eimlab.org/registration',
  },
  featuredLink: {
    label: 'Visit the lab website',
    href: 'https://eimlab.org',
    icon: 'globe',
  } satisfies LinkItem,
};

export const linkGroups: LinkGroup[] = [
  {
    title: 'Academics & Practicum',
    links: [
      {
        label: 'Practicum & Event Schedule',
        description: 'Sessions, workshops, and events',
        href: 'https://eimlab.org/event',
        icon: 'calendar',
      },
      {
        label: 'Learning Modules',
        description: 'Materials and lab repositories',
        href: 'https://github.com/LABEIM',
        icon: 'book-open',
      },
      {
        label: 'Academic Guide',
        description: 'Lab handbook and practicum overview',
        href: 'https://eimlab.org/about',
        icon: 'file-text',
      },
    ],
  },
  {
    title: 'Research & Publications',
    links: [
      {
        label: 'Research Divisions',
        description: 'Networks, security, and cloud',
        href: 'https://eimlab.org/structure',
        icon: 'flask-conical',
      },
      {
        label: 'News & Publications',
        description: 'Research output and announcements',
        href: 'https://eimlab.org/news',
        icon: 'newspaper',
      },
      {
        label: 'GitHub Organization',
        description: 'Open-source lab projects',
        href: 'https://github.com/LABEIM',
        icon: 'github',
      },
    ],
  },
  {
    title: 'Recruitment & Team',
    links: [
      {
        label: 'Assistant Recruitment',
        description: 'Join as a research assistant',
        href: 'https://eimlab.org/registration',
        icon: 'clipboard-check',
      },
      {
        label: 'Meet the Team',
        description: 'Faculty, researchers, and members',
        href: 'https://eimlab.org/structure',
        icon: 'users',
      },
      {
        label: 'About EIM Lab',
        description: 'Vision, mission, and facilities',
        href: 'https://eimlab.org/about',
        icon: 'info',
      },
    ],
  },
  {
    title: 'Contact & Socials',
    links: [
      {
        label: 'Instagram',
        description: '@eimresearchlab',
        href: site.socials.instagram,
        icon: 'instagram',
      },
      {
        label: 'LinkedIn',
        description: 'EIM Research Laboratory',
        href: site.socials.linkedin,
        icon: 'linkedin',
      },
      {
        label: 'Email',
        description: site.email,
        href: `mailto:${site.email}`,
        icon: 'mail',
      },
      {
        label: 'Location Map',
        description: 'Gedung TULT, Bandung',
        href: 'https://maps.google.com/?q=Gedung+TULT+Telkom+University+Bandung',
        icon: 'map-pin',
      },
    ],
  },
];
