import axios from 'axios'

export const API_BASE_URL = 'http://103.164.191.212:8082'

export const api = axios.create({
  baseURL: API_BASE_URL
})
