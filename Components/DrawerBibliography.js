import React from "react";
import Link from "next/link";

export default function DrawerBibliography({event, bibliography_list}) {
  return (
    <div className="drawer drawer-bibliographies">
      <div className="drawer-content">
        <i className="icon-close" onClick={event} />
        <div className="title-wrapper">
          <h2>Publications</h2>
          <Link href="/bibliographies"><a className="button full">Voir toutes les publications</a></Link>
        </div>
        <ul className="drawer-bibliographies-list">
          {bibliography_list}
        </ul>
      </div>
    </div>
  )
}
