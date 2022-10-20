import ECharts from "vue-echarts"
import echarts from "echarts"
import moment from "moment"
function getDataRangeParms(val) {
  let end, begin
  if (val == "OF_HOUR") {
    //一小时
    end = `${moment().subtract(0, "m").format("YYYY-MM-DD HH:mm:ss")}`
    begin = `${moment().subtract(60, "m").format("YYYY-MM-DD HH:mm:ss")}`
  } else if (val == "OF_DAY") {
    //今日
    end = `${moment().subtract(0, "days").format("YYYY-MM-DD")} 23:59:59`
    begin = `${moment().subtract(0, "days").format("YYYY-MM-DD")} 00:00:00`
  } else if (val == "OF_WEEK") {
    //本周
    begin = moment().day("Monday").format("YYYY-MM-DD 00:00:00")
    end = moment()
      .day("Monday")
      .day(+7)
      .format("YYYY-MM-DD 23:59:59")
  } else if (val == "OF_MONTH") {
    //本月
    begin = moment().startOf("month").format("YYYY-MM-DD 00:00:00")
    end = moment().endOf("month").format("YYYY-MM-DD 23:59:59")
  }
  return { begin, end }
}
export default {
  components: {
    "v-chart": ECharts,
  },
  data() {
    return {
      hourState: true,
      dayState: false,
      weekState: false,
      monthState: false,
      customState: false,
      dataType: "OF_HOUR",
      radio: "BY_MINUTE",
      radioList: [
        { value: "BY_MINUTE", label: "分", disabled: false },
        { value: "BY_HOUR", label: "时", disabled: true },
        { value: "BY_DAY", label: "天", disabled: true },
        { value: "BY_WEEK", label: "周", disabled: true },
        { value: "BY_MONTH", label: "月", disabled: true },
      ],
      hitsCharts: null,
      option: {
        tooltip: {
          trigger: "axis",
          formatter:
            "{b0}({a0}): {c0}<br />{b1}({a1}): {c1}<br/>{b2}({a2}): {c2}%",
        },
        legend: {
          data: ["命中数", "未命中", "命中率"],
        },
        xAxis: {
          data: [],
        },
        yAxis: [
          {
            type: "value",
            name: "数量",
            show: true,
            axisLine: {
              lineStyle: {
                color: "#5e859e",
                width: 2,
              },
            },
          },
          {
            type: "value",
            name: "命中率",
            min: 0,
            max: 100,
            axisLabel: {
              formatter: "{value} %",
            },
            axisLine: {
              lineStyle: {
                color: "#5e859e", //纵坐标轴和字体颜色
                width: 2,
              },
            },
          },
        ],
        series: [
          {
            name: "命中数",
            type: "bar",
            barWidth: "30%",
            data: [],
          },
          {
            name: "未命中",
            type: "bar",
            barWidth: "30%",
            data: [],
          },
          {
            name: "命中率",
            type: "line",
            yAxisIndex: 1,
            data: [],
          },
        ],
      },
    }
  },
  created() {},

  mounted() {
    this.$nextTick(() => {
      this.loadEventData(this.dataType)
    })
  },
  methods: {
    loadEventData(id) {
      switch (id) {
        case "OF_HOUR":
          this.hourState = true
          this.dayState = false
          this.weekState = false
          this.monthState = false
          this.customState = false
          break
        case "OF_DAY":
          this.hourState = false
          this.dayState = true
          this.weekState = false
          this.monthState = false
          this.customState = false
          break
        case "OF_WEEK":
          this.hourState = false
          this.dayState = false
          this.weekState = true
          this.monthState = false
          this.customState = false
          break
        case "OF_MONTH":
          this.hourState = false
          this.dayState = false
          this.weekState = false
          this.monthState = true
          this.customState = false
          break
        case "OF_CUSTOM":
          this.hourState = false
          this.dayState = false
          this.weekState = false
          this.monthState = false
          this.customState = true
          break
      }
      this.dataType = id
      this.radioList.forEach((item, index) => {
        if (item.value.slice(3) == id.slice(3)) {
          this.radioList.forEach((item, i) => {
            if (i >= index) {
              item.disabled = true
            } else {
              item.disabled = false
            }
          })
        }
        if (id == "OF_CUSTOM") {
          item.disabled = false
        }
      })
      this.initChart()
    },
    initChart() {
      let that = this
      that.$refs.hitChart.style.height = that.$refs.hitChart.offsetHeight + "px"
      that.$refs.hitChart.style.width = that.$refs.hitChart.clientWidth + "px"
      that.hitsCharts && that.hitsCharts.dispose()
      that.hitsCharts = echarts.init(document.getElementById("hitChart"))
      console.info(that.hitsCharts)
      that.update()
    },
    update() {
      let dataRangeParms = getDataRangeParms(this.dataType)
      let param = {
        ...dataRangeParms,
        by: this.radio,
      }
      console.info(param)
      let data = require("./mock.json").data
      this.option.series[0].data = []
      this.option.series[1].data = []
      this.option.series[2].data = []
      this.option.xAxis.data = []
      if (data.hits.length > 0) {
        data.hits.forEach(item => {
          this.option.xAxis.data.push(item.date)
          this.option.series[0].data.push(item.value)
        })
      }
      if (data.missHits.length > 0) {
        data.missHits.forEach(item => {
          this.option.series[1].data.push(item.value)
        })
      }
      if (data.hitRate.length > 0) {
        data.hitRate.forEach(item => {
          this.option.series[2].data.push(item.value)
        })
      }
      this.hitsCharts.setOption(this.option)
    },
  },
}
