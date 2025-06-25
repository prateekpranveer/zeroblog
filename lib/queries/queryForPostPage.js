export const postQuery = `
*[_type == "post" && slug.current == $slug][0]{
  _id,
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
  },

  "comments": *[
    _type == "comment" &&
    post._ref == ^._id &&
    !defined(parent) &&
    approved == true
  ] | order(_createdAt asc) {
    _id,
    name,
    email,
    comment,
    _createdAt,
    
    "ownerReply": *[
      _type == "comment" &&
      parent._ref == ^._id &&
      approved == true &&
      isOwnerReply == true
    ][0]{
      _id,
      name,
      comment,
      _createdAt
    }
  }
}
`;


export const allPostSlugsQuery = `
  *[_type == "post" && defined(slug.current)][]{
    "slug": slug.current
  }
`;
