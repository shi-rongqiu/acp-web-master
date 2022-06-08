import _ from 'lodash'
import axios from 'axios'
// import Cookies from 'js-cookie'
import Qs from 'qs'
//


export default {
  URL: URL,
  // @todo去缓存
  axios (opt, _this) {
    opt.type = opt.type || 'get'
    let ajax = ''
    if (opt.type === 'get') {
      ajax = axios[opt.type](this.URL + opt.url, {
        params: _.extend(opt.params)
      })
    } else {
      if (opt.headers) {
        var params = opt.params
        ajax = axios({
          headers: opt.headers,
          method: 'post',
          url: this.URL + opt.url,
          data: Qs.stringify(params)
        })
      } else {
        ajax = axios[opt.type](this.URL + opt.url,
          opt.params
        )
      }
    }
    return ajax.then((response) => {
      if (typeof opt.done === 'function') opt.done.call(_this, response.data)
    }).catch((error) => {
      // location.href = '#/404'
    })
  }
}
