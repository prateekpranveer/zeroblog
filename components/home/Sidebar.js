import Link from "next/link";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Sidebar({
  isOpen,
  onClose,
  tags = [],
  categories = [],
  recentPosts = [],
}) {
  const [search, setSearch] = useState("");
  const router = useRouter()
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search)}`);
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-slate-50 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-end px-6 py-4">
          <button onClick={onClose} aria-label="Close Sidebar">
            <FiX size={22} />
          </button>
        </div>

        <div className="px-6 overflow-y-auto h-full space-y-6">
          {/* Search */}
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </form>

          {/* Categories */}
          <div>
            <h3 className="text-md font-semibold mb-2">Categories</h3>
            <ul className="space-y-1">
              {categories.length ? (
                categories.map((cat) => (
                  <li key={cat.slug.current}>
                    <Link
                      href={`/category/${cat.slug.current}`}
                      onClick={onClose}
                      className="text-gray-700 text-sm hover:text-blue-600"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No categories found.</p>
              )}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-md font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.length ? (
                tags.map((tag) => (
                  <Link
                    key={tag.slug.current}
                    href={`/tag/${tag.slug.current}`}
                    onClick={onClose}
                    className="text-xs bg-gray-200 hover:bg-blue-200 px-2 py-1 rounded"
                  >
                    {tag.name}
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No tags found.</p>
              )}
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-md font-semibold mb-2">Recent Posts</h3>
            <ul className="space-y-2">
              {recentPosts.length ? (
                recentPosts.map((post) => (
                  <div
                    className="flex items-center space-x-4"
                    key={post.slug.current}
                  >
                    <div className="w-1/3">
                      {" "}
                      <Image
                      alt={`${post.mainImage.alt}`}
                        className=""
                        width={100}
                        height={100}
                        src={post.mainImage.asset.url}
                      />
                    </div>
                    <div className="w-2/3">
                      <li>
                        <Link
                          href={`/${post.slug.current}`}
                          onClick={onClose}
                          className="text-blue-800 text-xs roboto-flex hover:underline"
                        >
                          {post.title}
                        </Link>
                      </li>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No recent posts.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
