export default {
  name: "WorkFlow",
  data() {
    return {
      scenesId: "",
      tableData: [],
      dialogVisible: false,
      dialogTitle: "",
      saveForm: {
        enabled: 1,
        labels: [""],
      },
      searchParams: {
        name: "",
      },
      pageNum: 0,
      total: 0,
      loading: false,
    }
  },
  activated() {
    this.scenesId = this.$route.query.id
    this.saveForm = { ...this.saveForm, scenesId: this.scenesId }
    this.getTableData(this.scenesId)
  },
  filters: {
    ellipsis(value) {
      if (!value) return ""
      let num = value.toString().length
      if (num > 3) {
        return "#..." + value.toString().slice(num - 3, num)
      }
      return value
    },
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.loading = true
      this.getTableData()
    },
    getTableData() {
      let data = {
        workflowId: "string",
        scenesId: this.scenesId ? this.scenesId : "string",
        name: this.searchParams.name,
        labels: "string",
        pageNum: this.pageNum,
        pageSize: 10,
        orgCode: "string",
      }
      this.$$api_modules_queryWorkflow({
        data: data,
        fn: res => {
          this.loading = false
          this.tableData = res.data.records
          this.total = res.data.total
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
    currentChange(i) {
      this.pageNum = i - 1
      this.getTableData()
    },
    addWorkflow() {
      this.dialogVisible = true
      this.dialogTitle = "新增"
      this.saveForm = {
        enabled: 1,
        labels: [""],
        scenesId: this.scenesId,
        orgCode: "string",
        workflowId: "string",
        ruleIds: [0],
      }
    },
    editWorkflow(row) {
      this.dialogVisible = true
      this.dialogTitle = "编辑"
      row.scenesId = row.scenesId ? row.scenesId : this.scenesId
      this.saveForm = {
        orgCode: row.orgCode,
        enable: row.enable,
        labels: row.labels,
        id: row.id,
        remark: row.remark,
        name: row.name,
        ruleIds: row.ruleIds,
      }
    },
    toDesign(row) {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "rengine:workflows:design"
        ),
        query: { name: row.name },
      })
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
            this.getTableData()
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
          this.getTableData()
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
    showWorkDetail(val) {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "rengine:workflows:runhistories"
        ),
      })
    },
  },
}
