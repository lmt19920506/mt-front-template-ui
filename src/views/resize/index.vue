<template>
  <div class="app-container caseManagementIndex scrollcontainer scrollcontainer_auto" ref="caseManagementIndex">
    <el-select v-model="labelData" placeholder="请选择">
      <el-option :value="selectTree" class="setstyle" disabled>
        <el-tree :data="list" :props="defaultProps" ref="tree" :highlight-current="true" @node-click="handleNodeClick" default-expand-all></el-tree>
      </el-option>
    </el-select>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  name: "caseManagementIndex",
  // import引入的组件需要注入到对象中才能使用PopupTreeInput
  components: {},
  props: [""],
  data() {
    // 这里存放数据
    return {
      labelData: "",
      valueData:"",
      selectTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      list: [{
        id: 1,
        label: '一级 2',
        children: [{
          id: 3,
          label: '二级 2-1',
          children: [{
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2',
          }]
        }, {
          id: 2,
          label: '二级 2-2',
          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2',
          }]
        }]
      }],
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log("flatten(fromData)", this.flatten(this.list));
  },
  // 方法集合
  methods: {
    flatten(arr) {
      return [].concat(...arr.map(item => {
        if (item.children) {
          let arr = [].concat(item, ...this.flatten(item.children));
          delete item.children;
          return arr;
        }
        return [].concat(item);
      }
      ));
    },
    handleNodeClick(data, self, child) {
      console.log('data', data)
      this.labelData = data.label;//展示部分
      this.valueData = data.id;//传参---id
    }
  },
};
</script>
<style lang="scss">
.setstyle {
	min-height: 200px;
	padding: 0 !important;
	margin: 0;
	overflow: auto;
	cursor: default !important;
}
</style>
<style lang="scss" scoped>
</style>

