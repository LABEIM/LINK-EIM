/**
 * Build-time content loader for the Keystatic-managed YAML in `src/content/`.
 *
 * The YAML is imported with Vite's `?raw` glob so the build never touches the
 * filesystem at runtime (Cloudflare Workers has none). Keystatic validates the
 * shapes in its admin UI; these guards keep hand-edited files from failing
 * silently at build time.
 */

import { parse } from 'yaml';
import {
  isValidIconPath,
  linkIcons,
  noneIconValue,
  socialIcons,
  type LinkIcon,
  type SocialIcon,
} from './icons';
import siteSource from '../content/site.yaml?raw';

export type { IconName } from './icons';

export type LinkLayout = 'list' | 'scroll';

export interface LinkImage {
  src: string;
  alt: string;
}

export interface LinkItem {
  label: string;
  description?: string;
  href: string;
  icon?: LinkIcon;
  /** 24×24 SVG path data when `icon` is `custom`. */
  customIcon?: string;
  /** Uploaded square icon image that renders instead of `icon`. */
  iconImage?: string;
  image?: LinkImage;
}

export interface LinkGroup {
  title: string;
  layout: LinkLayout;
  links: LinkItem[];
}

export interface SocialLink {
  platform: SocialIcon;
  url: string;
  /** Optional accessible-name override; required for a custom platform. */
  label?: string;
  customIcon?: string;
  iconImage?: string;
}

export interface FeaturedLink {
  label: string;
  href: string;
  icon?: LinkIcon;
  customIcon?: string;
  iconImage?: string;
}

export interface SiteSettings {
  name: string;
  fullName: string;
  /** Public path of the logo shown above the page title. */
  logo: string;
  tagline: string;
  institution: string;
  faculty: string;
  url: string;
  labUrl: string;
  email: string;
  address: string;
  hours: string;
  socials: SocialLink[];
  featuredLinks: FeaturedLink[];
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

function readIconPath(value: unknown, field: string): string | undefined {
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
    return undefined;
  }
  const path = readString(value, field);
  if (!isValidIconPath(path)) {
    throw new Error(
      `Keystatic content error: ${field} must be a 24×24 SVG path (the "d" attribute), up to 2000 characters`,
    );
  }
  return path;
}

const defaultLogo = '/images/brand/logo-icon.png';

function readLogo(value: unknown, field: string): string {
  if (value === undefined || value === null) return defaultLogo;
  if (typeof value !== 'string' || value.trim() === '') return defaultLogo;
  const src = readString(value, field);
  if (!src.startsWith('/')) {
    throw new Error(`Keystatic content error: ${field} must be a site-relative path`);
  }
  return src;
}

function readIconImage(value: unknown, field: string): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string' || value.trim() === '') return undefined;
  const src = readString(value, field);
  if (!src.startsWith('/images/icons/')) {
    throw new Error(`Keystatic content error: ${field} must be a path under /images/icons/`);
  }
  return src;
}

function readLinkIcon(
  record: Record<string, unknown>,
  field: string,
): { icon?: LinkIcon; customIcon?: string; iconImage?: string } {
  const iconImage = readIconImage(record.iconImage, `${field}.iconImage`);
  if (record.icon === undefined || record.icon === null) return { iconImage };
  if (typeof record.icon === 'string' && record.icon.trim() === '') return { iconImage };
  if (record.icon === noneIconValue) return { iconImage };
  const icon = readIcon(record.icon, `${field}.icon`);
  if (icon !== 'custom') return { icon, iconImage };

  const customIcon = readIconPath(record.customIcon, `${field}.customIcon`);
  if (!customIcon) {
    throw new Error(
      `Keystatic content error: ${field}.customIcon is required when the icon is "custom"`,
    );
  }
  return { icon, customIcon, iconImage };
}

function readSocials(value: unknown, field: string): SocialLink[] {
  if (!Array.isArray(value)) {
    throw new Error(`Keystatic content error: ${field} must be a list`);
  }
  return value.map((entry, index) => {
    const item = readRecord(entry, `${field} ${index + 1}`);
    const platform = readString(item.platform, `${field} ${index + 1}.platform`);
    if (!socialIcons.has(platform)) {
      throw new Error(
        `Keystatic content error: ${field} ${index + 1}.platform has unknown platform "${platform}"`,
      );
    }
    const label =
      typeof item.label === 'string' && item.label.trim() !== '' ? item.label : undefined;
    if (platform === 'custom' && !label) {
      throw new Error(
        `Keystatic content error: ${field} ${index + 1}.label is required for a custom platform`,
      );
    }
    const customIcon = readIconPath(item.customIcon, `${field} ${index + 1}.customIcon`);
    const iconImage = readIconImage(item.iconImage, `${field} ${index + 1}.iconImage`);
    return {
      platform: platform as SocialIcon,
      url: readString(item.url, `${field} ${index + 1}.url`),
      ...(label ? { label } : {}),
      ...(customIcon ? { customIcon } : {}),
      ...(iconImage ? { iconImage } : {}),
    };
  });
}

function readFeaturedLinks(value: unknown, field: string): FeaturedLink[] {
  if (!Array.isArray(value)) {
    throw new Error(`Keystatic content error: ${field} must be a list`);
  }
  return value.map((entry, index) => {
    const item = readRecord(entry, `${field} ${index + 1}`);
    const { icon, customIcon, iconImage } = readLinkIcon(item, `${field} ${index + 1}`);
    return {
      label: readString(item.label, `${field} ${index + 1}.label`),
      href: readString(item.href, `${field} ${index + 1}.href`),
      icon,
      ...(customIcon ? { customIcon } : {}),
      ...(iconImage ? { iconImage } : {}),
    };
  });
}

function parseSite(source: string): SiteSettings {
  const data = readRecord(parse(source), 'src/content/site.yaml');

  return {
    name: readString(data.name, 'name'),
    fullName: readString(data.fullName, 'fullName'),
    logo: readLogo(data.logo, 'logo'),
    tagline: readString(data.tagline, 'tagline'),
    institution: readString(data.institution, 'institution'),
    faculty: readString(data.faculty, 'faculty'),
    url: readString(data.url, 'url'),
    labUrl: readString(data.labUrl, 'labUrl'),
    email: readString(data.email, 'email'),
    address: readString(data.address, 'address'),
    hours: readString(data.hours, 'hours'),
    socials: readSocials(data.socials, 'socials'),
    featuredLinks: readFeaturedLinks(data.featuredLinks, 'featuredLinks'),
  };
}

function parseLink(entry: unknown, field: string): LinkItem {
  const link = readRecord(entry, field);
  const description =
    typeof link.description === 'string' && link.description.trim() !== ''
      ? link.description
      : undefined;
  const imageSrc =
    typeof link.image === 'string' && link.image.trim() !== '' ? link.image : undefined;
  const image = imageSrc
    ? { src: imageSrc, alt: readString(link.imageAlt, `${field}.imageAlt`) }
    : undefined;

  const { icon, customIcon, iconImage } = readLinkIcon(link, field);

  return {
    label: readString(link.label, `${field}.label`),
    ...(description ? { description } : {}),
    href: readString(link.href, `${field}.href`),
    icon,
    ...(customIcon ? { customIcon } : {}),
    ...(iconImage ? { iconImage } : {}),
    ...(image ? { image } : {}),
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

  const layout = data.layout ?? 'list';
  if (layout !== 'list' && layout !== 'scroll') {
    throw new Error(`Keystatic content error: ${path} layout must be "list" or "scroll"`);
  }

  const links = data.links.map((entry, index) => parseLink(entry, `${path} link ${index + 1}`));
  if (layout === 'scroll' && links.some((link) => !link.image)) {
    throw new Error(`Keystatic content error: ${path} scroll layout requires an image on every link`);
  }

  return {
    title: readString(data.title, `${path} title`),
    layout,
    order: data.order,
    links,
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
