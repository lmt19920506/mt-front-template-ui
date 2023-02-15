

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/icon/iconfont.css'
import store from './store'
import ElementUI from 'element-ui';
import '@/styles/all.scss'
import '@/styles/var.scss'
import '@/styles/drag-layout.scss'
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'  // 引入data-view
import { scrollToError } from '@/utils/dom.js'
Vue.prototype.$scrollToError = scrollToError

import VueCompositionAPI from '@vue/composition-api'

import formCreate from '@form-create/element-ui'
Vue.use(formCreate)


import _ from 'lodash';
Vue.prototype._ = _;


import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

// import LazyLoadDirective from '@/directive/lazyLoad'
// Vue.use(LazyLoadDirective)

import MTUi from '../packages/index'
Vue.use(MTUi)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(dataV)
Vue.use(VueCompositionAPI)

import monacoInstall from '@/components/MonacoEditor/index.js'
Vue.use(monacoInstall)

import mtForm from 'js-draggable-dynamic-form'
Vue.use(mtForm)

// 路由判断登录 根据路由配置文件的参数

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    console.log('需要登录');
    const isLogin = localStorage.getItem('token')
    if (isLogin) { // 判断当前的token是否存在 ； 登录存入的token
      next();
    } else {
      console.log('fullpath---', to)
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});


new Vue({
  router,
  store,
  created() {
    store.commit("addMenu", router);
  },
  render: h => h(App)
}).$mount('#app')
