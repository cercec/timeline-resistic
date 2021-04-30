import Link from "next/link";

export default function ThemesListItems({enquetes}) {
  const ThemesListItems = () => {
    return <div className="themes-cards">
      {enquetes.all_themes.data.map((e, i) => {
        let themeDescription = () => {
          return {__html: e.description !== null ? e.description.replace(/(<([^>]+)>)/gi, "").substr(0, 200) + '...' : ''}
        }
        return <div className="card" key={`${e.theme}-${i}`}>
          <h3>{e.theme}</h3>
          <div dangerouslySetInnerHTML={themeDescription()}/>
          <Link href={{
            pathname: '/enquetes/[slug]',
            query: {slug: e.id, enquetes_name: e.theme},
          }}><a className="button full">Voir plus</a>
          </Link>
        </div>
      })}
    </div>
  }
  return <ThemesListItems/>
}
