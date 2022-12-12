import { jsPlumb } from "jsplumb"
import { nodeTypeList } from "./config/init"
import {
  jsplumbSetting,
  jsplumbConnectOptions,
  jsplumbSourceOptions,
  jsplumbTargetOptions,
} from "./config/commonConfig"
import methods from "./config/methods"
import data from "./config/data.json"
// import data1 from "./config/data1.json"
// import data2 from "./config/data2.json"
// import data3 from "./config/data3.json"
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
    }
  },
  beforeRouteEnter(to, from, next) {
    next(that => {
      // 每次进入路由执行
      that.jsPlumb = jsPlumb.getInstance()
      that.initNodeTypeObj()
      that.initNode()
      that.fixNodesPosition()
      that.$nextTick(() => {
        that.init()
      })
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
  mounted() {},
  methods: {
    initNodeTypeObj() {
      nodeTypeList.map(v => {
        this.nodeTypeObj[v.type] = v
      })
    },
    initNode() {
      let dataName = this.$route.query.name
      let dataJson = data.data.records[0].graph
      // switch (dataName) {
      //   case "设备更换":
      //     dataJson = data1
      //     break
      //   case "string":
      //     dataJson = data
      //     break
      //   case "购买审核":
      //     dataJson = data2
      //     break
      //   case "接单审核":
      //     dataJson = data3
      //     break
      // }
      this.data.lineList = dataJson.connections
      console.info("datajson", dataJson)
      dataJson.nodes.map(v => {
        // v.logImg = this.nodeTypeObj[v.type].logImg
        // v.log_bg_color = this.nodeTypeObj[v.type].log_bg_color
        v = { ...v, ...v.attributes }
        console.info(v)
        this.data.nodeList.push(v)
      })
    },
    ...methods,
    save() {
      this.data.nodeList.map(item => {
        item.attributes = { ...item.attributes, left: item.left, top: item.top }
      })
      console.info(this.data)
    },
  },
}
