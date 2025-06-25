import { getLayoutProps } from "@/lib/layoutData";
import { fetchAllPostSlugs, fetchPostBySlug } from "@/lib/queryFunctions";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { PortableTextComponent } from "@/components/shared/PortableTextCompnent";

export default function Post({ post }) {
  const {
    title,
    slug,
    author,
    categories,
    estimatedReadTime,
    mainImage,
    publishedAt,
    tags,
    body, // Assuming your post has a body field with Portable Text content
  } = post;

  return (
    <main className="max-w-3xl mx-auto py-2">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{title}</h1>

      {/* Meta: Author / Date / Read Time */}
      <div className="flex flex-wrap text-sm text-gray-600 mb-6 space-x-4">
        <Link href={`/author/${author.slug.current}`} className="hover:underline">
          By {author.name}
        </Link>
        <span>• {formatDate(publishedAt)}</span>
        {estimatedReadTime && <span>• {estimatedReadTime} min read</span>}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <Link
            key={category.slug.current}
            href={`/category/${category.slug.current}`}
            className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded hover:bg-blue-200 transition"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Main Image */}
      {mainImage?.asset?.url && (
        <div className="mb-6">
          <Image
            src={mainImage.asset.url}
            alt={mainImage.alt || title}
            width={800}
            height={400}
            className="rounded-lg object-cover w-full"
          />
        </div>
      )}

      {/* Tags */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <Link
              key={tag.slug.current}
              href={`/tag/${tag.slug.current}`}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded hover:bg-gray-300 transition"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      )}

      {/* Post Body */}
       <div className="">
      <PortableText value={body} components={PortableTextComponent} />
    </div>
    </main>
  );
}

export async function getStaticPaths() {
  const slugs = await fetchAllPostSlugs();
  return {
    paths: slugs.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await fetchPostBySlug(params.slug);
  const layoutProps = await getLayoutProps();

  if (!post) return { notFound: true };

  return {
    props: { post, ...layoutProps },
    revalidate: 60,
  };
}
