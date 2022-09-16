// import ConfigList from "./modeles/configList.vue"
// export default {
//   name: "WorkFlow",
//   components: {
//     ConfigList,
//   },
//   data() {
//     return {
//       activeName: "ConfigList",
//       currentTabComponent: ConfigList,
//       tabsData: [
//         {
//           labelName: "配置列表",
//           name: "ConfigList",
//         },
//       ],
//     }
//   },
//   methods: {
//     handleClick(tab, event) {
//       this.currentTabComponent = tab.name
//     },
//   },
// }

export default {
  name: "WorkFlow",
  data() {
    return {
      tableData: [{ id: 12 }],
    }
  },
  mounted() {},
  methods: {
    showWorkDetail(val) {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "modules:projects:runhistory"
        ),
      })
    },
  },
}
