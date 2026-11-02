import { collection, config, fields, singleton } from '@keystatic/core';
import { iconOptions } from './src/data/icons';

/**
 * Keystatic Cloud storage: content is committed to the GitHub repository through
 * the Keystatic Cloud GitHub App. Create the project at https://keystatic.cloud,
 * then set PUBLIC_KEYSTATIC_CLOUD_PROJECT (team/project) or edit the fallback.
 */
const cloudProject = import.meta.env?.PUBLIC_KEYSTATIC_CLOUD_PROJECT || 'eim-lab/links';

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
        socials: fields.object(
          {
            instagram: fields.url({
              label: 'Instagram',
              validation: { isRequired: true },
            }),
            linkedin: fields.url({
              label: 'LinkedIn',
              validation: { isRequired: true },
            }),
            github: fields.url({
              label: 'GitHub',
              validation: { isRequired: true },
            }),
          },
          { label: 'Social profiles' }
        ),
        status: fields.object(
          {
            label: fields.text({
              label: 'Label',
              validation: { isRequired: true },
            }),
            href: fields.url({
              label: 'Link',
              validation: { isRequired: true },
            }),
          },
          { label: 'Status badge' }
        ),
        featuredLink: fields.object(
          {
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
              defaultValue: 'globe',
            }),
          },
          { label: 'Featured link' }
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
            icon: fields.select({
              label: 'Icon',
              options: iconOptions,
              defaultValue: 'globe',
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
