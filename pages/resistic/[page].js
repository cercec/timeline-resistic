import React from "react";
import {
  fetchAllBibliographie,
  fetchAllEvents,
  fetchAllImages,
  fetchAllPages,
  fetchAllThemes
} from "../../utils/fetchers";
import Template from "../../Components/Template";
import {slugify} from "../../utils/slugify";
import {useRouter} from "next/router";
import ThemesListItems from "../../Components/ThemesListItems";
import Timeline from "../../Components/Timeline";

export default function Page({bibliographie, events, pages, images, enquetes}) {
  const router = useRouter()
  const {page} = router.query
  const page_data = pages.all_pages.data.find((e) => slugify(e.titre) === page)
  const pageDescription = () => {
    return {__html: page_data.contenu}
  }

  let image_1 = page_data.image_1 !== null && images.files.data.find((image) => page_data.image_1 === image.id);
  let image_2 = page_data.image_2 !== null && images.files.data.find((image) => page_data.image_2 === image.id);
  let image_3 = page_data.image_3 !== null && images.files.data.find((image) => page_data.image_3 === image.id);
  let image_4 = page_data.image_4 !== null && images.files.data.find((image) => page_data.image_4 === image.id);

  return (
    <Template classNamePage="themes" pageName={page_data.titre}>
      {page !== 'mentions-legales' && page !== 'le-projet' ? <div className="themes-wrapper">
        {image_1 && <div className="images">
          <img src={`${image_1 && image_1.data.full_url}`} alt=""/>
          <img src={`${image_2 && image_2.data.full_url}`} alt=""/>
          {image_1 &&
          image_2 &&
          image_3 &&
          image_4 && <div className="square"></div>}
          <img src={`${image_3 && image_3.data.full_url}`} alt=""/>
          <img src={`${image_4 && image_4.data.full_url}`} alt=""/>
        </div>}
        <div className="intro">
          <h1>{page_data.titre}</h1>
          <div dangerouslySetInnerHTML={pageDescription()}/>
          {page === 'enquetes' && <div className="themes-list">
            <ThemesListItems enquetes={enquetes}/>
          </div>}
        </div>
      </div> : <div className="intro">
        <h1 style={{fontSize: '4em', color: '#CECECE'}}>{page_data.titre}</h1>
        <div dangerouslySetInnerHTML={pageDescription()}/>
      </div>
      }
      {page === 'timeline' && <div className="timeline">
        <Timeline datas={events.all_events.data} images={images} bibliographie={bibliographie.all_bibliographie.data}/>
      </div>}
    </Template>
  )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const pages = await fetchAllPages()
  // Get the paths we want to pre-render based on posts
  const paths = pages.all_pages.data.map((page) => ({
    params: {id: page.id.toString(), page: slugify(page.titre)},
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {paths, fallback: false}
}

export async function getStaticProps() {
  const bibliographie = await fetchAllBibliographie()
  const events = await fetchAllEvents()
  const pages = await fetchAllPages()
  const images = await fetchAllImages()
  const enquetes = await fetchAllThemes()
  return {
    props: {
      bibliographie,
      enquetes,
      events,
      pages,
      images
    },
  }
}
