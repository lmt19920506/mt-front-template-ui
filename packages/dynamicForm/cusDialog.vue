<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    center
    :width="width"
    :id="id"
    ref="elDialog"
    >
      <span v-if="show">
        <slot></slot>
      </span>
    </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    form: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      id: 'dialog' + new Date().getTime(),
      showForm: false
    }
  },
  computed: {
    show() {
      if (this.form) {
        return this.showForm
      } else {
        return false
      }
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    },
    dialogVisible(val) {
      if (!val) {
        this.$emit('on-close')
        setTimeout(() => {
          this.showForm = false
        }, 300)
      } else {
        this.showForm = true
      }
    }
  }
}
</script>

<style>

</style>