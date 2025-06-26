import SEO from "@/components/Seo";
import PostCard from "@/components/home/PostCard";
import { getLayoutProps } from "@/lib/layoutData";
import { fetchSearchedPosts } from "@/lib/queryFunctions";

export default function Search({ posts, query }) {
  const pageSlug = `/search?query=${encodeURIComponent(query)}`;
  const hasResults = posts.length > 0;

  return (
    <>
      {/* ✅ SEO */}
      <SEO
        title={`Search Results for "${query}" | ZeroFrameDrop`}
        description={
          hasResults
            ? `Find articles related to "${query}" on ZeroFrameDrop.`
            : `No results found for "${query}" on ZeroFrameDrop.`
        }
        slug={pageSlug}
        image="/ogmain.png"
        metaRobots="noindex, follow" // ✅ Important for search pages
      />

      {/* ✅ Optional: Prevent indexing of Search result pages */}
      <meta name="robots" content="noindex, follow" />

      {/* ✅ Content */}
      <h1 className="text-3xl font-bold">
        Search Results for: <span className="text-sky-400">{query}</span>
      </h1>

      <div className="mt-12 flex flex-wrap gap-4">
        {hasResults ? (
          posts.map((post) => (
            <PostCard
              key={post._id || post.slug.current}
              postCardDetails={post}
            />
          ))
        ) : (
          <p>No posts found for this query.</p>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const query = context.query.query || "";
  const layoutProps = await getLayoutProps();

  if (!query) {
    return {
      props: {
        posts: [],
        query: "",
        ...layoutProps,
      },
    };
  }

  const posts = await fetchSearchedPosts(query);

  return {
    props: {
      posts,
      query,
      ...layoutProps,
    },
  };
}
