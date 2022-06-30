import '../assets/css/app.scss';
import React from "react";
import NextNProgress from "../Components/NextNProgress";
import FeedbackForm from "../Components/FeedbackForm";
import {GA_MEASUREMENT_ID} from "../utils/gtag";

function MyApp({Component, pageProps}) {
  return <>
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
    <NextNProgress
      color="#FF3900"
      startPosition={0.3}
      stopDelayMs={200}
      height="30"
    />
    <FeedbackForm/>
    <Component {...pageProps} />
  </>
}

export default MyApp
