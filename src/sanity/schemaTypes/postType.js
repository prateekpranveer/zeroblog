import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for accessibility and SEO.',
          validation: Rule => Rule.required(),
        })
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary for previews, meta descriptions, and SEO.',
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Custom title for SEO (default is post title)',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Used for SEO and social sharing (recommended ~155 characters)',
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Used when sharing on social platforms (1200x630 recommended)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'tag' } })],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated At',
      type: 'datetime',
    }),
    defineField({
      name: 'estimatedReadTime',
      title: 'Estimated Read Time (mins)',
      type: 'number',
      description: 'Optional: improves UX for readers',
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'blockContent',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'noindex',
      title: 'No Index',
      type: 'boolean',
      description: 'Set true to prevent search engines from indexing this post',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Mark this post as featured to highlight it on the homepage or hero section.',
      initialValue: false,
      options: {
        layout: 'checkbox'
      }
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return {
        ...selection,
        subtitle: author ? `by ${author}` : '',
      }
    },
  },
})
