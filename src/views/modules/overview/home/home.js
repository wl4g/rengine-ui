export default {
  name: "Home",
  data() {
    return {
      workingStatusList: [
        {
          name: "运行中",
          num: 12,
        },
        {
          name: "失败",
          num: 3,
        },
        {
          name: "成功",
          num: 13,
        },
        {
          name: "取消",
          num: 2,
        },
      ],
      runningList: [
        {
          name: "设备温度告警",
          num: 18,
          type: 0,
          account: "admin",
        },
        {
          name: "设备在线率警告",
          num: 22,
          type: 1,
          account: "admin1",
        },
        {
          name: "统一认证可以告警",
          num: 28,
          type: 1,
          account: "admin2",
        },
      ],
    }
  },
}
