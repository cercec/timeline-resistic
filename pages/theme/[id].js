import Timeline from "../../Components/Timeline";
import {fetchEventsByTheme, fetchAllImages, fetchAllThemes} from "../../utils/fetchers";
import React from "react";

export default function Theme({events, images}) {
  let categories = [];
  events.events_by_theme.map((event) => {
    event.categorie && event.categorie.map((cat) => {
      cat !== "" && categories.indexOf(cat) === -1 && categories.push(cat)
    })
  });
  return <Timeline events={events.events_by_theme} categories={categories} images={images}/>
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const themes = await fetchAllThemes()
  // Get the paths we want to pre-render based on posts
  const paths = themes.all_themes.data.map((theme) => ({
    params: { id: theme.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const events = await fetchEventsByTheme(params.id)
  const images = await fetchAllImages()

  return {
    props: {
      events,
      images,
    },
  }
}
