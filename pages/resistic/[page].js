import React from "react";
import Link from "next/link";
import {fetchAllEvents, fetchAllImages, fetchAllPages, fetchAllThemes} from "../../utils/fetchers";
import Template from "../../Components/Template";
import {slugify} from "../../utils/slugify";
import {useRouter} from "next/router";

export default function Page({pages}) {
  const router = useRouter()
  const {page} = router.query
  const page_data = pages.all_pages.data.find((e) => slugify(e.titre) === page)
  const pageDescription = () => {
    return {__html: page_data.contenu}
  }

  return (
    <Template classNamePage="themes" pageName={page_data.titre}>
      {page !== 'mentions-legales' && page !== 'le-projet' ? <div className="themes-wrapper">
        <div className="images">
          <img src="/themes.png" alt=""/>
          <img src="/themes.png" alt=""/>
          <div className="square"></div>
          <img src="/themes.png" alt=""/>
          <img src="/themes.png" alt=""/>
        </div>
        <div className="intro">
          <h1>{page_data.titre}</h1>
          <div dangerouslySetInnerHTML={pageDescription()}/>
          <Link href={`/resistic-${page}`}><a
            className="button full">Voir {page_data.titre === 'Timeline' ? 'la timeline' : 'les thèmes'}</a></Link>
        </div>
      </div> : <div className="intro">
        <h1 style={{ fontSize: '4em', color: '#CECECE'}}>{page_data.titre}</h1>
        <div dangerouslySetInnerHTML={pageDescription()}/>
      </div>
      }
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
  const pages = await fetchAllPages()
  return {
    props: {
      pages,
    },
  }
}