import "@/styles/globals.css";
import Layout from "@/components/home/Layout";
import Router from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import Head from "next/head";

nProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const handleStart = () => nProgress.start();
    const handleStop = () => nProgress.done();

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleStop);
    Router.events.on("routeChangeError", handleStop);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleStop);
      Router.events.off("routeChangeError", handleStop);
    };
  }, []);

  return (
    <>
      {/* Favicon and Organization Logo Schema */}
      <Head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.png" />

        {/* Organization Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://zeroframedrop.com",
            "logo": "https://zeroframedrop.com/logo.png",
            "name": "ZeroFrameDrop"
          })
        }} />
      </Head>

      <Layout
        recentPosts={pageProps.recentPosts}
        tags={pageProps.allTags}
        categories={pageProps.allCategories}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
