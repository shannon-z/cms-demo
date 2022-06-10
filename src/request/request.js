import axios from "axios";

const options = {
  baseURL: '/api',
  timeout: 5000
}

const instance = axios.create(options)
instance.interceptors.request.use(req => {
  return req
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
})

export default instance;