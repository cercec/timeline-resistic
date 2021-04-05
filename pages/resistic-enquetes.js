import Template from "../Components/Template";
import React, {useState} from "react";
import {fetchAllImages, fetchAllThemes} from "../utils/fetchers";
import Link from "next/link";

export default function ResisticEnquetes({enquetes}) {
  const ThemesListItems = () => {
    return <div className="themes-cards">
      {enquetes.all_themes.data.map((e, i) => {
        let themeDescription = () => {
          return {__html: e.description !== null && e.description.replace(/(<([^>]+)>)/gi, "").substr(0, 200) + '...'}
        }
        return <div className="card" key={`${e.theme}-${i}`}>
          <h3>{e.theme}</h3>
          <div dangerouslySetInnerHTML={themeDescription()}/>
          <Link href={{
            pathname: '/enquetes/[slug]',
            query: {slug: e.id, enquetes_name: e.theme},
          }}><a className="button full">Voir plus</a>
          </Link>
        </div>
      })}
    </div>
  }
  return (
    <Template classNamePage="themes-list" pageName="Liste des thèmes">
      <div className="themes-wrapper">
        <h1>Enquêtes</h1>
        <div className="themes-list-item">
          <ThemesListItems/>
        </div>
      </div>
    </Template>
  )
}

export async function getStaticProps() {
  const enquetes = await fetchAllThemes()
  const images = await fetchAllImages()

  return {
    props: {
      enquetes,
      images
    },
  }
}