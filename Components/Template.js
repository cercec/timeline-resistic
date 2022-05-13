import Head from "next/head";
import Link from "next/link";
import MainMenu from "./MainMenu";
import React, {useEffect, useState} from "react";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Close, Menu} from "@material-ui/icons";

export default function Template({children, classNamePage, menuActive, pageName}) {
  const [isTop, backToTop] = useState({show: false})
  const [showMenuBurger, setShowMenuBurger] = useState(false)

  const handleMenu = () => {
    backToTop({show: false})
    setShowMenuBurger(!showMenuBurger)
  }
  useEffect(() => {
    isTop.show && window.scrollTo({top: 0, behavior: 'smooth'});
  });

  return (
    <div className={`${classNamePage === "home" && "home-page"}`}>
      <Head>
        <title>ResisTIC Timeline - {pageName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/logo.png"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <div className={`container ${classNamePage}`}>
        <header>
          <Link href="/">
            <img className="logo" src="/logo.png" alt=""/>
          </Link>
          <nav className="template-nav">
            <MainMenu classNamePage={classNamePage} menuActive={menuActive}/>
            <Link href={'/search-results'}>
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/></svg>
            </Link>
          </nav>
          <div className={`vertical-menu ${showMenuBurger ? 'vertical-menu--open' : ''}`}>
            <MainMenu handleMenu={handleMenu}/>
          </div>
          <div className="burger-button" onClick={handleMenu}>
            {showMenuBurger ? <Close/> : <Menu/>}
          </div>
        </header>
        {children}
        <footer>
          <ul>
            <li><Link href="/resistic/mentions-legales">Mentions légales</Link></li>
          </ul>
        </footer>
        <Fab className="back-to-top" size="small" aria-label="scroll back to top" onClick={() => backToTop({
          show: !isTop.show,
        })}>
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </div>
  )
}
