export const searchPostsQuery = `
*[
  _type == "post" &&
  (
    title match $query ||
    excerpt match $query ||
    tags[]->name match $query ||
    categories[]->name match $query
  )
] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage {
    asset->{
      url
    },
    alt
  },
  author->{
    name,
    slug
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
