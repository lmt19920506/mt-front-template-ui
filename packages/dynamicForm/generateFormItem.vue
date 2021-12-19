<template>
  <el-form-item :label="widget.name">
    <template v-if="widget.type === 'input'">
      <el-input v-model="dataModel"></el-input>
    </template>
    <template v-if="widget.type === 'textarea'">
      <el-input type="textarea" v-model="dataModel"></el-input>
    </template>
    <template v-if="widget.type === 'number'">
      <el-input-number v-model="dataModel" :max="widget.options.max" :min="widget.options.min" :step="widget.options.step" :disabled="widget.options.disabled"></el-input-number>
    </template>
  </el-form-item>
</template>

<script>
export default {
  props: [
    'widget', 'models'
  ],
  data() {
    return {
      dataModel: ''
    }
  },
  mounted() {
    this.dataModel = this.models[this.widget.model]
  },
  watch: {
    dataModel: {
      deep: true,
      handler (val) {
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
        this.$emit('input-change', val, this.widget.model)
      }
    },
    models: {
      deep: true,
      handler (val) {
        this.dataModel = val[this.widget.model]
      }
    }
  }
}
</script>

<style>

</style>