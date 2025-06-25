// pass category-slug
export const getPostsByCategorySix = `
  *[
    _type == "post" &&
    $slug in categories[]->slug.current
  ] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage{
    alt,
    asset->{
    url
    }
    },
    author->{
      name,
      slug
    },
    categories[]->{
      name,
      slug
    }
  }
`;

// pass tag-slug
export const getPostsByTagSix = `
  *[
    _type == "post" &&
    $slug in tags[]->slug.current
  ] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage{
    alt,
    asset->{
    url
    }
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

export const getFeaturedPost = `
  *[_type == "post" && featured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage{
    alt,
    asset->{
    url
    }
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
