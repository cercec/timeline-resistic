import Template from "../Components/Template";
import React, {useState} from "react";
import {fetchAllImages, fetchAllThemes} from "../utils/fetchers";
import Link from "next/link";

export default function ThemesList({images, themes}) {

  const [imageId, setImageId] = useState(false);
  let src = imageId !== null && images.files.data.find((image) => imageId === image.id);
  const ThemesListItems = () => {
    return <ul>
      {themes.all_themes.data.map((e, i) => {
        return <li onMouseEnter={() => setImageId(e.image)} image-id={e.image}
                   key={`${e.theme}-${i}`}><Link href={`/theme/${e.id}`}>{e.theme}</Link></li>
      })}
    </ul>
  }
  return (
    <Template classNamePage="themes-list" pageName="Liste des thèmes">
      <div className="themes-wrapper">
        <h1>Thèmes</h1>
        <div className="themes-list-item">
          <ThemesListItems/>
          <div className="themes-list-image"
               style={{backgroundImage: `url("${src !== undefined && src.data !== undefined && src.data.full_url}")`}}/>
        </div>
      </div>
    </Template>
  )
}

export async function getStaticProps() {
  const themes = await fetchAllThemes()
  const images = await fetchAllImages()

  return {
    props: {
      themes,
      images
    },
  }
}
