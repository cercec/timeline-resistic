import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import { GA_MEASUREMENT_ID } from "../utils/gtag"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/logo.png" />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            src="https://www.google.com/recaptcha/api.js"
            async
            defer
          ></script>
          <meta property="og:title" content={"Timeline ResisTIC"} />
          <meta
            property="og:description"
            content={
              "Depuis le début des années 2010, la Russie est un laboratoire des contrôles et des contraintes numériques. Des emprises politiques croissantes se déploient sur internet, s'appuyant sur des dispositifs"
            }
          />
          <meta
            property="og:image"
            content={"https://timeline.resistic.fr/resistic-opengraph.png"}
          />
          <meta property="og:url" content={"https://timeline.resistic.fr/"} />
          <meta property="og:type" content="website" />

          <meta
            name="twitter:card"
            content={"https://timeline.resistic.fr/resistic-opengraph.png"}
          />
          <meta name="twitter:title" content={"Timeline ResisTIC"} />
          <meta name="twitter:description" />
          <meta
            property="og:description"
            content={
              "Depuis le début des années 2010, la Russie est un laboratoire des contrôles et des contraintes numériques. Des emprises politiques croissantes se déploient sur internet, s'appuyant sur des dispositifs"
            }
          />
          <meta
            name="twitter:image"
            content={"https://timeline.resistic.fr/resistic-opengraph.png"}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
