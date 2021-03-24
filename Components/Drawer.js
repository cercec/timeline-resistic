export default function Drawer({description, data, event, image, title}) {
  const keywords_event = data.mots_cles && data.mots_cles.map((word) => {
    return <span key={`drawer-${word.id}`}>#{word.mot_cle}</span>
  })
  const themes = data.theme_name && data.theme_name.map((e, i) => {
    return e !== "" && <li key={`${e}-${i}`}>{e.replace(/-/g, " ")}</li>
  })
  return (
    <div className="drawer">
      <div className="drawer-content">
        <i className="close" onClick={event} />
        <img src={image && image}/>
        <h2>{title}</h2>
        <div className="drawer-description">{description}</div>
        <div className="drawer-keywords">
          {keywords_event}
        </div>
        <ul className="drawer__themes-list">
          {themes}
        </ul>
      </div>
    </div>
  )
}
