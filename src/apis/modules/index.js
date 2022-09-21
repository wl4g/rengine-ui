import global from "../../common/global_variable"
import ajax from "@/utils/ajax/ajax"

export default [
  // project
  {
    name: "项目管理列表",
    method: "queryProject",
    path: "/project/query",
    type: "get",
    sysModule: global.modules,
  },
  {
    name: "项目管理 新增|编辑 保存",
    method: "projectSave",
    path: "/project/save",
    type: "post",
    dataType: "json",
    sysModule: global.modules,
  },
  {
    name: "项目管理删除",
    method: "projectDel",
    path: "/project/delete",
    type: "post",
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
]
