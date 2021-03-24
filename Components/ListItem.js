import {dateFormatter} from "../utils/dateFormat";
import React from "react";

export default function ListItem({event, images}) {
  let image = event.image !== null && images.files.data.find((image) => event.image.id === image.id);
  return <li key={event.titre} id={event.debut.substr(0, 4)} className="timeline-events__list__item"
             onClick={() => {
               showDrawer({
                 show: !drawer.show,
                 id: event.id,
                 image: image && image.data.full_url,
                 drawer_data: event
               })
             }}>
    <div className="timeline-events__list__wrapper">
      <div className="timeline-events__list__item__content">
        <div
          className={`timeline-events__list__item__date${event.fin !== null && event.fin !== event.debut ? ' period' : ''}`}>
          <p>{dateFormatter(event.debut)}</p>
          {event.fin !== null && event.fin !== event.debut && <p><span>-</span><br/>{dateFormatter(event.fin)}</p>}
        </div>
        <h3 className="timeline-events__list__item__title">{event.titre}</h3>
        <p>
          {`${event.description.substr(0, 100)}...`}
        </p>
        <ul>
          {event.categorie.map((e, i) => <li key={e + i}>{e}</li>)}
        </ul>
      </div>
      <img className="timeline-events__list__item__image" src={image ? image.data.thumbnails[3].url : ''} alt=""/>
    </div>
  </li>
}
