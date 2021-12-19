// 导入组件， 必须声明name
import MtBtn from './src/main.vue'

// 为组件添加install方法，用于按需引入
MtBtn.install = function(Vue) {
  Vue.component(MtBtn.name, MtBtn)
}

export default MtBtn