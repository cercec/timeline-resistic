import React from "react";
import Link from "next/link";

export default function DrawerBibliography({event, bibliography_list}) {
  return (
    <div className="drawer drawer-bibliographie">
      <div className="drawer-content">
        <i className="icon-close" onClick={event} />
        <div className="title-wrapper">
          <h2>Publications</h2>
          <Link href="/bibliographie" className="button full">Voir toutes les publications</Link>
        </div>
        <ul className="drawer-bibliographie-list">
          {bibliography_list}
        </ul>
      </div>
    </div>
  )
}
