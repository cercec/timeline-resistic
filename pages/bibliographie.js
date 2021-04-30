import Template from "../Components/Template";
import {fetchAllBibliographie} from "../utils/fetchers";
import React from "react";

export default function SearchResults({bibliographie}) {
  const bibliographie_list = bibliographie.all_bibliographie.data.map((el, i) => {
    return <li key={`${el}-${i}`} className="hit-item">
      <div className="hit-item__content">
        <h3 className="hit-item__title">{el.titre}</h3>
        <a href={el.lien_source} target="_blank" className="hit-item__cta button empty">Voir plus</a>
      </div>
    </li>
  })
  return (
    <Template classNamePage="bibliographie" pageName="Publications">
      <h1>Bibliographie</h1>
      <ul className="bibliographie-cards">
        {bibliographie_list}
      </ul>
    </Template>
  )
}

export async function getStaticProps() {
  const bibliographie = await fetchAllBibliographie()

  return {
    props: {
      bibliographie
    },
  }
}

