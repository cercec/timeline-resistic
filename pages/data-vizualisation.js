import GoogleMapReact from 'google-map-react';
import React, {useState} from "react";
import RoomIcon from '@material-ui/icons/Room';
import {fetchAllCategories, fetchAllEvents} from "../utils/fetchers";
import Drawer from "../Components/Drawer";
import Template from "../Components/Template";
import Chart from "../Components/Chart";

export default function DataVizualisation({categories, events}) {
  const [drawer, showDrawer] = useState({show: false})

  const Marker = ({text}) => <div>{text}</div>;
  let event_location = events.all_events.data.filter((event) => event.lieu !== null)
  const markers = event_location.map((location) => {
    return <Marker
      key={location.id}
      lat={location.lieu.lat}
      lng={location.lieu.lng}
      text={<RoomIcon onClick={() => {
        showDrawer({
          show: !drawer.show,
          id: location.id,
          image: location.image && location.image.data.full_url,
          drawer_data: location
        })
      }} style={{color: "#f00"}}/>}

    />
  });
  return (
    <Template
      className="default-page"
      pageName="Data Vizualisation"
    >
      <h1>Data Vizualisation des événements</h1>
      <div className="chart">
        <Chart data={events} categories={categories.categoriesList}/>
      </div>
      <h2 style={{ marginTop: '25px', marginBottom: '10px'}}>Carte des événéments</h2>
      <div style={{height: '70vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyAXDXVXNer-nY_Q4ptxj_10pmx2H_xYJZ0'}}
          defaultCenter={{
            lat: 59.95,
            lng: 99.33
          }}
          defaultZoom={2}
        >
          {markers}
        </GoogleMapReact>
        {drawer && drawer.id && (
          <Drawer
            description={drawer.drawer_data.description}
            data={drawer.drawer_data}
            title={drawer.drawer_data.titre}
            image={drawer.image}
            event={() => showDrawer({
              show: !drawer.show,
            })}
          />
        )}
      </div>
    </Template>
  )
}

export async function getStaticProps() {
  const categories = await fetchAllCategories()
  const events = await fetchAllEvents()

  return {
    props: {
      categories,
      events
    },
  }
}