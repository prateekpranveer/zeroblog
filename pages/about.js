import { getLayoutProps } from "@/lib/layoutData";
import SEO from "@/components/Seo";

export default function About() {
  return (
    <>
      <SEO
        title="About Us | ZeroFrameDrop"
        description="Learn about ZeroFrameDrop - your go-to hub for computer performance tips, gaming hardware reviews, and system optimization guides."
        slug="/about"
        image="/ogmain.png"
      />

      <main className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">About ZeroFrameDrop</h1>
        <p className="text-gray-700">
          ZeroFrameDrop is a blog dedicated to gamers, PC enthusiasts, and
          hardware geeks. Our mission is to help you get every frame your system
          can deliver.
        </p>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const layoutProps = await getLayoutProps();
  return {
    props: {
      ...layoutProps,
    },
    revalidate: 60,
  };
}
