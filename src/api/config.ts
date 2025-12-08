import axios from 'axios'

// export const API_BASE_URL = 'http://103.164.191.212:8082'
export const API_BASE_URL = 'http://localhost:8080'
export const api = axios.create({
  baseURL: API_BASE_URL
})
