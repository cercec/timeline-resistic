import Template from "../Components/Template"
import React from "react"
import {
  fetchAllEvents,
  fetchAllPages,
  pushDataToAlgolia,
} from "../utils/fetchers"
import MainMenu from "../Components/MainMenu"

export default function Home({ pages }) {
  const home_data = pages.all_pages?.data.find((e) => e.id === 5)
  const homeDescription = () => {
    return { __html: home_data?.contenu }
  }
  return (
    <Template classNamePage="home" pageName="Accueil">
      <div className="home-wrapper">
        <div className="intro">
          <h1>{home_data?.titre}</h1>
          <div dangerouslySetInnerHTML={homeDescription()} />
        </div>
        <div className="vertical-menu">
          <MainMenu />
        </div>
      </div>
    </Template>
  )
}

export async function getStaticProps() {
  let events = []
  let pages = []

  try {
    events = await fetchAllEvents()
    await pushDataToAlgolia(events.all_events.data)
  } catch (error) {
    console.error("Error fetching or pushing events:", error)
  }

  try {
    pages = await fetchAllPages()
  } catch (error) {
    console.error("Error fetching pages:", error)
  }

  return {
    props: {
      events: events || [],
      pages: pages || [],
    },
  }
}
