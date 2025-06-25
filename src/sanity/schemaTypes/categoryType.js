import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short description for category archive pages.',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Custom <title> tag for SEO (defaults to category name).',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Meta description for SEO and social previews (~155 chars).',
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social sharing previews (1200x630 recommended).',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for SEO and screen readers.',
          validation: Rule => Rule.required().error('Alt text is required for OG image.'),
        }),
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Optional banner or visual header for the category page.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the cover image content for SEO and accessibility.',
          validation: Rule => Rule.required().error('Alt text is required for cover image.'),
        }),
      ],
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      description: 'Optional manual override for sitemap last modified date.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'coverImage',
    },
  },
})
