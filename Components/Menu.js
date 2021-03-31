import Link from "next/link";
import {MENU_ITEMS} from "../utils/const";

export default function Menu({classNamePage}){
  if (classNamePage === "home") {
    return <ul className={classNamePage}>
      <li>Contact</li>
    </ul>
  } else if (classNamePage === false) {
    return;
  } else {
    return <ul>
      {MENU_ITEMS.map((e) => {
        return <li><Link href={e.url}>{e.name}</Link></li>
      })}
    </ul>
  }
}