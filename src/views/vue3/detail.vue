<template>
  <div @click="show">detail</div>
</template>

<script>
import {defineComponent, getCurrentInstance} from '@vue/composition-api'
export default defineComponent({
  setup() {
    const show = () => {
      console.log('show')
    }
    const {proxy} = getCurrentInstance()
    console.log('proxy---', proxy.$route)
    return {
      show
    }
  }
})
</script>

<style>

</style>