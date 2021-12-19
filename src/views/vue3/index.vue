<template>
  <div class="box-container">
    <el-button type="primary" @click="go">跳转</el-button>
    <el-divider></el-divider>
    <el-button type="primary" @click="quchong">new set 去重</el-button>
    <el-divider></el-divider>
    <el-button type="pcheckrimary" @click="check">控制合并？？运算符</el-button>
    <el-divider></el-divider>
    <el-button type="pcheckrimary" @click="check2">扁平化数据转为树</el-button>
    <el-divider></el-divider>
    <el-button type="pcheckrimary" @click="check3">listToTree</el-button>
    <el-divider></el-divider>
    <el-button type="pcheckrimary" @click="check4">属性结构->扁平化</el-button>
    <el-divider>自定义指令实现copy复制功能</el-divider>
    <i v-for="(item, index) in iconArr"
      :key="index" :class="item.icon"
      style="margin-left: 30px"
      v-clipboard:copy="item.icon"
      v-clipboard:success="clipboardSuccess"
    ></i>
    <el-divider>Collapse 组件</el-divider>
    <el-button type="primary" @click="visible = true">collapse</el-button>
    <el-dialog :visible.sync="visible">
      <collapse>
        <el-form>
          <el-form-item label="a">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="a">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="a">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="a">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="a">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="a">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      <!-- <el-table :data="iconArr">
        <el-table-column label="icon" prop="icon"></el-table-column>
        <el-table-column label="name" prop="name"></el-table-column>
      </el-table> -->
    </collapse>
    </el-dialog>
    <el-divider>$attrs-$listens</el-divider>
    <son :value1="value1" :value2="value2" :value3="value3" @click="console" :value4="value4" @show="show" @cToA="cToA" />
  </div>
</template>

<script>
import Clipboard from '@/directive/Clipboard/index.js';
import Collapse from '../../../packages/Collapse/index'
import son from './son'
export default {
  directives: {
    Clipboard
  },
  components: {
    Collapse,
    son
  },
  data() {
    return {
      iconArr: [
        {icon: 'el-icon-edit', nama: '编辑'},
        {icon: 'el-icon-share', nama: '分享'},
        {icon: 'el-icon-delete', nama: '删除'}
      ],
      visible: false,
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4
    }
  },
  methods: {
    show(data) {
      console.log('show', data)
    },
    cToA(data) {
      console.log('cToA---', data)
    },
    console() {
      console.log('aaaa')
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      });
    },
    go() {
      this.$router.push("/vue3Test/7");
    },
    quchong() {
      const a = [1, 2, 3];
      const b = [1, 5, 6];
      const c = [...new Set([...a, ...b])];
      console.log("去重---", c);
    },
    check() {
      const foo = null ?? "hello";
      console.log("foo---", foo);
      const bar = "lmt" ?? "gj";
      console.log("bar---", bar);
      const zoo = "" ?? "a";
      console.log("zoo---", zoo);
      // 可以判断输入框有没有值
      const value = "123";
      if (value ?? "") {
        console.log("有值---", value);
      } else {
        console.log("没有值---", value);
      }
    },
    plain2Tree(obj) {
      var key, res
      for(key in obj) {
        var parent = obj[key].parent
        if(parent === '') {
          res = obj[key]
        } else {
          obj[parent][key] = obj[key]
        }
      }
      return res
    },
    check2() {
      // 将如下扁平对象，转为树形对象。parent字段为空字符串的节点为根节点：
      var input = {
        h3: { parent: "h2", name: "副总经理(市场)" },
        h1: { parent: "h0", name: "公司机构"},
        h7: { parent: "h6", name: "副总经理(总务)" },
        h4: { parent: "h3", name: "销售经理" },
        h2: { parent: "h1", name: "总经理" },
        h8: { parent: "h0", name: "财务总监" },
        h6: { parent: "h4", name: "仓管总监" },
        h5: { parent: "h4", name: "销售代表" },
        h0: { parent: "", name: "root", }
      };
      const result = this.plain2Tree(input)
      console.log('result---', result)
    },
    // 将一个扁平对象，根据keys属性话
    toTree(obj, [key, ...rest], result = {}) {
      if (result.value == null) {
          result.value = obj[key]
          if (rest.length) {
            result.children = this.toTreeList(obj, rest)
          }
      } else if (result.value === obj[key] && rest.length) {
          this.toTreeList(obj, rest, result.children)
      }
      return result
    },
    // 将一个扁平对象的属性话产物，不重复的放到list里
    toTreeList(obj, keys, list = []) {
      let value = obj[keys[0]]
      let target = list.find(item => item.value === value)
      if (target) {
          this.toTree(obj, keys, target)
      } else {
          list.push(this.toTree(obj, keys))
      }
      return list
    },
    // 将一个扁平化对象组成的列表，变成属性话的列表
    listToTree(list=[], keys=[]) {
      return list.reduce(
          (result, obj) => this.toTreeList(obj, keys, result),
          []
      )
    },
    check3() {
      var data = [
        // { province: "浙江", city: "杭州", name: "西湖", area: 'A区' },
        // { province: "四川", city: "成都", name: "锦里", area: 'D区' },
        // { province: "四川", city: "成都", name: "方所", area: 'B区' },
        // { province: "四川", city: "阿坝", name: "九寨沟", area: 'C区' },
        { province: '湖南', city: '岳阳', xian: '湘阴', jingdian: '东湖' },
        { province: '湖南', city: '岳阳', xian: '岳阳县', jingdian: '君山' },
        { province: '湖南', city: '衡阳', xian: '衡东县', jingdian: '衡山' },
        { province: '湖南', city: '衡阳', xian: '衡南县', jingdian: '哼哼三' },
        { province: '湖南', city: '永州', xian: '道县', jingdian: '雪鸦' },
        { province: '湖南', city: '永州', xian: '东安', jingdian: '东安鸡' },
        { province: '广东', city: '深圳', xian: '福田', jingdian: '山' },
      ];
      const treeData = this.listToTree(data, ['province', 'city', 'xian', 'jingdian'])
      console.log('treeData---', treeData)
    },

    // 把一个树形结构，变成扁平化列表
    toFlat(tree, [key, ...rest], result = {}) {
      if (result[key] == null) {
        result[key] = tree.value;
      } else if (result[key] !== tree.value) {
        result = {
          ...result,
          [key]: tree.value
        };
      }
      return rest.length ? this.toFlatList(tree.children, rest, result) : [result];
    },
    // 把一个树形结构的列表，变成扁平化列表
    toFlatList(treeList, keys, result = {}) {
      return treeList.reduce(
        (list, tree) => list.concat(this.toFlat(tree, keys, result)),
        []
      );
    },

    // 转换树形结构为列表结构
    treeToList(treeList = [], keys) {
      return this.toFlatList(treeList, keys);
    },
    check4() {
      var data = [
        { value: "浙江",
          children: [
            { value: "杭州", children: [{ value: "西湖", children: [{ value: "A区" }] }] }
          ]
        },
        {
          value: "四川",
          children: [
            {
              value: "成都",
              children: [
                { value: "锦里", children: [{ value: "D区" }] },
                { value: "方所", children: [{ value: "B区" }] }
              ]
            },
            { value: "阿坝", children: [{ value: "九寨沟", children: [{ value: "C区" }] }] }
          ]
        }
      ];
      const result = this.treeToList(data, ["province", "city", "name", "area"]);
      console.log('result---', result)
    }
  },
};
</script>

<style></style>
