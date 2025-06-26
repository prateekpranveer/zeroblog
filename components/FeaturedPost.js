import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/formatDate";

export default function FeaturedPost({ post }) {
  const { mainImage, title, tags, author, publishedAt, slug } = post;

  return (
    <article className="flex max-w-6xl flex-col lg:flex-row mx-auto rounded overflow-hidden shadow-md">
      {/* Featured Image */}
      <div className="relative -z-2 h-[300px] sm:h-[360px] lg:w-2/5 min-w-[300px]">
        {mainImage?.asset?.url && (
          <Image
            src={mainImage.asset.url}
            alt={title || "Featured Image"}
            fill
            priority
            className="object-cover w-full h-full"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        )}
      </div>

      {/* Text Content */}
      <div className="lg:w-3/5 p-6 lg:px-8 bg-gray-50 flex flex-col justify-center">
        {/* Post Title */}
        <h2 className="text-2xl lg:text-4xl font-bold leading-tight mb-3">
          <Link
            href={`/${slug.current}`}
            className="hover:text-blue-600 transition-colors duration-300"
          >
            {title}
          </Link>
        </h2>

        {/* Meta: Author & Date */}
        <div className="text-sm text-gray-600 mb-4">
          {author?.name && (
            <>
              <span>By </span>
              <Link
                href={`/author/${author.slug?.current}`}
                className="hover:underline text-blue-500"
              >
                {author.name}
              </Link>
            </>
          )}
          {publishedAt && (
            <span>
              {author?.name ? " | " : ""}
              {formatDate(publishedAt)}
            </span>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Link
                key={tag.slug?.current}
                href={`/tag/${tag.slug?.current}`}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
