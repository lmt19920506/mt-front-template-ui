<template>
  <div class="box-container">
    <p>自定义表头</p>
    <el-table :data="tableData" size="mini" border stripe="">
      <el-table-column
        label="name"
        prop="name"
        :render-header="renderHeader"
      ></el-table-column>
      <el-table-column label="age" prop="age"></el-table-column>
      <el-table-column label="sex" prop="sex"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <p>el-tab自定义tab</p>
    <el-tabs v-model="tabActive" type="card">
      <el-tab-pane v-for="item in tabArr" :key="item.id">
        <span slot="label" style="padding: 8px">
          <el-input
            v-if="item.isEdit"
            v-model="item.name"
            style="width: 100%"
          ></el-input>
          <span v-else>{{ item.name }}</span>
          <span @click="editTabName(item)"><i class="el-icon-edit"></i></span>
        </span>
      </el-tab-pane>
    </el-tabs> -->
    <mt-btn type="primary" @click="show">show</mt-btn>
    <mt-dialog :visible.sync="isShowDialog"></mt-dialog>
    <p>table合并行</p>
    <el-table
      :data="tableData2"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）"> </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）"> </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      isShowDialog: false,
      tableData: [
        { name: "tom", age: "10", sex: "男" },
        { name: "mary", age: "12", sex: "女" },
        { name: "lucy", age: "15", sex: "男" },
        { name: "hedy", age: "18", sex: "女" },
        { name: "ailce", age: "20", sex: "男" },
      ],
      tableData2: [
        {
          id: "12987122",
          name: "王小虎1",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎2",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "6",
          name: "王小虎3",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "6",
          name: "王小虎4",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎5",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
      tabActive: 1,
      tabName: "abcd",
      tabArr: [
        { name: "AAAA", id: 1, isEdit: false },
        { name: "BBBB", id: 2, isEdit: false },
        { name: "CCCC", id: 3, isEdit: false },
        { name: "DDDD", id: 4, isEdit: false },
      ],
    };
  },
  methods: {
    show() {
      console.log(111);
      this.isShowDialog = true;
    },
    detail(data) {
      // this.$router.push(`/view/table/tableDetail?name=${data.name}&age=${data.age}&sex=${data.sex}`)
      this.$router.push(`/showTable/${data.name}`);
    },
    renderHeader(h) {
      console.log("h---", h);
      return (
        <div>
          <el-button
            type="primary"
            size="mini"
            style="float: left"
            onClick={() => this.showMsg()}
          >
            Show
          </el-button>
        </div>
      );
    },
    showMsg() {},
    editTabName(data) {
      console.log("editTabName---", data);
      this.$set(data, "isEdit", true);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log('row---', row)
      console.log('column---', column)
      if (columnIndex === 0) {
        if (row.id === '6') {
        return {
          rowspan: 2,
          colspan: 0
        }
      } else {
        return {
          rowspan: 0,
          colspan: 0
        }
      }
      }
      // if (columnIndex === 0) {
      //   if (rowIndex % 2 === 0) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1,
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0,
      //     };
      //   }
      // }
    },
  },
};
</script>

<style></style>
