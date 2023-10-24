import {
  fetchAllBibliographie,
  fetchAllEvents,
  fetchAllImages,
  fetchAllThemes,
} from "../../utils/fetchers"
import React from "react"
import Timeline from "../../Components/Timeline"
import Template from "../../Components/Template"

export default function Enquetes({ events, images, bibliographie, enquetes }) {
  return (
    <Template classNamePage="timeline theme" pageName="Enquêtes">
      <Timeline
        datas={events.all_events.data}
        images={images}
        bibliographie={bibliographie.all_bibliographie.data}
        enquetes={enquetes}
      />
    </Template>
  )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const enquetes = await fetchAllThemes()
  // Get the paths we want to pre-render based on posts
  const paths =
    (enquetes &&
      enquetes.all_themes.data.map((theme) => ({
        params: {
          enquetes_id: theme.id.toString(),
          enquetes_name: theme.theme,
        },
      }))) ||
    []

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps() {
  const events = await fetchAllEvents()
  const images = await fetchAllImages()
  const enquetes = await fetchAllThemes()
  const bibliographie = await fetchAllBibliographie()

  return {
    props: {
      events,
      images,
      enquetes,
      bibliographie,
    },
  }
}
