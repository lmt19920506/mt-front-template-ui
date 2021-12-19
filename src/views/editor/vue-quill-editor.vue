<template>
  <div>
    vue-quill-editor
  </div>
</template>

<script>
import {defineComponent, getCurrentInstance} from '@vue/composition-api'
export default defineComponent({
  setup() {
    console.log(666)
    const {proxy} = getCurrentInstance()
    console.log('proxy---', proxy.$route)
  }
}) 

</script>

<style>

</style>