<template>
  <div class="main">
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <div>header</div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- <el-footer>footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import commonAside from '@/components/commonAside'
export default {
  name: "Main",
  components: {commonAside}
};
</script>

<style lang="scss" scoped>
  .el-aside {
    background: #005CB9!important
  }
</style>
