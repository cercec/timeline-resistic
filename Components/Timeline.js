import Template from "../Components/Template";
import React, {useState} from "react";
import {dateFormatter} from "../utils/dateFormat";
import Drawer from "../Components/Drawer";
import {capitalize} from "../utils/capitalize";
import ListItem from "./ListItem";

export default function Timeline({categories, events, images}) {
  const [drawer, showDrawer] = useState({show: false})
  const [showFilters, setShowFilters] = useState({show: false, filterBy: {}})
  const [toggle, setToggleFilter] = useState({})

  let years = [];
  events.map((e) => {
    !years.includes(e.debut.substr(0, 4)) && years.push(e.debut.substr(0, 4))
    !years.includes(e.fin !== null && e.fin.substr(0, 4)) && e.fin !== null && years.push(e.fin.substr(0, 4))
  });


  const Filters = () => {
    return categories.map((cat, i) => {
      console.log(toggle[cat])
      return <li key={`${cat}-${i}`}
                 className={`filters-list__item ${toggle[cat] && toggle[cat].selected !== undefined && toggle[cat].selected ? 'selected' : ''}`}
                 onClick={() => {
                   setShowFilters({
                     show: true,
                     filterBy: {...showFilters.filterBy, [i]: cat}
                   })
                   setToggleFilter(prevState => {
                     return {
                       ...prevState,
                       [cat]: {selected: toggle[cat] && toggle[cat].selected !== undefined && !toggle[cat].selected}
                     }
                   })
                 }}>
        <span className="filters-list__item__label">{capitalize(cat.replace(/-/g, " "))}</span>
      </li>
    });

  }

  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  return (
    <Template classNamePage="timeline" pageName="Timeline">
      <div className="heading">
        <h1>Tous les événements</h1>
        <div className="themes-content">

        </div>
        <div className="filters">
          <div className={`button${showFilters.show ? ' active' : ''}`} onClick={() => {
            setShowFilters({
              show: !showFilters.show,
            })
          }}>
            Filtres
          </div>
          {showFilters.show && <ul className="filters-list"><Filters/></ul>}
        </div>
      </div>
      <div className="timeline-wrapper">
        <ul className="timeline-years">
          {years.sort((a, b) => b - a).map((e) => {
            return <li key={e}><a href={`#${e}`}>{e}</a></li>
          })}
        </ul>
        <div className="timeline-events">
          <ul className="timeline-events__list">
            {Object.size(showFilters.filterBy) > 0 ? Object.values(showFilters.filterBy).map((category) => {
              return events.filter((event) => {
                if (event.categorie.indexOf(category) > -1) {
                  return <ListItem event={event} images={images}/>
                }
              })
            }) : events.map((event) => {
              return <ListItem event={event} images={images}/>
            })}
          </ul>
        </div>
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
    </Template>
  )
}
