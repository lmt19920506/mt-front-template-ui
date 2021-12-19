import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Main'
Vue.use(VueRouter)

const commonRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login')
  }
]
// 本地所有的页面,需要配合后台返回的数生成页面
/*初始路由 */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: commonRoutes,
})

export default router

/*准备动态添加的路由 */
export const DynamicRoutes = [
  {
    path: '/',
    name: 'container',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      name: '首页'
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard')
      }
    ]
  },
  // {
  //   path: '/show',
  //   name: 'Show',
  //   component: () => import('@/views/debugger/show')
  // }
]
