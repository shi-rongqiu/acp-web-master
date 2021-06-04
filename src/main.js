// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import ECharts from 'vue-echarts/components/ECharts'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import axios from 'axios'
import echarts from 'echarts'

Vue.prototype.axios = axios
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)

Vue.component('chart', ECharts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  ElementUI,
  axios,
})
