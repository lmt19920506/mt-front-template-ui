<template>
  <div class="box-container">
    <el-card>
      <el-row slot='header'>
        <el-col :span="8">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-col>
      </el-row>
      <el-table :data="showItems" stripe size="mini">
        <el-table-column label="name" prop="name"></el-table-column>
        <el-table-column label="nickname" prop="nickname"></el-table-column>
        <el-table-column label="address" prop="address"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      tableData: [
        {name: '张三', nickname: 'lucy', address: '长沙'},
        {name: '李四', nickname: 'tom', address: '株洲'},
        {name: '王五', nickname: 'honey', address: '湘潭'},
        {name: '陈六', nickname: 'alice', address: '岳阳'},
        {name: '汪七', nickname: 'rose', address: '衡阳'},
        {name: '彭八', nickname: 'jerry', address: '常德'},
      ]
    }
  },
  computed: {
    showItems() {
      return this.tableData.filter(item => {
        return (
          (item.name && item.name.indexOf(this.value) !== -1) ||
          (item.nickname && item.nickname.indexOf(this.value) !== -1) ||
          (item.address && item.address.indexOf(this.value) !== -1) 
        )
      })
    }
  }
}
</script>

<style>

</style>