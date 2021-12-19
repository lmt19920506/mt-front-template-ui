<template>
  <div class="box-container" style="background: #000">
    <el-row :gutter="30">
      <el-col :span="8">
        <div class="e-item">
          <dv-border-box-10>
            <dv-capsule-chart :config="config" style="width:300px;height:200px" />
          </dv-border-box-10>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      config: {
        data: [
    {
      name: '南阳',
      value: 167
    },
    {
      name: '周口',
      value: 67
    },
    {
      name: '漯河',
      value: 123
    },
    {
      name: '郑州',
      value: 55
    },
    {
      name: '西峡',
      value: 98
    }
  ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .e-item {
    height: 200px;
  }
</style>