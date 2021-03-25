import {
  Hits,
  InstantSearch,
  Configure,
  RefinementList
} from 'react-instantsearch-dom';
import React, {useState} from "react";
import algoliasearch from "algoliasearch/lite";
import {dateFormatter} from "../utils/dateFormat";
import Drawer from "../Components/Drawer";
import {capitalize} from "../utils/capitalize";
import {useRouter} from "next/router";

const searchClient = algoliasearch(
  '9CIFY5KJJB',
  '7a71442ebbb7b3bdb975b1fffa64a27b'
);

export default function TimelineAlgolia({events, images, themes}) {
  const [drawer, showDrawer] = useState({show: false})
  const [filters, showFilters] = useState({show: false})
  const router = useRouter()
  const {id, theme_name} = router.query
  let years = [];
  events.all_events.data.map((e) => {
    !years.includes(e.debut.substr(0, 4)) && years.push(e.debut.substr(0, 4))
    !years.includes(e.fin !== null && e.fin.substr(0, 4)) && e.fin !== null && years.push(e.fin.substr(0, 4))
  });

  const themeDescription = () => {
    return {__html: themes.all_themes.data[id].description}
  }

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
    <InstantSearch
      indexName="resistic"
      searchClient={searchClient}
    >
      {theme_name && <RefinementList
        attribute="theme_name"
        className="theme-refinement"
        defaultRefinement={[theme_name]}
      />}

      <Configure hitsPerPage={events.all_events.data.length}/>
      <div className="heading">
        {!theme_name && <h1>Tous les événements</h1>}
        <div className="filters">
          <div className={`button${filters.show ? ' active' : ''}`} onClick={() => {
            showFilters({
              show: !filters.show,
            })
          }}>
            Filtres
          </div>
          <RefinementList
            attribute="categorie"
            className={`categories ${filters.show === false ? 'hide' : ''}`}
            transformItems={items =>
              items.map(item => ({
                ...item,
                label: capitalize(item.label.replace(/-/g, " ")),
              }))
            }
          />
        </div>
      </div>

      <div className={`timeline-wrapper ${theme_name ? '' : 'fullwidth'}`}>
        {theme_name && <div className="timeline-themes-content">
          <div>
            <p className="upper-heading">Thèmes</p>
            <h1>{themes.all_themes.data.find((e) => e.id.toString() === id).theme}</h1>
            <div dangerouslySetInnerHTML={themeDescription()}/>
          </div>
        </div>}
        {!theme_name && <ul className="timeline-years">
          {years.sort((a, b) => b - a).map((e) => {
            return <li key={e}><a href={`#${e}`}>{e}</a></li>
          })}
        </ul>}
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
  )
}