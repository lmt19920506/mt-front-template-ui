/*eslint-disable */
function findRemoteFunc(list, funcList, tokenFuncList, blankList) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].type === "grid") {
      list[i].columns.forEach((item) => {
        findRemoteFunc(item.list, funcList, tokenFuncList, blankList);
      });
    } else {
      if (list[i].type == "blank") {
        if (list[i].model) {
          blankList.push({
            name: list[i].model,
            label: list[i].name,
          });
        }
      } else if (list[i].type == "imgupload") {
        if (list[i].options.tokenFunc) {
          tokenFuncList.push({
            func: list[i].options.tokenFunc,
            label: list[i].name,
            model: list[i].model,
          });
        }
      } else {
        if (list[i].options.remote && list[i].options.remoteFunc) {
          funcList.push({
            func: list[i].options.remoteFunc,
            label: list[i].name,
            model: list[i].model,
          });
        }
      }
    }
  }
}
function findRemoteFunc2(list, funcList, tokenFuncList, blankList) {
  funcList = list.map((item) => item.number);
  console.log("funcList2222---", funcList);
}

export default function (data, type = 'vue') {

  const funcList2 = []

  const tokenFuncList2 = []

  const blankList2 = []

  const type1 = ''
  const arr = [
    {name: 'a', number: 1},
    {name: 'a', number: 2},
    {name: 'a', number: 3},
    {name: 'a', number: 4}
  ]
  // debugger
  findRemoteFunc(JSON.parse(data).list, funcList2, tokenFuncList2, blankList2)
  // console.log('funcList1---', funcList1)
  // console.log('findRemoteFunc---', findRemoteFunc(JSON.parse(data).list, funcList, tokenFuncList, blankList))

  let funcTemplate = ''

  let blankTemplate = ''
  // console.log('funcList1---', funcList1)
  // for(let i = 0; i < funcList1.length; i++) {
  //   funcTemplate += `
  //           ${funcList1[i].func} (resolve) {
  //             // ${funcList1[i].label} ${funcList1[i].model}
  //             // Call callback function once get the data from remote server
  //             // resolve(data)
  //           },
  //   `
  // }

  // for(let i = 0; i < tokenFuncList.length; i++) {
  //   funcTemplate += `
  //           ${tokenFuncList[i].func} (resolve) {
  //             // ${tokenFuncList[i].label} ${tokenFuncList[i].model}
  //             // Call callback function once get the token
  //             // resolve(token)
  //           },
  //   `
  // }
  // console.log('funcTemplate---', funcTemplate)
  // for (let i = 0; i < blankList.length; i++) {
  //   blankTemplate += `
  //       <template slot="${blankList[i].name}" slot-scope="scope">
  //         <!-- ${blankList[i].label} -->
  //         <!-- use v-model="scope.model.${blankList[i].name}" to bind data -->
  //       </template>
  //   `
  // }
  // console.log('blankTemplate---', blankTemplate)
  if (type == 'vue') {
    return `<template>
  <div>
    <fm-generate-form :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm">
      ${blankTemplate}
    </fm-generate-form>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        jsonData: ${data},
        editData: {},
        remoteFuncs: {
          ${funcTemplate}
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.generateForm.getData().then(data => {
          // data check success
          // data - form data
        }).catch(e => {
          // data check failed
        })
      }
    }
  }
</script>`
  }
}
