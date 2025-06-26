import Head from "next/head";

export default function SEO({
  title = "ZERO FRAMEDROP",
  description = "Stay ahead of every computer issue. ZeroFrameDrop delivers expert tips, in-depth hardware knowledge, and performance optimization guides.",
  slug = "",
  image = "/ogmain.png",
  siteUrl = "https://zeroframedrop.com",
  siteName = "ZeroFrameDrop – Because Every Frame Counts",
  type = "website",  // Can be "website" or "article"
  articlePublishedTime,
  articleAuthorName,
  structuredData,
  metaRobots = "index, follow",
}) {
  const pageUrl = `${siteUrl}${slug.startsWith("/") ? slug : `/${slug}`}`;
  const ogImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  // ✅ Site-wide JSON-LD (for Home/Category/Tag pages)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Head>
      {/* ✅ Favicon for Browser and Google Search */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/icons-192.png" />

      {/* ✅ Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      {/* ✅ Robots */}
      {metaRobots && <meta name="robots" content={metaRobots} />}

      {/* ✅ Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content="en_US" />

      {/* ✅ Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:site" content="@prateekpranveer" />
      <meta name="twitter:creator" content="@prateekpranveer" />

      {/* ✅ Article-specific Open Graph */}
      {type === "article" && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {type === "article" && articleAuthorName && (
        <meta property="article:author" content={articleAuthorName} />
      )}

      {/* ✅ JSON-LD Structured Data */}
      {structuredData ? (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      ) : (
        // ✅ Fallback: Website schema for non-article pages
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}
    </Head>
  );
}
