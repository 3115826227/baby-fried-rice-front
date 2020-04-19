import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

const constantRouter = [
  {
    path: '/index',
    name: '首页',
    component: Index,
    children: [
      {
        path: '/im',
        index: 1,
        name: '通讯',
        component: () => import('../components/Main/im.vue')
      },
      {
        path: '/space',
        index: 2,
        name: '动态',
        component: () => import('../components/Main/space.vue')
      },
      {
        path: '/square',
        index: 3,
        name: '广场',
        component: () => import('../components/Main/square.vue')
      },
      {
        path: '/user',
        index: 4,
        name: '个人中心',
        component: () => import('../components/Main/user.vue')
      }
    ]
  }, {
    path: '/',
    name: '登陆',
    component: Login
  }, {
    path: '/register',
    name: '注册',
    component: Register
  }
]

export default new Router({
  routes: constantRouter
})
