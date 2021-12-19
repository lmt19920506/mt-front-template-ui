<template>
    <div>
        <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
            <el-table-column prop="a" label="获奖年份"></el-table-column>
            <el-table-column prop="b" label="工程名称"></el-table-column>
            <el-table-column prop="c" label="承建单位"></el-table-column>
            <el-table-column prop="d" label="参建单位"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                { a: 2021, b: '工程', c: '承建', d: '参建1' },
                { a: 2021, b: '工程', c: '承建', d: '参建2' },
                { a: 2021, b: '工程', c: '承建', d: '参建3' },
                { a: 2021, b: '工程', c: '承建1', d: '参建3' },
                { a: 2021, b: '工程', c: '承建1', d: '参建3' },
                { a: 2021, b: '工程1', c: '承建', d: '参建3' },
            ]
        };
    },
    watch: {
        tableData: {
            handler() {
                this.getSpanArr(this.tableData)
            },
            immediate: true
        }
    },
    methods: {
        //合并行
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            // columnIndex === xx 找到第xx列，实现合并随机出现的行数
            if (columnIndex === 0) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                console.log(row, column, rowIndex, columnIndex)
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        // 因为要合并的行数是不固定的，此函数是实现合并随意行数的功能
        getSpanArr(data) {
            this.spanArr = [];
            this.pos = 0;
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    // 如果是第一条记录（即索引是0的时候），向数组中加入1
                    this.spanArr.push(1);
                    this.pos = 0;
                } else {
                    if (data[i].c === data[i - 1].c) {
                        // 如果c相等就累加，并且push 0
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        // 不相等push 1
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                }
            }
        },
    }
};
</script>

