<template>
  <!-- <el-button :type="type" :size="size" :loading="loading">
    <slot></slot>
  </el-button> -->
  <el-button v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'MtBtn',
  // props: {
  //   type: {
  //     type: String,
  //     default: 'primary'
  //   },
  //   size: {
  //     type: String,
  //     default: 'medium'
  //   },
  //   loading: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data() {
    return {}
  }
}
</script>