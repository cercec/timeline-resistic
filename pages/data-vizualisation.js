import GoogleMapReact from 'google-map-react';
import React, {useState} from "react";
import RoomIcon from '@material-ui/icons/Room';
import {fetchAllCategories, fetchAllDataViz, fetchAllEvents} from "../utils/fetchers";
import Drawer from "../Components/Drawer";
import Template from "../Components/Template";
import Chart from "../Components/Chart";

export default function DataVizualisation({categories, dataviz, events}) {
  const [drawer, showDrawer] = useState({show: false})
  const graphDescription = () => {
    return {__html: dataviz.all_dataviz.data[0].contenu}
  }

  return (
    <Template
      className="default-page"
      pageName={dataviz.all_dataviz.data[0].titre}
    >
      <h1>{dataviz.all_dataviz.data[0].titre}</h1>
      <div className="chart">
        <Chart data={events} categories={categories.categoriesList}/>
        <div dangerouslySetInnerHTML={graphDescription()}/>
      </div>
    </Template>
  )
}

export async function getStaticProps() {
  const categories = await fetchAllCategories()
  const events = await fetchAllEvents()
  const dataviz = await fetchAllDataViz()

  return {
    props: {
      categories,
      dataviz,
      events
    },
  }
}
