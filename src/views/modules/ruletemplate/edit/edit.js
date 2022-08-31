// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import MyEditor from "./monaco-editor.vue"
export default {
  name: "Edit",
  components: {
    MyEditor,
  },
  data() {
    return {
      tableData: [{}],
      //查询条件
      searchParams: {
        name: "",
      },
      loading: false,
      //分页信息
      total: 0,
      pageNum: 1,
      pageSize: 10,
      MainTainDialogVisible: false,
      dialogTitle: "数据维护",
      dialogLoading: false,
      sqlCodes: "select areaname, id,from ysdsf select 888888 ",
    }
  },

  mounted() {
    console.info("11111111111111111111111111111")
  },

  methods: {
    onSubmit() {},
    currentChange() {},
    clickMainTain(v) {
      let self = this
      self.MainTainDialogVisible = true
    },
    closeDialog() {},
    sqlOnMounted(edit) {
      this.jsEditor = edit
    },
    sqlOnCodeChange(value, event) {
      console.info(value, event)
    },
  },
}
