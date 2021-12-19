import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '@/views/login/login'
import NotFound from '@/pages/errorPage/404'
import Forbidden from '@/pages/errorPage/403'
import Layout from '@/views/Main'
import debuggerRouter from './modules/debuggerRouter'
// import Dashboard from '@/views/dashboard'
Vue.use(VueRouter)

const commonRoutes = [
  {
    path: '/',
    name: 'container',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      name: '首页'
    },
    children: [
      // 固定路由和detail路由放在这，
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard')
      },
      {
        path: '/dataview',
        name: 'dataView',
        component: () => import('@/views/dataView')
      },
      {
        path: '/vue3Test/:id',
        name: 'vue3TestDetail',
        component: () => import('@/views/vue3/detail')
      },
      ...debuggerRouter
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/403',
    component: Forbidden
  },
  {
    path: '/notFind',
    component: NotFound
  }
]
// 本地所有的页面,需要配合后台返回的数生成页面

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: commonRoutes,
})

export default router

export const DynamicRoutes = [
  // 固定路由写在这2
  {
    path: '',
    component: Layout,
    name: 'container',
    redirect: 'dashboard',
    meta: {
      name: '首页',
      icon: ''
    },
    children: [
      {
        id: 1,
        path: '/dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          name: 'Dashboard',
          icon: 'el-icon-s-home'
        }
      },
      {
        id: '2',
        path: '/dataview',
        component: () => import('@/views/dataView/index.vue'),
        meta: {
          name: 'Data View',
          icon: 'el-icon-s-home'
        }
      }
      // {
      //   path: '/debugger',
      //   name: 'Debugger',
      //   component: () => import('@/views/debugger/show'),
      //   meta: {
      //     name: 'Debugger',
      //     icon: 'el-icon-s-home'
      //   }
      // },
    ]
  }
]
