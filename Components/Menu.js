import Link from "next/link";
import {MENU_ITEMS} from "../utils/const";
import {useRouter} from "next/router";

export default function Menu({classNamePage}) {
  const router = useRouter()
  if (classNamePage === "home") {
    return <ul className={classNamePage}>
      <li>Contact</li>
    </ul>
  } else if (classNamePage === false) {
    return;
  } else {
    return <ul>
      {MENU_ITEMS.map((e) => {
        return <li
          className={`${router.asPath.replace('-', '/') === e.url ? 'active' : ''} ${router.route === '/theme/[theme_id]' && e.url === '/resistic/themes' ? 'active' : ''} ${e.url === '/data-vizualisation' && router.route === e.url ? 'active' : ''}`}
          key={e.url}><Link href={e.url}>{e.name}</Link></li>
      })}
    </ul>
  }
}