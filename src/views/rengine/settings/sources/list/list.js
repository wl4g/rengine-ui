export default {
  name: "List",
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
    toDetails(row) {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "rengine:sources:list:details"
        ),
        query: { id: row.id },
      })
    },
  },
}
