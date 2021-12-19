<template>
<!-- eslint-disable -->
  <el-row>
    <el-col :span="24">
      <span
        class="text-primary cursor"
        @click="showConfiguration = !showConfiguration"
        >{{ showConfiguration ? 'Collapse <<' : 'Advance >>' }}
      </span>
      <collapse-transition>
        <section v-show="showConfiguration">
          <slot></slot>
        </section>
      </collapse-transition>
    </el-col>
  </el-row>
</template>

<script>
import CollapseTransition from './collapse-transition';

export default {
  components: {
    CollapseTransition
  },
  data() {
    return {
      showConfiguration: false
    };
  }
};
</script>

<style lang="scss" scoped>
.text-primary {
  color: #005CB9
}
.cursor {
  cursor: pointer;
}
  
</style>
