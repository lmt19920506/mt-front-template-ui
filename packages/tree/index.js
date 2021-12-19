
import MtTree from './src/main.vue'

// 为组件添加install方法，用于按需引入
MtTree.install = function(Vue) {
  Vue.component(MtTree.name, MtTree)
}

export default MtTree