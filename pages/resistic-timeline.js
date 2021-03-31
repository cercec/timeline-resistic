import Template from "../Components/Template";
import Timeline from "../Components/Timeline";
import React from "react";
import {fetchAllEvents, fetchAllImages, fetchAllPublications} from "../utils/fetchers";

export default function ResisticTimeline({events, images, publications}) {
  return (
    <Template classNamePage="timeline" pageName="ResisticTimeline" menuActive>
      <Timeline datas={events.all_events.data} images={images} publications={publications.all_publications.data}/>
    </Template>
  )
}
export async function getStaticProps() {
  const events = await fetchAllEvents()
  const images = await fetchAllImages()
  const publications = await fetchAllPublications()

  return {
    props: {
      events,
      images,
      publications
    },
  }
}
