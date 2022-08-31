import MinioUpload from "../../../components/minio-upload.vue"

export default {
  name: "library",
  components: {
    MinioUpload,
  },
  data() {
    return {
      tableData: [{}],
      libraryDialogVisible: false,
      dialogTitle: "",
      //弹窗表单
      saveForm: {
        id: "",
        name: "",
        metricId: "",
        classify: "",
        notifyLevel: "",
        tagMap: [],
        rules: [],
      },
    }
  },
  mounted() {
    // this.tableData = getTableData()
  },
  methods: {
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
        path: this.permitutil.getRoutePathByPermission(
          "modules:ruletemplate:edit"
        ),
      })
    },
    delData() {},
    addLibrary() {
      this.libraryDialogVisible = true
      this.dialogTitle = "新增"
    },
  },
}
