import axios from 'axios'

export const backendApi = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000
  }
})
