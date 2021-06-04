import axios from 'axios' // 引入 刚建的axios文件
import { Message } from 'element-ui'
// 创建axios实例
axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: axios.defaults.baseURL, // api的base_url
  timeout: 120000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers.token = `${sessionStorage.getItem('token')}`
    return config
  },
  error => {
    // Do something with request error
    // console.log(error); // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.data.msg == '登陆超时，请重新登陆！' || response.data.msg == '没有登陆，请登录！') {
      window.location.href = '/#/'
    }
    return res
  },
  error => {
    Message({
      message: '服务器异常,请稍后重试',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
