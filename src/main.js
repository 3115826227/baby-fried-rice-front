// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
// import store from 'store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import * as ipTools from './assets/js/ipTools.js'
Vue.prototype.$axios = axios.create({
  headers: {
    // 'content-type': 'application/json'
    // 'Access-Control-Allow-Origin': '*'
    // 'Access-Control-Allow-Headers': 'X-Requested-With'
    // 'Access-Control-Allow-Methods': '*'
  },
  baseURL: 'http://localhost:8070/api',
  timeout: 5000
})
Vue.prototype.$axios.interceptors.request.use(
  config => {
    // if (store.state.user.token) {
    //   config.headers.Authorization = `${store.state.user.token}`
    // }
    let ip = sessionStorage.getItem('ip')
    let area = sessionStorage.getItem('area')
    let brower = ipTools.GetCurrentBrowser()
    let os = ipTools.GetOs()
    config.headers.IP = ip
    config.headers.Area = encodeURI(area)
    config.headers.Brower = brower
    config.headers.OS = os
    console.log(ip, area, brower, os)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
Vue.prototype.$axios.interceptors.response.use(
  response => {
    console.log(response.data)
    return response
  },
  // 接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error) // 返回接口返回的错误信息
  }
)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
