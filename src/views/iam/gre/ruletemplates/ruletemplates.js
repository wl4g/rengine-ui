export default {
  name: "Ruleflows",
  data() {
    return {
      tableData: [{}],
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
        path: this.permitutil.getRoutePathByPermission("iam:ruletemplatesEdit"),
      })
    },
    design() {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission("iam:ruletemplatesEdit"),
      })
    },
    delData() {},
  },
}
