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
          <h1>De 2010 à nos jours, une histoire controversée d'internet en Russie</h1>
          <p className="intro-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci asperiores doloribus, eveniet harum itaque laborum nisi officiis omnis pariatur perspiciatis porro quasi quo repudiandae saepe sed sequi vero voluptas.</p>
          <a href="#" className="button">Lire plus</a>
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