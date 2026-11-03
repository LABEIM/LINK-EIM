/**
 * Shared icon registry for the Keystatic select field and the build-time loader.
 * Keep this list in sync with the paths available in `Icon.astro`.
 */

/** Select value for an editor-supplied 24×24 SVG path. */
export const customIconValue = 'custom' as const;

/** Select value that renders no icon. */
export const noneIconValue = 'none' as const;

const iconPathPattern = /^[MmLlHhVvCcSsQqTtAaZz0-9eE.,+\-\s]+$/;

/** Accepts only SVG path data: `d` attributes cannot carry markup or handlers. */
export function isValidIconPath(value: string): boolean {
  return value.length > 0 && value.length <= 2000 && iconPathPattern.test(value);
}

export const iconOptions = [
  { label: 'None', value: noneIconValue },
  { label: 'Book', value: 'book-open' },
  { label: 'Calendar', value: 'calendar' },
  { label: 'Clipboard check', value: 'clipboard-check' },
  { label: 'Document', value: 'file-text' },
  { label: 'Flask', value: 'flask-conical' },
  { label: 'GitHub', value: 'github' },
  { label: 'Globe', value: 'globe' },
  { label: 'Graduation cap', value: 'graduation-cap' },
  { label: 'Info', value: 'info' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Email', value: 'mail' },
  { label: 'Map pin', value: 'map-pin' },
  { label: 'Newspaper', value: 'newspaper' },
  { label: 'People', value: 'users' },
  { label: 'Custom SVG path', value: customIconValue },
] as const;

export type LinkIcon = Exclude<(typeof iconOptions)[number]['value'], typeof noneIconValue>;

/** Social platforms offered by the editable Site settings row. */
export const socialOptions = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'GitHub', value: 'github' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'X', value: 'x-twitter' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Email', value: 'mail' },
  { label: 'Website', value: 'globe' },
  { label: 'Custom', value: customIconValue },
] as const;

export type SocialIcon = (typeof socialOptions)[number]['value'];

export const socialLabels: Record<SocialIcon, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  youtube: 'YouTube',
  'x-twitter': 'X',
  facebook: 'Facebook',
  mail: 'Email the lab',
  globe: 'Website',
  custom: 'Custom link',
};

export const socialIcons: ReadonlySet<string> = new Set(
  socialOptions.map((option) => option.value),
);

/** Includes the controls used by `LinkCard`, the scroller, and the share dialog. */
export type IconName =
  | LinkIcon
  | SocialIcon
  | 'arrow-up-right'
  | 'chevron-left'
  | 'chevron-right'
  | 'more-horizontal'
  | 'share'
  | 'link'
  | 'x'
  | 'message-circle';

export const linkIcons: ReadonlySet<string> = new Set(
  iconOptions.filter((option) => option.value !== noneIconValue).map((option) => option.value),
);
