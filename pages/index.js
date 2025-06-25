import FeaturedPost from "@/components/FeaturedPost";
import Slider from "@/components/shared/Slider";
import { getLayoutProps } from "@/lib/layoutData";
import { fetchCategoryDetails, fetchFeaturedPost, fetchPostsByTagSix, fetchTagDetails } from "@/lib/queryFunctions";
import { fetchPostsByCategorySix } from "@/lib/queryFunctions";
import Link from "next/link";

export default function Home({ sixPosts1, d1, sixPosts2, d2, sixPosts3, d3, featuredPost }) {
  return (
    <>
    <div>
      <FeaturedPost post={featuredPost}/>
    </div>

      <div className="mt-12">
        <div className="text-2xl font-bold text-gray-700 underline">
          <Link href={`/category/${d1.slug.current}`}>{d1.name}</Link>
        </div>
        <div className="mt-4">
          <Slider posts={sixPosts1}/>
        </div>
      </div>


      <div className="mt-12">
        <div className="text-2xl font-bold text-gray-700 underline">
          <Link href={`/category/${d2.slug.current}`}>{d2.name}</Link>
        </div>
        <div className="mt-4">
          <Slider posts={sixPosts2}/>
        </div>
      </div>

      <div className="mt-12">
        <div className="text-2xl font-bold text-gray-700 underline">
          <Link href={`/tag/${d3?.slug?.current}`}>{d3.name}</Link>
        </div>
        <div className="mt-4">
          <Slider posts={sixPosts3}/>
        </div>
      </div>


    </>
  );
}

export async function getStaticProps() {
  const featuredPost = await fetchFeaturedPost()
  const sixPosts1 = await fetchPostsByCategorySix("integrated-gpus");
  const d1 = await fetchCategoryDetails("integrated-gpus");
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
