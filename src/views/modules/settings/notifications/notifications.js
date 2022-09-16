import Email from "./modules/email.vue"
import Dingtalk from "./modules/dingtalk.vue"
import WeCom from "./modules/weCom.vue"
import SMS_Aliyun from "./modules/sms_aliyun.vue"
import VMS_Aliyun from "./modules/vms_aliyun.vue"
import Webhook from "./modules/webhook.vue"
export default {
  name: "Notifications",
  components: {
    Email,
    Dingtalk,
    WeCom,
    SMS_Aliyun,
    VMS_Aliyun,
    Webhook,
  },
  data() {
    return {
      activeName: "Email",
      currentTabComponent: Email,
      tabsData: [
        {
          labelName: "Email",
          name: "Email",
        },
        {
          labelName: "Dingtalk",
          name: "Dingtalk",
        },
        {
          labelName: "WeCom",
          name: "WeCom",
        },
        {
          labelName: "SMS(Aliyun)",
          name: "SMS_Aliyun",
        },
        {
          labelName: "VMS(Aliyun)",
          name: "VMS_Aliyun",
        },
        {
          labelName: "Webhook",
          name: "Webhook",
        },
      ],
      loginEventId: null,
    }
  },

  mounted() {},

  methods: {
    handleClick(tab, event) {
      this.currentTabComponent = tab.name
    },
  },
}
