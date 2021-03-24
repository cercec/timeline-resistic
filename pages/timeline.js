import Template from "../Components/Template";
import TimelineAlgolia from "../Components/TimelineAlgolia";
import React from "react";
import {fetchAllEvents, fetchAllImages} from "../utils/fetchers";

export default function Timeline({events, images}) {
  return (
    <Template classNamePage="timeline" pageName="Timeline">
      <TimelineAlgolia events={events} images={images}/>
    </Template>
  )
}
export async function getStaticProps() {
  const events = await fetchAllEvents()
  const images = await fetchAllImages()

  return {
    props: {
      events,
      images,
    },
  }
}
