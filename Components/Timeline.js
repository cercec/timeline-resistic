import {
  Hits,
  InstantSearch,
  Configure,
  RefinementList, SearchBox, connectRefinementList
} from 'react-instantsearch-dom';
import React, {useState} from "react";
import algoliasearch from "algoliasearch/lite";
import {dateFormatter} from "../utils/dateFormat";
import Drawer from "../Components/Drawer";
import {capitalize} from "../utils/capitalize";
import {useRouter} from "next/router";
import {switchColors} from "../utils/switchColors";
import {extract} from "../utils/extract";

const searchClient = algoliasearch(
  '9CIFY5KJJB',
  '7a71442ebbb7b3bdb975b1fffa64a27b'
);

export default function Timeline({datas, images, bibliographie, searchResults, enquetes}) {
  const [drawer, setDrawer] = useState({show: false, bibliographie: []})
  const [filters, showFilters] = useState({show: false})
  const router = useRouter()
  const {enquetes_id, enquetes_name} = router.query
  let years = [];
  datas.map((e) => {
    !years.includes(e.debut.substr(0, 4)) && e.debut.substr(0, 4) >= 2010 && years.push(e.debut.substr(0, 4))
    !years.includes(e.fin !== null && e.fin.substr(0, 4)) && e.fin !== null && e.fin.substr(0, 4) >= 2010 && years.push(e.fin.substr(0, 4))
  });

  const themeDescription = () => {
    return {__html: enquetes.all_themes.data.find((e) => e.id.toString() === enquetes_id).description}
  }

  const Hit = ({hit}) => {
    let date = <div className={`hit-item__date${hit.fin !== null && hit.fin !== hit.debut ? ' period' : ''}`}>
      {!searchResults ? <><p>{dateFormatter(hit.debut)}</p>
        {hit.fin !== null && hit.fin !== hit.debut && <p><span>-</span><br/>{dateFormatter(hit.fin)}</p>}</> : <>
        <span>{dateFormatter(hit.debut)}</span>
        {hit.fin !== null && hit.fin !== hit.debut && <span><span> - </span>{dateFormatter(hit.fin)}</span>}</>}
    </div>
    let image = hit.image !== null && images.files.data.find((image) => hit.image.id === image.id);
    return <div id={hit.debut.substr(0, 4)} className={`${searchResults ? 'results-item' : 'timeline-item'}`}
                onClick={() => {
                  setDrawer({
                    show: !drawer.show,
                    id: hit.id,
                    image: image && image.data.full_url,
                    drawer_data: hit,
                    bibliographie: hit.bibliographie && hit.bibliographie.find((e) => e) !== undefined && hit.bibliographie.find((e) => e).evenements_id
                  })
                }}>
      <div className="hit-item__content">
        {!searchResults && date}
        <h3 className="hit-item__title">{hit.titre}
          <div className="tooltips-categories">
            {hit.categorie.map((category, i) => {
              if (category !== "") {
                let customColor = switchColors(category)
                return <div key={category + '-' + i} className="hit-item__category">
                  <span className="hit-item__category__tooltiptext">{capitalize(category).replace(/-/g, " ")}</span>
                  <span className="hit-item__category__tooltip" style={{'--category': customColor}}/>
                </div>
              }
            })}
          </div>
        </h3>
        {searchResults && date}
        <p className="hit-item__description">
          {`${extract(hit.description)} ...`}
        </p>
        {searchResults && <a className="hit-item__cta button empty">Voir plus</a>}
      </div>
      {!searchResults && <img className="hit-item__image" src={image ? image.data.thumbnails[3].url : ''} alt=""/>}
    </div>
  };

  const CategoriesRefinementList = ({items, refine, createURL}) => (
    <ul className={`refinement-list categories ${filters.show === false ? 'hide' : ''}`}>
      {items && items.map(item => {
        return <li className={`refinement-list-item ${item.isRefined ? 'refinement-list-item--selected' : ''}`}
                   key={item.label}>
          <a
            className="refinement-list-label"
            href={createURL(item.value)}
            onClick={event => {
              event.preventDefault();
              refine(item.value);
            }}
          >
            <span className="refinement-list-labelText"
                  style={{'--category': switchColors(item.label)}}>{capitalize(item.label.replace(/-/g, " "))}</span>
          </a>
        </li>
      })}
    </ul>
  );

  const CustomRefinementList = connectRefinementList(CategoriesRefinementList);

  return (
    <InstantSearch
      indexName="resistic"
      searchClient={searchClient}
    >
      {enquetes_name && <RefinementList
        attribute="theme_name"
        className="theme-refinement"
        defaultRefinement={[enquetes_name]}
      />}

      <Configure hitsPerPage={datas.length}/>
      {searchResults && <div>
        <SearchBox reset={<i className="icon-close"></i>} autoFocus showLoadingIndicator translations={{
          placeholder: 'Affinez votre recherche...',
        }}/>
        <h1>Résultats de recherche</h1>
      </div>}
      {!searchResults && <div className="heading">
        <div className="filters">
          <div className={`button${filters.show ? ' active' : ''}`} onClick={() => {
            showFilters({
              show: !filters.show,
            })
          }}>
            Filtres
          </div>
          <CustomRefinementList
            attribute="categorie"
          />
        </div>
      </div>}

      <div className={`timeline-wrapper ${enquetes_name ? '' : 'fullwidth'}`}>
        {enquetes_name && <div className="timeline-themes-content">
          <div className="timeline-themes-content-wrapper">
            <p className="upper-heading">Enquêtes</p>
            <h1
              style={{marginBottom: '1em'}}>{enquetes.all_themes.data.find((e) => e.id.toString() === enquetes_id).theme}</h1>
            <div dangerouslySetInnerHTML={themeDescription()}/>
          </div>
        </div>}
        {!enquetes_name && !searchResults && <ul className="timeline-years">
          {years.sort((a, b) => b - a).map((e) => {
            return <li key={e}><a href={`#${e}`}>{e === "2010" ? "Avant 2010" : e}</a></li>
          })}
        </ul>}
        <Hits hitComponent={Hit}/>
      </div>
      {drawer && drawer.id && (
        <Drawer
          bibliographie={bibliographie}
          evenements_id={drawer.bibliographie}
          data={drawer.drawer_data}
          image={drawer.image}
          description={drawer.drawer_data.description}
          title={drawer.drawer_data.titre}
          event={() => setDrawer({
            show: !drawer.show,
          })}
        />
      )}
    </InstantSearch>
  )
}
