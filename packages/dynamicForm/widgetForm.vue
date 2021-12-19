<template>
  <div class="widget-form-container">
    <el-form :size="data.config.size" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
      <draggable
        v-model="data.list"
        v-bind="{group: 'people', ghostClass: 'ghost', animation: 200, handle: '.drag-widget'}"
        @add="handleWidgetAdd"
      >
        <transition-group name="fade" tag="div" class="widget-form-list">
          <template v-for="(element, index) in data.list">
            <template>
              <widget-form-item v-if="element && element.key" :key="element.key" :element="element" :index="index" :data='data' :select.sync="selectWidget"></widget-form-item>
              <!-- <widget-form-item :key="index" :element="element"></widget-form-item> -->
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from './widgetFormItem'
export default {
  props: ['data', 'select'],
  components: {
    Draggable, WidgetFormItem
  },
  data() {
    return {
      selectWidget: this.select
    }
  },
  methods: {
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetAdd(evt) {
      console.log('add---', evt)
      const newIndex = evt.newIndex
      // const to = evt.to
      // 给拖拽到容器的元素添加唯一key
      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 9999)
      // console.log('key---', key)
      // console.log('form-data---1', this.data.list[newIndex])
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key: key,
        model: this.data.list[newIndex].type + '_' + key,
        rules: []
      })
      if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox' || this.data.list[newIndex].type === 'select') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            options: this.data.list[newIndex].options.options.map(item => {
              return {...item}
            })
          }
        })
      }
      if (this.data.list[newIndex].type === 'grid') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map(item => ({...item}))
        })
      }
      this.selectWidget = this.data.list[newIndex]
    },
  },
  watch: {
    select(val) {
      console.log('selectWidget---watch', val)
      this.selectWidget = val
    },
    selectWidget(val) {
      this.$emit('update:select', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  .el-form-item {
    display: flex;
    .el-input {
      width: 100%;
      display: inline-block;
      .el-input__inner {
        height: 35px;
      }
    }
  }
}
</style>
<style lang="scss">
$primary-color: #409EFF;
$primary-background-color: #ecf5ff;
.widget-form-list {
  .el-form-item__content {
      width: 100%;
    }
  // draggable 容器样式
  background: #fff;
  // border: 1px dashed #999;
  border: 1px dashed #999;
  min-height: 600px;
  margin: 10px;

  .widget-col-list{
    min-height: 50px;
    border: 1px dashed #ccc;
    background: #fff;
  }

  // 单个item样式
  .widget-view {
    padding-bottom: 18px;
    position: relative;
    border: 1px dashed rgba(170,170,170,0.7);
    background-color: rgba(236, 245, 255, .3);
    margin: 2px;
    &.active{
          outline: 2px solid $primary-color;
          border: 1px solid $primary-color;
        }
    &:hover {
      background: $primary-background-color;
      outline: 1px solid $primary-background-color;
      outline-offset: 0px;

      &.active{
        outline: 2px solid $primary-color;
        border: 1px solid $primary-color;
        outline-offset: 0;
      }
    }
    &:after {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: block;
    }

    // 复制 删除 按钮样式
    .widget-view-action {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 28px;
      line-height: 28px;
      background: $primary-color;
      z-index: 9
    }

    // 拖拽按钮样式
    .widget-view-drag {
      position: absolute;
      left: -30%;
      top: -2px;
      bottom: -18px;
      height: 28px;
      line-height: 28px;
      background: $primary-color;
      z-index: 9;
      i {
        font-size: 14px;
        color: #fff;
        margin: 0 5px;
        cursor: move;
      }
    }
  }

  
}
</style>