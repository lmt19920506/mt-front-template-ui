<template>
  <div class="box-container">
    <P style="color: red">表格自动滚动</P>
    <div class="pump-content" :class="{'slide': slideClass === scrollStart}">
      <div class="pump-list flex-align" v-for="(item, index) in scrollPumpList" :key="index">
          <div class="pump-list-title flex-main">
              <div class="pump-big-title">
                <span class="pump-title-big">{{item.pumpName}}</span>
                <span class="pump-title-time">{{item.recordTime}}</span>
              </div>

              <div class="pump-sub-title">
                <span class="pump-title-sub">提水量</span>
                <span class="pump-title-value">{{item.mainFlowMetering}}</span>
                <span class="pump-title-unit">(m³/s)</span>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapIcon } from './images/svg'
export default {
  data () {
    return {
      scrollPumpList: [],
      mainFlowMeteringList: [
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG9",  pumpName: "西干二泵", recordTime: "2019-12-1", mainFlowMetering: 0},
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG8",  pumpName: "西干一泵", recordTime: "2019-12-2", mainFlowMetering: 0},
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG7",  pumpName: "总干七泵", recordTime: "2019-12-3", mainFlowMetering: 0},
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG6",  pumpName: "总干六泵", recordTime: "2019-12-4", mainFlowMetering: 0},
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG5",  pumpName: "总干五泵", recordTime: "2019-12-5", mainFlowMetering: 0},
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG4",  pumpName: "总干四泵", recordTime: "2019-12-6", mainFlowMetering: 0},
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG3",  pumpName: "总干三泵", recordTime: "2019-12-7", mainFlowMetering: 0},
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG2",  pumpName: "总干二泵", recordTime: "2019-12-8", mainFlowMetering: 0},
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG1",  pumpName: "东干一泵", recordTime: "2019-12-9", mainFlowMetering: 0},
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG10",  pumpName: "崖支一泵", recordTime: "2019-12-10", mainFlowMetering: 0},
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG11",  pumpName: "西干二泵", recordTime: "2019-12-11", mainFlowMetering: 0},
        {pumpId: "WERER-34DSFS-3434-SFSD-SDFG12",  pumpName: "绿化四泵", recordTime: "2019-12-12", mainFlowMetering: 0},
      ],
      scrollNum: 4,
      slideClass: false,
      scrollStart: 0,
    }
  },
  methods: {
    getScrollList () {
      const _self = this
      if (!this.mainFlowMeteringList) return
      let pumpList = JSON.parse(JSON.stringify(_self.mainFlowMeteringList))
      _self.scrollNum = pumpList.length
      const scrollIndex = (() => {
          let sindex = []
          _self.scrollPumpList = []
          for (let i = 0; i < pumpList.length; i++) {
              sindex.push(i)
              _self.scrollPumpList.push(pumpList[i])
          }
          _self.scrollPumpList.push(pumpList[0])
          sindex = sindex.concat(sindex)
          return sindex
      })()

      this.$nextTick(() => {
        this.scrollInterval = setInterval(( )=> {
          let flag = 0
          pumpList = JSON.parse(JSON.stringify(_self.mainFlowMeteringList))
          scrollIndex.forEach(item => {
          if (!flag && item === _self.scrollStart) flag = 1
            if (flag && flag <= _self.scrollNum) {
              for (let i in pumpList[item]) {
                _self.$set(_self.scrollPumpList[flag - 1], i, pumpList[item][i])
              }
            }
            if (flag) flag += 1
          })

          _self.scrollStart = _self.scrollStart + 1 < pumpList.length ? _self.scrollStart + 1 : 0
          _self.scrollTimeOut = setTimeout(() => {
            _self.slideClass = _self.scrollStart
          }, 2500)

          if (_self.slideClass == _self.scrollStart) clearTimeout(_self.scrollTimeOut)
        }, 3000)
      })
    },
  },
  created () {
    this.getScrollList()
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  // height: calc(100% - 50px);
  // background: red
  height: 100%;
}


.pump-content {
  position: relative;
  height: 50%;
  width: 15%;;
  margin-left: .3rem;
  overflow: hidden;
  border: 1px solid red;
  // padding: 10px;
            
  .pump-map-icon {
      width: 30px;
      height: 30px;
      margin-right: .1rem;
      border-radius: 100%;
      text-align: center;
      line-height: 35px;
      background-color: rgba(69, 117, 226, .6);
  }
            
  .pump-list {
      padding-top: .25rem;
      align-items: flex-start;
      line-heig
      &:first-of-type {
          padding: 0;
      }
  }
            
  &.slide {
      .pump-list {
          transition: all .25s;
          transform: translateY(-100%);
      }
  }

  .pump-list-title {
      overflow: hidden;
  }
            
  .pump-title-big {
      font-size: .16rem;
      // color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
            
  .pump-title-time {
    font-size: .14rem;
    color: #a3bde0;
  }

  .pump-title-sub {
    font-size: .16rem;
    color: #a3bde0;
  }

  .pump-title-value {
    font-size: .18rem;
    font-weight: bold;
    color: #e5af07;
  }

  .pump-title-unit {
    font-size: .14rem;
    color: #fff;
  }
}
</style>

