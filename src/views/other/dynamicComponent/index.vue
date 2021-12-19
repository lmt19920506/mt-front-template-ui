<template>
  <div class="box-container">
    <div class="nav-menu">
      <span
        v-for="(item, index) in navList"
        :class="{ active: navActive === index }"
        :key="index"
        @click="tabChange(index)"
        >{{ item }}</span
      >
    </div>
    <div class="show-content">
      <component :is="showComponent"></component>
    </div>
  </div>
</template>

<script>
/*
  tab栏切换
  :is 动态组件切换
*/
import synthesize from "./comp/synthesize";
import floodwarn from "./comp/floodwarn";
import inspect from "./comp/inspect";
import pumpstation from "./comp/pumpstation";
export default {
  components: {
    synthesize,
    floodwarn,
    inspect,
    pumpstation,
  },
  data() {
    return {
      navList: ["综合看板", "防汛预警", "泵站监控", "巡检管理"],
      navActive: 0,
      componentList: ["synthesize", "floodwarn", "pumpstation", "inspect"],
    };
  },
  methods: {
    tabChange(index) {
      if (this.navActive == index) return;
      this.navActive = index;
      this.$nextTick(() => {
        this.$refs.componentItem.resize();
      });
    },
  },
  computed: {
    showComponent() {
      return this.componentList[this.navActive];
    },
  },
};
</script>

<style lang="scss">
.nav-menu {
  display: flex;
  justify-content: space-around;
  height: 60px;
  line-height: 60px;
  // background: chartreuse;
  span {
    // color: #a1bcdf;
    font-size: 20px;
    padding-bottom: 6px;
    // margin-left: 0.57rem;
    cursor: pointer;

    &.active {
      color: #34defc;
      border-bottom: 3px solid#34defc;
    }
  }
}
.show-content {
  box-sizing: border-box;
  height: calc(100% - 60px);
  border: 1px solid yellowgreen
}
</style>
