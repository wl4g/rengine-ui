export default {
  name: "RuleModeles",
  data() {
    return {
      tableData: [{}],
      projectId: "",
      dialogTitle: "新增",
      dialogVisible: false,
      scenesId: "",
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
    this.projectId = this.$route.query.id
    this.saveForm = { ...this.saveForm, projectId: this.projectId }
    this.getTableData(this.projectId)
  },
  mounted() {
    // this.tableData = getTableData()
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
  methods: {
    onSubmit() {
      this.loading = true
      this.getTableData()
    },
    getTableData(val) {
      let data = {
        ruleId: 0,
        scenesId: this.scenesId ? this.scenesId : 0,
        name: this.searchParams.name,
        labels: "string",
        pageNum: this.pageNum,
        pageSize: 10,
        orgCode: "string",
        enable: true,
      }
      this.$$api_modules_queryrules({
        data: data,
        fn: res => {
          this.loading = false
          this.tableData = res.data.records
          this.total = res.data.total
        },
        errFn: () => {},
      })
    },
    addRules() {
      this.dialogVisible = true
      this.dialogTitle = "新增"
      this.saveForm = {
        orgCode: "string",
        enable: 1,
        labels: [""],
        uploadIds: [0],
      }
    },
    editRules(row) {
      this.dialogVisible = true
      this.dialogTitle = "编辑"
      row.scenesId = row.scenesId ? row.scenesId : this.scenesId
      this.saveForm = {
        id: row.id,
        orgCode: row.orgCode,
        enable: row.enable,
        labels: row.labels,
        remark: row.remark,
        name: row.name,
        uploadIds: row.uploadIds,
      }
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
          "rengine:ruletemplate:edit"
        ),
      })
    },
    design() {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission("rengine:design"),
      })
    },
  },
}
