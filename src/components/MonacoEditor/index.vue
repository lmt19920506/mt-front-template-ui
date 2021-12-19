<template>
  <div class="monaco-container">
    <div ref="container" class="monaco-editor"></div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";
export default {
  props: {
    // 编辑器中呈现的内容
    codes: {
      type: String,
      default: function() {
        return "";
      },
    },
    readOnly: {
      type: Boolean,
      default: function() {
        return false;
      },
    },
    // 主要配置
    editorOptions: {
      type: Object,
      default: function() {
        return {
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: this.readOnly, // 只读
          cursorStyle: "line", // 光标样式
          automaticLayout: false, // 自动布局
          glyphMargin: true, // 字形边缘
          useTabStops: false,
          fontSize: 28, // 字体大小
          autoIndent: false, // 自动布局
        };
      },
    },
  },
  mounted() {
    this.monacoEditor = monaco.editor.create(this.$refs.container, {
      value: this.codes, // 见props
      language: "python",
      theme: "vs-dark", // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
      editorOptions: this.editorOptions, // 同codes
    });
  },
};
</script>

<style></style>
