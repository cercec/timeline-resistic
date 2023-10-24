import Template from "../Components/Template"
import Timeline from "../Components/Timeline"
import {
  fetchAllBibliographie,
  fetchAllEvents,
  fetchAllImages,
} from "../utils/fetchers"
import React from "react"

export default function SearchResults({ bibliographie, events, images }) {
  return (
    <Template classNamePage="search-results" pageName="Résultats de recherche">
      <Timeline
        bibliographie={bibliographie.all_bibliographie?.data ?? []}
        datas={events.all_events?.data ?? []}
        images={images && images}
        searchResults
      />
    </Template>
  )
}
export async function getStaticProps() {
  let events = []
  let images = []
  let bibliographie = []

  try {
    events = await fetchAllEvents()
  } catch (error) {
    console.error("Error fetching events:", error)
  }

  try {
    images = await fetchAllImages()
  } catch (error) {
    console.error("Error fetching images:", error)
  }

  try {
    bibliographie = await fetchAllBibliographie()
  } catch (error) {
    console.error("Error fetching bibliographie:", error)
  }

  return {
    props: {
      events: events || [],
      images: images || [],
      bibliographie: bibliographie || [],
    },
  }
}
