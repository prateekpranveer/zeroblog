export const getAllCategories = `
  *[_type == "category" && defined(slug.current)] | order(name asc){
    _id,
    name,
    slug
  }
`;

export const getAllTags = `
  *[_type == "tag" && defined(slug.current)] | order(name asc){
    _id,
    name,
    slug
  }
`;

export const getRecentPosts = `
  *[_type == "post"] | order(publishedAt desc)[0...6]{
    _id,
    title,
    slug,
    publishedAt,
    mainImage{
      asset->{
        url
      }
    },
    author->{
      name,
      slug
    }
  }
`;
