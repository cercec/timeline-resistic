import Link from "next/link"
import { MENU_ITEMS } from "../utils/const"
import { useRouter } from "next/router"

export default function Menu({ classNamePage, handleMenu }) {
  const router = useRouter()
  if (classNamePage === "home") {
    return null
  } else if (classNamePage === false) {
    return
  } else {
    return (
      <ul>
        {MENU_ITEMS.map((e) => {
          return (
            <li
              onClick={handleMenu}
              className={`
          ${
            e.alias
              ? e.alias.indexOf(router.asPath) > -1 ||
                e.alias.indexOf(router.pathname) > -1
                ? "active"
                : ""
              : router.asPath === e.url
              ? "active"
              : ""
          }`}
              key={e.url}
            >
              <Link href={e.url}>{e.name}</Link>
            </li>
          )
        })}
      </ul>
    )
  }
}
