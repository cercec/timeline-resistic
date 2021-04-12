import Template from "../Components/Template";
import Timeline from "../Components/Timeline";
import {fetchAllBibliographie, fetchAllEvents, fetchAllImages} from "../utils/fetchers";
import React from "react";

export default function SearchResults({bibliographie, events, images}) {
  return (
    <Template classNamePage="search-results" pageName="Résultats de recherche">
      <Timeline bibliographie={bibliographie.all_bibliographie.data} datas={events.all_events.data} images={images} searchResults/>
    </Template>
  )
}
export async function getStaticProps() {
  const events = await fetchAllEvents()
  const images = await fetchAllImages()
  const bibliographie = await fetchAllBibliographie()

  return {
    props: {
      events,
      images,
      bibliographie
    },
  }
}

