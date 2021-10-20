import React, {useState} from "react";
import DrawerBibliography from "./DrawerBibliography";
import Link from "next/link";

export default function Drawer({bibliographie, description, data, event, image, evenements_id, title}) {
  console.log(data)
  const [drawerBibliography, showDrawerBibliography] = useState({show: false, bibliographie: []})
  const themes = data.theme_name && data.theme_name.map((e, i) => {
    return e !== "" && <li key={`${e}-${i}`}><Link href={`/enquetes/${data.themes && data.themes[i].themes_id}?enquetes_name=${e}`}>{e.replace(/-/g, " ")}</Link></li>
  })
  const bibliography_list = data.bibliographie && data.bibliographie.map((e) => {
    if (e.evenements_id === evenements_id) {
      return bibliographie.map((el, i) => {
        return e.bibliographie_id === el.id && <li key={`${el}-${i}`} className="hit-item">
          <div className="hit-item__content">
            <h3 className="hit-item__title">{el.titre}</h3>
            <p className="hit-item__description">
              {el.description}
            </p>
            <a href={el.lien_source} target="_blank" className="hit-item__cta button empty">Voir plus</a>
          </div>
        </li>
      })
    }
  });
  return (
    <div className="drawer">
      <div className="drawer-content">
        <i className="icon-close" onClick={event} />
        {image && <img src={image}/>}
        <h2>{title}</h2>
        <div className="drawer-description">{description}</div>
        <ul className="drawer__themes-list">
          {themes}
        </ul>
        <div className="drawer__button-wrapper">
          {data.lien_externe && <a href={data.lien_externe} target="_blank" className="hit-item__cta button empty">Source</a>}
          {bibliography_list && bibliography_list.length > 0 && <div className="drawer-button"><a className="button empty" onClick={() => showDrawerBibliography({ show: !drawerBibliography.show})}>Aller plus loin</a></div>}
        </div>
      </div>
      {drawerBibliography.show && <DrawerBibliography bibliography_list={bibliography_list} event={() => showDrawerBibliography({
        show: !drawerBibliography.show,
      })}/>}
    </div>
  )
}
