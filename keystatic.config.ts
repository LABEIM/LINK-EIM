import { collection, config, fields, singleton } from '@keystatic/core';
import { iconOptions, noneIconValue, socialLabels, socialOptions } from './src/data/icons';

/**
 * Keystatic Cloud storage: content is committed to the GitHub repository through
 * the Keystatic Cloud GitHub App. Create the project at https://keystatic.cloud,
 * then set PUBLIC_KEYSTATIC_CLOUD_PROJECT (team/project) or edit the fallback.
 */
const cloudProject = import.meta.env?.PUBLIC_KEYSTATIC_CLOUD_PROJECT || 'eimlab/link-eim';

export default config({
  storage: { kind: 'cloud' },
  cloud: { project: cloudProject },
  ui: {
    brand: { name: 'EIM Lab Links' },
  },
  singletons: {
    site: singleton({
      label: 'Site settings',
      path: 'src/content/site',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({
          label: 'Display name',
          validation: { isRequired: true },
        }),
        fullName: fields.text({
          label: 'Full lab name',
          validation: { isRequired: true },
        }),
        tagline: fields.text({
          label: 'Tagline',
          multiline: true,
          validation: { isRequired: true },
        }),
        institution: fields.text({
          label: 'Institution',
          validation: { isRequired: true },
        }),
        faculty: fields.text({
          label: 'Faculty / department',
          validation: { isRequired: true },
        }),
        url: fields.url({
          label: 'Link hub URL',
          validation: { isRequired: true },
        }),
        labUrl: fields.url({
          label: 'Lab website URL',
          validation: { isRequired: true },
        }),
        email: fields.text({
          label: 'Contact email',
          validation: { isRequired: true },
        }),
        address: fields.text({
          label: 'Address',
          multiline: true,
          validation: { isRequired: true },
        }),
        hours: fields.text({
          label: 'Office hours',
          validation: { isRequired: true },
        }),
        socials: fields.array(
          fields.object({
            platform: fields.select({
              label: 'Platform',
              options: socialOptions,
              defaultValue: 'instagram',
            }),
            label: fields.text({
              label: 'Label',
              description:
                'Read by screen readers. Required for Custom; built-in platforms default to the platform name.',
            }),
            url: fields.text({
              label: 'Link',
              description: 'Use https://… for a web profile, or mailto:… for email.',
              validation: { isRequired: true },
            }),
            customIcon: fields.text({
              label: 'Custom SVG path',
              description:
                'Optional 24×24 path for a Custom platform. Without it the first letter is shown.',
            }),
          }),
          {
            label: 'Social links',
            description:
              'Icons under the institution line. Drag to reorder; remove all to hide the row.',
            itemLabel: (props) =>
              props.fields.label.value || socialLabels[props.fields.platform.value],
          }
        ),
        featuredLinks: fields.array(
          fields.object({
            label: fields.text({
              label: 'Label',
              validation: { isRequired: true },
            }),
            href: fields.url({
              label: 'Link',
              validation: { isRequired: true },
            }),
            icon: fields.select({
              label: 'Icon',
              options: iconOptions,
              description: 'Optional. Choose "None" to render no icon.',
              defaultValue: noneIconValue,
            }),
            customIcon: fields.text({
              label: 'Custom SVG path',
              description:
                'Only used when Icon is "Custom SVG path". Paste the d attribute of a 24×24 icon, e.g. from lucide.dev.',
            }),
          }),
          {
            label: 'Highlighted links',
            description:
              'Accent actions under the tagline. The first renders solid; the rest sit below it. Drag to reorder.',
            itemLabel: (props) => props.fields.label.value || 'Highlighted link',
          }
        ),
      },
    }),
  },
  collections: {
    groups: collection({
      label: 'Link groups',
      slugField: 'title',
      path: 'src/content/groups/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { isRequired: true },
          },
        }),
        order: fields.integer({
          label: 'Order',
          description: 'Groups render from lowest to highest.',
          defaultValue: 1,
          validation: { isRequired: true, min: 1 },
        }),
        layout: fields.select({
          label: 'Layout',
          description:
            'Horizontal scroll shows the group as swipeable image cards. Every link in a scroll group needs an image; the build rejects the group otherwise.',
          options: [
            { label: 'Vertical list', value: 'list' },
            { label: 'Horizontal scroll', value: 'scroll' },
          ],
          defaultValue: 'list',
        }),
        links: fields.array(
          fields.object({
            label: fields.text({
              label: 'Label',
              validation: { isRequired: true },
            }),
            description: fields.text({
              label: 'Description',
              multiline: true,
            }),
            href: fields.url({
              label: 'URL',
              description: 'Supports https:// links and mailto: addresses.',
              validation: { isRequired: true },
            }),
            image: fields.image({
              label: 'Image',
              description:
                'Optional 16:9 image shown above the label. Required when the group layout is Horizontal scroll.',
              directory: 'public/images/links',
              publicPath: '/images/links/',
            }),
            imageAlt: fields.text({
              label: 'Image alt text',
              description: 'Describe the image for screen readers. Required when an image is set.',
            }),
            icon: fields.select({
              label: 'Icon',
              options: iconOptions,
              description: 'Optional. Choose "None" to render no icon.',
              defaultValue: noneIconValue,
            }),
            customIcon: fields.text({
              label: 'Custom SVG path',
              description:
                'Only used when Icon is "Custom SVG path". Paste the d attribute of a 24×24 icon, e.g. from lucide.dev.',
            }),
          }),
          {
            label: 'Links',
            itemLabel: (props) => props.fields.label.value || 'Untitled link',
          }
        ),
      },
    }),
  },
});
