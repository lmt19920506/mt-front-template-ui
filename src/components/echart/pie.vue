<template>
  <section style="height: 100%" :style="{height: isFull ? '90vh' : '100%'}">
    <div ref="echartsContainer" class="pieChartBox"></div>
  </section>
</template>

<script>
import echarts from 'echarts';
export default {
  props: {
    pieChartData: {
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
    this.$nextTick(() => {
      this.initPieChart()
    })
  },
  methods: {
    initPieChart() {
      const myChart = echarts.init(this.$refs.echartsContainer)
      myChart.setOption({
        title: {
          text: this.pieChartData.title || ''
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal', // 图例列表的布局朝向。'horizontal'和'vertical'
          left: 'left',
          right: '20', // 图例组件离容器左侧的距离。
          // itemHeight: this.isFull ? '55' : '10'
          type: 'scroll', // 图例的类型.'plain'：普通图例。缺省就是普通图例。'scroll'：可滚动翻页的图例。当图例数量较多时可以使用。
          formatter: function(name) {
            return name
          }
        },
        series: [
          {
            name: this.pieChartData.name,
            type: 'pie',
            radius: '60%', // 饼图的半径
            center: ['50%', '50%'], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
            data: this.pieChartData.seriesData
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      })
      myChart.on('click', function(param) {
        console.log('pie click---', param)
      })
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  },
  watch: {
    isFull: {
      handler: function() {
        this.$nextTick(() => {
          echarts.init(this.$refs.echartsContainer).resize()
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.pieChartBox {
  height: 100%
}
</style>
