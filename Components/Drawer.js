import React, {useState} from "react";
import DrawerPublications from "./DrawerPublications";

export default function Drawer({publications, description, data, event, image, evenements_id, title}) {
  const [drawerPublications, showDrawerPublications] = useState({show: false, publications: []})

  const keywords_event = data.mots_cles && data.mots_cles.map((word) => {
    return <span key={`drawer-${word.id}`}>#{word.mot_cle}</span>
  })
  const themes = data.theme_name && data.theme_name.map((e, i) => {
    return e !== "" && <li key={`${e}-${i}`}>{e.replace(/-/g, " ")}</li>
  })
  const publication_list = data.autres_publications.map((e) => {
    if (e.evenements_id === evenements_id) {
      return publications.map((el) => {
        return e.publications_id === el.id && <li className="hit-item">
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
    }
  });
  return (
    <div className="drawer">
      <div className="drawer-content">
        <i className="icon-close" onClick={event} />
        <img src={image && image}/>
        <h2>{title}</h2>
        <div className="drawer-description">{description}</div>
        <div className="drawer-keywords">
          {keywords_event}
        </div>
        <ul className="drawer__themes-list">
          {themes}
        </ul>
        {publication_list.length > 0 && <div className="drawer-button"><a className="button empty" onClick={() => showDrawerPublications({ show: !drawerPublications.show})}>Aller plus loin</a></div>}
      </div>
      {drawerPublications.show && <DrawerPublications publication_list={publication_list} event={() => showDrawerPublications({
        show: !drawerPublications.show,
      })}/>}
    </div>
  )
}
