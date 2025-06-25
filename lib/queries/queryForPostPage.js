export const postQuery = `
*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  metaTitle,
  metaDescription,
  noindex,
  excerpt,
  publishedAt,
  updatedAt,
  estimatedReadTime,
  featured,
  body,
  
  mainImage {
    asset->{url},
    alt
  },

  ogImage {
    asset->{url}
  },

  "author": author->{
    name,
    slug,
    image {
      asset->{url}
    }
  },

  categories[]->{
    name,
    slug
  },

  tags[]->{
    name,
    slug
  }
}

`;

export const allPostSlugsQuery = `
  *[_type == "post" && defined(slug.current)][]{
    "slug": slug.current
  }
`
