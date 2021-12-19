import MtDialog from './src/main.vue'

MtDialog.install = function(Vue) {
  Vue.component(MtDialog.name, MtDialog)
}

export default MtDialog