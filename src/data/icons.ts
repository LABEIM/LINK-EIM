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

/** Includes the controls used by `LinkCard`, the scroller, and the share menu. */
export type IconName =
  | LinkIcon
  | 'arrow-up-right'
  | 'chevron-left'
  | 'chevron-right'
  | 'more-horizontal'
  | 'share'
  | 'link';

export const linkIcons: ReadonlySet<string> = new Set(iconOptions.map((option) => option.value));
