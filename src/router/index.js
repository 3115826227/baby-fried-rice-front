import Vue from 'vue'
// import store from 'store'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login.vue'
import Register from '@/components/Register'
// import productionRoute from './stores/modules/production.js'

Vue.use(Router)

// 不需要权限的路由
// export const constantRoutes = [{
//   path: '/',
//   name: '登陆',
//   component: Login
// }]
const constantRoutes = [
  {
    path: '/index',
    name: '首页',
    component: Index,
    children: [
      {
        path: '/im',
        index: 1,
        name: '聊天',
        component: () => import('../components/Main/im.vue')
      },
      // {
      //   path: '/space',
      //   index: 2,
      //   name: '好友圈',
      //   component: () => import('../components/Main/space.vue')
      // },
      // {
      //   path: '/news',
      //   index: 3,
      //   name: '动态',
      //   component: () => import('../components/Main/news.vue')
      // },
      // {
      //   path: '/discussion',
      //   index: 4,
      //   name: '话题讨论',
      //   component: () => import('../components/Main/discussion.vue')
      // },
      // {
      //   path: '/anonymous',
      //   index: 5,
      //   name: '匿名树洞',
      //   component: () => import('../components/Main/anonymous.vue')
      // },
      // {
      //   path: '/blog',
      //   index: 6,
      //   name: '博客',
      //   component: () => import('../components/Main/blog.vue')
      // },
      // {
      //   path: '/part',
      //   index: 7,
      //   name: '兼职',
      //   component: () => import('../components/Main/part.vue')
      // },
      // {
      //   path: '/market',
      //   index: 8,
      //   name: '淘二手',
      //   component: () => import('../components/Main/market.vue')
      // },
      // {
      //   path: '/square',
      //   index: 9,
      //   name: '校内广场',
      //   component: () => import('../components/Main/square.vue')
      // },
      {
        path: '/user',
        index: 10,
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
console.log(constantRoutes)

// 需要权限的路由
// const asyncRoutes = {
//   path: '/index',
//   name: '首页',
//   component: Index,
//   children: [
//     {
//       path: '/im',
//       index: 1,
//       name: '聊天',
//       component: () => import('../components/Main/im.vue')
//     },
//     {
//       path: '/space',
//       index: 2,
//       name: '好友圈',
//       component: () => import('../components/Main/space.vue')
//     },
//     {
//       path: '/news',
//       index: 3,
//       name: '动态',
//       component: () => import('../components/Main/news.vue')
//     },
//     {
//       path: '/discussion',
//       index: 4,
//       name: '话题讨论',
//       component: () => import('../components/Main/discussion.vue')
//     },
//     {
//       path: '/anonymous',
//       index: 5,
//       name: '匿名树洞',
//       component: () => import('../components/Main/anonymous.vue')
//     },
//     {
//       path: '/blog',
//       index: 6,
//       name: '博客',
//       component: () => import('../components/Main/blog.vue')
//     },
//     {
//       path: '/part',
//       index: 7,
//       name: '兼职',
//       component: () => import('../components/Main/part.vue')
//     },
//     {
//       path: '/market',
//       index: 8,
//       name: '淘二手',
//       component: () => import('../components/Main/market.vue')
//     },
//     {
//       path: '/square',
//       index: 9,
//       name: '校内广场',
//       component: () => import('../components/Main/square.vue')
//     },
//     {
//       path: '/user',
//       index: 10,
//       name: '个人中心',
//       component: () => import('../components/Main/user.vue')
//     }
//   ]
// }
// console.log(asyncRoutes)

const router = new Router({
  routes: constantRoutes
})
// 路由拦截处理
// router.beforeEach((to, from, text) => {
//   // let user = store.state.user.user
//   // let permission = store.state.permission.permissionRoutes
//   // console.log(user)
//   // console.log(store.state)
// })

export default router
