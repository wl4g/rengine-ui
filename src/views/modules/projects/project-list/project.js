// export default {
//   name: "ProjectList",
//   data() {
//     return {
//       tableData: [{}],
//     }
//   },
//   mounted() {
//     // this.tableData = getTableData()
//   },
//   methods: {
//     showRuleDetail(row) {
//       console.info("11111", row)
//       this.$router.push({
//         path: this.permitutil.getRoutePathByPermission(
//           "iam:securityGateway:ruleEngine:ruleEngineDetail"
//         ),
//         query: { id: row.id },
//       })
//     },
//     addTemplat() {
//       this.$router.push({
//         path: this.permitutil.getRoutePathByPermission(
//           "modules:ruletemplate:edit"
//         ),
//       })
//     },
//     toWorkFlow() {
//       this.$router.push({
//         path: this.permitutil.getRoutePathByPermission(
//           "modules:projects:workflow"
//         ),
//       })
//     },
//     toRuleModeles() {
//       this.$router.push({
//         path: this.permitutil.getRoutePathByPermission(
//           "modules:projects:rulemodeles"
//         ),
//       })
//     },
//     design() {
//       this.$router.push({
//         path: this.permitutil.getRoutePathByPermission(
//           "modules:ruletemplate:edit"
//         ),
//       })
//     },
//     delData() {},
//   },
// }

import ProjectList from "./modules/project-list.vue"
import UserLibrarys from "./modules/user-librarys.vue"
import TestDatasets from "./modules/test-datasets.vue"
export default {
  name: "Events",
  components: {
    ProjectList,
    UserLibrarys,
    TestDatasets,
  },
  data() {
    return {
      activeName: "ProjectList",
      currentTabComponent: ProjectList,
      tabsData: [
        {
          labelName: "项目列表",
          name: "ProjectList",
        },
        {
          labelName: "自定义库",
          name: "UserLibrarys",
        },
        {
          labelName: "测试数据集",
          name: "TestDatasets",
        },
      ],
      loginEventId: null,
    }
  },

  activated() {},

  mounted() {},

  methods: {
    handleClick(tab, event) {
      this.currentTabComponent = tab.name
    },
  },
}
