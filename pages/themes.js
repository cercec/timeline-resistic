import Template from "../Components/Template";
import React from "react";
import Link from "next/link";

export default function Themes() {
  return (
    <Template classNamePage="themes" pageName="Thèmes">
      <div className="themes-wrapper">
        <div className="images">
          <img src="/themes.png" alt=""/>
          <img src="/themes.png" alt=""/>
          <div className="square"></div>
          <img src="/themes.png" alt=""/>
          <img src="/themes.png" alt=""/>
        </div>
        <div className="intro">
          <h1>Thèmes</h1>
          <p className="intro-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci asperiores doloribus, eveniet harum itaque laborum nisi officiis omnis pariatur perspiciatis porro quasi quo repudiandae saepe sed sequi vero voluptas.</p>
          <Link href="/themes-list"><a className="button full">Voir les thèmes</a></Link>
        </div>
      </div>
    </Template>
  )
}
