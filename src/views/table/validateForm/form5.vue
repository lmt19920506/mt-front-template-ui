<template>
  <el-form :model="form" :rules="rules" ref="form">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="form.age"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        age: '',
        address: ''
      },
      rules: {
        name: [
          {required: true, message: 'required', trigger: 'blur'}
        ],
        age: [
          {required: true, message: 'required', trigger: 'blur'}
        ],
        address: [
          {required: true, message: 'required', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    validate() {
      return new Promise(resolve => {
        this.$refs.form.validate(async vaild => {
          if (!vaild) {
            await this.$nextTick()
            this.$scrollToError(this.$refs.form.$el)
          }
          resolve(vaild)
        })
      })
    }
  }
}
</script>

<style>

</style>