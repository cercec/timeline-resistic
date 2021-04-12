import Template from "../Components/Template";
import Timeline from "../Components/Timeline";
import React from "react";
import {fetchAllBibliographie, fetchAllEvents, fetchAllImages} from "../utils/fetchers";

export default function ResisticTimeline({events, images, bibliographie}) {
  return (
    <Template classNamePage="timeline" pageName="ResisticTimeline" menuActive>
      <Timeline datas={events.all_events.data} images={images} bibliographie={bibliographie.all_bibliographie.data}/>
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
