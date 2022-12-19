import global from "../../common/global_variable"
import ajax from "@/utils/ajax/ajax"

export default [
  // scenes
  {
    name: "项目管理列表",
    method: "queryScenes",
    path: "/scenes/query",
    type: "get",
    sysModule: global.modules,
  },
  {
    name: "项目管理 新增|编辑 保存",
    method: "scenesSave",
    path: "/scenes/save",
    type: "post",
    dataType: "json",
    sysModule: global.modules,
  },
  {
    name: "项目管理删除",
    method: "scenesDel",
    path: "/scenes/delete",
    type: "post",
    dataType: "json",
    sysModule: global.modules,
  },

  //工作流
  {
    name: "工作流列表",
    method: "queryWorkflow",
    path: "/workflow/query",
    type: "get",
    sysModule: global.modules,
  },
  {
    name: "工作流 新增|编辑 保存",
    method: "workflowSave",
    path: "/workflow/save",
    type: "post",
    dataType: "json",
    sysModule: global.modules,
  },
  {
    name: "工作流删除",
    method: "workflowDel",
    path: "/workflow/delete",
    type: "post",
    dataType: "json",
    sysModule: global.modules,
  },
  //工作流设计
  {
    name: "工作流设计查询",
    method: "queryWorkflowDesign",
    path: "/workflowgraph/query",
    type: "get",
    dataType: "json",
    sysModule: global.modules,
  },
  {
    name: "工作流设计保存",
    method: "saveWorkflowDesign",
    path: "/workflowgraph/save",
    type: "post",
    dataType: "json",
    sysModule: global.modules,
  },
  {
    name: "历史工作流设计删除",
    method: "workflowgraphDel",
    path: "/workflowgraph/delete",
    type: "post",
    dataType: "json",
    sysModule: global.modules,
  },

  //规则模型
  {
    name: "规则模型列表查询",
    method: "queryrules",
    path: "/rule/query",
    type: "get",
    sysModule: global.modules,
  },
  {
    name: "规则模型 新增|编辑 保存",
    method: "saveRule",
    path: "/rule/save",
    dataType: "json",
    type: "post",
    sysModule: global.modules,
  },
  {
    name: "规则模型删除",
    method: "ruleDel",
    path: "/rule/delete",
    type: "post",
    dataType: "json",
    sysModule: global.modules,
  },

  //通知配置
  {
    name: "通知设置列表",
    method: "queryNotification",
    path: "/notification/query",
    type: "get",
    sysModule: global.modules,
  },
  {
    name: "保存通知设置",
    method: "saveNotification",
    path: "/notification/save",
    dataType: "json",
    type: "post",
    sysModule: global.modules,
  },

  //认证集成
  {
    name: "认证集成查询",
    method: "queryIdp",
    path: "/idp/query",
    type: "get",
    sysModule: global.modules,
  },
  {
    name: "认证集成保存",
    method: "saveIdp",
    path: "/idp/save",
    type: "post",
    dataType: "json",
    sysModule: global.modules,
  },

  //自定义库
  {
    name: "自定义库上传文件配置",
    method: "uploadApply",
    path: "/upload/apply",
    type: "post",
    dataType: "json",
    sysModule: global.modules,
  },
  {
    name: "自定义库 新增|编辑 保存",
    method: "uploadSave",
    path: "/upload/save",
    type: "post",
    dataType: "json",
    sysModule: global.modules,
  },
  {
    name: "自定义库列表",
    method: "queryUpload",
    path: "/upload/query",
    type: "get",
    sysModule: global.modules,
  },
  {
    name: "自定义库列表删除",
    method: "uploadDel",
    path: "/upload/delete",
    type: "get",
    dataType: "json",
    sysModule: global.modules,
  },
]
