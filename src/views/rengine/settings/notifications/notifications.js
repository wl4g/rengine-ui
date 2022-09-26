import email from "./modules/email.vue"
import dingtalk from "./modules/dingtalk.vue"
import weCom from "./modules/weCom.vue"
import AliyunSms from "./modules/sms_aliyun.vue"
import AliyunVms from "./modules/vms_aliyun.vue"
import webhook from "./modules/webhook.vue"
export default {
  name: "Notifications",
  components: {
    email,
    dingtalk,
    weCom,
    AliyunSms,
    AliyunVms,
    webhook,
  },
  data() {
    return {
      activeName: "email",
      currentTabComponent: email,
      tabsData: [
        {
          labelName: "Email",
          name: "email",
        },
        {
          labelName: "Dingtalk",
          name: "dingtalk",
        },
        {
          labelName: "WeCom",
          name: "weCom",
        },
        {
          labelName: "SMS(Aliyun)",
          name: "AliyunSms",
        },
        {
          labelName: "VMS(Aliyun)",
          name: "AliyunVms",
        },
        {
          labelName: "Webhook",
          name: "webhook",
        },
      ],
      loginEventId: null,
      content: {},
    }
  },

  mounted() {},
  watch: {
    currentTabComponent: {
      handler: function (newval, oldval) {
        this.queryTabCompoent(this.activeName)
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleClick(tab, event) {
      this.currentTabComponent = tab.name
    },
    queryTabCompoent(val) {
      let data = {
        kind: val,
      }
      this.$$api_modules_queryNotification({
        data: data,
        fn: json => {
          this.content = json.data.providers[0]
          console.info(json.data.providers)
        },
        errFn: () => {},
      })
    },
  },
}
