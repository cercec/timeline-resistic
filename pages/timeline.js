import {fetchAllEvents, fetchAllImages, pushDataToAlgolia} from "../utils/fetchers";
import Timeline from "../Components/Timeline";

export default function ResisticTimeline({events, images}) {
  let categories = [];
  events.all_events.data.map((event) => {
    event.categorie && event.categorie.map((cat) => {
      cat !== "" && categories.indexOf(cat) === -1 && categories.push(cat)
    })
  });
  return <Timeline categories={categories} events={events.all_events.data} images={images}/>
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
