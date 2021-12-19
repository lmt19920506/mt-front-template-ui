<template>
  <section class="box-container">
    <el-tabs v-model="tabName">
      <el-tab-pane label="One" name="one">
        <one></one>
      </el-tab-pane>
      <el-tab-pane label="Two" name="two">
        <two></two>
      </el-tab-pane>
      <el-tab-pane label="Three" name="three">
        <three></three>
      </el-tab-pane>
      <el-tab-pane label="Four" name="four">
        <four></four>
      </el-tab-pane>
      <el-tab-pane label="Five" name="five">
        <five></five>
      </el-tab-pane>
      <el-tab-pane label="Six" name="six">
        <six></six>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import one from './tableMergeRowComp/one'
import two from './tableMergeRowComp/two'
import three from './tableMergeRowComp/three'
import four from './tableMergeRowComp/four'
import five from './tableMergeRowComp/five'
import six from './tableMergeRowComp/six'
export default {
  components: {
    one, two, three, four, five, six
  },
  data() {
    return {
      tabName: 'one'
    }
  }
}
</script>

<style>

</style>