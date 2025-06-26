import Link from "next/link";
import "../../styles/globals.css";

export const metadata = {
  title: "404 - Page Not Found | Your Blog Name",
  description:
    "The page you’re looking for doesn’t exist. Browse other articles on our blog.",
  openGraph: {
    title: "404 - Page Not Found",
    description:
      "The page you’re looking for doesn’t exist. Browse other articles on our blog.",
    url: "https://zeroframedrop.com/404",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "404 - Page Not Found",
    description: "The page you’re looking for doesn’t exist.",
  },
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <Link
        href="/"
        className="inline-block bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 transition"
      >
        Go Back
      </Link>
    </main>
  );
}
