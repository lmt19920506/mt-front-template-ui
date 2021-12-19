<template>
  <div class="box-container">
    <h1>前端下拉框去重</h1>
    <div v-for="(item, index) in selectItemList" :key="index">
      <el-select v-model="item.id">
        <el-option v-for="(val, key) in selectMap" v-show="isSelect(parseInt(val), item.id)" :key="val" :value="val" :label="key"></el-option>
        <!-- <el-option v-for="(val, key) in selectMap" v-show="isSelect(parseInt(val), item.id)" :key="val" :value="parseInt(val)" :label="key"></el-option> -->
      </el-select>
      <el-input style="width: 200px" v-model="item.money"></el-input>
      <i style="margin-left: 30px">
        <el-button @click="add" v-if="selectData.length > selectItemList.length">+</el-button>
        <el-button @click="dele(index)" v-if="selectItemList.length > 1">-</el-button>
      </i>
    </div>
    <div>
      总费用：{{totalMoney}}元
    </div>
    <el-button @click="see">看看</el-button>
    <el-input suffix-icon="el-icon-date" prefix-icon="el-icon-search"></el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectItemList: [],
      selectData: [
        {id:12,name:'物业费'},
        {id:15,name:'卫生费'},
        {id:18,name:'材料费'},
        {id:22,name:'管理费'}
      ]
    }
  },
  methods: {
    add () {
      this.selectItemList.push({id: '', money: 0})
    },
    dele (index) {
      this.selectItemList.splice(index, 1)
    },
    isSelect (id, currentId) {
      // console.log('111---', id, currentId)
      // 在选择当条，选中了，在下拉框中的数据源还是会有选中的数据
      if (currentId == id) {
        return true
      }
      // 这个是排除上面选择的，在下面的数据源不会显示
      for (let i in this.selectItemList) {
        // console.log('i---', i)
        if (this.selectItemList[i].id == id) {
          return false
        }
      }
      return true
    },
    see () {
      console.log('table---', this.selectItemList)
    }
  },
  computed: {
    selectMap () {
      let map = {}
      this.selectData.forEach(item => {
        map[item.name] = item.id
      })
      return map
    },
    totalMoney () {
      let total = 0
      this.selectItemList.forEach(item => {
        if (item.id) {
          total += parseInt(item.money)
        }
      })
      return total
    }
  },
  mounted () {
    //初始化一个选项
      this.selectItemList = [{id:'',money:0}]
  }
}
</script>

<style scoped>

</style>