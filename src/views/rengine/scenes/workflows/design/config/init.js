const nodeTypeList = [
  {
    type: "ALL",
    typeName: "ALL",
    nodeName: "ALL",
    // logImg: require("../assets/svg/1开始.svg"),
    symbol: "&",
    // log_bg_color: "rgba(0, 128, 0, 0.2)",
  },
  {
    type: "AND",
    typeName: "AND",
    nodeName: "AND",
    // logImg: require("../assets/svg/1开始.svg"),
    symbol: "&&",
    // log_bg_color: "rgba(0, 128, 0, 0.2)",
  },
  {
    type: "OR",
    typeName: "OR",
    nodeName: "OR",
    // logImg: require("../assets/svg/1开始.svg"),
    symbol: "||",
    // log_bg_color: "rgba(0, 128, 0, 0.2)",
  },
  {
    type: "ANY",
    typeName: "ANY",
    nodeName: "ANY",
    // logImg: require("../assets/svg/1开始.svg"),
    symbol: "|",
    // log_bg_color: "rgba(0, 128, 0, 0.2)",
  },
  {
    type: "NOT",
    typeName: "NOT",
    nodeName: "NOT",
    // logImg: require("../assets/svg/1开始.svg"),
    symbol: "!",
    // log_bg_color: "rgba(0, 128, 0, 0.2)",
  },
  // {
  //   type: "end",
  //   typeName: "结束",
  //   nodeName: "结束",
  //   logImg: require("../assets/svg/2结束.svg"),
  //   log_bg_color: "rgba(255, 0, 0, 0.2)",
  // },
  // {
  //   type: "dataSet",
  //   typeName: "规则",
  //   nodeName: "规则",
  //   logImg: require("../assets/svg/5文件数据.svg"),
  //   log_bg_color: "rgba(0, 128, 0, 0.2)",
  // },
  {
    type: "encode",
    typeName: "",
    nodeName: "",
    // logImg: require("../assets/svg/6数据校验.svg"),
    // log_bg_color: "rgba(163, 117, 233, 0.2)",
  },
  {
    type: "judge",
    typeName: "F",
    nodeName: "F",
  },
  {
    type: "judge",
    typeName: "T",
    nodeName: "T",
  },
]

console.log(nodeTypeList)

export { nodeTypeList }
