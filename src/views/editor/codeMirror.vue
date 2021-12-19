<template>
  <div>
    <el-button type="primary" @click="check">Check</el-button>
    <el-dialog :visible.sync="isShowCheckDialog" title="Accounting Ledger" width="60%">
      <el-table :data="checkTableData" show-summary>
        <el-table-column label="Desription" prop="description" align="center"></el-table-column>
        <el-table-column label="Account ID" prop="code" align="center"></el-table-column>
        <el-table-column label="Amount" align="center">
          <el-table-column label="Debit Amount" prop="debitAmount" align="center"></el-table-column>
          <el-table-column label="Credit Amount" prop="creditAmount" align="center"></el-table-column>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creditTableData: [],
      debitTableData: [],
      checkTableData: [],
      isShowCheckDialog: false,
    };
  },
  methods: {
    check() {
      const arr = [
        {
          label: 'a',
          value: [
            {amount: 33, isCredit: false},
            {amount: 11, isCredit: false},
            {amount: 88, isCredit: true},
          ]
        },
        {
          label: 'b',
          value: [
            {amount: 77, isCredit: true}
          ]
        }
      ]
      arr.forEach(it => {
        it.debitArr = it.value.filter(e => !e.isCredit).reduce((a, b) => {
          a += b.amount
          return a
        }, 0)
        it.creditArr = it.value.filter(e => e.isCredit).reduce((a, b) => {
          a += b.amount
          return a
        }, 0)
      })
      console.log('arr---', arr)
    },
    check1() {
      const contractSalePrice = 222
      console.log('contractSalePrice---', contractSalePrice)
      let isDebitTableDataInput = this.debitTableData.every(
        item => item.ledgerId !== ''
      );
      let isCreditTableDataInput = this.creditTableData.every(
        item => item.ledgerId !== ''
      );
      console.log(isDebitTableDataInput, isCreditTableDataInput)
      if (!isDebitTableDataInput || !isCreditTableDataInput) {
        this.$message({
          message: 'please input the data',
          type: 'warning'
        });
        return;
      }
      this.isShowCheckDialog = true;
      this.debitTableData.forEach(item => {
        item.amount = item.amountSelf
      })
      this.creditTableData.forEach(item => {
        item.amount = item.amountSelf
      })
      let debitTableDataTemp = JSON.parse(JSON.stringify(this.debitTableData))
      debitTableDataTemp.push({
        amount: contractSalePrice,
        isEdit: false,
        IsCredit: false,
        ledgerCategory: 'Contract Sale Price',
        ledgerId: 'mt',
        ledgerCode: '1650-04',
        ledgerName: ''
      })
      let tableDataAll = [...debitTableDataTemp, ...this.creditTableData]
      let groupBytableDataObj = this._.groupBy(tableDataAll, 'ledgerCategory')
      console.log('groupBytableDataObj---', groupBytableDataObj)
      let showTableData = []
      for(const key in groupBytableDataObj) {
        showTableData.push({
          label: key,
          value: groupBytableDataObj[key]
        })
      }
      // debugger
      console.log('showTableData---11', showTableData)
      showTableData.forEach(item => {
        item.description = item.label;
        item.code = item.value[0].ledgerCode,
        item.debitArr = item.value.filter(it => !it.IsCredit);
        item.creditArr = item.value.filter(it => it.IsCredit);
        item.debitAmount = item.debitArr.length
          ? item.debitArr.map(i => i.amount).reduce((a, b) => a + b).toFixed(2)
          : 0;
        item.creditAmount = item.creditArr.length
          ? item.creditArr.map(i => i.amount).reduce((a, b) => a + b).toFixed(2)
          : 0;
      })
      console.log('showTableData---22', showTableData)
      this.checkTableData = showTableData
      // this.checkTableData = showTableData.map(item => {
      //   return {
      //     description: item.label,
      //     code: item.value[0].ledgerCode,
      //     // debitArr: item.debitArr,
      //     // creditArr: item.creditArr,
      //     debitAmount: item.debitAmount,
      //     creditAmount: item.creditAmount
      //   }
      // })
      console.log('checkTableData---', this.checkTableData)
    }
  },
  mounted() {
    this.creditTableData = [
      {
        userAddId: "add_3",
        isUserAdd: true,
        ledgerCategory: "Closing Costs",
        ledgerId: 21,
        amount: 66,
        amountSelf: 66,
        isCredit: true,
        amountSelfTemp: 66,
      },
    ];
    this.debitTableData = [{
      userAddId: "add_2",
      isUserAdd: true,
      ledgerCategory: "Earnest Money Deposits",
      ledgerId: 1,
      amount: 11,
      amountSelf: 11,
      isCredit: false,
      amountSelfTemp: 0,
    }];
  },
};
</script>

<style></style>
