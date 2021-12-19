import MtQuillEditor from './src/main.vue'

MtQuillEditor.install = function(Vue) {
  Vue.component(MtQuillEditor.name, MtQuillEditor)
}

export default MtQuillEditor