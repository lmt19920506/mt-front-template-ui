<template>
  <section style="height: 100%" :style="{height: isFull ? '90vh' : '100%'}">
    <div ref="echartsContainer" class="lineChartBox"></div>
  </section>
</template>

<script>
import echarts from 'echarts';
export default {
  props: {
    lineChartData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    isFull: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.initLineChart()
    // window.addEventListener('resize', this.resizeChart)
  },
  methods: {
    initLineChart() {
      const myChart = echarts.init(this.$refs.echartsContainer)
      myChart.setOption({
        title: {
          text: this.lineChartData.title || ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          type: 'scroll',
          align: this.lineChartData.legendAlign || 'left',
          left: 'left',
          right: '20', // 图例组件离容器左侧的距离。
          // itemHeight: this.isFull ? 50 : 3,
          // textStyle: {
          //   fontSize: this.isFull ? 30 : 18
          // },
          data: this.lineChartData.legendData
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          // right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.lineChartData.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.lineChartData.seriesData
      })
      myChart.on('click', function(param) {
        console.log('click---', param)
      })
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
    // resizeChart() {
    //   echarts.init(this.$refs.echartsContainer).resize();
    // }
  },
  watch: {
    isFull: {
      handler: function(newVal) {
        console.log('this.---', this)
        console.log('new---', newVal)
        this.$nextTick(() => {
          echarts.init(this.$refs.echartsContainer).resize();
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.lineChartBox {
  height: 100%
}
// .full-screen {
//   position: fixed!important;
//   left: 0!important;
//   top: 0!important;
//   bottom: 0!important;
//   right: 0!important;
//   z-index: 9999!important;
// }
// .full-echart-box {
//   width: 100%;
//   height: 90vh!important
// }
</style>
