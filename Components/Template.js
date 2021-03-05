import Head from "next/head";
import React from "react";
import Link from "next/link";

export default function Template({children, classNamePage, pageName}) {
  const Menu = () => {
    if (classNamePage === "home") {
      return <ul className={classNamePage}>
        <li>Contact</li>
      </ul>
    } else if (classNamePage === false) {
      return;
    } else {
      return <ul>
        <li><Link href="#">Timeline</Link></li>
        <li><Link href="/themes">Thèmes</Link></li>
        <li><Link href="#">Publications</Link></li>
        <li><Link href="#">Carte</Link></li>
        <li><Link href="#">Le Projet</Link></li>
        <li><Link href="#">Contact</Link></li>
      </ul>
    }
  }
  return (
    <div>
      <Head>
        <title>ResisTIC Timeline - {pageName}</title>
        <link rel="icon" href="/logo.png"/>
        <link rel="stylesheet" href="https://use.typekit.net/rxw5tvt.css" />
      </Head>
      <div className={`container ${classNamePage}`}>
        <header>
          <Link href="/">
            <img className="logo" src="/logo.png" alt=""/>
          </Link>
          <nav>
            <Menu/>
          </nav>
        </header>
        {children}
        <footer>
          <ul>
            <li>Mentions légales</li>
          </ul>
        </footer>
      </div>
    </div>
  )
}