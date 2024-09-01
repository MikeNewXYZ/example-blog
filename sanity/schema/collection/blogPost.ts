import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

const blogPostCollection = defineType({
  title: 'Blog Post',
  name: 'blogPostCollection',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    defineField({
      title: 'Header Image',
      name: 'headerImage',
      type: 'image',
      validation: (rule) => rule.required().error('The header image is required.'),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      hidden: ({document}) => !document?.title,
      validation: (rule) => rule.required().error('The slug is required.'),
      options: {
        source: 'title',
      },
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().error('The title is required.'),
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      validation: (rule) => rule.required().error('The body is required.'),
    }),
  ],
})

export default blogPostCollection
