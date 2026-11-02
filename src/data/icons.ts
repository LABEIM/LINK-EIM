/**
 * Shared icon registry for the Keystatic select field and the build-time loader.
 * Keep this list in sync with the paths available in `Icon.astro`.
 */
export const iconOptions = [
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
] as const;

export type LinkIcon = (typeof iconOptions)[number]['value'];

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

export const linkIcons: ReadonlySet<string> = new Set(iconOptions.map((option) => option.value));
