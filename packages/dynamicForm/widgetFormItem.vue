<template>
  <el-form-item class="widget-view"
    v-if="element && element.key"
    :label="element.name"
    :class="[element.key == selectWidget.key ? 'active' : '', element.options.required ? 'is_req' : '']"
    @click.native.stop="handleSelectWidget(index)"
  >
    <template v-if="element.type === 'input'">
      <el-input
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.disabled"
        >
      </el-input>
    </template>
    <template v-if="element.type === 'textarea'">
      <el-input
        type="textarea"
        v-model="element.options.defaultValue"
        :stye="{width: element.options.width}"
      ></el-input>
    </template>
    <template v-if="element.type === 'number'">
      <el-input-number v-if="element.type === 'number'"
        v-model="element.options.defaultValue"
      ></el-input-number>
    </template>
     <template v-if="element.type === 'radio'">
      <el-radio-group v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
      >
        <el-radio
          v-for="(item, index) in element.options.options" :key="item.value + index"
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          >
            {{element.options.showLabel ? item.label : item.value}}
          </el-radio>
      </el-radio-group>
    </template>
    <template v-if="element.type === 'checkbox'">
      <el-checkbox-group v-model="element.options.defaultValue">
        <el-checkbox
          v-for="(item, index) in element.options.options"
          :style="{'display': element.options.inline ? 'inline-block': 'block'}"
          :key="item.value + index"
          :label="item.value"></el-checkbox>
      </el-checkbox-group>
    </template>
    <template v-if="element.type === 'time'">
      <el-time-picker v-model="element.options.defaultValue"
        :arrow-control="element.options.arrowControl"
        :isRange="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholde="element.options.startPlaceholder"
        :end-placeholde="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :clearable="element.options.clearable"
        :style="{width: element.options.width}"
      ></el-time-picker>
    </template>
    <template v-if="element.type === 'date'">
      <el-date-picker v-model="element.options.defaultValue"></el-date-picker>
    </template>

    <div class="widget-view-action">
      <i class="el-icon-document-copy"></i>
      <i class="el-icon-delete" @click.stop="handleWidgetDelete(index)"></i>
    </div>
    <div class="widget-view-drag">
      <i class="el-icon-rank drag-widget"></i>
    </div>
  </el-form-item>
</template>

<script>
export default {
  props: ['element', 'index', 'data', 'select'],
  data() {
    return {
      selectWidget: this.select
    }
  },
  methods: {
    handleSelectWidget(index) {
      console.log('handleSelectWidget---', index)
      this.selectWidget = this.data.list[index]
    },
    handleWidgetDelete(index) {
      console.log('delete---', index)
      if (this.data.list.length - 1 == index) { // 点击的是最后一项
        if (index == 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index -1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }
      this.$nextTick(() => {
        this.data.list.splice(index, 1)
      })
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget(val) {
      this.$emit('update:select', val)
    }
  }
}
</script>

<style>

</style>