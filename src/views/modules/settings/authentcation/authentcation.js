import OAuth from "./modules/oAuth.vue"
import Saml from "./modules/saml.vue"
import LDAP from "./modules/ldap.vue"
export default {
  name: "Authentcation",
  components: {
    OAuth,
    Saml,
    LDAP,
  },
  data() {
    return {
      activeName: "OAuth",
      currentTabComponent: OAuth,
      tabsData: [
        {
          labelName: "OAuth",
          name: "OAuth",
        },
        {
          labelName: "Saml",
          name: "Saml",
        },
        {
          labelName: "LDAP",
          name: "LDAP",
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
