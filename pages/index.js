import Template from "../Components/Template";
import React from "react";
import Link from "next/link";
import {fetchAllEvents, pushDataToAlgolia} from "../utils/fetchers";
import Menu from "../Components/Menu";

export default function Home() {
  return (
    <Template classNamePage="home" pageName="Accueil">
      <div className="home-wrapper">
        <div className="intro">
        </div>
        <div className="home-menu">
          <Menu/>
        </div>
      </div>
    </Template>
  )
}

export async function getStaticProps() {
  const events = await fetchAllEvents()

  await pushDataToAlgolia(events.all_events.data)
  return {
    props: {
      events,
    },
  }
}