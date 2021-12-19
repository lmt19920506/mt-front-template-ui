<template>
  <!-- 关于表格的操作 -->
  <div class="main">
    <!-- 行的合并 列的合并 表头添加斜线 -->
    <el-table
      v-loading="loading"
      :data="content"
      :header-cell-style="headMerge"
      :span-method="objectSpanMethod"
      max-height="600"
      border
    >
      <el-table-column label="bjzh" align="right" width="150">
        <el-table-column label="lg" align="center" width="480">
          <el-table-column prop="code" align="center" width="80" />
          <el-table-column prop="bh" align="center" width="80" />
          <el-table-column prop="xh" align="center" width="80" />
          <el-table-column prop="model" align="center" width="80" />
          <el-table-column prop="cdm" align="center" width="80" />
          <el-table-column prop="cd" align="center" width="80" />
        </el-table-column>
      </el-table-column>
      <!-- 不固定列的展示 -->
      <el-table-column
        v-for="(item, index) in title"
        :key="index"
        :label="item.toString()"
        :prop="'zh' + (index + 1)"
      />
    </el-table>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      loading: false, // 加载中
      title: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      // 制造的假数据
      content: [
        {
          bh: null, cd: null, cdm: null,code: "wlgzcd",model: null, xh: null, zh1: 45, zh2: 40, zh3: 40, zh4: 35, zh5: 30, zh6: 25, zh7: 25, zh8: 25, zh9: 25, zh10: 20,
        },
        {
          bh: null,
          cd: null,
          cdm: null,
          code: "nlgzcd",
          model: null,
          xh: null,
          zh1: 25,
          zh2: 25,
          zh3: 20,
          zh4: 20,
          zh5: 20,
          zh6: 20,
          zh7: 15,
          zh8: 10,
          zh9: 5,
          zh10: 5,
        },
        {
          bh: 2,
          cd: 4,
          cdm: "length",
          code: "wlgj",
          model: "B",
          xh: "abc",
          zh1: "11",
          zh2: "12",
          zh3: "13",
          zh4: "14",
          zh5: "15",
          zh6: "16",
          zh7: "17",
          zh8: "18",
          zh9: "19",
          zh10: "20",
        },
        {
          bh: 3,
          cd: 5,
          cdm: "length",
          code: "wlgj",
          model: "C",
          xh: "abc",
          zh1: "21",
          zh2: "22",
          zh3: "23",
          zh4: "24",
          zh5: "25",
          zh6: "26",
          zh7: "27",
          zh8: "28",
          zh9: "29",
          zh10: "30",
        },

        {
          bh: 1,
          cd: 2,
          cdm: "length",
          code: "nlgj",
          model: "E",
          xh: "abc",
          zh1: "101",
          zh2: "102",
          zh3: "103",
          zh4: "104",
          zh5: "105",
          zh6: "106",
          zh7: "107",
          zh8: "108",
          zh9: "109",
          zh10: "110",
        },
        {
          bh: 2,
          cd: 3,
          cdm: "length",
          code: "nlgj",
          model: "F",
          xh: "abc",
          zh1: "111",
          zh2: "112",
          zh3: "113",
          zh4: "114",
          zh5: "115",
          zh6: "116",
          zh7: "117",
          zh8: "118",
          zh9: "119",
          zh10: "120",
        },
        {
          bh: 3,
          cd: 4,
          cdm: "length",
          code: "nlgj",
          model: "G",
          xh: "abc",
          zh1: "121",
          zh2: "122",
          zh3: "123",
          zh4: "124",
          zh5: "125",
          zh6: "126",
          zh7: "127",
          zh8: "128",
          zh9: "129",
          zh10: "130",
        },
      ],
      // 存放需要合并的单元格
      spanObj: {
        oneArray: [],
      },
    };
  },
  created() {
    // 调用计算需要合并的行
    this.getSpanArr(this.content);
  },
  methods: {
    getSpanArr(data) {
      this.spanObj.oneArray = [];
      let concatOne = 0;
      data.forEach((item, index) => {
        if (index === 0) {
          this.spanObj.oneArray.push(1);
        } else {
          // 判断依据
          // 前一个的code和后一个的code相同，则进行 行的合并
          if (item.code === data[index - 1].code) {
            this.spanObj.oneArray[concatOne] += 1;
            this.spanObj.oneArray.push(0);
          } else {
            this.spanObj.oneArray.push(1);
            concatOne = index;
          }
        }
      });
    },
    // 注意：横向合并列 纵向合并行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.code === "wlgzcd" || row.code === "nlgzcd") {
          return {
            rowspan: 1,
            colspan: 6,
          };
        } else {
          const _row = this.spanObj.oneArray[rowIndex];
          const _col = _row ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col,
          };
        }
      }
      // 要将其余的列给清除，否则其还会占用空间
      if (
        (row.code === "wlgzcd" || row.code === "nlgzcd") &&
        (columnIndex === 1 ||
          columnIndex === 2 ||
          columnIndex === 3 ||
          columnIndex === 4 ||
          columnIndex === 5)
      ) {
        // 1和2列被合并,不清除的话,则后面的单元格都会错位
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
    // 第二行表头的隐藏
    headMerge({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 2) {
        return {
          display: "none",
        };
      }
    },
  },
};
</script>

<style></style>
