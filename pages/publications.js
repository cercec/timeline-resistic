import Template from "../Components/Template";
import TimelineAlgolia from "../Components/TimelineAlgolia";
import {fetchAllPublications} from "../utils/fetchers";
import React from "react";

export default function SearchResults({publications}) {
  console.log(publications)
  const publication_list = publications.all_publications.data.map((el) => {
    return <li className="hit-item">
      <div className="hit-item__content">
        <h3 className="hit-item__title">{el.titre}</h3>
        <span className="hit-item__author">{`${el.owner.first_name} ${el.owner.last_name}`}</span>
        <p className="hit-item__description">
          {el.description}
        </p>
        <a className="hit-item__cta button empty">Voir plus</a>
      </div>
    </li>
  })
  return (
    <Template classNamePage="publications" pageName="Publications">
      <h1>Publications</h1>
      <ul>
        {publication_list}
      </ul>
    </Template>
  )
}

export async function getStaticProps() {
  const publications = await fetchAllPublications()

  return {
    props: {
      publications
    },
  }
}

