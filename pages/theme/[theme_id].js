import {fetchAllEvents, fetchAllImages, fetchAllPublications, fetchAllThemes} from "../../utils/fetchers";
import React from "react";
import TimelineAlgolia from "../../Components/TimelineAlgolia";
import Template from "../../Components/Template";

export default function Theme({events, images, publications, themes}) {
  return <Template classNamePage="timeline theme-page" pageName="Thèmes">
    <TimelineAlgolia datas={events.all_events.data} images={images} publications={publications.all_publications.data} themes={themes}/>
  </Template>
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const themes = await fetchAllThemes()
  // Get the paths we want to pre-render based on posts
  const paths = themes.all_themes.data.map((theme) => ({
    params: { theme_id: theme.id.toString(), theme_name: theme.theme },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps() {
  const events = await fetchAllEvents()
  const images = await fetchAllImages()
  const themes = await fetchAllThemes()
  const publications = await fetchAllPublications()

  return {
    props: {
      events,
      images,
      themes,
      publications
    },
  }
}
