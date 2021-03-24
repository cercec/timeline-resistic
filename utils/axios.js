import axios from "axios"

const axiosDirectus = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 20000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${process.env.DIRECTUS_AUTH_TOKEN}`,
  },
})

export { axiosDirectus }
