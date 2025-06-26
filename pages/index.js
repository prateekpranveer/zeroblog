import SEO from "@/components/Seo";
import FeaturedPost from "@/components/FeaturedPost";
import Slider from "@/components/shared/Slider";
import { getLayoutProps } from "@/lib/layoutData";
import { fetchCategoryDetails, fetchFeaturedPost, fetchPostsByTagSix, fetchTagDetails, fetchPostsByCategorySix } from "@/lib/queryFunctions";
import Link from "next/link";
import Head from "next/head";

export default function Home({ sixPosts1, d1, sixPosts2, d2, sixPosts3, d3, featuredPost }) {
  const siteUrl = "https://zeroframedrop.com";

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ZeroFrameDrop - Because Every Frame Counts",
    "url": siteUrl,
    "description": "Expert hardware reviews, GPU insights, gaming optimizations, and performance tweaks for PC enthusiasts at ZeroFrameDrop.",
  };

  return (
    <div>
      {/* ✅ SEO */}
      <SEO
        title="ZeroFrameDrop | PC Hardware, GPUs, and Gaming Optimizations"
        description="Expert hardware reviews, GPU insights, gaming performance tweaks, and optimization guides. Stay ahead with ZeroFrameDrop."
        slug="/"
        image="/ogmain.png"
      />

      {/* ✅ Optional JSON-LD WebPage Schema */}
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(homeSchema)}
        </script>
      </Head>

      {/* ✅ Featured Post */}
      <div>
        <FeaturedPost post={featuredPost} />
      </div>

      {/* ✅ Category 1 */}
      <div className="mt-12">
        <div className="text-2xl font-bold text-gray-700 underline">
          <Link href={`/category/${d1?.slug.current}`}>{d1?.name}</Link>
        </div>
        <div className="mt-4">
          <Slider posts={sixPosts1} />
        </div>
      </div>

      {/* ✅ Category 2 */}
      <div className="mt-12">
        <div className="text-2xl font-bold text-gray-700 underline">
          <Link href={`/category/${d2?.slug.current}`}>{d2?.name}</Link>
        </div>
        <div className="mt-4">
          <Slider posts={sixPosts2} />
        </div>
      </div>

      {/* ✅ Tag Slider */}
      <div className="mt-12">
        <div className="text-2xl font-bold text-gray-700 underline">
          <Link href={`/tag/${d3?.slug?.current}`}>{d3?.name}</Link>
        </div>
        <div className="mt-4">
          <Slider posts={sixPosts3} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const featuredPost = await fetchFeaturedPost();
  const sixPosts1 = await fetchPostsByCategorySix("gaming-optimizations");
  const d1 = await fetchCategoryDetails("gaming-optimizations");
  const sixPosts2 = await fetchPostsByCategorySix("workstation-gpus");
  const d2 = await fetchCategoryDetails("workstation-gpus");
  const sixPosts3 = await fetchPostsByTagSix("ray-tracing");
  const d3 = await fetchTagDetails("ray-tracing");
  const layoutProps = await getLayoutProps();

  return {
    props: { ...layoutProps, featuredPost, sixPosts1, d1, sixPosts2, d2, sixPosts3, d3 },
    revalidate: 60,
  };
}
