import Head from "next/head";
import React from "react";
import Link from "next/link";

export default function Template({children, classNamePage, pageName}) {
  return (
    <div>
      <Head>
        <title>ResisTIC Timeline - {pageName}</title>
        <link rel="icon" href="/logo.png"/>
      </Head>
      <div className={`container ${classNamePage}`}>
        <header>
          <Link href="/">
            <img className="logo" src="/logo.png" alt=""/>
          </Link>
          <nav>
            {classNamePage === "home" ?
              <ul className={classNamePage}>
                <li>Contact</li>
              </ul>
              :
              <ul>
                <li>Timeline</li>
                <li><Link href="/themes">Thèmes</Link></li>
                <li>Publications</li>
                <li>Carte</li>
                <li>Le Projet</li>
                <li>Contact</li>
              </ul>
            }
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