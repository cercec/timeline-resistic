import Template from "../Components/Template";
import {fetchAllBibliographies} from "../utils/fetchers";
import React from "react";

export default function SearchResults({bibliographies}) {
  const bibliographies_list = bibliographies.all_bibliographies.data.map((el) => {
    return <li className="hit-item">
      <div className="hit-item__content">
        <h3 className="hit-item__title">{el.titre}</h3>
        <p className="hit-item__description">
          {el.description}
        </p>
        <a href={el.lien_bibliographique} target="_blank" className="hit-item__cta button empty">Voir plus</a>
      </div>
    </li>
  })
  return (
    <Template classNamePage="bibliographies" pageName="Publications">
      <h1>Bibliographies</h1>
      <ul>
        {bibliographies_list}
      </ul>
    </Template>
  )
}

export async function getStaticProps() {
  const bibliographies = await fetchAllBibliographies()

  return {
    props: {
      bibliographies
    },
  }
}

