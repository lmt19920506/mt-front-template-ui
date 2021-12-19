<template>
  <div class="box-container">
    <child-one :typeSpan="typeSpan"></child-one>
    <el-divider></el-divider>
    <child-two></child-two>
    <el-divider></el-divider>
    <el-button @click="add">合并对象</el-button>
  </div>
</template>

<script>
import childOne from './jsx/child1'
import childTwo from './jsx/child2'
import {buttonCounter} from './jsx/jsxData'
export default {
  mounted() {
    console.log('buttonCounter---', buttonCounter)
  },
  components: {
    childOne, childTwo
  },
  data() {
    return {
      typeSpan: {
        text:'hello',
        attrs:{
          class:"open-service",
          style:'color:#0199f0;cursor:pointer'
        },
      }
    }
  },
  methods: {
    // 合并队形
    mixinObjs(...objs) {
      console.log('objs---', objs)
      return Object.assign.apply(null, objs)
    },
    add() {
     const str = this.mixinObjs({name: 'tom', age: 18, address: '长沙'}, {age: 100, grade: '99'})
     console.log('str---', str)
    }
  }
}
</script>

<style>

</style>