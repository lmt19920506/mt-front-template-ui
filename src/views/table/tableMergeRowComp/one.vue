<template>
  <div class="hello1">
     <el-table
     :data="tableData"
     border
     :span-method="spanMethod"
     :cell-style="cellStyle"
     :header-cell-style="titleHeader"
     >
       <el-table-column v-for="(item,i) in titleData" :key='i' :prop="item.name" :label='item.label'></el-table-column>
       <!-- <el-table-column label="Action">
         <template slot-scope="scope">
           <i class="el-icon-edit" @click="edit(scope.row)"></i>
         </template>
       </el-table-column> -->
     </el-table>
  </div>
</template>
 
<script>
/*eslint-disable */
export default {
  name: 'HelloWorld',
  data () {
    return {
      // 所有要合并的数量（一行一行的开始）
      spanAll:[],
      titleData:[
        {
          name:'col1',
          label:'AAA'
        },
        {
          name:'col2',
          label:'BBB'
        },
        {
          name:'col3',
          label:'CCC'
        },
        {  
          name:'col4',
          label:'DDD'
        }
      ],
       tableData:[
         {
           col1:1,
           col2:2,
           col3:3,
           col4:4
         },
         {
           col1:1,
           col2:2,
           col3:4,
           col4:4
         },
         {
           col1:6,
           col2:2,
           col3:7,
           col4:5
         },
         {
           col1:5,
           col2:4,
           col3:7,
           col4:2
         },
       ]
    }
  },
  created() {
    this.titleData.forEach(val => {
      this.getSpanNum(val.name)
    })
  },
  methods:{
    edit(row) {
      console.log('edit---', row)
    },
    // 单元格样式
    cellStyle({row, column, rowIndex, columnIndex}) {
      return 'text-align:center'
    },
    // 表头样式
    titleHeader({row, column, rowIndex, columnIndex}){
      return 'text-align:center'
    },
    spanMethod({row, column, rowIndex, columnIndex}) {
      console.log('row---', row)
      // 得到行合并的数据
      const rowNum= this.spanAll[columnIndex][rowIndex]
      // 列合并
      const colNum = rowNum > 0 ? 1 : 0
      console.log(colNum, '44', rowNum)
      // 当前位置的行合并和列合并数据
      return {
        rowspan: rowNum,
        colspan: colNum
      }
    },
    getSpanNum(curName) {
      const data = this.tableData
      const spanArry = []
      let pos = 0
      data.forEach((val,i) => {
        if(i===0){
          spanArry.push(1)
          pos = 0
        } else {
          // 判断当前列数据与下一行的该列数据是否相同
          if (data[i][curName] === data[i-1][curName]) {
            // 每一列每一行的合并数量
            spanArry[pos] += 1
            spanArry.push(0)
          } else {
            spanArry.push(1)
            pos = i
          }
        }
      })
      // 把合并数据放入spanAll里面
      this.spanAll.push(spanArry)
    }
  }
}
</script>
<style>
 
</style>