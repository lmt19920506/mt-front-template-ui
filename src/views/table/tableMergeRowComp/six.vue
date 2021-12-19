<template>
  <div class='text'>
    <el-table :data="tableData" :span-method="objectSpanMethod" style="width: 90%;margin:20px" border>
      <el-table-column prop="name" label="省" width="180">
      </el-table-column>
      <el-table-column prop="city" label="市" width="180">
      </el-table-column>
      <el-table-column prop="area" label="区">
      </el-table-column>
      <el-table-column label="员工">
        <template v-slot='scope'>
          <el-select v-model="scope.row.selectedList" filterable multiple collapse-tags
            @change="selectNumber($event,scope.row)">
            <el-option v-for="(item,index)  in scope.row.peopleList" :key="index" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="人数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  name: "",
  data() {
    return {
      // 部门信息
      tableData: [
        {
          name: "江苏省",
          city: "苏州市",
          area: "工业园区",
          peopleList: [{ name: "张三" }, { name: "李四" }, { name: "王五" }],
          selectedList: [],
          num: "0",
        },
        {
          name: "江苏省",
          city: "苏州市",
          area: "吴江区",
          peopleList: [{ name: "孙悟空" },{ name: "猪八戒" },{ name: "唐僧" },{ name: "沙悟净" }],
          selectedList: [],
          num: "0",
        },
        {
          name: "江苏省",
          city: "苏州市",
          area: "吴中区",
          peopleList: [{ name: "贾宝玉" },{ name: "贾元春" },{ name: "王熙凤" }],
          selectedList: [],
          num: "0",
        },
        {
          name: "江苏省",
          city: "徐州市",
          area: "铜山区",
          peopleList: [{ name: "宋江" }, { name: "林冲" }, { name: "吴用" }],
          selectedList: [],
          num: "0",
        },
        {
          name: "江苏省",
          city: "徐州市",
          area: "鼓楼区",
          peopleList: [{ name: "卢俊义" },{ name: "公孙胜" },{ name: "关胜" }],
          selectedList: [],
          num: "0",
        },
        {
          name: "江苏省",
          city: "无锡市",
          area: "惠山区",
          peopleList: [],
          selectedList: [],
          num: "0",
        },
        {
          name: "四川省",
          city: "成都市",
          area: "锦江区",
          peopleList: [{ name: "白骨精" }, { name: "蜘蛛精" }],
          selectedList: [],
          num: "0",
        },
      ],
      firstArr: [], // 第一列进行合并操作时存放的数组变量
      firstIndex: 0, // 上面的数组的下标值
      secondArr: [], // 第二列进行合并操作时存放的数组变量
      secondIndex: 0, // 上面的数组的下标值
      thirdArr: [], // 第三列进行合并操作时存放的数组变量
      thirdIndex: 0, // 上面的数组的下标值
    }
  },
  mounted() {
    this.merage()
  },
  methods: {
    merageInit() {
      // 对数据进行初始化
      this.firstArr = []
      this.firstIndex = 0
      this.secondArr = []
      this.secondIndex = 0
      this.thirdArr = []
      this.thirdIndex = 0
    },
    merage() {
      this.merageInit() // 初始化数据函数
      for (let i = 0; i < this.tableData.length; i += 1) {
        if (i === 0) {
          // 第一行必须存在
          this.firstArr.push(1)
          this.firstIndex = 0
          this.secondArr.push(1)
          this.secondIndex = 0
          this.thirdArr.push(1)
          this.thirdIndex = 0
        } else {
          // 判断当前元素与上一个元素是否相同,eg：this.firstIndex 是 this.firstArr序号
          // 第一列 下面的是eslint的不限制语法
          if (this.tableData[i].name === this.tableData[i - 1].name) {
            this.firstArr[this.firstIndex] += 1
            this.firstArr.push(0)
          } else {
            this.firstArr.push(1)
            this.firstIndex = i
          }
          // 第二列
          if (
            this.tableData[i].city === this.tableData[i - 1].city &&
            this.tableData[i].name === this.tableData[i - 1].name
          ) {
            this.secondArr[this.secondIndex] += 1
            this.secondArr.push(0)
          } else {
            this.secondArr.push(1)
            this.secondIndex = i
          }
          // 第三列
          if (
            this.tableData[i].area === this.tableData[i - 1].area &&
            this.tableData[i].city === this.tableData[i - 1].city &&
            this.tableData[i].name === this.tableData[i - 1].name
          ) {
            this.thirdArr[this.thirdIndex] += 1
            this.thirdArr.push(0)
          } else {
            this.thirdArr.push(1)
            this.thirdIndex = i
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        // 第一列的合并方法
        const row1 = this.firstArr[rowIndex]
        const col1 = row1 > 0 ? 1 : 0 // 如果被合并了row = 0; 则他这个列需要取消
        return {
          rowspan: row1,
          colspan: col1,
        }
      } else if (columnIndex === 1) {
        // 第二列的合并方法
        const row2 = this.secondArr[rowIndex]
        const col2 = row2 > 0 ? 1 : 0 // 如果被合并了row = 0; 则他这个列需要取消
        return {
          rowspan: row2,
          colspan: col2,
        }
      } else if (columnIndex === 2) {
        // 第三列的合并方法
        const row3 = this.thirdArr[rowIndex]
        const col3 = row3 > 0 ? 1 : 0 // 如果被合并了row = 0; 则他这个列需要取消
        return {
          rowspan: row3,
          colspan: col3,
        }
      }
    },
    //表格内选择员工
    selectNumber(e, row) {
      console.log(e, row)
      let rowindex = this.tableData.indexOf(row)
      this.$set(this.tableData[rowindex], "num", e.length)
    },
  },
}
</script>
