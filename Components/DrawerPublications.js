export default function DrawerPublications({event, publication_list}) {
  return (
    <div className="drawer drawer-publication">
      <div className="drawer-content">
        <i className="icon-close" onClick={event} />
        <h2>Publications</h2>
        <ul className="drawer-publication-list">
          {publication_list}
        </ul>
      </div>
    </div>
  )
}
