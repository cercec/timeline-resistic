import Template from "../Components/Template";
import React, {useState} from "react";
import Link from "next/link";
import {Configure, Hits, InstantSearch, SearchBox} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import {dateFormatter} from "../utils/dateFormat";
import Drawer from "../Components/Drawer";
import TimelineAlgolia from "../Components/TimelineAlgolia";
import {fetchAllEvents, fetchAllImages} from "../utils/fetchers";

export default function SearchResults({events, images}) {
  return (
    <Template classNamePage="search-results" pageName="Résultats de recherche">
      <TimelineAlgolia datas={events.all_events.data} images={images} searchResults/>
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

