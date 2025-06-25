
export const getAllTagSlugs = `
  *[_type == "tag" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

// requires slug of tag
export const getTagDetails = `
     *[_type == "tag" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    description,
    metaTitle,
    metaDescription,
    featured,
    updatedAt
  }
`

// requires slug of tag
export const getPostsByTag = `
  *[_type == "post" && references(*[_type == "tag" && slug.current == $slug]._id)] | order(publishedAt desc) {
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

export const getAllCategorySlugs = `
  *[_type == "category" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

//require category slug
export const getCategoryDetails = `
  *[_type == "category" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    description,
    metaTitle,
    metaDescription,
    featured,
    updatedAt
  }
`;


// requires category slug
export const getPostsByCategory = `
  *[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      slug
    },
    tags[]->{
      name,
      slug
    }
  }
`;
export const getAllAuthorSlugs = `
  *[_type == "author" && defined(slug.current)][]{
    "slug": slug.current
  }
`;


// requires author slug
export const getAuthorDetails = `
  *[_type == "author" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    image,
    bio,
    metaTitle,
    metaDescription,
    updatedAt
  }
`;


// requires author slug
export const getPostsByAuthor = `
  *[_type == "post" && author->slug.current == $slug] | order(publishedAt desc) {
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





