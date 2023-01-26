import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Teko:wght@700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rock+Salt&family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        />
        <link href="/ruslan-display.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8275268155137933"
          crossOrigin="anonymous"
        ></Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G4YNLVE3HG"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8275268155137933"
          crossOrigin="anonymous"
        ></Script>

        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-G4YNLVE3HG');
        `}
        </Script>
      </body>
    </Html>
  );
}
