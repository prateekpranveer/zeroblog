import PostCard from "@/components/home/PostCard";
import { getLayoutProps } from "@/lib/layoutData";
import {
  fetchAllAuthorSlugs,
  fetchAuthorDetails,
  fetchPostsByAuthor,
} from "@/lib/queryFunctions";

export default function Author({ author, posts }) {
  return (
    <>
      <h1 className="text-3xl font-bold"><span className="text-sky-800">{author.name}</span></h1>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {posts.map((post) => (
          <PostCard key={post._id} postCardDetails={post} />
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const allAuthorSlugs = await fetchAllAuthorSlugs();
  const paths = allAuthorSlugs.map((item) => ({
    params: { slug: item.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const author = await fetchAuthorDetails(params.slug);
  const posts = await fetchPostsByAuthor(params.slug);
  const layoutProps = await getLayoutProps();
  if (!author) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      author,
      posts,
      ...layoutProps,
    },
    revalidate: 60,
  };
}
