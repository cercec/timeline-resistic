import {fetchAllEvents, fetchAllImages, fetchAllThemes} from "../../utils/fetchers";
import React from "react";
import TimelineAlgolia from "../../Components/TimelineAlgolia";
import Template from "../../Components/Template";

export default function Theme({events, images, themes}) {
  return <Template classNamePage="timeline theme-page" pageName="Thèmes">
    <TimelineAlgolia events={events} images={images} themes={themes}/>
  </Template>
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const themes = await fetchAllThemes()
  // Get the paths we want to pre-render based on posts
  const paths = themes.all_themes.data.map((theme) => ({
    params: { id: theme.id.toString(), theme_name: theme.theme_name },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps() {
  const events = await fetchAllEvents()
  const images = await fetchAllImages()
  const themes = await fetchAllThemes()

  return {
    props: {
      events,
      images,
      themes
    },
  }
}
