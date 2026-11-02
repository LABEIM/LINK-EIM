/**
 * Build-time content loader for the Keystatic-managed YAML in `src/content/`.
 *
 * The YAML is imported with Vite's `?raw` glob so the build never touches the
 * filesystem at runtime (Cloudflare Workers has none). Keystatic validates the
 * shapes in its admin UI; these guards keep hand-edited files from failing
 * silently at build time.
 */

import { parse } from 'yaml';
import { linkIcons, type LinkIcon } from './icons';
import siteSource from '../content/site.yaml?raw';

export type { IconName } from './icons';

export interface LinkItem {
  label: string;
  description?: string;
  href: string;
  icon: LinkIcon;
}

export interface LinkGroup {
  title: string;
  links: LinkItem[];
}

export interface SiteSettings {
  name: string;
  fullName: string;
  tagline: string;
  institution: string;
  faculty: string;
  url: string;
  labUrl: string;
  email: string;
  address: string;
  hours: string;
  socials: {
    instagram: string;
    linkedin: string;
    github: string;
  };
  status: {
    label: string;
    href: string;
  };
  featuredLink: {
    label: string;
    href: string;
    icon: LinkIcon;
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Keystatic content error: ${field} must be a non-empty string`);
  }
  return value;
}

function readRecord(value: unknown, field: string): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error(`Keystatic content error: ${field} must be a mapping`);
  }
  return value;
}

function readIcon(value: unknown, field: string): LinkIcon {
  const icon = readString(value, field);
  if (!linkIcons.has(icon)) {
    throw new Error(`Keystatic content error: ${field} has unknown icon "${icon}"`);
  }
  return icon as LinkIcon;
}

function parseSite(source: string): SiteSettings {
  const data = readRecord(parse(source), 'src/content/site.yaml');
  const socials = readRecord(data.socials, 'socials');
  const status = readRecord(data.status, 'status');
  const featuredLink = readRecord(data.featuredLink, 'featuredLink');

  return {
    name: readString(data.name, 'name'),
    fullName: readString(data.fullName, 'fullName'),
    tagline: readString(data.tagline, 'tagline'),
    institution: readString(data.institution, 'institution'),
    faculty: readString(data.faculty, 'faculty'),
    url: readString(data.url, 'url'),
    labUrl: readString(data.labUrl, 'labUrl'),
    email: readString(data.email, 'email'),
    address: readString(data.address, 'address'),
    hours: readString(data.hours, 'hours'),
    socials: {
      instagram: readString(socials.instagram, 'socials.instagram'),
      linkedin: readString(socials.linkedin, 'socials.linkedin'),
      github: readString(socials.github, 'socials.github'),
    },
    status: {
      label: readString(status.label, 'status.label'),
      href: readString(status.href, 'status.href'),
    },
    featuredLink: {
      label: readString(featuredLink.label, 'featuredLink.label'),
      href: readString(featuredLink.href, 'featuredLink.href'),
      icon: readIcon(featuredLink.icon, 'featuredLink.icon'),
    },
  };
}

function parseLink(entry: unknown, field: string): LinkItem {
  const link = readRecord(entry, field);
  const description =
    typeof link.description === 'string' && link.description.trim() !== ''
      ? link.description
      : undefined;

  return {
    label: readString(link.label, `${field}.label`),
    ...(description ? { description } : {}),
    href: readString(link.href, `${field}.href`),
    icon: readIcon(link.icon, `${field}.icon`),
  };
}

function parseGroup(source: string, path: string): LinkGroup & { order: number } {
  const data = readRecord(parse(source), path);

  if (typeof data.order !== 'number' || !Number.isFinite(data.order)) {
    throw new Error(`Keystatic content error: ${path} order must be a number`);
  }
  if (!Array.isArray(data.links) || data.links.length === 0) {
    throw new Error(`Keystatic content error: ${path} links must be a non-empty list`);
  }

  return {
    title: readString(data.title, `${path} title`),
    order: data.order,
    links: data.links.map((entry, index) => parseLink(entry, `${path} link ${index + 1}`)),
  };
}

const groupSources = import.meta.glob<string>('../content/groups/*.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const site = parseSite(siteSource);

export const linkGroups: LinkGroup[] = Object.entries(groupSources)
  .map(([path, source]) => parseGroup(source, path))
  .sort((a, b) => a.order - b.order)
  .map(({ order: _order, ...group }) => group);
