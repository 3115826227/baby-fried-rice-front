// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8090/api',
  timeout: 5000
})
axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['X-Real-IP'] = localStorage.getItem('ip')
    config.headers.token = localStorage.getItem('token')
    return config
  },
  success => {
    console.log(success)
  },
  error => {
    alert('请求超时，请稍后重试！')
    return Promise.reject(error)
  }
)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
