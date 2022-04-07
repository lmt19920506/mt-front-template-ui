<template>
  <div>
    <el-form :model="form">
      <el-form-item label="账号">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: '123'
      }
    }
  },
  methods: {
    login() {
      this.$store.commit('addMenu', this.$router)
      // axios.get('https://service.homepartners.dev/sso/.well-known/openid-configuration').then(res => {
      //   console.log('login---',res)
      // })
      // axios.get(`https://gateway.homepartners.dev/permissionapi/permissions`).then(res => {
      //   console.log('permission---', res)
      // })
      console.log("$router---", this.$router)
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>