<template>
  <div>
    <fm-generate-form :data="jsonData" :remote="remoteFunc" :value="editData" ref="generateForm"></fm-generate-form>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jsonData: ``,
      editData: {},
      remoteFuncs: {}
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
  },
}
</script>