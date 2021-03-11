import Template from "../Components/Template";
import {
  Hits,
  InstantSearch,
  Configure,
  RefinementList
} from 'react-instantsearch-dom';
import React, {useEffect, useState} from "react";
import {fetchAllEvents, fetchAllImages, pushDataToAlgolia} from "../utils/fetchers";
import algoliasearch from "algoliasearch/lite";
import {dateFormatter} from "../utils/dateFormat";
import Drawer from "../Components/Drawer";
import {capitalize} from "../utils/capitalize";
import {useRouter} from "next/router";

const searchClient = algoliasearch(
  '9CIFY5KJJB',
  '7a71442ebbb7b3bdb975b1fffa64a27b'
);

export default function ResisticTimeline({events, images}) {
  const [drawer, showDrawer] = useState({show: false})
  const [filters, showFilters] = useState({show: false})
  const router = useRouter()
  let years = [];

  events.all_events.data.map((e) => {
    !years.includes(e.debut.substr(0, 4)) && years.push(e.debut.substr(0, 4))
    !years.includes(e.fin !== null && e.fin.substr(0, 4)) && e.fin !== null && years.push(e.fin.substr(0, 4))
  });

  const Hit = ({hit}) => {
    let image = hit.image !== null && images.files.data.find((image) => hit.image.id === image.id);
    return <div id={hit.debut.substr(0, 4)} className="timeline-item" onClick={() => {
      showDrawer({
        show: !drawer.show,
        id: hit.id,
        image: image && image.data.full_url,
        drawer_data: hit
      })
    }}>
      <div className="timeline-item__content">
        <div className={`timeline-item__date${hit.fin !== null && hit.fin !== hit.debut ? ' period' : ''}`}>
          <p>{dateFormatter(hit.debut)}</p>
          {hit.fin !== null && hit.fin !== hit.debut && <p><span>-</span><br/>{dateFormatter(hit.fin)}</p>}
        </div>
        <h3 className="timeline-item__title">{hit.titre}</h3>
        <p>
          {`${hit.description.substr(0, 100)}...`}
        </p>
      </div>
      <img className="timeline-item__image" src={image ? image.data.thumbnails[3].url : ''} alt=""/>
    </div>
  };
  return (
    <Template classNamePage="timeline" pageName="Timeline">
      <InstantSearch
        indexName="resistic"
        searchClient={searchClient}
      >
        <Configure hitsPerPage={events.all_events.data.length}/>
        <div className="heading">
          <h1>Tous les événements</h1>
          <div className="themes-content">

          </div>
          <div className="filters">
            <div className={`button${filters.show ? ' active' : ''}`} onClick={() => {
              showFilters({
                show: !filters.show,
              })
            }}>
              Filtres
            </div>
            {filters.show && <RefinementList
              attribute="categorie"
              className="categories"
              transformItems={items =>
                items.map(item => ({
                  ...item,
                  label: capitalize(item.label.replace(/-/g, " ")),
                }))
              }
            />}
          </div>
        </div>
        <div className="timeline-wrapper">
          <ul className="timeline-years">
            {years.sort((a, b) => b-a).map((e) => {
              return <li key={e}><a href={`#${e}`}>{e}</a></li>
            })}
          </ul>
          <Hits hitComponent={Hit}/>
        </div>
        {drawer && drawer.id && (
          <Drawer
            data={drawer.drawer_data}
            image={drawer.image}
            description={drawer.drawer_data.description}
            title={drawer.drawer_data.titre}
            event={() => showDrawer({
              show: !drawer.show,
            })}
          />
        )}
      </InstantSearch>
    </Template>
  )
}

export async function getStaticProps() {
  const events = await fetchAllEvents()
  const images = await fetchAllImages()

  await pushDataToAlgolia(events.all_events.data)
  return {
    props: {
      events,
      images,
    },
  }
}
