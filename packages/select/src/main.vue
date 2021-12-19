<template>
  <el-select v-model="selectVal">
    <el-option v-for="(item, index) in data" :key="index" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MtSelect',
  props: {
    value: {
      default: ''
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    selectVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style>

</style>