import SEO from "@/components/Seo";
import { getLayoutProps } from "@/lib/layoutData";
import { fetchAllPostSlugs, fetchPostBySlug } from "@/lib/queryFunctions";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { PortableTextComponent } from "@/components/shared/PortableTextCompnent";
import CommentForm from "@/components/shared/CommentForm";
import CommentThread from "@/components/shared/CommentThread";

export default function Post({ post }) {
  const {
    _id,
    title,
    slug,
    metaTitle,
    metaDescription,
    author,
    categories,
    estimatedReadTime,
    mainImage,
    publishedAt,
    tags,
    body,
  } = post;

  const postUrl = `https://zeroframedrop.com/${slug.current}`;
  const imageUrl = mainImage?.asset?.url
    ? mainImage.asset.url
    : "https://zeroframedrop.com/default-og-image.jpg";

  // ✅ JSON-LD Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl,
    },
    "headline": title,
    "description": metaDescription,
    "image": [imageUrl],
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": `https://zeroframedrop.com/author/${author.slug.current}`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "ZeroFrameDrop",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zeroframedrop.com/logo.png",
      },
    },
    "datePublished": formatDate(publishedAt),
    "dateModified": formatDate(publishedAt),
  };

  return (
    <>
      {/* ✅ SEO Meta */}
      <SEO
        title={metaTitle || title}
        description={metaDescription}
        slug={`/${slug.current}`}
        image={imageUrl}
        type="article"
        articlePublishedTime={publishedAt}
        articleAuthorName={author.name}
        structuredData={articleSchema}
      />

      <main className="max-w-3xl mx-auto py-2">
        <article
          itemScope
          itemType="https://schema.org/BlogPosting"
          className="prose lg:prose-lg max-w-full"
        >
          {/* Title */}
          <header>
            <h1 itemProp="headline" className="text-3xl font-bold mb-4 text-gray-900">
              {title}
            </h1>

            {/* Author, Date, Read Time */}
            <div className="flex flex-wrap items-center text-sm mb-6 gap-4">
              <span itemProp="author" itemScope itemType="https://schema.org/Person">
                <Link href={`/author/${author.slug.current}`} className="flex justify-center items-center space-x-2 hover:underline">
                  <span><Image className="rounded-full border border-1 border-gray-400" width={25} height={25} src={author.image?.asset?.url}/></span>
                  <span className="underline text-sky-600" itemProp="name">{author.name}</span>
                </Link>
              </span>
              <div className="flex gap-2">
              <time itemProp="datePublished" dateTime={publishedAt}>
                • {formatDate(publishedAt)}
              </time>
              {estimatedReadTime && <span>• {estimatedReadTime} min read</span>}
              </div>
            </div>

            {/* Categories */}
            {categories?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Link
                    key={category.slug.current}
                    href={`/category/${category.slug.current}`}
                    className="text-xs bg-blue-800 text-slate-100 px-2 py-1 rounded-sm hover:bg-black transition"
                  >
                   {category.name}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Main Image */}
          {mainImage?.asset?.url && (
            <figure className="mb-6">
              <Image
                src={mainImage.asset.url}
                alt={mainImage.alt || title}
                width={800}
                height={400}
                className="rounded-sm object-cover w-full"
                itemProp="image"
              />
            </figure>
          )}

          {/* Tags */}
          {tags?.length > 0 && (
            <div className="flex text-sm rounded-sm flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <Link
                  key={tag.slug.current}
                  href={`/tag/${tag.slug.current}`}
                  className="text-xs border border-gray-800 px-2 py-0.5 rounded hover:bg-gray-300 transition"
                >
                   #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Article Body */}
          <section itemProp="articleBody">
            <PortableText value={body} components={PortableTextComponent} />
          </section>
        </article>

        {/* Comment Form */}
        <section className="pb-6 pt-12">
          <CommentForm postId={_id} />
        </section>

        {/* Comment Thread */}
        <section className="bg-sky-100 p-6">
          <CommentThread comments={post.comments} />
        </section>
      </main>
    </>
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
