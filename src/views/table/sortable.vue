<template>
  <div class="box-container">
    <el-table :data="tableData" stripe ref="dragTable" :key="tableKey" height="800px">
      <el-table-column width="40">
        <template>
          <span class="table-handle">
            <i class="el-icon-rank"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Line Item Id" prop="id"></el-table-column>
      <el-table-column label="Account ID" prop="accountId"></el-table-column>
      <el-table-column label="Line Item Name" prop="name1"></el-table-column>
      <el-table-column label="Ledger Name" prop="name2"></el-table-column>
      <el-table-column label="Rules">
        <template slot-scope="scope">
          <el-button type="text" @click="configRule(scope.row)">{{scope.row.count}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <i class="el-icon-edit-outline" @click="edit(scope.row)"></i>
          <i class="el-icon-delete-solid" @click="dele(scope.row)" style="margin-left: 10px"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import { cloneDeep } from 'lodash';
export default {
  data() {
    return {
      tableData: [
        {id: '1', accountId: '11', name1: 'aaa', name2: 'a', count: 1},
        {id: '2', accountId: '22', name1: 'bbb', name2: 'b', count: 2},
        {id: '3', accountId: '33', name1: 'ccc', name2: 'c', count: 3},
        {id: '4', accountId: '44', name1: 'ddd', name2: 'd', count: 4},
        {id: '5', accountId: '55', name1: 'eee', name2: 'e', count: 5},
        {id: '1', accountId: '11', name1: 'aaa', name2: 'a', count: 1},
        {id: '2', accountId: '22', name1: 'bbb', name2: 'b', count: 2},
        {id: '3', accountId: '33', name1: 'ccc', name2: 'c', count: 3},
        {id: '4', accountId: '44', name1: 'ddd', name2: 'd', count: 4},
        {id: '5', accountId: '55', name1: 'eee', name2: 'e', count: 5},{id: '1', accountId: '11', name1: 'aaa', name2: 'a', count: 1},
        {id: '2', accountId: '22', name1: 'bbb', name2: 'b', count: 2},
        {id: '3', accountId: '33', name1: 'ccc', name2: 'c', count: 3},
        {id: '4', accountId: '44', name1: 'ddd', name2: 'd', count: 4},
        {id: '5', accountId: '55', name1: 'eee', name2: 'e', count: 5},{id: '1', accountId: '11', name1: 'aaa', name2: 'a', count: 1},
        {id: '2', accountId: '22', name1: 'bbb', name2: 'b', count: 2},
        {id: '3', accountId: '33', name1: 'ccc', name2: 'c', count: 3},
        {id: '4', accountId: '44', name1: 'ddd', name2: 'd', count: 4},
        {id: '5', accountId: '55', name1: 'eee', name2: 'e', count: 5},{id: '1', accountId: '11', name1: 'aaa', name2: 'a', count: 1},
        {id: '2', accountId: '22', name1: 'bbb', name2: 'b', count: 2},
        {id: '3', accountId: '33', name1: 'ccc', name2: 'c', count: 3},
        {id: '4', accountId: '44', name1: 'ddd', name2: 'd', count: 4},
        {id: '5', accountId: '55', name1: 'eee', name2: 'e', count: 5},{id: '1', accountId: '11', name1: 'aaa', name2: 'a', count: 1},
        {id: '2', accountId: '22', name1: 'bbb', name2: 'b', count: 2},
        {id: '3', accountId: '33', name1: 'ccc', name2: 'c', count: 3},
        {id: '4', accountId: '44', name1: 'ddd', name2: 'd', count: 4},
        {id: '5', accountId: '55', name1: 'eee', name2: 'e', count: 5},{id: '1', accountId: '11', name1: 'aaa', name2: 'a', count: 1},
        {id: '2', accountId: '22', name1: 'bbb', name2: 'b', count: 2},
        {id: '3', accountId: '33', name1: 'ccc', name2: 'c', count: 3},
        {id: '4', accountId: '44', name1: 'ddd', name2: 'd', count: 4},
        {id: '5', accountId: '55', name1: 'eee', name2: 'e', count: 5},{id: '1', accountId: '11', name1: 'aaa', name2: 'a', count: 1},
        {id: '2', accountId: '22', name1: 'bbb', name2: 'b', count: 2},
        {id: '3', accountId: '33', name1: 'ccc', name2: 'c', count: 3},
        {id: '4', accountId: '44', name1: 'ddd', name2: 'd', count: 4},
        {id: '5', accountId: '55', name1: 'eee', name2: 'e', count: 5},{id: '1', accountId: '11', name1: 'aaa', name2: 'a', count: 1},
        {id: '2', accountId: '22', name1: 'bbb', name2: 'b', count: 2},
        {id: '3', accountId: '33', name1: 'ccc', name2: 'c', count: 3},
        {id: '4', accountId: '44', name1: 'ddd', name2: 'd', count: 4},
        {id: '5', accountId: '55', name1: 'eee', name2: 'e', count: 5},
      ],
      isShowDialog: false,
      isShowSlide: false,
      itemId: '',
      tableKey: +new Date()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setSort();
    });
  },
  methods: {
    edit() {
      this.isShowSlide = true
    },
    dele() {},
    configRule(row) {
      this.isShowDialog = true
      // this.itemId = '1'
      this.itemId = row.id
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0];
      this.sortable = Sortable.create(el, {
        handle: '.table-handle',
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: (dataTransfer) => {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '');
        },
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt;

          this.handlerChangePoint(oldIndex, newIndex);
        }
      });
    },
    handlerChangePoint(oldIndex, newIndex) {
      const oldColums = cloneDeep(this.tableData);
      oldColums.splice(newIndex, 0, oldColums.splice(oldIndex, 1)[0]);
      console.log('oldColums---', oldColums)
      // this.$emit('update:tableData', oldColums);
      this.tableData = oldColums;
      this.tableKey = +new Date();
      this.$nextTick(() => {
        this.setSort();
      });
    }
  }
}
</script>

<style>

</style>
