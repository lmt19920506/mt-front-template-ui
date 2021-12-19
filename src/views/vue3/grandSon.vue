<template>
  <div>
    <el-button type="primary" @click="toA">GrandSon</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    toA() {
      this.$emit('cToA', '我是从grandson过来的')
    }
  },
  mounted() {
    console.log('grandSon的$attrs---', this.$attrs)
    console.log('grandSon的$listeners---', this.$listeners.click)
  }
}
</script>

<style>

</style>