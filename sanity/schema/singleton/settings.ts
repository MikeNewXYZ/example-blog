import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

const settingsSingleton = defineType({
  title: 'Settings',
  name: 'settingsSingleton',
  icon: CogIcon,
  type: 'document',
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      title: 'Site Title',
      name: 'siteTitle',
      type: 'string',
      validation: (rule) => rule.required().error('The site title is required.'),
    }),
    defineField({
      title: 'Site Description',
      name: 'siteDescription',
      type: 'string',
      validation: (rule) => rule.required().error('The site description is required.'),
    }),
    defineField({
      title: 'Site Keywords',
      description: 'Separate keywords with commas (e.g., chess, play, game).',
      name: 'siteKeywords',
      type: 'string',
      validation: (rule) => rule.required().error('The site keywords is required.'),
    }),
  ],
})

export default settingsSingleton
