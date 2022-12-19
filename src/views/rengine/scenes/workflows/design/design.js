import { jsPlumb } from "jsplumb"
import { nodeTypeList } from "./config/init"
import {
  jsplumbSetting,
  jsplumbConnectOptions,
  jsplumbSourceOptions,
  jsplumbTargetOptions,
} from "./config/commonConfig"
import methods from "./config/methods"
import flowNode from "./components/node-item"
export default {
  name: "FlowEdit",
  components: {
    flowNode,
  },
  data() {
    return {
      jsPlumb: null,
      currentItem: null,
      nodeTypeList: nodeTypeList,
      nodeTypeObj: {},
      menuList: [
        {
          name: "保存",
          key: "save",
          icon: "el-icon-collection",
        },
        {
          name: "历史工作流",
          key: "historyWorkFlow",
          icon: "el-icon-date",
        },
        {
          name: "导出工作流",
          key: "exportWorkFlow",
          icon: "el-icon-download",
        },
      ],
      isClickItem: false,
      isClickItemContent: null,
      oldWorkFlowDialogVisible: false,
      workflowDesignDelVisible: false,
      afterDelOldDesign: false,
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
      oldWorkflowDesignTableData: [],
      data: {
        nodeList: [],
        lineList: [],
      },
      selectedList: [],
      jsplumbSetting: jsplumbSetting,
      jsplumbConnectOptions: jsplumbConnectOptions,
      jsplumbSourceOptions: jsplumbSourceOptions,
      jsplumbTargetOptions: jsplumbTargetOptions,
      auxiliaryLine: { isShowXLine: false, isShowYLine: false }, //对齐辅助线是否显示
      auxiliaryLinePos: {
        width: "100%",
        height: "100%",
        offsetX: 0,
        offsetY: 0,
        x: 20,
        y: 20,
      },
      commonGrid: [5, 5], //节点移动最小距离
      selectModuleFlag: false, //多选标识
      rectAngle: {
        px: "", //多选框绘制时的起始点横坐标
        py: "", //多选框绘制时的起始点纵坐标
        left: 0,
        top: 0,
        height: 0,
        width: 0,
      },
      visible: false,
      workflowName: "",
      workflowList: [],
    }
  },
  watch: {
    // 监听画板数据变化存入sessionStorage
    data: {
      handler(newVal) {
        sessionStorage.setItem(
          `rengine-workflow-${this.$route.query.id}`,
          JSON.stringify(this.data)
        )
      },
      deep: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    next(that => {
      that.initData()
      // 每次进入路由执行
    })
  },
  //离开页面时执行
  beforeRouteLeave(to, from, next) {
    let that = this
    console.log("守卫完成", that.data)
    that.jsPlumb.clear()
    that.data.nodeList = []
    that.data.lineList = []
    next()
  },
  mounted() {
    // this.initData()
  },
  methods: {
    initData() {
      let data = {
        orgCode: "string",
        labels: "string",
        enable: true,
        pageNum: 0,
        pageSize: 1,
        graphId: 0,
        workflowId: this.$route.query.id,
      }
      this.$$api_modules_queryWorkflowDesign({
        data: data,
        fn: res => {
          this.$message.success("success")
          console.info(res)
          this.oldWorkflowDesignTableData = res.data.records
          if (this.afterDelOldDesign == false) {
            // let sessionStorageVal = sessionStorage.getItem(
            //   `rengine-workflow-${this.$route.query.id}`
            // )
            // if (sessionStorageVal) {
            //   res.data.records[0].nodes = sessionStorageVal.nodeList
            //   res.data.records[0].connections = sessionStorageVal.lineList
            // }
            this.workflowList = res.data.records[0]
            this.jsPlumb = jsPlumb.getInstance()
            this.initNodeTypeObj()
            this.initNode()
            this.fixNodesPosition()
            this.$nextTick(() => {
              this.init()
            })
          } else {
            this.afterDelOldDesign = false
          }
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
    initNodeTypeObj() {
      nodeTypeList.map(v => {
        this.nodeTypeObj[v.type] = v
      })
    },
    initNode() {
      let dataJson = this.workflowList
      this.data.lineList = dataJson.connections
      dataJson.nodes.map(v => {
        v = { ...v, ...v.attributes }
        this.data.nodeList.push(v)
      })
    },
    ...methods,
    clickMenuItem(val) {
      switch (val) {
        case "save":
          this.save()
          break
        case "historyWorkFlow":
          this.oldWorkFlowDialogVisible = true
          break
        case "exportWorkFlow":
          this.$confirm("是否导出当前设计图?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              //确认
              let data = {
                orgCode: "string",
                labels: "string",
                enable: true,
                pageNum: 0,
                pageSize: 1,
                graphId: 0,
                workflowId: this.$route.query.id,
              }
              this.$$api_modules_queryWorkflowDesign({
                data: data,
                fn: res => {
                  this.$message.success("success")
                  const blob = new Blob([JSON.stringify(res)], {
                    type: "application/json;charset=utf-8",
                  })
                  const href = URL.createObjectURL(blob)
                  const alink = document.createElement("a")
                  alink.style.display = "none"
                  alink.download = "workflowDesign" // 下载后文件名
                  alink.href = href
                  document.body.appendChild(alink)
                  alink.click()
                  document.body.removeChild(alink) // 下载完成移除元素
                  URL.revokeObjectURL(href) // 释放掉blob对象
                },
                errFn: () => {
                  this.$message.error("Fail")
                },
              })
            })
            .catch(() => {
              //取消
            })

          break

        default:
          break
      }
    },
    save() {
      this.data.nodeList.map(item => {
        item.attributes = { ...item.attributes, left: item.left, top: item.top }
        delete item.left
        delete item.top
      })
      let params = {
        orgCode: "string",
        enable: 1,
        labels: ["string"],
        remark: "string",
        workflowId: this.$route.query.id,
        nodes: this.data.nodeList,
        connections: this.data.lineList,
      }
      this.$$api_modules_saveWorkflowDesign({
        data: params,
        fn: res => {
          this.$message.success("success")
          // sessionStorage.removeItem(`rengine-workflow-${this.$route.query.id}`)
          this.initData()
          this.init()
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
    handleClose() {
      this.oldWorkFlowDialogVisible = false
    },
    saveWorkflowName() {
      console.info(this.workflowName)
    },
    cloneWorkflowDesign(val) {
      console.info(val)
      this.workflowList = val
      this.jsPlumb = null
      jsPlumb.reset()
      jsPlumb.deleteEveryConnection()
      jsPlumb.deleteEveryEndpoint()
      this.oldWorkFlowDialogVisible = false
      this.jsPlumb = jsPlumb.getInstance()
      this.initNodeTypeObj()
      this.initNode()
      this.fixNodesPosition()
      this.$nextTick(() => {
        this.init()
      })
    },
    workflowDesignDel(val) {
      console.info(val)
      let data = {
        id: val.id,
      }
      this.$$api_modules_workflowgraphDel({
        data: data,
        fn: res => {
          this.$message.success("success")
          this.afterDelOldDesign = true
          this.initData()
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
  },
}
