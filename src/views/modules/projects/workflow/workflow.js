export default {
  name: "WorkFlow",
  data() {
    return {
      projectId: "",
      tableData: [],
      dialogVisible: false,
      dialogTitle: "",
      saveForm: {
        enabled: 1,
        labels: [""],
      },
    }
  },
  activated() {
    this.projectId = this.$route.query.id
    this.saveForm = { ...this.saveForm, projectId: this.projectId }
    this.queryWorkflow(this.projectId)
  },
  mounted() {},
  methods: {
    queryWorkflow() {
      let data = {
        workflowId: "string",
        projectId: this.projectId ? this.projectId : "string",
        name: "string",
        labels: "string",
      }
      this.$$api_modules_queryWorkflow({
        data: data,
        fn: json => {
          console.info(json)
          this.tableData = json.data.workflows
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
    addWorkflow() {
      this.dialogVisible = true
      this.dialogTitle = "新增"
      this.saveForm = {
        enabled: 1,
        labels: [""],
        projectId: this.projectId,
      }
    },
    editWorkflow(row) {
      this.dialogVisible = true
      this.dialogTitle = "编辑"
      row.projectId = row.projectId ? row.projectId : this.projectId
      this.saveForm = { ...row }
    },
    addLabels() {
      this.saveForm.labels.push("")
    },
    delLabels(val) {
      this.saveForm.labels.splice(val, 1)
    },
    saveWorkflow() {
      console.info(this.saveForm)
      this.$$api_modules_workflowSave({
        data: this.saveForm,
        fn: res => {
          this.dialogVisible = false
          if (res.message == "Ok") {
            this.$message.success("success")
            this.queryWorkflow()
          }
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
    workflowDel(row) {
      this.$$api_modules_workflowDel({
        data: { id: row.id },
        fn: res => {
          this.$message.success("success")
          this.queryWorkflow()
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
    showWorkDetail(val) {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "modules:projects:runhistory"
        ),
      })
    },
  },
}
