export default {
  name: "ProjectList",
  data() {
    return {
      tableData: [],
      dialogTitle: "新增",
      dialogVisible: false,
      // visible: false,
      saveForm: {
        enabled: 1,
        labels: [""],
      },
    }
  },
  mounted() {
    this.getTableData()
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
  methods: {
    getTableData() {
      let data = {
        projectId: "string",
        name: "string",
        owner: "string",
        labels: "string",
      }
      this.$$api_modules_queryProject({
        data: data,
        fn: res => {
          this.tableData = res.data.projects
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
    addProject() {
      this.dialogVisible = true
      this.dialogTitle = "新增"
      this.saveForm = {
        enabled: 1,
        labels: [""],
      }
    },
    editProject(row) {
      this.dialogVisible = true
      this.dialogTitle = "编辑"
      this.saveForm = { ...row }
    },
    addLabels() {
      this.saveForm.labels.push("")
    },
    delLabels(val) {
      this.saveForm.labels.splice(val, 1)
    },
    saveProject() {
      console.info(this.saveForm)
      this.$$api_modules_projectSave({
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
    projectDel(row) {
      this.$$api_modules_projectDel({
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
    showRuleDetail(row) {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "iam:securityGateway:ruleEngine:ruleEngineDetail"
        ),
        query: { id: row.id },
      })
    },
    // addTemplat() {
    //   this.$router.push({
    //     path: this.permitutil.getRoutePathByPermission(
    //       "rengine:ruletemplate:edit"
    //     ),
    //   })
    // },
    toWorkFlow(row) {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission("rengine:workflows"),
        query: { id: row.id },
      })
    },
    toRuleModeles(row) {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission("rengine:rules"),
        query: { id: row.id },
      })
    },
    design() {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "rengine:ruletemplate:edit"
        ),
      })
    },
    delData() {},
  },
}
