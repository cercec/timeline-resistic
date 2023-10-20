import '../assets/css/app.scss';
import React from "react";
import NextNProgress from "../Components/NextNProgress";
import FeedbackForm from "../Components/FeedbackForm";

function MyApp({Component, pageProps}) {
  return <>
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
