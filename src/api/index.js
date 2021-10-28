import fetch from '@/util/fetch'
import Qs from 'qs'
// let root = '/api' // 'http://36p80a2352.zicp.vip:12713' 'http://192.168.0.183:8081'


let str = window.location.href.split('#')[0]
let root = str.substring(0, str.length - 1) + '/acp'
let URL = str.substring(6, str.length - 1) + '/acp'


// let URL = '192.168.0.111:8989/acp' // 'http://36p80a2352.zicp.vip:12713' // 'http://52run.waview.com.cn:8081' //
export default {
  URL: URL,
  root: root,
  height: document.documentElement.clientHeight,
  projectList (params) {
    //
    return fetch({
      url: root + '/project/list', // 接口路径
      method: 'post',
      params
    })
  },
  // 用例列表
  getTableData (params) {
    //
    return fetch({
      url: root + '/useCases/list', // 接口路径
      method: 'post',
      params
    })
  },
  // 模型管理
  model (params) {
    //
    return fetch({
      url: root + '/model/list', // 接口路径
      method: 'post',
      params
    })
  },
  modelDetails (params) {
    //
    return fetch({
      url: root + '/modelDetails/list', // 接口路径
      method: 'post',
      params
    })
  },
  axios (opt) {
    if (opt.type == 'json') {
      return fetch({
        url: root + opt.url, // 接口路径
        method: 'post',
        data: opt.params
      })
    } else {
      return fetch({
        url: root + opt.url, // 接口路径
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: Qs.stringify(opt.params)
      })
    }
  }
}
