import Vue from 'vue'
import Vuex from 'vuex'
// import router from '@/router/index'
import { recursionRouter } from "@/utils/createRoutes";
import dynamicRouter from "@/router/dynamic-router";
import {DynamicRoutes} from '@/router/index'
// import NotFound from '@/pages/errorPage/404'
// import Forbidden from '@/pages/errorPage/403'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarMenu: [] /** 导航菜单 */,
    // 左侧菜单数据
    menuItems: [
      // {
      //   name: 'dashboard', // 要跳转的路由名称 不是路径
      //   icon: '',  // icon
      //   text: 'Dashboard'   // 点击侧边栏跳到一个单独的路由页面，需要提前在 router.js 定义
      // },
      // {
      //   text: 'Table',
      //   icon: '',
      //   children: [
      //     {
      //       name: 'tableAutoScroll',
      //       icon: '',
      //       text: '表格自动滚动',
      //       // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
      //       // hidden: true
      //     },
      //     {
      //       name: 'showTable',
      //       icon: '',
      //       text: 'Show Table'
      //     }
      //   ]
      // }
    ],
    el_: ''  // app.vue页面实例
  },
  mutations: {
    addMenu(state, router) {
      const userList = [
        "table",
        "tableAutoScroll",
        "showTable",
        'sortable',
        "showTableDetail",
        "bpmn",
        "bpmnInit",
        "bpmnHttp",
        "return-goods",
        "bpmnEvent",
        "editor",
        "goods-classify",
        "codeMirror",
        "tinymce",
        "vueQillEditor",
        'dynamicForm',
        'monacoEditorVue',
        'showPicture',
        'tableFilter',
        'other',
        'dynamicComponent',
        'tableMergeRow',
        'showTree',
        'Jsx',
        'draglayout',
        'resize',
        'vue3Test',
        'formCreate',
        'Calendar',
        'WheelScale'
      ];
      const other = ["table","tableAutoScroll"]
      const routes = recursionRouter(userList, dynamicRouter)
      const otherRoutes = recursionRouter(other, dynamicRouter)
      console.log('routes-list---', routes)
      console.log('routes-list---other', otherRoutes)
      // state.menuItems = routes
      const MainContainer = DynamicRoutes.find(v => v.path === '')
      console.log('MainContainer---', MainContainer)
      const children = MainContainer.children
      children.push(...routes)
      // children.push(...otherRoutes)
      state.sidebarMenu = children
      let homeRouter = [
        {path: '/', name: 'container', component: () => import('@/views/Main'), children: []}
      ]
      // console.log('children ---', homeRouter[0].children)
      homeRouter[0].children.push(...routes)
      homeRouter.push({path: '*', redirect: '/notFind'})
      console.log('router---', router)
      router.addRoutes(homeRouter)
    }
  },
  actions: {
  },
  modules: {
  }
})
