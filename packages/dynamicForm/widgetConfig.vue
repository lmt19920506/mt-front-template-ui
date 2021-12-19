<template>
  <div class="widgetConfigContainer">
    <el-form label-position="left" v-if="show">
      <el-form-item label="绑定值">
        <el-input v-model="data.model"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="宽度" v-if="Object.keys(data.options).indexOf('width') > -1">
        <el-input v-model="data.options.width"></el-input>
      </el-form-item>
      <el-form-item label="占位类容" v-if="Object.keys(data.options).indexOf('placeholder') > -1">
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="默认值" v-if="Object.keys(data.options).indexOf('defaultValue') > -1">
        <el-input v-model="data.options.defaultValue"></el-input>
      </el-form-item>
      <el-form-item label="校验" v-if="Object.keys(data.options).indexOf('required') > -1">
        <el-checkbox v-model="data.options.required">必填</el-checkbox>
      </el-form-item>
      <el-form-item label="最小值" v-if="Object.keys(data.options).indexOf('min') > -1">
        <el-input-number v-model="data.options.min" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="最大值" v-if="Object.keys(data.options).indexOf('max') > -1">
        <el-input-number v-model="data.options.max" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="步长" v-if="Object.keys(data.options).indexOf('step') > -1">
        <el-input-number v-model="data.options.step" :min="1" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="选项" v-if="Object.keys(data.options).indexOf('options') > -1">
        <el-radio-group v-model="data.options.remote">
          <el-radio-button :label="false">静态数据</el-radio-button>
          <el-radio-button :label="true">远程数据</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-input v-model="data.options.remoteFunc">
              <template slot="prepend">远端方法</template>
            </el-input>
            <el-input v-model="data.options.props.value">
              <template slot="prepend">值</template>
            </el-input>
            <el-input v-model="data.options.props.label">
              <template slot="prepend">标签</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template v-if="data.type === 'radio' || (data.type === 'select' && !data.option.multiple)">
            <el-radio-group v-model="data.options.defaultValue">
              <draggable tag="ul" :list="data.options.options"
                v-bind="{group: {name: 'options'}, ghostClass: 'ghost', handle: '.drag-item'}"
                handle=".drag-item"  
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-radio :label="item.value" style="margin-right: 5px; margin-bottom: 5px">
                    <el-input :style="{'width': data.options.showLabel ? '90px' : '180px'}" size="mini" v-model="item.value"></el-input>
                    <el-input v-if="data.options.showLabel" style="width: 90px" v-model="item.label"></el-input>
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="el-icon-s-grid"></i></i>
                  <el-button type="danger" size="mini" icon="el-icon-minus" @click="deleOption(index)"></el-button>
                </li>
              </draggable>
            </el-radio-group>
            <el-button type="text" @click="addOption">添加</el-button>
          </template>
          <template v-if="data.type === 'checkbox' || (data.type === 'select' && data.options.multiple)">
            <el-checkbox-group v-model="data.options.defaultValue">
              <draggable tag="ul" :list="data.options.options"
                v-bind="{group: {name: 'options'}, ghostClass: 'ghost', handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-checkbox :label="item.value">
                    <el-input :style="{'width': data.options.showLabel ? '90px' : '180px'}" v-model="item.value"></el-input>
                    <el-input style="width: 90px" v-if="data.options.showLable" v-model="item.label"></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px; margin: 0 5px; cursor: move"><i class="el-icon-s-grid"></i></i>
                  <el-button @click="deleOption(index)" type="danger" size="mini" icon="el-icon-minus" style="padding: 4px; margin-left: 5px"></el-button>
                </li>
              </draggable>
            </el-checkbox-group>
            <el-button type="text" @click="addOption">添加</el-button>
          </template>
        </template>
      </el-form-item>
      <template v-if="data.type === 'time' || data.type === 'date'">
          <el-form-item label="显示类型" v-if="data.type === 'date'">
            <el-select v-model="data.options.type">
              <el-option value="year"></el-option>
              <el-option value="month"></el-option>
              <el-option value="date"></el-option>
              <el-option value="dates"></el-option>
              <el-option value="datetime"></el-option>
              <el-option value="datetimerange"></el-option>
              <el-option value="daterange"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="data.options.format"></el-input>
          </el-form-item>
        </template>
        <template v-if="data.type !== 'grid'">
          <el-form-item label="操作属性">
            <el-checkbox v-model="data.options.readonly" v-if="Object.keys(data.options).indexOf('readonly') > -1">只读</el-checkbox>
            <el-checkbox v-model="data.options.disabled" v-if="Object.keys(data.options).indexOf('disabled') > -1">禁用</el-checkbox>
            <el-checkbox v-model="data.options.editable" v-if="Object.keys(data.options).indexOf('editable')">可编辑</el-checkbox>
            <el-checkbox v-model="data.options.clearable" v-if="Object.keys('data.options').indexOf('clearable')">可清除</el-checkbox>
            <el-checkbox v-model="data.options.arrowControl" v-if="Object.keys(data.options).indexOf('arrowControl')> -1">使用箭头进行时间选择</el-checkbox>
          </el-form-item>
        </template>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
export default {
  components: {
    Draggable
  },
  props: ['data'],
  methods: {
    addOption() {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          label: '新选项',
          value: '新选项'
        })
      } else {
        this.data.options.options.push({
          value: '新选项'
        })
      }
    },
    deleOption(index) {
      this.data.options.options.splice(index, 1)
    }
  },
  computed: {
    show() {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss">
.widgetConfigContainer {

}

</style>