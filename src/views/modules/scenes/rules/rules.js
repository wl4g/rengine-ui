export default {
  name: "RuleModeles",
  data() {
    return {
      tableData: [{}],
      projectId: "",
      dialogTitle: "新增",
      dialogVisible: false,
      saveForm: {
        enabled: 1,
        labels: [""],
      },
    }
  },
  activated() {
    this.projectId = this.$route.query.id
    this.saveForm = { ...this.saveForm, projectId: this.projectId }
    this.getTableData(this.projectId)
  },
  mounted() {
    // this.tableData = getTableData()
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
    getTableData(val) {
      let data = {
        ruleId: val,
        name: "string",
        labels: "string",
      }
      this.$$api_modules_queryrules({
        data: data,
        fn: res => {
          this.tableData = res.data.rules
        },
        errFn: () => {},
      })
    },
    addRules() {
      this.dialogVisible = true
      this.dialogTitle = "新增"
      this.saveForm = {
        enabled: 1,
        labels: [""],
      }
    },
    editRules(row) {
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
    saveRules() {
      let data = {
        ...this.saveForm,
        projectId: this.projectId,
      }
      this.$$api_modules_saveRule({
        data: data,
        fn: res => {
          if (res.message == "Ok") {
            this.$message.success("success")
            this.getTableData(this.projectId)
          }
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
    ruleDel(row) {
      this.$$api_modules_ruleDel({
        data: { id: row.id },
        fn: res => {
          this.$message.success("success")
          this.getTableData(this.projectId)
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
    showRuleDetail(row) {
      console.info("11111", row)
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "iam:securityGateway:ruleEngine:ruleEngineDetail"
        ),
        query: { id: row.id },
      })
    },
    addTemplat() {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "modules:ruletemplate:edit"
        ),
      })
    },
    design() {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission("modules:scenes:design"),
      })
    },
  },
}
