export default {
  data() {
    return {
      tableData: [{}],
      userDialogVisible: false,
      //form 属性
      saveForm: {
        id: "",
        nameEn: "",
        organizationCode: "",
        nameZh: "",
        parentId: "",
        type: "",
        menuIds: [],
        menuNameStrs: "",
        roleIds: [],
        groupExt: {
          id: "",
          displayName: "",
          contact: "",
          contactPhone: "",
          address: "",
        },
      },
    }
  },
  methods: {
    edit(val) {
      this.userDialogVisible = true
    },
  },
}
