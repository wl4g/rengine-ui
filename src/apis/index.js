/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */
import iam from "./iam/"
import modules from "./modules/"

export default [
  {
    module: "iam",
    name: "权限管理",
    list: iam,
  },
  {
    module: "modules",
    name: "权限管理",
    list: modules,
  },
]
