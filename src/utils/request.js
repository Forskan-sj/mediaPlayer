import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})
// console.log(process.env.BASE_API)
// request interceptor
service.interceptors.request.use(
  config => {
    // 添加token
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.status) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data.message)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
