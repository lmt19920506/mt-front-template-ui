<template>
  <div class="box-container">
    <el-container style="height: 100%">
      <el-aside width="250px" style="">
        <template v-if="basicComponentsData.length">
          <p>基础字段</p>
          <draggable tag="ul"
          :list="basicComponentsData"
          v-bind="{
            group: {name: 'people', pull: 'clone', put: false},
            sort: false,
            ghostClass: 'ghost'
          }"
          >
            <template v-for="(item, index) in basicComponentsData">
              <li :key="index" class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </template>
          </draggable>
        </template>
        <template v-if="advanceComponents.length">
          <p>高级字段</p>
          <draggable tag="ul"
            :list="advanceComponents"
            v-bind="{
              group: {name: 'people', pull: 'clone', put: false},
              sort: false,
              ghostClass: 'ghost'
            }"
            >
            <template v-for="(item, index) in advanceComponents">
              <li :key="index" class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </template>
          </draggable>
        </template>
        <template v-if="layoutComponents.length">
          <p>布局字段</p>
          <draggable tag="ul"
            :list="layoutComponents"
            v-bind="{
              group: {name: 'people', pull: 'clone', put: false},
              sort: false,
              ghostClass: 'ghost'
            }"
          >
            <template v-for="(item, index) in layoutComponents">
              <li :key="index" class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </template>
          </draggable>
        </template>
      </el-aside>
      <el-container class="center-container" direction="vertical">
        <el-header class="btn-bar" style="height: 45px; text-align: right">
          <el-button type="text" icon="el-icon-upload2">导入JSON</el-button>
          <el-button type="text" icon="el-icon-delete">清空</el-button>
          <el-button type="text" icon="el-icon-view" @click="perview">预览</el-button>
          <el-button type="text" icon="el-icon-tickets" @click="handleGenerateJson">生成JSON</el-button>
          <el-button type="text" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button>
        </el-header>
        <el-main style="background: #f0f0f0">
          <widget-form :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
        </el-main>
      </el-container>
      <el-aside width="450px" class="widget-config-container">
        <el-container>
          <el-header class="btn-bar" height="45px">
            <div class="config-tab" :class="{active: configTab === 'widget'}" @click="changeConfigTab('widget')">字段属性</div>
            <div class="config-tab" :class="{active: configTab === 'form'}" @click="changeConfigTab('form')">表单属性</div>
          </el-header>
          <el-main>
            <widget-config v-show="configTab === 'widget'" :data="widgetFormSelect"></widget-config>
          </el-main>
        </el-container>
      </el-aside>
      <cus-dialog :visible="jsonVisible" @on-close="jsonVisible = false">
        <vue-json-editor v-model="jsonTemplate" :showBtns="false" :mode="'code'" lang="zh"/>
      </cus-dialog>
      <cus-dialog :visible="previewVisible" @on-close="previewVisible = false">
        <generate-form :data="widgetForm" @on-change="handleDataChange"></generate-form>
      </cus-dialog>
      <!-- 生成代码 -->
      <cus-dialog :visible="codeVisible" ref="codePreview" width="800px" @on-close="codeVisible=false">
        <el-tabs type="border-card" v-model="codeActiveName">
          <el-tab-pane label="Vue Component" name="vue">
            <div id="vuecodeeditor" style="height: 500px; width: 100%">
              {{vueTemplate}}
            </div>
          </el-tab-pane>
          <el-tab-pane label="HTML" name="html"></el-tab-pane>
        </el-tabs>
      </cus-dialog>
    </el-container>
  </div>
</template>

<script>
/*eslint-disable */
import draggable from 'vuedraggable'
import WidgetForm from "./widgetForm";
import widgetConfig from './widgetConfig'
import cusDialog from './cusDialog'
import generateForm from './generateForm'
import vueJsonEditor from 'vue-json-editor'
import { basicComponents, advanceComponents, layoutComponents } from "./componentsConfigs";
// import CusDialog from './cusDialog.vue';
// import GenerateForm from './generateForm.vue';
import generateCode from './generateCode'
export default {
  components: {
    draggable, WidgetForm, widgetConfig, cusDialog, vueJsonEditor,generateForm
  },
  data() {
    return {
      basicComponentsData: [],
      advanceComponents: [],
      layoutComponents: [],
      widgetForm: {
        list: [],
        // name: 'mt',
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        },
      },
      widgetFormSelect: null,
      configTab: 'widget',
      jsonVisible: false,
      previewVisible: false,
      codeVisible: false,
      jsonTemplate: '',
      codeActiveName: 'vue',
      vueTemplate: ''
    }
  },
  mounted() {
    this._loadComponents()
  },
  methods: {
    _loadComponents() {
      this.basicComponentsData = basicComponents.map(item => {
        return {
          ...item,
          name: item.type
        }
      })
      this.advanceComponents = advanceComponents.map(item => {
        return {
          ...item,
          name: item.type
        }
      })
      this.layoutComponents = layoutComponents.map(item => {
        return {
          ...item,
          name: item.type
        }
      })
      // console.log("basicComponentsData---", this.basicComponentsData);
    },
    changeConfigTab(data) {
      this.configTab = data
    },
    handleGenerateJson() {
      this.jsonVisible = true
      this.$nextTick(() => {
        this.jsonTemplate = this.widgetForm
      })
    },
    perview() {
      this.previewVisible = true
    },
    handleGenerateCode() {
      this.codeVisible = true
      // const da = [
      //   {name: 'a', number: 1},
      //   {name: 'a', number: 2},
      //   {name: 'a', number: 3},
      //   {name: 'a', number: 4}
      // ]
      this.vueTemplate = generateCode(JSON.stringify(this.widgetForm), 'vue')
      // console.log('vueTemplate---', this.vueTemplate)
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode("ace/mode/html")

        const vueeditor = ace.edit('vuecodeeditor')
        vueeditor.session.setMode("ace/mode/html")
      })
    },
    handleDataChange (field, value, data) {
      console.log(field, value, data)
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  position: relative;
  overflow: hidden;
  padding: 0 10px 10px;
  margin: 0;
}
.form-edit-widget-label {
  text-align: center;
  font-size: 12px;
  display: block;
  width: 48%;
  line-height: 26px;
  position: relative;
  float: left;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1px;
  color: #333;
  border: 1px solid #f4f6fc;
  &:hover {
    color: #409eff;
    border: 1px dashed #409eff;
  }

  & > a {
    display: block;
    cursor: move;
    background: #f4f6fc;
    border: 1px solid #f4f6fc;

    .icon {
      margin-right: 6px;
      margin-left: 8px;
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
    }

    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>