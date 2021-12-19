<template>
  <div>
    <p>$attrs: {{$attrs}}</p>
    <el-button @click="show">Son</el-button>
    <grandSon v-bind="$attrs" v-on="$listeners" :a="bToC" />
  </div>
</template>

<script>
import grandSon from './grandSon'
export default {
  components: {
    grandSon
  },
  props: {
    value1: {
      type: Number
    }
  },
  mounted() {
    console.log('$listers---', this.$listeners)
  },
  data() {
    return {
      bToC: '我是从son传给grand son的'
    }
  },
  methods: {
    show() {
      this.$emit('show', '从son传给A的数据')
    }
  }
}
</script>

<style>

</style>