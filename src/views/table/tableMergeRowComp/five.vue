<template>
  <div>
    <el-table
      :span-method="arraySpanMethod"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小龙",
          address: "上海市普陀区金沙江路 1 弄",
        },
        {
          date: "2016-05-02",
          name: "王小龙",
          address: "上海市普陀区金沙江路 2 弄",
        },
        {
          date: "2016-05-02",
          name: "王小龙",
          address: "上海市普陀区金沙江路 3 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 5 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 4 弄",
        },
        {
          date: "2016-05-02",
          name: "王小龙",
          address: "上海市普陀区金沙江路 1 弄",
        },
      ],
      mergeObj: {},
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.mergeObj[column.property][rowIndex]) {
        return {
          rowspan: this.mergeObj[column.property][rowIndex],
          colspan: 1,
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
  },
  mounted() {
    let numerical = 0;
    for (let key in this.tableData[0]) {
      this.mergeObj[key] = [];
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.mergeObj[key].push(1);
        } else {
          if (item[key] === this.tableData[index - 1][key]) {
            this.mergeObj[key][numerical] += 1;
            this.mergeObj[key].push(0);
          } else {
            numerical = index;
            this.mergeObj[key].push(1);
          }
        }
      });
    }
  },
};
</script>

<style></style>
