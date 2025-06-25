import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: Rule => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
        }),
      ],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Used in <title> tag for author pages. Defaults to name if empty.',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Used for SEO/snippet. Recommended ~155 characters.',
      rows: 3,
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Profiles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'platform', type: 'string', title: 'Platform'},
            {name: 'url', type: 'url', title: 'URL'},
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        }),
      ],
    }),
    defineField({
      name: 'noindex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent this author page from being indexed by search engines.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
