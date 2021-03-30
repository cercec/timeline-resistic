import Template from "../Components/Template";
import TimelineAlgolia from "../Components/TimelineAlgolia";
import React from "react";
import {fetchAllEvents, fetchAllImages, fetchAllPublications} from "../utils/fetchers";

export default function ResisticTimeline({events, images, publications}) {
  return (
    <Template classNamePage="timeline" pageName="ResisticTimeline">
      <TimelineAlgolia events={events} images={images} publications={publications.all_publications.data}/>
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
