// import Layout from '@/views/Main'

/*table*/
const Table = () => import(/* webpackChunkName: 'Table' */"@/views/table");
const TableAutoScroll = () => import(/* webpackChunkName: 'Table' */ "@/views/table/tableAutoScroll");
const ShowTable = () => import(/* webpackChunkName: 'Table' */ "@/views/table/showTable");
// const ShowTableDetail = () => import("@/views/table/showTableDetail")
const Sortable = () => import(/* webpackChunkName: 'Table' */ '@/views/table/sortable')
const TableFilter = () => import(/* webpackChunkName: 'Table' */ '@/views/table/tableFilter')
const TableMergeRow = () => import(/* webpackChunkName: 'Table' */ '@/views/table/tableMergeRow')

/*bpmn */
const Bpmn = () => import(/* webpackChunkName: 'Bpmn' */ "@/views/bpmn");
const BpmnInit = () => import(/* webpackChunkName: 'Bpmn' */ "@/views/bpmn/bpmn-init");
const BpmnHttp = () => import(/* webpackChunkName: 'Bpmn' */ "@/views/bpmn/bpmn-http");
const BpmnEvent = () => import(/* webpackChunkName: 'Bpmn' */ "@/views/bpmn/bpmn-event");

/*editor编辑器 */
const Editor = () => import(/* webpackChunkName: 'Editor' */ "@/views/editor");
const CodeMirror = () => import(/* webpackChunkName: 'Editor' */ "@/views/editor/codeMirror");
const Tinymce = () => import(/* webpackChunkName: 'Editor' */ "@/views/editor/tinymce/tinymce");
const VueQillEditor = () => import(/* webpackChunkName: 'Editor' */ "@/views/editor/vue-quill-editor");
const MonacoEditorVue = () => import(/* webpackChunkName: 'Editor' */ '@/views/editor/monaco-editor-vue')

/**动态表单 */
const DynamicForm = () => import(/* webpackChunkName: 'DynamicForm' */ '../../packages/dynamicForm/index.vue');
const FormCreate = () => import(/* webpackChunkName: 'DynamicForm' */ '@/views/form-create/form-create')
/**图片展示插件 viewerjs */
const ShowPicture = () => import(/* webpackChunkName: 'ShowPicture' */ '@/views/viewerjs/index')

/*other* */
const Other = () => import(/* webpackChunkName: 'Other' */ '@/views/other')
const dynamicComponent = () => import(/* webpackChunkName: 'Other' */ '@/views/other/dynamicComponent/index.vue')
const Vue3Test = () => import(/* webpackChunkName: 'Other' */ '@/views/vue3')

/*drag layout */
const DragLayout = () => import(/* webpackChunkName: 'DragLayout' */ '@/views/dragLayout')

const ResizeWidth = () => import(/* webpackChunkName: 'DragLayout' */ '@/views/resize')

/*show tree */
const ShowTree = () => import(/* webpackChunkName: 'Tree' */ '@/views/tree/index.vue')

/*jsx 页面 */
const Jsx = () => import(/* webpackChunkName: 'Jsx' */ '@/views/jsx/index.vue')

/*vue-calendar-component 日历插件 */
const Calendar = () => import(/* webpackChunkName: 'Calendar' */ '@/views/calendar/index.vue')

/*需要权限判断的路由 */
const dynamicRoutes = [
  {
    path: "/table",
    component: Table,
    name: "table",
    meta: {
      name: "Table组件",
      icon: "el-icon-help",
    },
    children: [
      { path: '/tableAutoScroll', name: 'tableAutoScroll', component: TableAutoScroll, meta: {name: '表格滚动', icon: 'el-icon-star-on'} },
      { path: '/showTable', name: 'showTable', component: ShowTable, meta: {name: 'table展示', icon: 'el-icon-s-goods'} },
      // {path: 'showTable/:id', name: 'showTableDetail', component: ShowTableDetail, meta: {hidden: true}}
      { path: '/sortable', name: 'sortable', component: Sortable, meta: {name: 'Sort Table'} },
      { path: '/tableFilter', name: 'tableFilter', component: TableFilter, meta: {name: '前端过滤'} },
      { path: '/tableMergeRow', name: 'tableMergeRow', component: TableMergeRow, meta: {name: '合并单元格'} }
    ],
  },
  {
    path: '/bpmn', name: 'bpmn', component: Bpmn, meta: {name: 'bpmn流程', icon: 'el-icon-s-platform'}, children: [
      {path: '/bpmn/bpmn-init', component: BpmnInit, name: 'bpmnInit', meta: {name: 'Bpmn Init', icon: 'el-icon-s-help'}},
      {path: '/bpmn/bpmn-http', component: BpmnHttp, name: 'bpmnHttp', meta: {name: 'Bpmn Http', icon: 'el-icon-check'}},
      {path: '/bpmn/bpmn-event', component: BpmnEvent, name: 'bpmnEvent', meta: {name: 'Bpmn Event', icon: 'el-icon-s-flag'}}
    ]
  },
  {
    path: 'editor', name: 'editor', component: Editor, meta: {name: '编辑器', icon: 'el-icon-s-opportunity'}, children: [
      {path: '/editor/codeMirror', component: CodeMirror, name: 'codeMirror', meta: {name: 'Code Mirror', icon: ''}},
      {path: '/editor/tinymce', component: Tinymce, name: 'tinymce', meta: {name: 'Tinymce', icon: ''}},
      {path: '/editor/vue-qill-editor', component: VueQillEditor, name: 'vueQillEditor', meta: {name: 'Vue Qill Editor', icon: ''}},
      { path: '/editor/monaco-editor-vue', component: MonacoEditorVue, name: 'monacoEditorVue', meta: {name: 'Monaco-Editor-Vue'} }

    ]
  },
  { path: '/dynamicForm', name: 'dynamicForm', component: DynamicForm, meta: {name: '动态表单', icon: 'el-icon-s-platform'} },
  { path: '/form-create', name: 'formCreate', component: FormCreate, meta: {name: 'Form Create', icon: 'el-icon-s-platform'} },
  { path: '/draglayout', name: 'draglayout', component: DragLayout, meta: {name: 'Drag layout', icon: 'el-icon-s-platform'} },
  { path: '/resize', name: 'resize', component: ResizeWidth, meta: {name: 'Resize Width', icon: 'el-icon-s-platform'} },
  { path: '/showPicture', name: 'showPicture', component: ShowPicture, meta: {name: 'Show Picture', icon: 'el-icon-s-platform'} },
  { path: '/other', name: 'other', component: Other, meta: {name: 'Other', icon: 'el-icon-s-platform'}, children: [
    {path: '/dynamicComponent', name: 'dynamicComponent', component: dynamicComponent, meta: {name: '动态组件'}},
    { path: '/vue3Test', name: 'vue3Test', component: Vue3Test, meta: {name: 'vue3 test'} }
  ] },
  { path: '/showTree', name: 'showTree', component: ShowTree, meta: {name: 'Show Tree', icon: 'el-icon-s-platform'} },
  { path: '/jsx', name: 'Jsx', component: Jsx, meta: {name: 'JSX', icon: 'el-icon-s-platform', requireAuth: true} },
  { path: '/calendar', name: 'Calendar', component: Calendar, meta: {name: 'Calendar', icon: 'el-icon-s-platform'} }
];

export default dynamicRoutes
