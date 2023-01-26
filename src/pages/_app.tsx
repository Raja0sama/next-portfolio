import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import "node_modules/@uiw/react-markdown-preview/esm/styles/markdown.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{pageProps.metaTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:title"
          content={pageProps.metaDescription}
          key={pageProps.metaTitle}
        />
        <meta name="description" content={pageProps.metaDescription} />
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
