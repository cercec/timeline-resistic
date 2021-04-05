import React, {useState} from "react";
import DrawerBibliography from "./DrawerBibliography";
import Link from "next/link";

export default function Drawer({bibliographies, description, data, event, image, evenements_id, title}) {
  const [drawerBibliography, showDrawerBibliography] = useState({show: false, bibliographies: []})
  const keywords_event = data.mots_cles && data.mots_cles.map((word) => {
    return <span key={`drawer-${word.id}`}>#{word.mot_cle}</span>
  })
  const themes = data.theme_name && data.theme_name.map((e, i) => {
    return e !== "" && <li key={`${e}-${i}`}><Link href={`/theme/${data.theme3 && data.theme3[i].themes3_id}?theme_name=${e}`}>{e.replace(/-/g, " ")}</Link></li>
  })
  const bibliography_list = data.bibliographie && data.bibliographie.map((e) => {
    if (e.evenements_id === evenements_id) {
      return bibliographies.map((el) => {
        return e.bibliographies_id === el.id && <li className="hit-item">
          <div className="hit-item__content">
            <h3 className="hit-item__title">{el.titre}</h3>
            <p className="hit-item__description">
              {el.description}
            </p>
            <a href={el.lien_bibliographique} target="_blank" className="hit-item__cta button empty">Voir plus</a>
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
        {bibliography_list.length > 0 && <div className="drawer-button"><a className="button empty" onClick={() => showDrawerBibliography({ show: !drawerBibliography.show})}>Aller plus loin</a></div>}
      </div>
      {drawerBibliography.show && <DrawerBibliography bibliography_list={bibliography_list} event={() => showDrawerBibliography({
        show: !drawerBibliography.show,
      })}/>}
    </div>
  )
}
