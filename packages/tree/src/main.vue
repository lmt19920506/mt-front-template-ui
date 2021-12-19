<template>
  <div style="width: 200px">
    <el-tree :data="data" :props="props" @node-click="treeClick" :show-checkbox="showCheckbox"></el-tree>
  </div>
</template>

<script>
export default {
  name: 'MtTree',
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    props: {
      type: Object,
      default: function () {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    treeClick(data) {
      this.$emit('node-click', data)
    }
  }
};
</script>
