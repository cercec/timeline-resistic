import {dateFormatter} from "../utils/dateFormat";
import React from "react";

export default function ListItem() {
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
}
