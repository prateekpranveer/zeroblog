import PostCard from "@/components/home/PostCard";
import {
  fetchCategoryDetails,
  fetchPostsByCategory,
  fetchAllCategorySlugs,
} from "@/lib/queryFunctions";
import { getLayoutProps } from "@/lib/layoutData";

export default function CategoryPage({ category, posts }) {
  return (
    <>
      <h1 className="text-3xl font-bold"><span className="text-sky-800">{category.name}</span></h1>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} postCardDetails={post} />
      ))}
    </div>
    </>
  );
}

export async function getStaticPaths() {
  const allCategorySlugs = await fetchAllCategorySlugs();
  const paths = allCategorySlugs.map((item) => ({
    params: { slug: item.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const category = await fetchCategoryDetails(params.slug);
  const posts = await fetchPostsByCategory(params.slug);
  const layoutProps = await getLayoutProps();
  if (!category) return { notFound: true };

  return {
    props: {
      category,
      posts,
      ...layoutProps,
    },
    revalidate: 60, // Optional: ISR
  };
}
