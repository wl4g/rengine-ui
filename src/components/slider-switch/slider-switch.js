export default {
  name: "slider-switch",
  components: {},
  computed: {},
  data() {
    return {
      styleClass: this.isChecked,
    }
  },
  watch: {},
  props: {
    isChecked: Boolean,
    sliderDisable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeType() {
      this.styleClass = !this.styleClass
      this.$emit("update:isChecked", this.styleClass)
      this.$emit("change", !this.styleClass)
    },
  },
  destroyed() {},
}
