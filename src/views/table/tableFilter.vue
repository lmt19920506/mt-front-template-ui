<template>
  <section class="box-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="前端筛选过滤" name="one">
        <table-filter></table-filter>
      </el-tab-pane>
      <el-tab-pane label="前端去重" name="two">
        <remove-one></remove-one>
      </el-tab-pane>
      <el-tab-pane label="前端去重" name="three">
        <remove-two></remove-two>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import tableFilter from './filterComp/filter'
import removeOne from './filterComp/remoe_save'
import removeTwo from './filterComp/remove_save2'
export default {
  components: {
    tableFilter, removeOne, removeTwo
  },
  data() {
    return {
      activeName: 'one'
    }
  }
}
</script>

<style>

</style>