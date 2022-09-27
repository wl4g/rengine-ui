import { cache } from "../utils"
// https://blog.csdn.net/mrliucx/article/details/105585202
// import { request } from "express";

// 微服务架构下多应用集群基础配置定义。
export default {
  // 因为IAM接口特殊(登录时就需要地址)
  iam: {
    // e.g. http://127.0.0.1:18080/iam-web
    // e.g. http://localhost:18080/iam-web
    // e.g. http://iam.wl4g.debug/iam-web
    //baseUri: "http://localhost:18080/iam-web",
    cluster: "iam-web",
    defaultTwoDomain: "iam",
    defaultContextPath: "/iam-web",
    defaultServerPort: "18080",
  },
  // 以下其他应用默认配置属性已弃用并删除(具体地址等值统一仅从store缓存中获取.)。
  uci: {
    cluster: "uci-server",
  },
  ucm: {
    cluster: "ucm-server",
  },
  umc: {
    cluster: "umc-manager",
  },
  cmdb: {
    cluster: "cmdb-manager",
  },
  udm: {
    cluster: "udm-manager",
  },
  uos: {
    cluster: "uos-manager",
  },
  urm: {
    cluster: "urm-manager",
  },
  gw: {
    cluster: "gateway-manager",
  },
  lcdp: {
    cluster: "lcdp-manager",
  },
  uds: {
    cluster: "uds-manager",
  },
  modules: {
    cluster: "modules-manager",
  },
  // 'standalone' mode definition.
  standaloneIamWeb: {
    cluster: "iam-web",
  },
  standaloneDevOpsServer: {
    cluster: "standalone-dopaas",
  },
  getBaseUrl: function (sysModule) {
    if (!sysModule) {
      return null
    }

    // Check the runtime mode and switch the request base path info automatically.
    const rtMode = process.env.RUNTIME_MODE
    console.debug("Currently runtime mode: ", rtMode)
    // if (rtMode.toLowerCase() == "standalone") {
    //   if (sysModule.cluster == this.iam.cluster) {
    //     sysModule = this.standaloneIamWeb
    //   } else {
    //     sysModule = this.standaloneDevOpsServer
    //   }
    // }

    let baseUri = null
    // Extract baseUri from store.
    let sysModuleCache = cache.get("iamSysModules")
    let modulesMock = {
      appName: "modules-manager",
      createBy: null,
      createDate: null,
      delFlag: 0,
      enable: null,
      envType: "fat",
      extranetBaseUri: "http://10.0.0.163:28001/admin",
      humanCreateDate: null,
      humanUpdateDate: null,
      id: 99,
      intranetBaseUri: "http://localhost:17070/modules-manager",
      organizationCode: null,
      remark: "URM Web(Cluster Portal) Services",
      type: 2,
      updateBy: null,
      updateDate: null,
      viewExtranetBaseUri: "http://dopaas.wl4g.fat",
    }
    sysModuleCache = { ...sysModuleCache, "modules-manager": modulesMock }
    console.info(sysModuleCache)
    cache.set("iamSysModules", sysModuleCache)
    if (
      sysModuleCache &&
      sysModuleCache[sysModule.cluster] &&
      sysModuleCache[sysModule.cluster]["extranetBaseUri"]
    ) {
      baseUri = sysModuleCache[sysModule.cluster]["extranetBaseUri"]
    }
    // If is IAM server, use fallback.
    else if (sysModule.cluster == this.iam.cluster) {
      baseUri = new IAMCore(this.iam).getIamBaseUri()
    } else {
      console.error(
        "Cannot get baseUri from store, No such sysModule: ",
        sysModule
      )
    }
    console.debug("Got sysModule baseUri: ", baseUri)
    return baseUri
  },
}
