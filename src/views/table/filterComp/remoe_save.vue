<template>
  <section class="box-container">
    <el-table :data="tableData" size="mini">
      <el-table-column label="姓名" width="500">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" placeholder="请输入姓名"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <el-select v-model="scope.row.address" clearable style="width: 100%">
            <el-option
              v-for="(val, key) in selectMap"
              v-show="isSelect(val, scope.row.address)"
              :key="val"
              :label="key"
              :value="val"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="70">
        <template slot-scope="scope">
          <el-button type="text">
          <i class="el-icon-delete" @click="dele(scope.$index)"></i>
        </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="add" 
      v-if="addressSelectArr.length > tableData.length"
    >
      +Add
    </el-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      addressSelectArr: [
        { label: "长沙", value: "changsha" },
        { label: "株洲", value: "zhuzhou" },
        { label: "湘潭", value: "xiangtan" },
        { label: "岳阳", value: "yueyang" },
        { label: "衡阳", value: "hengyang" },
        { label: "深圳", value: "shenzhen" },
        { label: "广州", value: "guanghzou" },
      ],
    };
  },
  computed: {
    selectMap() {
      const map = {};
      this.addressSelectArr.forEach((item) => {
        map[item.label] = item.value;
      });
      return map;
    },
  },
  methods: {
    isSelect(id, currentId) {
      // 选择当条， 选中了，在下拉框中的数据源还是会有选中的数据
      if(currentId === id) {
        return true
      }
      // 这个是排除上面选择的，在下面的数据源不会显示
      for (const i in this.tableData) {
        if (this.tableData[i].address === id) {
          return false
        }
      }
      return true
    },
    add() {
      const obj = {
        name: '',
        address: ''
      }
      this.tableData.push(obj)
    },
    dele(index) {
      this.tableData.splice(index, 1)
    }
  }
};
</script>

<style></style>
