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
  mounted() {
    this.jsPlumb = jsPlumb.getInstance()
    this.initNodeTypeObj()
    this.initNode()
    this.fixNodesPosition()
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    ...methods,
    initNodeTypeObj() {
      nodeTypeList.map(v => {
        this.nodeTypeObj[v.type] = v
      })
    },
    initNode() {
      this.data.lineList = data.lineList
      data.nodeList.map(v => {
        v.logImg = this.nodeTypeObj[v.type].logImg
        v.log_bg_color = this.nodeTypeObj[v.type].log_bg_color
        this.data.nodeList.push(v)
      })
    },
    save() {
      console.info(this.data)
    },
  },
}
