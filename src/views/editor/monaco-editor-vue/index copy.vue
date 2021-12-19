<template>
  <div id="app">
    <MonacoEditor
      theme="vs-dark"
      language="javascript"
      :editorMounted="onEditorMounted"
      :options="options"
      @change="onChange"
    ></MonacoEditor>
  </div>
</template>
 
<script>
import MonacoEditor from 'monaco-editor-vue';

export default {
  name: "App",
  components: {
    MonacoEditor
  },
  data() {
    return {
      options: {
        value: '', // 初始值
        foldingStrategy: 'indentation', // 代码可分小段折叠
        automaticLayout: true, // 自适应布局
        overviewRulerBorder: false, // 不要滚动条的边框
        autoClosingBrackets: true,
        tabSize: 2, // tab 缩进长度
        minimap: {
          enabled: false, // 不要小地图
        },
      },
    }
  },
  methods: {
    onChange(value) {
      console.log(value);
    },

    onEditorMounted(editor, monaco) {
      window.editor = editor
      window.monaco = monaco
    },
  }
};
</script>
