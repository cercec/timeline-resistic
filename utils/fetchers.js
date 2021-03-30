import * as _ from "lodash"
import {axiosDirectus} from "./axios"
import algoliasearch from "algoliasearch"
import React from "react";

const client = algoliasearch(
  `${process.env.APPLICATION_ID}`,
  `${process.env.API_KEY}`
)

const index = client.initIndex("resistic")

export function createExcerpt(description) {
  const regex = /(<([^>]+)>)/gi
  const cleaned_description = description ? description.replace(regex, "") : ""
  const excerpt = _.truncate(cleaned_description, {
    length: 200,
    separator: " ",
  })
  return excerpt
}

export async function fetchAllEvents() {
  try {
    // Get all events via Directus API
    const res_events = await axiosDirectus.get(
      "/items/evenements?sort=debut&fields=*.*"
    )
    const all_events = res_events.data

    let keywords = await fetchAllKeywords();
    let themes = await fetchAllThemes();
    all_events.data.map((event) => {
      event.mots_cles.map((eventKeyword) => {
        keywords.keywords.data.find((keyword) => {
          if (keyword.id === eventKeyword.mots_cles_id) {
            eventKeyword.mot_cle = keyword.mot_cle
          }
        })
      });
      let themes_event = []
      event.theme3.length > 0 && event.theme3.map((el, i) => {
        themes_event[i] = null !== themes.all_themes.data.find((e) => e.id === el.themes3_id).theme && themes.all_themes.data.find((e) => e.id === el.themes3_id).theme;
      })
      event.theme_name = themes_event;
      event.objectID = event.id
      return event;
    });

    return {all_events}
  } catch (e) {
    console.log({message: e})
  }
}

export async function fetchAllUsers() {
  try {
    // Get all users via Directus API
    const res_users = await axiosDirectus.get(
      "/users"
    )
    const all_users = res_users.data

    return {all_users}
  } catch (e) {
    console.log({message: e})
  }
}

export async function fetchAllPages() {
  try {
    // Get pages via Directus API
    const res_pages = await axiosDirectus.get(
      "/items/pages"
    )

    const all_pages = res_pages.data
    return {all_pages}
  } catch (e) {
    console.log({message: e})
  }
}

export async function fetchAllPublications() {
  try {
    // Get publications via Directus API
    const res_publications = await axiosDirectus.get(
      "/items/publications?fields=*.*"
    )

    const all_publications = res_publications.data
    return {all_publications}
  } catch (e) {
    console.log({message: e})
  }
}

export async function fetchAllThemes() {
  try {
    // Get all themes via Directus API
    const res_themes = await axiosDirectus.get(
      "/items/themes3"
    )
    const all_themes = res_themes.data

    return {all_themes}
  } catch (e) {
    console.log({message: e})
  }
}

export async function fetchAllImages() {
  try {
    // Get the image by id
    const res_files = await axiosDirectus.get(
      "/files"
    )
    const files = res_files.data

    return {files}
  } catch (e) {
    console.log({message: e})
  }
}

export async function fetchAllKeywords() {
  try {
    // Get the image by id
    const res_keywords = await axiosDirectus.get(
      "/items/mots_cles"
    )
    const keywords = res_keywords.data

    return {keywords}
  } catch (e) {
    console.log({message: e})
  }
}

export async function fetchAllCategories() {
  try {
    // Get the fields by id
    const res_fields = await axiosDirectus.get(
      "/items/evenements?fields=categorie"
    )
    const fields = res_fields.data
    let categoriesList = [];
    fields.data.map((categories) => {
      categories.categorie.forEach((category) => {
        category !== "" && !categoriesList.includes(category) && categoriesList.push(category)
      })
    })

    return {categoriesList}
  } catch (e) {
    console.log({message: e})
  }
}

export async function pushDataToAlgolia(props) {
  try {
    await index.replaceAllObjects(props, {
      autoGenerateObjectIDIfNotExist: true,
    }).then(({objectIDs}) => {
      // console.log(objectIDs);
    })
  } catch (e) {
    console.log("message", e)
  }
}