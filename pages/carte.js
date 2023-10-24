import GoogleMapReact from "google-map-react"
import React, { useState } from "react"
import RoomIcon from "@material-ui/icons/Room"
import { fetchAllCategories, fetchAllEvents, fetchMap } from "../utils/fetchers"
import Drawer from "../Components/Drawer"
import Template from "../Components/Template"

export default function Carte({ carte, events }) {
  const [drawer, showDrawer] = useState({ show: false })
  const carteDescription = () => {
    return { __html: carte.carte?.data[0].contenu ?? [] }
  }

  const Marker = ({ text }) => <div>{text}</div>
  let event_location =
    events.all_events?.data.filter((event) => event.lieu !== null) ?? []
  const markers = event_location.map((location) => {
    return (
      <Marker
        key={location.id}
        lat={location.lieu.lat}
        lng={location.lieu.lng}
        text={
          <RoomIcon
            onClick={() => {
              showDrawer({
                show: !drawer.show,
                id: location.id,
                image: location.image && location.image.data.full_url,
                drawer_data: location,
              })
            }}
            style={{ color: "#f00" }}
          />
        }
      />
    )
  })
  return (
    <Template className="default-page" pageName="Carte des événéments">
      <h1>{carte.carte?.data[0].titre}</h1>
      <div style={{ height: "70vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_REACT }}
          defaultCenter={{
            lat: 59.95,
            lng: 49.33,
          }}
          defaultZoom={3}
        >
          {markers}
        </GoogleMapReact>
        {drawer && drawer.id && (
          <Drawer
            description={drawer.drawer_data.description}
            data={drawer.drawer_data}
            title={drawer.drawer_data.titre}
            image={drawer.image}
            event={() =>
              showDrawer({
                show: !drawer.show,
              })
            }
          />
        )}
      </div>
      <div dangerouslySetInnerHTML={carteDescription()} />
    </Template>
  )
}

export async function getStaticProps() {
  let categories = []
  let events = []
  let carte = {}

  try {
    categories = await fetchAllCategories()
  } catch (error) {
    console.error("Error fetching categories:", error)
  }

  try {
    events = await fetchAllEvents()
  } catch (error) {
    console.error("Error fetching events:", error)
  }

  try {
    carte = await fetchMap()
  } catch (error) {
    console.error("Error fetching map:", error)
  }

  return {
    props: {
      categories: categories || [],
      events: events || [],
      carte: carte || {},
    },
  }
}
