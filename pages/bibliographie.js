import Template from "../Components/Template";
import {fetchAllBibliographie} from "../utils/fetchers";
import React from "react";

export default function SearchResults({bibliographie}) {
  const bibliographie_list = bibliographie.all_bibliographie.data.map((el, i) => {
    return <li key={`${el}-${i}`} className="hit-item">
      <a href={el.lien_source} target="_blank">
        <div className="hit-item__content">
          <p className="hit-item__date">{el.date}</p>
          <h3 className="hit-item__title">{el.titre}</h3>
        </div>
      </a>
    </li>
  })
  return (
    <Template classNamePage="bibliographie" pageName="Publications">
      <h1>Bibliographie</h1>
      <div className="bibliographie-list-wrapper">
        <ul className="bibliographie-list">
          {bibliographie_list}
        </ul>
      </div>
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

