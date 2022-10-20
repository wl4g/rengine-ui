export default {
  name: "ProjectList",
  data() {
    return {
      tableData: [],
      dialogTitle: "新增",
      dialogVisible: false,
      // visible: false,
      saveForm: {
        enable: 1,
        labels: [""],
      },
      pageNum: 0,
      total: 0,
      //查询条件
      loading: false,
      scenesDisabled: true,
      searchParams: {
        name: "",
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
    currentChange(i) {
      this.pageNum = i - 1
      this.getTableData()
    },
    onSubmit() {
      this.loading = true
      this.getTableData()
    },
    getTableData() {
      // let data = {
      //   orgCode: "string",
      //   name: this.searchParams.name,
      //   labels: "bbb",
      //   enable: 1,
      //   pageNum: this.pageNum,
      //   pageSize: 10,
      //   scenesId: "string",
      // }
      let data = {
        labels: "string",
        pageNum: 0,
        pageSize: 1,
      }
      this.$$api_modules_queryScenes({
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
    addProject() {
      this.dialogVisible = true
      this.dialogTitle = "新增"
      this.saveForm = {
        enable: 1,
        labels: [""],
        orgCode: "string",
        scenesCode: "",
        workflowId: 0,
      }
    },
    changeScenes() {
      this.scenesDisabled = false
    },
    editProject(row) {
      this.dialogVisible = true
      this.dialogTitle = "编辑"
      this.saveForm = {
        id: row.id,
        orgCode: row.orgCode,
        enable: row.enable,
        labels: row.labels,
        remark: row.remark,
        scenesCode: row.scenesCode,
        name: row.name,
        workflowId: row.workflowId,
      }
    },
    addLabels() {
      this.saveForm.labels.push("")
    },
    delLabels(val) {
      this.saveForm.labels.splice(val, 1)
    },
    saveProject() {
      console.info(this.saveForm)
      this.$$api_modules_scenesSave({
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
    scenesDel(row) {
      this.$$api_modules_scenesDel({
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
