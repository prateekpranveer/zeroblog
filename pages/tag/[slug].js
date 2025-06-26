import SEO from "@/components/Seo";
import Head from "next/head";
import PostCard from "@/components/home/PostCard";
import { getLayoutProps } from "@/lib/layoutData";
import {
  fetchAllTagSlugs,
  fetchPostsByTag,
  fetchTagDetails,
} from "@/lib/queryFunctions";

export default function TagPage({ tag, posts }) {
  const siteUrl = "https://zeroframedrop.com";
  const pageSlug = `/tag/${tag.slug}`;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${tag.name} - ZeroFrameDrop`,
    "description": `A collection of articles and posts under the tag: ${tag.name}.`,
    "url": `${siteUrl}/tag/${tag.slug}`,
  };

  return (
    <>
      {/* ✅ SEO */}
      <SEO
        title={`${tag.name} | Zero FrameDrop`}
        description={`Discover expert articles, tips, and insights on ${tag.name}. Stay informed with the latest on ${tag.name} topics at ZeroFrameDrop.`}
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
        <span className="text-sky-800">{tag.name}</span>
      </h1>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {posts.map((post) => (
          <PostCard key={post._id} postCardDetails={post} />
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const allTagSlugs = await fetchAllTagSlugs();

  const paths = allTagSlugs.map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const tag = await fetchTagDetails(params.slug);
  const posts = await fetchPostsByTag(params.slug);
  const layoutProps = await getLayoutProps();

  if (!tag) {
    return { notFound: true };
  }

  return {
    props: {
      tag,
      posts,
      ...layoutProps,
    },
    revalidate: 60,
  };
}
