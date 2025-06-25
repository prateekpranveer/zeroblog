import PostCard from "@/components/home/PostCard";
import { getLayoutProps } from "@/lib/layoutData";
import { fetchSearchedPosts } from "@/lib/queryFunctions";

export default function Search({ posts, query }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Search Results for: <span className="text-sky-400">{query}</span></h1>
            <div className="mt-12 flex gap-4">
              {posts.map((post) => (
                <PostCard key={posts.slug} postCardDetails={post} />
              ))}
            </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const query = context.query.query || "";
const layoutProps = await getLayoutProps();

  if (!query) {
    return {
      props: {
        results: [],
          ...layoutProps,
        query: "",
      },
    };
  }

  const posts = await fetchSearchedPosts(query);
  return {
    props: {
      ...layoutProps,
      posts,
      query,
    },
  };
}
