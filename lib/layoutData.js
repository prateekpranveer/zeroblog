import { fetchAllCategories, fetchAllTags, fetchRecentPosts } from "@/lib/queryFunctions";

export async function getLayoutProps() {
  const [allCategories, allTags, recentPosts] = await Promise.all([
    fetchAllCategories(),
    fetchAllTags(),
    fetchRecentPosts(),
  ]);

  return {
    allCategories,
    allTags,
    recentPosts,
  };
}
