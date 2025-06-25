import {
  getAllTagSlugs,
  getTagDetails,
  getPostsByTag,
  getAllCategorySlugs,
  getCategoryDetails,
  getPostsByCategory,
  getAllAuthorSlugs,
  getAuthorDetails,
  getPostsByAuthor,
} from "./queries/queries";
import { allPostSlugsQuery, postQuery } from "./queries/queryForPostPage";
import { searchPostsQuery } from "./queries/searchQuery";
import { getPostsByCategorySix, getPostsByTagSix } from "./queries/queriesForHomePage";
import { getFeaturedPost } from "./queries/queriesForHomePage";
import { getAllCategories } from "./queries/queriesForAllPages";
import { getAllTags } from "./queries/queriesForAllPages";
import { getRecentPosts } from "./queries/queriesForAllPages";
import { client } from "@/src/sanity/lib/client";
//tag/slug
export const fetchAllTagSlugs = async () => {
  return await client.fetch(getAllTagSlugs);
};

export const fetchTagDetails = async (slug) => {
  return await client.fetch(getTagDetails, { slug });
};

export const fetchPostsByTag = async (slug) => {
  return await client.fetch(getPostsByTag, { slug });
};

// category/slug
export const fetchAllCategorySlugs = async () => {
  return await client.fetch(getAllCategorySlugs);
};

export const fetchCategoryDetails = async (slug) => {
  return await client.fetch(getCategoryDetails, { slug });
};

export const fetchPostsByCategory = async (slug) => {
  return await client.fetch(getPostsByCategory, { slug });
};

// author/slug
export const fetchAllAuthorSlugs = async () => {
  return await client.fetch(getAllAuthorSlugs);
};

export const fetchAuthorDetails = async (slug) => {
  return await client.fetch(getAuthorDetails, { slug });
};

export const fetchPostsByAuthor = async (slug) => {
  return await client.fetch(getPostsByAuthor, { slug });
};

// for layout (nav, sidebar, recentinsidebar)
export const fetchAllCategories = async () => {
  return await client.fetch(getAllCategories);
};

export const fetchAllTags = async () => {
  return await client.fetch(getAllTags);
};

export const fetchRecentPosts = async () => {
  return await client.fetch(getRecentPosts);
};

// for homepage
export const fetchPostsByCategorySix = async (slug) => {
  return await client.fetch(getPostsByCategorySix, { slug });
};

export const fetchPostsByTagSix = async (slug) => {
  return await client.fetch(getPostsByTagSix, { slug });
};

export const fetchFeaturedPost = async () => {
  return await client.fetch(getFeaturedPost);
};

// search query functions
export const fetchSearchedPosts = async (keyword) => {
  if (!keyword || keyword.trim() === "") return [];

  const queryParam = `${keyword.trim()}*`; // fuzzy match
  return await client.fetch(searchPostsQuery, { query: queryParam });
};

// get main post
export async function fetchPostBySlug(slug) {
  return await client.fetch(postQuery, { slug })
}

export async function fetchAllPostSlugs () {
    return await client.fetch(allPostSlugsQuery)
}
