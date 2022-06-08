import axios from 'axios' // 引入 刚建的axios文件
import { Message } from 'element-ui'
// 创建axios实例
axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: axios.defaults.baseURL, // api的base_url
  timeout: 120000 // 请求超时时间
})
let pendingRequests = new Map()

// request拦截器
service.interceptors.request.use(
  config => {
    const requestKey = `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`
    config.headers.token = `${sessionStorage.getItem('token')}`
    if (pendingRequests.has(requestKey)) {
      config.cancelToken = new axios.CancelToken((cancel) => {
        // cancel 函数的参数会作为 promise 的 error 被捕获
        cancel(`重复的请求被主动拦截: ${requestKey}`)
      })
    } else {
      pendingRequests.set(requestKey, config)
      config.requestKey = requestKey
    }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error); // for debug
    pendingRequests.clear()
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    const requestKey = response.config.requestKey
    pendingRequests.delete(requestKey)
    if (response.data.msg == '登陆超时，请重新登陆！' || response.data.msg == '没有登陆，请登录！') {
      window.location.href = '/#/'
    }
    return res
  },
  error => {
    if (axios.isCancel(error)) {
      console.warn(error)
      return Promise.reject(error)
    } else {
      Message({
        message: '服务器异常,请稍后重试',
        type: 'error',
        duration: 5 * 1000
      })
    }
    pendingRequests.clear()
    return Promise.reject(error)
  }
)

export default service
