import { defineType, defineField } from 'sanity'

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tag Name',
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
      description: 'Short explanation of the tag, used on tag archive pages.',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title for tag page (optional override of tag name)',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO meta description for tag page (~155 characters)',
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Social sharing image for tag archive pages (1200x630 recommended)',
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
      description: 'Optional header image for tag archive pages.',
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
      initialValue: () => new Date().toISOString(),
      description: 'Manual override for sitemap last modified date.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'coverImage',
    },
  },
})
