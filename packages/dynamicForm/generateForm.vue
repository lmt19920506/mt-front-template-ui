<template>
  <div>
    <el-form ref="generateForm" label-suffix=":"
    :size="data.config.size" :model="models" :rules="rules"
    :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'"
    >
      <template v-for="(item) in data.list">
        <template v-if="item.type === 'grid'"></template>
        <template v-if="item.type === 'blank'"></template>
        <template v-else>
          <generate-form-item :key="item.key" :widget="item" :rules="rules" :models.sync="models" @input-change="onInputChange"></generate-form-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
import generateFormItem from './generateFormItem'
export default {
  props: [
    'data', 'value'
  ],
  components: {
    generateFormItem
  },
  data() {
    return {
      models: {},
      rules: {}
    }
  },
  mounted() {
    this.generateModle(this.data.list)
  },
  methods: {
    generateModle(genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list)
          })
        } else {
          if (this.value && Object.keys(this.value).indexOf(genList[i].model) > -1) {
            this.models[genList[i].model] = this.value[genList[i].model]
          } else {
            if (genList[i].type === 'blank') {
              this.$set(this.models, genList[i].model, genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : []))
            } else {
              this.models[genList[i].model] = genList[i].options.defaultValue
            }
          }
          if (this.rules[genList[i].model]) {
            this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules.map(item => {
              if (item.pattern) {
                return {...item, pattern: eval(item.pattern)}
              } else {
                return {...item}
              }
            })]
          } else {
            this.rules[genList[i].model] = [...genList[i].rules.map(item => {
              if (item.pattern) {
                return {...item, pattern: eval(item.pattern)}
              } else {
                return {...item}
              }
            })]
          }
        }

      }
    },
    onInputChange(value, field) {
      this.$emit('on-change', field, value, this.models)
    }
  }
}
</script>

<style>

</style>