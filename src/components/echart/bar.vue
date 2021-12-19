<template>
  <section style="height: 100%" :style="{height: isFull ? '90vh' : '100%'}">
    <div ref="echartsContainer" class="barChartBox"></div>
  </section>
</template>

<script>
import echarts from 'echarts';
export default {
  props: {
    barChartData: {
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
  },
  methods: {
    initLineChart() {
      const myChart = echarts.init(this.$refs.echartsContainer)
      myChart.setOption({
        title: {
          text: this.barChartData.title || ''
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
          tyoe: 'scroll',
          align: this.barChartData.legendAlign || 'left',
          left: 'left',
          data: this.barChartData.legendData
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
        xAxis: {
          type: 'category',
          data: this.barChartData.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: this.barChartData.seriesData
      })
      myChart.on('click', function(param) {
        console.log('click---', param)
      })
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
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
.barChartBox {
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
