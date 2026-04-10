import axios from 'axios'

const baseURL = process.env.VUE_APP_API_BASE_URL || 'https://dummyjson.com'

export const http = axios.create({
  baseURL,
})
