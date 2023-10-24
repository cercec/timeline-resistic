import "../assets/css/app.scss"
import React from "react"
import FeedbackForm from "../Components/FeedbackForm"
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProgressBar
        height="30px"
        color="#FF3900"
        options={{ showSpinner: true }}
        shallowRouting
      />
      <FeedbackForm />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
