<template>
  <div class="box-container ps-r layout-container">
    <div class="flex flex-center mr-center title title-show">
      <span>pleace enter the report name</span>
      <el-button>预览</el-button>
    </div>
    <div class="drag-container flex flex-around">
      <div class="center-container mr-center report">
        <section class="ps-r flex flex-column mt-10 layout-row"
          v-for="(row, rowIndex) in dragReportData.children"
          :key="rowIndex"
          :style="rowStyle(row)"
          style="margin-top: 30px"
          draggable="true"
          @drop="handleDropRow($event, row)"
          @dragstart="handleDragRow($event, row)"
          @dragover="handleDragOver($event, row)"
          @mouseenter="mouseenterRow(row)"
          @mouseleave="mouseleaveRow(row)"
        > 
          <!-- 中间已存在的行，拖动进行排序。但是拖动行和拖动每一行里面的每个col会存在冲突， -->
          <!-- 因此目前实现是对行的每个col拖动进行排序， -->
          <!-- 如果要对已存在的行进行拖动排序，把这个放出来即可，放到上面的事件中去 -->
          <!-- @dragstart="handleDragRow($event, row)"     -->
          <!-- <div class="text-r" style="width: 100%; height: 20px">X</div> -->
          <transition name="slide-fade">
            <div
              class="ps-a border-r5 w100 col-controller-bar text-r"
              style="top: -20px"
              v-show="row.showDeleteIcon"
            >
              <i class="el-icon-delete cur-p color-danger" @click="deleteRow(rowIndex)"></i>
            </div>
          </transition>
          <div class="flex flex-center flex-nowrap">
            <div
              class="flex flex-center ps-r border-r5 layout-col-box"
              :class="{'cur-all': !!col.previewImage}"
              v-for="(col, colIndex) in row.children"
              :style="previewColStyle({width: col.initCol, height: row.initHeight, baseHeight: 1}, {backgroundImage: col.previewImage ? `url(${col.previewImage})` : null})"
              :key="colIndex"
              @mouseenter="col.previewImage ? col.showChildrenControllerBar = true : null"
              @mouseleave="col.showChildrenControllerBar = false"
              @dragstart="handleDragCol($event, col)"
              @dragover="handleDragOver($event, col)"
              @drop="handleDropCol($event, col)"
            >
            <!-- @drop="handleDropCol($event, col)" -->
              <transition name="slide-fade">
                <div
                  class="ps-a border-r5 w100 t0 flex flex-center col-controller-bar"
                  v-show="col.showChildrenControllerBar"
                >
                  <span class="ellipsis bar-title-box">{{col.title}}</span>
                  <span class="bar-title-box cur-p color-danger" @click="resetCol(col)">remove</span>
                </div>
              </transition>
            </div>
          </div>
        </section>
      </div>
      <i class="cur-p ps-a t0 ps-icon-btn el-icon-plus add-row-icon" :style="floatBox" @click="addRow.show=!addRow.show"></i>
      <i class="cur-p ps-a t0 ps-icon-btn el-icon-plus add-col-icon" :style="floatBox" @click="addCol.show = true" ></i>
      <transition name="slide-fade">
        <div class="leftMenuContainer ps-a l0 drag-report-add-box"
          :style="floatBox" v-show="addRow.show"
          @mouseenter="addRow.showControllerBar=true"
          @mouseleave="addRow.showControllerBar=false"
          >
          <transition name="slide-fade">
            <div class="w100 ps-a t0 border-r5 text-r title-box" v-show="addRow.showControllerBar">
              <i class="cur-p el-icon-close" @click="addRow.show = false"/>
            </div>
          </transition>
          <section>
            <left-menu @drag-row-start="handleDragNewRow" v-clickoutside="handleClickoutside(addRow)"></left-menu>
          </section>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="rightMenuContainer ps-a r0"
          :style="floatBox"
          v-show="addCol.show"
          @mouseenter="addCol.showControllerBar = true"
          @mouseleave="addCol.showControllerBar = false"
        >
          <transition name="slide-fade">
            <div class="ps-a w100 t0 border-r5 text-l title-box" v-show="addCol.showControllerBar">
              <i class="el-icon-close" @click="addCol.show = false"/>
            </div>
          </transition>
          <right-menu @drag-col-start="handleDragNewCol" v-clickoutside="handleClickoutside(addCol)"></right-menu>
        </div>
      </transition>
    </div>
    <div class="ps-r">
    <!-- <transition name="slide-fade">
      <left-menu v-show="addRow.show" @drag-row-start="handleDragNewRow"></left-menu>
    </transition> -->
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import colStyle from '@/minins/methods/col-style'
import leftMenu from './comp/leftMenu'
import rightMenu from './comp/rightMenu'
import {getInitRow, getInitCol, PreviewDataToLayoutData, resetIndex} from '@/utils/dragReport'
import {noData, showData} from './comp/data'
import {mixinObjs, diffIndex, deepClone} from '@/utils'
import RightMenu from './comp/rightMenu.vue'
const colSkipArr = ["initCol"];
import clickoutside from "@/directive/clickoutside";
export default {
  mixins: [colStyle],
  directives: { clickoutside },
  components: {
    leftMenu, rightMenu
  },
  data() {
    return {
      // 拖动row何col的内容存储池
      dragData: {
        isRow: false,   // 拖动的如果是row
        isNewRow: false,  // 拖动的是新的row
        isNewCol: false,  // 拖动的是新的col
        col: null,    // col信息
        row: null     // row信息
      },
      dragReportData: {
        title: '',
        children: []
      },
      addRow: {
        show: false,
        showControllerBar: false,
        showDeleteIcon: false
      },
      addCol: {
        show: false,
        showControllerBar: false
      },
      addContainerTop: 30,
      scroll: ''
    }
  },
  computed: {
    floatBox() {
      return { top: `${this.addContainerTop}px` }
    }
  },
  mounted() {
    this.addListener();
    // console.log('showData---' ,showData)
    console.log('noData---' ,noData)
    let [componentDatas = [], reportData = {}] = showData
    console.log('componentDatas---', componentDatas)
    console.log('reportData---', reportData)
    this.dragReportData = PreviewDataToLayoutData(
      reportData,
      componentDatas,
      { showControllerBar: false },
      { showChildrenControllerBar: false }
    )
    if (this.dragReportData && this.dragReportData.length) {
      this.dragReportData.children.forEach(item => {
        item.showDeleteIcon = false
      })
    }
    console.log('dragReportData---', this.dragReportData)
  },
  methods: {
    handleDragNewRow(event, row) {
      console.log('handleDragNewRow---', row)
      this.dragData.isRow = true
      this.dragData.isNewRow = true
      this.dragData.row = getInitRow(row)
      console.log('this.dragData.row---', this.dragData.row)
    },
    rowStyle(row) {
      return { justifyCountent: row.align, height: `${row.initHeight}px` }
    },
    // 拖动已存在的 row 重排时
    handleDragRow(event, row) {
      console.log('drag---', row)
      this.dragData.isRow = true;
      this.dragData.isNewRow = false;
      this.dragData.row = row;
    },
    // 对 dropRow 的函数处理
    handleDropRow(event, drapRow) {
      console.log('handleDropRow---', drapRow)
      if (!this.dragData.isRow) return;
      const { row: dragRow } = this.dragData;
      const { children: rows } = this.dragReportData;
      // 用来限制高度
      // let sum = rows.reduce((pre, curr) => (pre += curr.height), 0);
      if (!this.dragData.isNewRow) {
        // 如果拖拽的不是新的 row
        // 则交换两个 row 的 index，并对 rows 进行 sort
        [dragRow.index, drapRow.index] = [drapRow.index, dragRow.index];
        this.sortRows();
      } else {
        // 如果拖拽的是新的 row
        // 用来限制高度
        // if (sum + dragRow.initHeight > 2300) this.$msg("1_高度超出一页纸");
        // 找出 drapRow 后面的所有 rows，并把他们的 index + 1
        // 为的是拖拽放置的时候能放置在被 drap 的 row 后面
        rows.forEach(row => (row.index > drapRow.index ? row.index++ : null));
        rows.push(mixinObjs(dragRow, { index: drapRow.index + 1 }));
        this.sortRows();
      }
    },
    handleDragNewCol(event, col) {
      this.dragData.isRow = false
      this.dragData.isNewCol = true
      this.dragData.col = col
    },
    // 重排 rows，并会对 index 重新赋值
    sortRows() {
      const { children: rows } = this.dragReportData;
      rows.sort(diffIndex);
      rows.forEach(resetIndex);
    },
    handleDragOver(event) {
      // 默认情况下，对于drop的元素，使用drogover移除默认事件，event.preventDefault()
      event.preventDefault()
    },
    // 拖动一个已存在布局中的 col
    handleDragCol(event, col) {
      console.log('handleDragCol---', col)
      this.dragData.isRow = false;
      this.dragData.isNewCol = false;
      this.dragData.col = col;
    },
    // 放置一个 col
    handleDropCol(event, col) {
      // 如果拖动的是 row，不用管
      if (this.dragData.isRow) return;
      const { col: dragCol } = this.dragData;
      let cacheDragCol = deepClone(dragCol);
      let cacheCol = deepClone(col);
      if (!this.dragData.isNewCol) {
        // 若拖动的 col 不是新 col
        // 有两种情况要考虑，一个是放置的位置没有 col
        // 一个是放置的位置有 col
        // TODO 最好不是用 previewImage 来判断，想办法用其他办法来判断
        if (col.previewImage) {
          // 若放置的位置不是空的，则将两者交换
          this.setCol(cacheDragCol, col);
          this.setCol(cacheCol, dragCol);
        } else {
          // 若放置的位置是空的，则将 col 赋值并重置 from
          this.setCol(dragCol, col);
          this.resetCol(dragCol);
        }
      } else {
        // 若拖动的 col 是新的 col
        // 则只需要将 col 赋值即可
        this.setCol(cacheDragCol, col);
        this.addCol.show = true;
      }
    },
    delCol(col) {
      for (const key in col) {
        if (col.hasOwnProperty(key)) {
          if (colSkipArr.indexOf(key) === -1) {
            this.$delete(col, key);
          }
        }
      }
    },
    setCol(from, to) {
      for (const key in from) {
        if (from.hasOwnProperty(key)) {
          if (colSkipArr.indexOf(key) === -1) {
            this.$set(to, key, from[key]);
          }
        }
      }
    },
    resetCol(col) {
      let init = getInitCol({
        initCol: col.initCol
      });
      this.delCol(col);
      this.setCol(init, col);
    },
    // 防抖函数
    debounce(fn, delay) {
      let timer = null   // 借助闭包
      return function() {
        if(timer) {
          clearTimeout(timer)  // 进入哎分支语句，说明当前正在一个计时过程中，并且又触发了相同时间
        }
        timer = setTimeout(fn, delay)  // time = setTimeout(fn,delay)是一定会执行的，进入该分支说明当前并没有在计时，那么就开始一个计时
      }
    },
    handleListenerScroll() {
      // this.scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.addContainerTop = document.querySelector('.layout-container').scrollTop + 20
      console.log('scrollTop---', this.addContainerTop)
    },
    addListener() {
      // this.$$listeners = { scroll: null };
      // this.$$listeners.scroll = debounce(this.handleListenerScroll, 10);
      window.addEventListener('scroll', this.debounce(this.handleListenerScroll, 20), true)
    },
    handleClickoutside(container) {
      return function() {
        container.show && (container.show = false);
      };
    },
    mouseenterRow(row) {
      console.log('enter')
      row.showControllerBar = true
      row.showDeleteIcon = true
    },
    mouseleaveRow(row) {
      console.log('leave')
      row.showControllerBar = false
      row.showDeleteIcon = false
    },
    deleteRow(index) {
      this.dragReportData.children.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./layout.scss";
.layout-container {
  box-sizing: border-box;
}
.title-show {
  height: 60px;
  font-size: 20px;
}
.drag-container {
  padding: 5px;
  // border: 1px solid rgb(44, 61, 79);
}
.center-container {
  border: 1px dashed rgb(44, 61, 79);
  // flex: 1;
  padding: 5px;
  width: 80%;
  min-height: 200px;
  // width: calc(100% - 350px - 450px - 20px);
}
</style>