<template>
  <div class="box-container" id="container"></div>
  <!--宽高自行设定 -->
</template>

<script>

import * as monaco from "monaco-editor";
import { generateUUID } from "@/utils";
// import { assign } from 'lodash';
export default {
  props: {
    editorId: {
      type: String,
      default: `editor-container-${generateUUID()}`,
    },
    theme: {
      type: String,
      default: "vs-dark",
    },
    original: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "javascript",
    },
    value: {
      type: String,
      required: true,
    },
    isDiff: {
      type: Boolean,
      default: false,
    },
    customStyle: {
      type: Object,
      default: () => {
        return { width: "100%", height: "600px", border: "1px solid grey" };
      },
    },
    options: {
      type: Object,
      default: () => {
        return {
          foldingStrategy: "indentation",
          scrollBeyondLastLine: false,
        };
      },
    },
  },
  data() {
    return {
      editor: null, //文本编辑器
      isLoading: false,
      monacoEditor: null,
    };
  },
  mounted() {
    this.initEditor();
    this.initEdit();
  },
  methods: {
    initEditor() {
      // 初始化编辑器，确保dom已经渲染
      this.editor = monaco.editor.create(document.getElementById("container"), {
        value: "", //编辑器初始显示文字
        language: "sql", //语言支持自行查阅demo
        automaticLayout: true, //自动布局
        theme: "vs-dark", //官方自带三种主题vs, hc-black, or vs-dark
      });
    },
    // getValue() {
    //   this.editor.getValue(); //获取编辑器中的文本
    // },
    initEdit() {
      const _that = this;
      this.isLoading = true;
      // const options = assign(
      //   {
      //     value: this.value || "",
      //     theme: this.theme,
      //     language: this.language,
      //     automaticLayout: true,
      //   },
      //   _that.options
      // );
      console.log("_that.options---", _that);
      if (_that.isDiff) {
        _that.monacoEditor = window.monaco.editor.createDiffEditor(
          _that.$refs[this.editorId],
          _that.options
        );
        const originalModel = window.monaco.editor.createModel(
          _that.original || "",
          _that.language
        );
        const modifiedModel = window.monaco.editor.createModel(
          _that.value || "",
          _that.language
        );
        _that.monacoEditor.setModel({
          original: originalModel,
          modified: modifiedModel,
        });
        const editor = this.getOriginalEditor();
        const didScrollChangeDisposable = editor.onDidScrollChange((event) => {
          console.log("event---", event);
          didScrollChangeDisposable.dispose();
          editor.getAction("editor.action.formatDocument").run();
        });
        // setTimeout(() => {
        //   editor.getAction('editor.action.formatDocument').run();
        // }, 500);
      } else {
        const monacoEditor = window.monaco.editor.create(
          _that.$refs[this.editorId],
          _that.options
        );
        _that.monacoEditor = monacoEditor;
      }
      _that.isLoading = false;
      _that.$emit("init-done", _that.monacoEditor);
      // @event `change`
      const editor = this.getModifiedEditor();
      const didScrollChangeDisposable = editor.onDidScrollChange((event) => {
        console.log('event2---', event)
        didScrollChangeDisposable.dispose();
        editor.getAction("editor.action.formatDocument").run();
      });
      // setTimeout(() => {
      //   editor.getAction('editor.action.formatDocument').run();
      // }, 500);
      editor.onDidChangeModelContent((event) => {
        const value = editor.getValue();
        if (this.value !== value) {
          this.$emit("change", value, event);
        }
      });
    },
    getModifiedEditor() {
      return this.isDiff
        ? this.monacoEditor.getModifiedEditor()
        : this.monacoEditor;
    },
    getOriginalEditor() {
      return this.isDiff
        ? this.monacoEditor.getOriginalEditor()
        : this.monacoEditor;
    },
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        if (this.monacoEditor) {
          const editor = this.getModifiedEditor();
          editor.updateOptions(options);
          editor.layout();
        }
      },
    },

    value: {
      deep: true,
      handler(newValue) {
        if (this.monacoEditor) {
          const editor = this.getModifiedEditor();
          if (newValue !== editor.getValue()) {
            editor.setValue(newValue || "");
            editor.getAction("editor.action.formatDocument").run();
            editor.layout();
          }
        }
      },
    },

    original(newValue) {
      if (this.monacoEditor && this.isDiff) {
        const editor = this.getOriginalEditor();
        if (newValue !== editor.getValue()) {
          editor.setValue(newValue || "");
          editor.getAction("editor.action.formatDocument").run();
          editor.layout();
        }
      }
    },

    language(newVal) {
      if (this.monacoEditor) {
        const editor = this.getModifiedEditor();
        window.monaco.editor.setModelLanguage(editor.getModel(), newVal);
        editor.layout();
      }
    },

    theme(newVal) {
      if (this.monacoEditor) {
        const editor = this.getModifiedEditor();
        window.monaco.editor.setTheme(newVal);
        editor.layout();
      }
    },
  },
};
</script>

<style></style>
