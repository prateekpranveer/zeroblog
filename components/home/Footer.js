import Link from "next/link";

export default function Footer({ categories = [], tags = [] }) {
    return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Intro */}
        <div className="space-y-4">
          <div className="mb-4">
            <Link href={'/'}><span>ZERO</span> <span className="text-gray-300 font-bold tracking-wider">FRAMEDROPS</span></Link>
          </div>
          <p className="text-sm text-gray-400">
            Discover insightful blogs on tips, tools, and tech. Stay updated with the best of WordPress + Next.js.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link href={`/category/${cat.slug.current}`} className="hover:text-white">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2 text-sm" aria-label="Popular tags">
            {tags.map((tag) => (
              <Link
              key={`${tag._id}`}
                href={`/tag/${tag.slug.current}`}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-400 mb-4">
            {"Have a suggestion or feedback? We'd love to hear from you."}
          </p>
          <address className="not-italic">
            <a
              href="mailto:prateekpranveer321@gmail.com"
              className="text-blue-400 hover:text-blue-500 text-sm"
            >
              prateekpranveer321@gmail.com
            </a>
          </address>
        </div>
      </div>

      <div className="text-center mt-12 text-xs text-gray-500 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} Zero Framedrops. All rights reserved.
      </div>
    </footer>
  );
}
