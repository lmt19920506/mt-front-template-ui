<template>
  <div class="container">
    <code-editor
      :options="options"
      :value="content"
      @contentChange="contentChange"
      style="height: 400px; width: 600px;"
    ></code-editor>
  </div>
</template>

<script>
import CodeEditor from "./CodeEditor";
export default {
  name: "SQLEditor",
  components: {
    CodeEditor,
  },
  data() {
    return {
      content: `save(){if (!this.detailObj.hudId) {this.$message({type: 'warning', message: 'please input hud id'})
        return
      }
      HudService.saveHudId(this.$route.params.id, {hudId: this.detailObj.hudId, userId: this.$store.state.user.userInfo.profile.user_idencry}).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: 'hud id edit success'
          })
          this.isEdit = false
          this.$refs.dynamicHeader.refresh()
          this.getRealJsonDetail(this.$route.params.id)
        }
      })
    },
    close() {
      this.isEdit = false
      this.detailObj.hudId = this.storeHudId
    },`,
      options: {
        language: "sql",
        theme: "vs-dark",
        readOnly: false,
      },
    };
  },
  created() {},
  methods: {
    // 绑定编辑器value值的变化
    contentChange(val) {
      this.content = val;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  text-align: left;
  padding: 10px;
}
</style>
