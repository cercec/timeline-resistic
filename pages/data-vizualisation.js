import React from "react"
import {
  fetchAllCategories,
  fetchAllDataViz,
  fetchAllEvents,
} from "../utils/fetchers"
import Template from "../Components/Template"
import Chart from "../Components/Chart"

export default function DataVizualisation({ categories, dataviz, events }) {
  const graphDescription = () => {
    return { __html: dataviz.all_dataviz?.data[0].contenu }
  }

  return (
    dataviz.data && (
      <Template
        className="default-page"
        // pageName={dataviz.all_dataviz.data[0].titre}
      >
        <h1>{dataviz.all_dataviz.data[0].titre}</h1>
        <div className="chart">
          <Chart data={events} categories={categories.categoriesList} />
          <div dangerouslySetInnerHTML={graphDescription()} />
        </div>
      </Template>
    )
  )
}

export async function getStaticProps() {
  let categories = []
  let events = []
  let dataviz = []

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
    dataviz = await fetchAllDataViz()
  } catch (error) {
    console.error("Error fetching data visualizations:", error)
  }

  return {
    props: {
      categories: categories || [],
      events: events || [],
      dataviz: dataviz || [],
    },
  }
}
