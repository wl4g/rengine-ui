import oauth2 from "./modules/oAuth.vue"
import saml2 from "./modules/saml.vue"
import LDAP from "./modules/ldap.vue"
import global from "@/common/global_variable"
export default {
  name: "Authentcation",
  components: {
    oauth2,
    saml2,
    LDAP,
  },
  data() {
    return {
      activeName: "oauth2",
      currentTabComponent: oauth2,
      content: {},
      tabsData: [
        {
          labelName: "OAuth",
          name: "oauth2",
        },
        {
          labelName: "Saml",
          name: "saml2",
        },
        {
          labelName: "LDAP",
          name: "LDAP",
        },
      ],
      loginEventId: null,
    }
  },
  watch: {
    currentTabComponent: {
      handler: function (newval, oldval) {
        this.queryTabCompoent(this.activeName)
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {},

  methods: {
    handleClick(tab, event) {
      this.currentTabComponent = tab.name
    },
    queryTabCompoent(val) {
      let data = {
        kind: val,
      }
      this.$$api_modules_queryIdp({
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
