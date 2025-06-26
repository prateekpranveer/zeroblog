import SEO from "@/components/Seo";
import Head from "next/head";
import PostCard from "@/components/home/PostCard";
import {
  fetchCategoryDetails,
  fetchPostsByCategory,
  fetchAllCategorySlugs,
} from "@/lib/queryFunctions";
import { getLayoutProps } from "@/lib/layoutData";

export default function CategoryPage({ category, posts }) {
  const siteUrl = "https://zeroframedrop.com";
  const pageSlug = `/category/${category.slug}`;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} - ZeroFrameDrop`,
    description: `Browse expert articles and detailed posts under the category: ${category.name}.`,
    url: `${siteUrl}${pageSlug}`,
  };

  return (
    <>
      {/* ✅ SEO */}
      <SEO
        title={`${category.name} | Zero FrameDrop`}
        description={`Browse expert articles, buying guides, and optimization tips under ${category.name} at ZeroFrameDrop.`}
        slug={pageSlug}
        image="/ogmain.png"
      />

      {/* ✅ Optional Structured Data */}
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(collectionSchema)}
        </script>
      </Head>

      {/* ✅ Content */}
      <h1 className="text-3xl font-bold">
        <span className="text-sky-800">{category.name}</span>
      </h1>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length == 0 && <>No Posts Found in this Category!</>}
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
  if (!category) return { notFound: true}
  return {
    props: {
      category,
      posts,
      ...layoutProps,
    },
    revalidate: 60,
  };
}
