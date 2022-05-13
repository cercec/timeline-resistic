import Template from "../Components/Template";
import React from "react";
import {fetchAllEvents, fetchAllPages, pushDataToAlgolia} from "../utils/fetchers";
import MainMenu from "../Components/MainMenu";

export default function Home({pages}) {
  const HomeData = pages.all_pages.data.find((e) => e.id === 5);
  const homeDescription = () => {
    return {__html: HomeData.contenu}
  }
  return (
    <Template classNamePage="home" pageName="Accueil">
      <div className="home-wrapper">
        <div className="intro">
          <h1>{HomeData.titre}</h1>
          <div dangerouslySetInnerHTML={homeDescription()}/>
        </div>
        <div className="vertical-menu">
          <MainMenu/>
        </div>
      </div>
    </Template>
  )
}

export async function getStaticProps() {
  const events = await fetchAllEvents()
  const pages = await fetchAllPages()

  await pushDataToAlgolia(events.all_events.data)
  return {
    props: {
      events,
      pages
    },
  }
}
