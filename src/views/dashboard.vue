<template>
  <el-card class="box-container dashboardBox">
    <el-row :gutter="30" class="mb-10">
      <el-col :span="8">
        <el-card :class="{'full-screen': isFull}">
          <div class="echartBox" :class="{'echartBoxFull': isFull}">
            <bar-chart :bar-chart-data="barChartData" :is-full="isFull"></bar-chart>
            <i v-if="!isFull" class="iconfont show-full isZoomIcon" @click="full"></i>
            <i v-else class="iconfont show-suoxiao isZoomIcon" @click="full"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :class="{'full-screen': isFull2}">
          <div class="echartBox" :class="{'echartBoxFull': isFull2}">
            <multiple-line-chart :line-chart-data="multipleLineChart" :is-full="isFull2"></multiple-line-chart>
            <i v-if="!isFull2" class="iconfont show-full isZoomIcon" @click="full2"></i>
            <i v-else class="iconfont show-suoxiao isZoomIcon" @click="full2"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :class="{'full-screen': isFull3}">
          <div class="echartBox" :class="{'echartBoxFull': isFull2}">
            <pie-chart :pie-chart-data="pieChartData" :is-full="isFull3"></pie-chart>
            <i v-if="!isFull2" class="iconfont show-full isZoomIcon" @click="full3"></i>
            <i v-else class="iconfont show-suoxiao isZoomIcon" @click="full3"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="8">
        <el-card :class="{'full-screen': isFull4}">
          <div class="echartBox" :class="{'echartBoxFull': isFull4}">
            <line-chart :line-chart-data="lineChartData" :is-full="isFull2"></line-chart>
            <i v-if="!isFull4" class="iconfont show-full isZoomIcon" @click="full4"></i>
            <i v-else class="iconfont show-suoxiao isZoomIcon" @click="full4"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
// import echarts from 'echarts';
import lineChart from '@/components/echart/line'
import multipleLineChart from '@/components/echart/line-multiple'
import barChart from '@/components/echart/bar'
import pieChart from '@/components/echart/pie'
export default {
  components: {
    lineChart, barChart, pieChart, multipleLineChart
  },
  data() {
    return {
      isFull: false,
      isFull2: false,
      isFull3: false,
      isFull4: false,
      multipleLineChart: {
        color: [
          'rgb(177,111,250)',
          'rgb(16,145,254)',
          'rgb(109,255,168)',
          'rgb(255,173,86)'
        ],
        // title: 'Status Count',
        legendData: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        seriesData: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ],
        name: '饼图数据',
        titleStyle: {
          color: '#525B65'
        }
      },
      lineChartData: {
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        seriesData: [820, 932, 901, 934, 1290, 1330, 1320]
      },
      barChartData: {
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        legendData: ['week'],
        seriesData: [{
          name: 'week',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = [
                  '#5e7e54', '#e44f2f', '#81b6b2', '#eba422', '#5e7e54', '#e44f2f', '#81b6b2', '#eba422', '#5e7e54', '#e44f2f'
                ]
                return colorList[params.dataIndex]
              }
            }
          },
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      },
      pieChartData: {
        name: '饼图数据展示',
        seriesData: [
          {value: 1048, name: '搜索引擎'},
          {value: 735, name: '直接访问'},
          {value: 580, name: '邮件营销'},
          {value: 484, name: '联盟广告'},
          {value: 300, name: '视频广告'}
        ]
      }
    };
  },
  mounted() {
    // window.addEventListener('resize', this.resizeChart);
  },
  methods: {
    full() {
      this.isFull = !this.isFull
    },
    full2() {
      this.isFull2 = !this.isFull2
    },
    full3() {
      this.isFull3 = !this.isFull3
    },
    full4() {
      this.isFull4 = !this.isFull4
    }
  }
};
</script>

<style lang="scss">
.dashboardBox {
  overflow-y: auto;
  .echartBox {
    height: 400px;
    position: relative;
  }
  .cardBox {
    width: 100%;
    height: 100%;
  }
  .full-screen {
    position: fixed!important;
    left: 0!important;
    top: 0!important;
    bottom: 0!important;
    right: 0!important;
    z-index: 9999!important;
  }
  .echartBoxFull {
    width: 100%;
    height: 100%!important
  }
  .isZoomIcon {
    font-size: 20px;
    position: absolute;
    top: 0;
    right: 0;
    /* z-index: 10000; */
  }
}

</style>
