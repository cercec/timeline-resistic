import Link from "next/link";
import {MENU_ITEMS} from "../utils/const";
import {useRouter} from "next/router";

export default function Menu({classNamePage}) {
  const router = useRouter()
  console.log(router)

  if (classNamePage === "home") {
    return <ul className={classNamePage}>
      <li>Contact</li>
    </ul>
  } else if (classNamePage === false) {
    return;
  } else {
    return <ul>
      {MENU_ITEMS.map((e) => {
        console.log(e.alias)
        console.log(e.alias && e.alias.indexOf(router.asPath))
        return <li
          className={`
          ${e.alias ? e.alias.indexOf(router.asPath) > -1 || e.alias.indexOf(router.pathname) > -1 ? 'active' : '' : router.asPath === e.url ? 'active' : ''}`}
          key={e.url}><Link href={e.url}>{e.name}</Link></li>
      })}
    </ul>
  }
}