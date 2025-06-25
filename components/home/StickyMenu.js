"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function StickyMenu({ categories }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY; // Convert vertical scroll into horizontal
      }
    };

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="max-w-3xl relative border-b-1 border-t-1 border-gray-200 mx-auto px-4 mt-4 overflow-x-auto scrollbar-hide"
    >
      <div className="flex space-x-4 text-sm py-2 whitespace-nowrap">
        {categories?.map((category) => (
          <div
            className="cursor-pointer hover:text-blue-400 flex-shrink-0"
            key={category.slug.current}
          >
            <Link href={`/category/${category.slug.current}`}>
              {category.name}
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}
