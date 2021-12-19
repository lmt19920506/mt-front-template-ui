<template>
  <div class="layout-editor-container">
    <section class="editor-box">
      <div class="editor-infos-box">
        <div class="infos">
          <div class="limit">limit-total:24</div>
          <div class="real">real-total:24</div>
        </div>
        <div class="controller-btn">
          <el-radio-group v-model="inputsHeight" @change="handleChangeColHeight" size="mini">
            <el-radio-button :label="100"/>
            <el-radio-button :label="150"/>
            <el-radio-button :label="250"/>
            <el-radio-button :label="400"/>
          </el-radio-group>
          <i class="el-icon-more" @click="handleAverage" title="average-layout"/>
          <i class="el-icon-remove" @click="handleRemove" title="remove-layout"/>
          <i class="el-icon-circle-plus" @click="handleAdd" title="add-layout"/>
        </div>
      </div>
      <div class="editor-infos-box suggest">组件高度设置需参考组件基本信息，不正确的高度可能导致显示错误</div>
      <div class="editor-inputs-box">
        <div class="input-item-box" v-for="(ipt, iptIndex) in inputs" :key="iptIndex">
          <el-input :max="24" :min="1" v-model="ipt.value" size="mini"></el-input>
        </div>
      </div>
    </section>
    <section class="layout-preview-box"
      draggable="true"
      @dragstart="handleDragRow($event, inputs)"
      @dragend="hanDragRowEnd($event, inputs)"
    >
      <div class="preview-item"
        v-for="(ipt, iptIndex) in inputs" 
        :key="iptIndex"
        :style="previewColStyle({width: ipt.value, height: ipt.height})"
        >
        {{ipt.value}}
      </div>
    </section>
    <section class="suggest-layout-box">
      <div class="suggest-layout-title">suggest-layouts</div>
      <div
        class="suggest-layout-row"
        v-for="(suggestLayout, suggestLayoutIndex) in suggestLayouts"
        :key="suggestLayoutIndex"
        draggable="true"
        @dragstart="handleDragRow($event, suggestLayout.cols)"
        @dragend="hanDragRowEnd($event, suggestLayout.cols)"
      >
        <div
          class="suggest-layout-row-item"
          v-for="(col, colIndex) in suggestLayout.cols"
          :key="colIndex"
          :style="previewColStyle({width: col.value, height: col.height})"
        >{{col.value}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import colStyle from '@/minins/methods/col-style'
export default {
  mixins: [colStyle],
  data() {
    return {
      inputsHeight: 250,
      inputs: [{height: 250, value: 24}],
      suggestLayouts: [
        {
          cols: [
            {height: 100, value: 4.8},
            {height: 100, value: 4.8},
            {height: 100, value: 4.8},
            {height: 100, value: 4.8},
            {height: 100, value: 4.8}
          ]
        },
        { cols: [{height: 250, value: 16}, {height: 250, value: 8}] },
        { cols: [{height: 250, value: 12}, {height: 250, value: 12}] },
        // { cols: [{height: 250, value: 6}, {height: 250, value: 12}, {height: 250, value: 6}] },
        // { cols: [{height: 250, value: 6}, {height: 250, value: 6}, {height: 250, value: 6}, {height: 250, value: 6}] },
        { cols: [{height: 250, value: 8}, {height: 250, value: 8}, {height: 250, value: 8}] },
        { cols: [{height: 250, value: 24}] },
      ]
    }
  },
  methods: {
    handleChangeColHeight(height) {
      console.log('change---', height)
      this.inputs.forEach(item => item.height = height)
    },
    handleAverage() {
      this.inputs.forEach(item => {
        item.value = 24/this.inputs.length
      })
    },
    handleRemove() {
      if (this.inputs.length <= 1) {
        this.$message({
          type: 'warning',
          message: '至少要一列布局'
        })
        return
      }
      this.inputs.splice(this.inputs.length - 1, 1)
    },
    handleAdd() {
      if (this.inputs.length >= 24) {
        this.$message({
          type: 'warning',
          message: '不能大于24个'
        })
        return
      }
      this.inputs.push({
        height: this.inputsHeight,
        value: 0
      })
    },
    handleDragRow(event, row) {
      this.$emit('drag-row-start', event, row)
    },
    hanDragRowEnd(event, row) {
      this.$emit('drag-row-end', event, row)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-editor-container {
  // background: #eeeeee;
  // position: absolute;
  // z-index: 999;
  // left: 0;
  // top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-flow: column;
  height: 90%;
  padding: 5px;
  // border: 1px solid rgb(44, 61, 79);
  width: 360px;
  box-shadow: 0px 0px 5px #9e9e9e;
  & .editor-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    & .editor-infos-box {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      & .infos {
        margin: 0 5px;
        & div {
          padding: 5px 0
        }
      }
      & .controller-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 18px;
        justify-content: space-between;
        flex: 1;
      }
    }
    & .suggest {
      color: #4caf50;
      font-size: 12px;
    }
    & .editor-inputs-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      // justify-content: space-around;
      flex-wrap: wrap;
      & .input-item-box {
        width: 50px;
      }
    }
  }
  .layout-preview-box {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: all-scroll;
    width: 100%;
    height: 150px;
    & .preview-item {
      border: 1px dashed rgb(44, 61, 79);
      margin: 0 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .suggest-layout-box {
    width: 100%;
    height: 500px;
    // overflow-y: auto;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    & .suggest-layout-row {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin-top: 10px;
      cursor: all-scroll;
      & .suggest-layout-row-item {
        border: 1px dashed rgb(44, 61, 79);
        margin: 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>