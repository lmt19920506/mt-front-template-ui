<template>
  <section class="w100 h100 default-framework-container">
    <!-- <div class="w100 p-10 search-container">
      <el-form ref="form" size="mini" :model="queryData" label-width="80px">
        <el-form-item label-width="组件规格:">
          <el-col :span="11">
            <el-select
              v-model="queryData.height"
              size="mini"
              clearable
              placeholder="组件高度"
            >
              <el-option
                v-for="(item, itemIndex) in options.heightOptions"
                :key="itemIndex"
                :value="item"
                @change="handleChangeHeight"
              ></el-option>
            </el-select>
          </el-col>
          <el-col class="test-c" :span="2">+</el-col>
          <el-col :span="11">
            <el-select
              v-model="queryData.col"
              size="mini"
              no-data-text="请先选择左侧的组件高度"
              clearable
              placeholder="组件宽度"
            >
              <el-option
                v-for="(item, itemIndex) in options.colOptions"
                :key="itemIndex"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
    </div> -->
    <div class="components-container">
      <section class="components-row" v-for="(component, componentIndex) in componentDatas" :key="componentIndex">
        <div class="components-infos-box">
          <p>{{component.title}}</p>
          <p>
            <span>height: {{component.height}} </span>
            <span>col: {{component.col}}</span>
          </p>
        </div>
        <div class="preview-box">
          <div
            class="preview"
            draggable="true"
            :style="previewColStyle({ width: component.col, height: component.height },{backgroundImage: component.previewImage ? `url(${component.previewImage})` : null})"
            @dragstart="handleDragCol($event, component)"
            @dragend="hanDragColEnd($event, component)"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { rightData } from "./rightData";
import { mapPropAndSortAndDup, filterPropEquals } from "@/utils/ramdaUtil";
import colStyle from '@/minins/methods/col-style'
import * as R from "ramda";
export default {
  mixins: [colStyle],
  data() {
    return {
      componentDatas: [],
      initComponentDatas: [],
      queryData: {
        label: null,
        height: null,
        col: null,
        type: null,
      },
      options: {
        heightOptions: [],
        colOptions: [],
        typeOptions: [],
      },
    };
  },
  methods: {
    handleChangeHeight(height) {
      let { options, queryData } = this;
      queryData.col = null;
      options.colOptions = R.compose(
        mapPropAndSortAndDup("col"),
        filterPropEquals("height", height)
      )(this.initComponentDatas);
    },
    handleDragCol(event, col) {
      console.log('handleDragCol---', col)
      col.title = col.label
      this.$emit('drag-col-start', event, col)
    },
    hanDragColEnd() {
      console.log('end')
    }
  },
  mounted() {
    console.log("rightData---", rightData);
    // console.log("this---", this);
    const { options } = this;
    this.componentDatas = rightData;
    options.heightOptions = mapPropAndSortAndDup("height", rightData);
  },
};
</script>

<style lang="scss" scoped>
.default-framework-container {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-flow: column;
  height: 100%;
  padding: 5px;
  padding-top: 10px;
  box-shadow: 0px 0px 5px #9e9e9e;
  .components-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    flex-flow: column;
    padding: 5px;
    overflow: auto;
    & .components-row {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      box-shadow: 2px 2px 5px rgba(158, 158, 158, 0.4);
      align-items: flex-start;
      flex-flow: wrap;
      padding: 0 5px;
      width: 100%;
      min-height: 200px;
      margin: 5px 0;
      background-color: #f5f5f5;
      & .components-infos-box {
        width: 100%;
      }
      & .preview-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        & .preview {
          border: 1px solid red;
          padding: 5px;
          cursor: all-scroll;
          background-size: 100%;
          background-position: center center;
        }
      }
    }
  }
}
</style>
