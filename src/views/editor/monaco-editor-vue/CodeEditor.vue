<template>
  <div class="code-container" ref="container"></div>
</template>

<script>
/*eslint-disable */
import * as monaco from "monaco-editor";
let sqlStr = `save() {
      if (!this.detailObj.hudId) {
        this.$message({
          type: 'warning',
          message: 'please input hud id'
        })
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
    }`;
export default {
  name: "codeEditor",

  props: {
    options: {
      type: Object,
      default() {
        return {
          language: "javascript", // shell、sql、python
          readOnly: true, // 不能编辑
        };
      },
    },

    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      monacoInstance: null,
      provider: null,
      hints: [
        "SELECT",
        "INSERT",
        "DELETE",
        "UPDATE",
        "CREATE TABLE",
        "DROP TABLE",
        "ALTER TABLE",
        "CREATE VIEW",
        "DROP VIEW",
        "CREATE INDEX",
        "DROP INDEX",
        "CREATE PROCEDURE",
        "DROP PROCEDURE",
        "CREATE TRIGGER",
        "DROP TRIGGER",
        "CREATE SCHEMA",
        "DROP SCHEMA",
        "CREATE DOMAIN",
        "ALTER DOMAIN",
        "DROP DOMAIN",
        "GRANT",
        "DENY",
        "REVOKE",
        "COMMIT",
        "ROLLBACK",
        "SET TRANSACTION",
        "DECLARE",
        "EXPLAN",
        "OPEN",
        "FETCH",
        "CLOSE",
        "PREPARE",
        "EXECUTE",
        "DESCRIBE",
        "FORM",
        "ORDER BY",
      ],
    };
  },
  created() {
    this.initHints();
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },

  methods: {
    dispose() {
      if (this.monacoInstance) {
        if (this.monacoInstance.getModel()) {
          this.monacoInstance.getModel().dispose();
        }
        this.monacoInstance.dispose();
        this.monacoInstance = null;
        if (this.provider) {
          this.provider.dispose();
          this.provider = null;
        }
      }
    },
    initHints() {
      let sqlArr = sqlStr.split(" ");
      this.hints = Array.from(new Set([...this.hints, ...sqlArr])).sort();
    },
    init() {
      let that = this;
      this.dispose();
      let createCompleters = (textUntilPosition) => {
        //过滤特殊字符
        let _textUntilPosition = textUntilPosition
          .replace(/[\*\[\]@\$\(\)]/g, "")
          .replace(/(\s+|\.)/g, " ");
        //切割成数组
        let arr = _textUntilPosition.split(" ");
        //取当前输入值
        let activeStr = arr[arr.length - 1];
        //获得输入值的长度
        let len = activeStr.length;

        //获得编辑区域内已经存在的内容
        let rexp = new RegExp("([^\\w]|^)" + activeStr + "\\w*", "gim");
        let match = that.value.match(rexp);
        let _hints = !match
          ? []
          : match.map((ele) => {
              let rexp = new RegExp(activeStr, "gim");
              let search = ele.search(rexp);
              return ele.substr(search);
            });

        //查找匹配当前输入值的元素
        let hints = Array.from(new Set([...that.hints, ..._hints]))
          .sort()
          .filter((ele) => {
            let rexp = new RegExp(ele.substr(0, len), "gim");
            return (match && match.length === 1 && ele === activeStr) ||
              ele.length === 1
              ? false
              : activeStr.match(rexp);
          });
        //添加内容提示
        let res = hints.map((ele) => {
          return {
            label: ele,
            kind:
              that.hints.indexOf(ele) > -1
                ? monaco.languages.CompletionItemKind.Keyword
                : monaco.languages.CompletionItemKind.Text,
            documentation: ele,
            insertText: ele,
          };
        });
        return res;
      };
      this.provider = monaco.languages.registerCompletionItemProvider("sql", {
        provideCompletionItems(model, position) {
          var textUntilPosition = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });
          var suggestions = createCompleters(textUntilPosition);
          return {
            suggestions: suggestions,
          };

          return createCompleters(textUntilPosition);
        },
      });

      // 初始化编辑器实例
      this.monacoInstance = monaco.editor.create(this.$refs["container"], {
        value: this.value,
        theme: "vs-dark",
        autoIndex: true,
        ...this.options,
      });

      // 监听编辑器content变化事件
      this.monacoInstance.onDidChangeModelContent(() => {
        this.$emit("contentChange", this.monacoInstance.getValue());
      });
    },
  },
};
</script>

<style lang="scss" scope>
.code-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid #eaeaea;
  .monaco-editor .scroll-decoration {
    box-shadow: none;
  }
}
</style>
