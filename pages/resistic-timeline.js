import Template from "../Components/Template";
import Timeline from "../Components/Timeline";
import React from "react";
import {fetchAllBibliographies, fetchAllEvents, fetchAllImages} from "../utils/fetchers";

export default function ResisticTimeline({events, images, bibliographies}) {
  return (
    <Template classNamePage="timeline" pageName="ResisticTimeline" menuActive>
      <Timeline datas={events.all_events.data} images={images} bibliographies={bibliographies.all_bibliographies.data}/>
    </Template>
  )
}
export async function getStaticProps() {
  const events = await fetchAllEvents()
  const images = await fetchAllImages()
  const bibliographies = await fetchAllBibliographies()

  return {
    props: {
      events,
      images,
      bibliographies
    },
  }
}
