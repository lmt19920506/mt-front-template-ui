// 导入单个组件
import MtBtn from './button/index'
import MtTree from './tree/index'
import MtSelect from './select/index'
import MtQuillEditor from './quillEditor/index'
import MtDialog from './dialog/index'
// import Vue from 'vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// 以数组的结构保存组件，便于遍历
const components = [
  MtBtn,
  MtTree,
  MtSelect,
  MtQuillEditor,
  MtDialog
]

// 定义install方法
const install = function(Vue) {
  if (install.installed) return
  install.installed = true
  // 遍历并注册全局组件
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具备一个install方法
  install,
  // 组件列表
  ...components
}