import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import Link from "next/link";

export default function PostCard({ postCardDetails }) {
  const { title, slug, author, publishedAt, mainImage, tags } = postCardDetails;

  return (
    <div className="max-w-full h-100 justify-between bg-slate-50 border border-gray-200 transition duration-300 overflow-hidden">
      {/* Image */}
      {mainImage?.asset?.url && (
        <div className="relative w-full min-h-42">
          <Image
            src={mainImage.asset.url}
            alt={mainImage.alt || title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col min-h-60 max-h-60 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <Link
              key={tag.slug.current}
              href={`/tag/${tag.slug.current}`}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded hover:bg-gray-300 transition"
            >
              {tag.name}
            </Link>
          ))}
        </div>

        {/* Author & Date */}
        <div className="text-xs text-gray-600 space-x-2 items-center">
          <Link href={`/author/${author.slug.current}`} className="text-blue-600 hover:underline">
            {author.name}
          </Link>
          <span>{formatDate(publishedAt)}</span>
        </div>

        {/* Title */}
        <h2 className="cursor-pointer max-w-[300px] text-lg font-semibold text-gray-800 hover:text-blue-600">
          <Link href={`/${slug.current}`}>{title}</Link>
        </h2>

      </div>
    </div>
  );
}
