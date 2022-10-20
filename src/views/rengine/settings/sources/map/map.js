import ECharts from "vue-echarts"
import echarts from "echarts"
import "echarts/lib/chart/line"
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

function compare(arr1, arr2) {
  return arr1.filter(v => {
    return arr2.includes(v)
  })
}

export default {
  name: "loginEvents",
  components: {
    "v-chart": ECharts,
  },
  props: ["loginEventId"],
  data() {
    return {
      hourState: true,
      dayState: false,
      weekState: false,
      monthState: false,
      customState: false,
      mapDialogVisible: false,
      dataType: "OF_HOUR",
      mapType: "event",
      level: "OF_COUNTRY",
      dialogLevel: "OF_COUNTRY",
      levelNum: "0",
      dialogLevelNum: "0",
      rootName: "world",
      dialogRootName: "world",
      oldDialogMapName: [],
      chartJson: [],
      oldLevel: [],
      singleClickList: [],
      oldDialogLevel: [],
      oldRootName: [],
      oldDialogRootName: [],
      topNum: 10,
      register: {},
      radio: "BY_MINUTE",
      radioList: [
        { value: "BY_MINUTE", label: "分", disabled: false },
        { value: "BY_HOUR", label: "时", disabled: false },
        { value: "BY_DAY", label: "天", disabled: false },
        { value: "BY_WEEK", label: "周", disabled: false },
        { value: "BY_MONTH", label: "月", disabled: true },
      ],
      selectRegionList: [],
      regionOption: {
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            data: [],
          },
        ],
      },
      timeOption: {
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        legend: {
          data: [],
        },
        series: [
          {
            type: "line",
            data: [],
          },
        ],
      },
      worldMap: null,
      mapOptions: {
        title: {
          text: "地图",
          subtext: "",
          sublink: "",
          left: "right",
        },
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
        },
        visualMap: {
          left: "right",
          min: 500000,
          max: 38000000,
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026",
            ],
          },
          text: ["High", "Low"],
          calculable: true,
        },
        toolbox: {
          show: true,
          //orient: 'vertical',
          left: "left",
          top: "top",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "访问量",
            type: "map",
            map: "world",
            projection: {
              project: function (point) {
                return projection(point)
              },
              unproject: function (point) {
                return projection.invert(point)
              },
            },
            zoom: 1, //当前视角的缩放比例
            roam: true, //是否开启平游或缩放
            scaleLimit: {
              //滚轮缩放的极限控制
              min: 0.5,
              max: 5,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [],
          },
        ],
      },
      dialogWorldMap: null,
      dialogMapOptions: {
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
        },
        series: [
          {
            name: "",
            type: "map",
            map: "world",
            projection: {
              project: function (point) {
                return projection(point)
              },
              unproject: function (point) {
                return projection.invert(point)
              },
            },
            zoom: 1, //当前视角的缩放比例
            roam: true, //是否开启平游或缩放
            scaleLimit: {
              //滚轮缩放的极限控制
              min: 0.5,
              max: 5,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [],
          },
        ],
      },
    }
  },
  created() {},

  watch: {
    loginEventId: {
      handler: function (nVal, oVal) {
        if (nVal && nVal != oVal) {
          this.dataType = nVal
          this.loadEventData(nVal)
        }
      },
      deep: true,
    },
  },

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
      this.loadEventDataRequest()
    },
    showChart(val) {
      this.mapType = val
      switch (val) {
        case "event":
          return this.loadEventDataRequest()
        case "region":
          return this.loadRegionDataRequest()
        case "time":
          return this.loadTimeDataRequest()
      }
    },
    loadEventDataRequest() {
      let that = this
      let param = {}
      let dataRangeParms = getDataRangeParms(that.dataType)
      param = { ...dataRangeParms, scope: that.dataType }
      if (that.mapType == "event") {
        param = { ...param, level: that.level, zipcode: this.rootName }
      }
      console.info(param)
      let url = "http://127.0.0.1:4523/m1/1109183-0-default/mock"
      if (param) {
        let paramsArray = []
        //拼接参数
        Object.keys(param).forEach(key =>
          paramsArray.push(key + "=" + param[key])
        )
        if (url.search(/\?/) === -1) {
          url += "?" + paramsArray.join("&")
        } else {
          url += "&" + paramsArray.join("&")
        }
      }
      fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (data) {
          return data.json()
        })
        .then(function (body1) {
          that.initChart()
          that.currentMapName =
            that.level == "OF_COUNTRY" ? "get-world" : that.currentMapName
          fetch(`../../../../../../static/mock/${that.currentMapName}.json`)
            .then(res => res.json())
            .then(body2 => {
              // 过滤出当前市、区边界数据 start  Country/Region/City/ area
              if (that.currentMapName != "get-world" && that.levelNum > 1) {
                let filterCityOrArea = body2.features.filter(
                  item =>
                    item.properties[`NAME_${that.levelNum - 1}`] ==
                    that.rootName
                )
                body2.features = []
                body2.features.push(...filterCityOrArea)
              }
              // 过滤出当前市、区边界数据 start

              // 给json文件添加name start
              // if (!body2.features[0].properties.name) {
              //   let jsonKeyName = Object.keys(body2.features[0].properties)
              //   let matchNameArr = ["NL_NAME_", "name"]
              //   let natchFinalNameArr = []
              //   matchNameArr.map(item => {
              //     if (item.indexOf("_") > -1) {
              //       item = item + that.levelNum
              //     }
              //     natchFinalNameArr.push(item)
              //   })
              //   let sameKeyArr = compare(jsonKeyName, natchFinalNameArr)
              //   if (sameKeyArr.length > 0) {
              //     body2.features.forEach(item => {
              //       item.properties.name = item.properties[sameKeyArr[0]] || item.properties[`NAME_${that.levelNum}`]
              //     })
              //   }
              // }
              //给json文件添加name end

              //给数据添加name字段
              body1.data.geoStatis.forEach(item => {
                let sameIdArr = body2.features.filter(
                  item1 => item1.properties.zipCode == item.zipCode
                )
                item.name = sameIdArr[0].properties.name || ""
              })
              echarts.registerMap(param.name, body2)
              that.mapOptions.series[0].data = body1.data.geoStatis
              that.mapOptions.series[0].map = param.name
              that.worldMap.setOption(that.mapOptions)
            })

          // 地图点击事件
          that.worldMap.off("click")
          that.worldMap.on("click", param => {
            that.toNextLevel(param)
          })
          // 地图缩小事件
          that.worldMap.off("georoam")
          that.worldMap.on("georoam", param => {
            if (that.level != "OF_COUNTRY") {
              let option = that.worldMap.getOption()
              let zoom = option.series[0].zoom
              if (zoom == 0.5) {
                if (that.level == "OF_COUNTRY") return
                that.worldMap.off("georoam")
                that.level = that.oldLevel.pop()
                that.rootName = that.oldRootName.pop()
                that.loadEventData(that.dataType)
              }
            }
          })
        })
    },
    initChart() {
      this.worldMap && this.worldMap.dispose()
      this.worldMap = echarts.init(document.getElementById("mapChart"))
    },
    toNextLevel(param) {
      switch (this.level) {
        case "OF_COUNTRY":
          this.oldLevel.push(this.level)
          this.oldLevel = Array.from(new Set(this.oldLevel))
          this.level = "OF_PROVINCE"
          this.currentMapName = param.data.zipCode + "_1"
          this.oldRootName.push(this.rootName)
          this.rootName = param.data.zipCode
          this.levelNum = "1"
          this.loadEventData(this.dataType)
          break
        case "OF_PROVINCE":
          this.oldLevel.push(this.level)
          this.level = "OF_CITY"
          this.currentMapName = this.oldRootName[0] + "_2"
          this.oldRootName.push(this.rootName)
          this.rootName = param.data.zipCode
          this.levelNum = "2"
          this.loadEventData(this.dataType)
          break
        case "OF_CITY":
          this.oldLevel.push(this.level)
          this.oldLevel = Array.from(new Set(this.oldLevel))
          this.currentMapName = this.oldRootName[0] + "_3"
          this.oldRootName.push(this.rootName)
          this.rootName = param.data.zipCode
          this.level = "OF_AREA"
          this.levelNum = "3"
          this.loadEventData(this.dataType)
          break
        case "OF_AREA":
          break
      }
    },
    loadRegionDataRequest() {
      this.worldMap && this.worldMap.dispose()
      this.worldMap = echarts.init(document.getElementById("mapChart"))
      let that = this
      let param = {}
      let dataRangeParms = getDataRangeParms(that.dataType)
      param = {
        ...dataRangeParms,
        scope: that.dataType,
        level: that.level,
        zipcode: this.rootName,
      }
      console.info(param)
      let url = "http://127.0.0.1:4523/m1/1109183-0-default/mock"
      if (param) {
        let paramsArray = []
        //拼接参数
        Object.keys(param).forEach(key =>
          paramsArray.push(key + "=" + param[key])
        )
        if (url.search(/\?/) === -1) {
          url += "?" + paramsArray.join("&")
        } else {
          url += "&" + paramsArray.join("&")
        }
      }
      fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (data) {
          return data.json()
        })
        .then(function (body) {
          that.currentMapName =
            that.level == "OF_COUNTRY" ? "get-world" : that.currentMapName
          console.info(body)
          let xDataArr = []
          let yDataArr = []
          body.data.geoStatis.forEach(item => {
            xDataArr.push(item.zipCode)
            yDataArr.push(Number(item.value))
          })
          that.regionOption.xAxis.data = xDataArr
          that.regionOption.series[0].data = yDataArr
          that.worldMap.setOption(that.regionOption)
        })
    },
    dateTypeChange() {
      console.info(this.radio)
      this.loadTimeDataRequest()
    },
    loadTimeDataRequest() {
      console.info("loadTimeDataRequest")
      this.worldMap && this.worldMap.dispose()
      this.worldMap = echarts.init(document.getElementById("mapChart"))
      let that = this
      let param = {}
      let dataRangeParms = getDataRangeParms(that.dataType)
      param = {
        ...dataRangeParms,
        scope: that.dataType,
        level: that.level,
        by: that.radio,
        top: that.topNum,
        zipcodes: [],
      }
      console.info(param)
      // let url = "http://127.0.0.1:4523/m1/1109183-0-default/mock"
      let url = "http://127.0.0.1:4523/m1/1109183-0-default/echart/time"
      if (param) {
        let paramsArray = []
        //拼接参数
        Object.keys(param).forEach(key =>
          paramsArray.push(key + "=" + param[key])
        )
        if (url.search(/\?/) === -1) {
          url += "?" + paramsArray.join("&")
        } else {
          url += "&" + paramsArray.join("&")
        }
      }
      fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (data) {
          return data.json()
        })
        .then(function (body) {
          that.currentMapName =
            that.level == "OF_COUNTRY" ? "get-world" : that.currentMapName
          console.info(body)
          let xDataArr = []
          console.info(Object.keys(body.data))
          let newLegend = Object.keys(body.data)
          that.timeOption.series = []
          for (let i in body.data) {
            console.info(newLegend.indexOf(i))
            let yDataArr = []
            body.data[i].forEach(item => {
              yDataArr.push(item.value)
              if (newLegend.indexOf(i) == 0) {
                xDataArr.push(item.date)
              }
            })
            that.timeOption.series.push({
              name: i,
              type: "line",
              data: yDataArr,
            })
          }

          that.timeOption.legend.data = Object.keys(body.data)
          that.timeOption.xAxis.data = xDataArr
          // that.timeOption.series[0].data = yDataArr
          that.worldMap.setOption(that.timeOption)
        })
    },
    showDialogMapChart() {
      this.mapDialogVisible = true
      this.$nextTick(() => {
        console.info(this.$refs.dialogRight.clientWidth)
        this.$refs.dialogMapChart.style.height =
          this.$refs.dialogRight.offsetHeight + "px"
        this.$refs.dialogMapChart.style.width =
          this.$refs.dialogRight.clientWidth + "px"
        this.dialogWorldMap && this.dialogWorldMap.dispose()
        this.dialogWorldMap = echarts.init(
          document.getElementById("dialogMapChart")
        )
        this.loadDialogMapChart()
      })
    },
    loadDialogMapChart() {
      let that = this
      that.dialogMapName =
        that.dialogLevel == "OF_COUNTRY" ? "get-world" : that.dialogMapName
      fetch(`../../../../../../static/mock/${that.dialogMapName}.json`)
        .then(res => res.json())
        .then(body2 => {
          // 过滤出当前市、区边界数据 start  Country/Region/City/ area
          if (that.dialogMapName != "get-world" && that.dialogLevelNum > 1) {
            let filterCityOrArea = body2.features.filter(
              item =>
                item.properties[`NAME_${that.dialogLevelNum - 1}`] ==
                that.dialogRootName
            )
            body2.features = []
            body2.features.push(...filterCityOrArea)
          }
          if (!body2.features[0].properties.name) {
            let jsonKeyName = Object.keys(body2.features[0].properties)
            let matchNameArr = ["NL_NAME_", "name"]
            let natchFinalNameArr = []
            matchNameArr.map(item => {
              if (item.indexOf("_") > -1) {
                item = item + that.dialogLevelNum
              }
              natchFinalNameArr.push(item)
            })
            let sameKeyArr = compare(jsonKeyName, natchFinalNameArr)
            if (sameKeyArr.length > 0) {
              body2.features.forEach(item => {
                item.properties.name =
                  item.properties[sameKeyArr[0]] ||
                  item.properties[`NAME_${that.dialogLevelNum}`]
              })
            }
          }
          console.info(body2)
          let zipCodeList = []
          body2.features.forEach(item => {
            if (item.properties.zipCode) {
              zipCodeList.push({
                name: item.properties.name,
                zipCode: item.properties.zipCode,
              })
            }
          })
          console.info(zipCodeList)
          echarts.registerMap("world", body2)
          that.dialogMapOptions.series[0].data = zipCodeList
          that.dialogWorldMap.setOption(that.dialogMapOptions)
          // 地图点击事件
          let click_type
          that.dialogWorldMap.off("click")
          that.dialogWorldMap.on("click", param => {
            click_type = false
            setTimeout(() => {
              if (click_type != false) return
              console.info("click", param)
              this.dialogToNextLevel(param)
            }, 200)
          })
          that.dialogWorldMap.off("dblclick")
          that.dialogWorldMap.on("dblclick", function (params) {
            click_type = true
            console.info(params)
            console.info(that.oldDialogRootName)
            let selectRegion = ""
            that.oldDialogRootName.forEach(item => {
              selectRegion += item + "-"
            })
            selectRegion += params.data.zipCode
            console.info(selectRegion)
            that.selectRegionList.push(selectRegion)
          })
          // 地图缩小事件
          that.dialogWorldMap.off("georoam")
          that.dialogWorldMap.on("georoam", param => {
            if (that.dialogLevel != "OF_COUNTRY") {
              let option = that.dialogWorldMap.getOption()
              let zoom = option.series[0].zoom
              console.info(that.oldDialogMapName)
              if (zoom == 0.5) {
                if (that.dialogLevel == "OF_COUNTRY") return
                that.dialogWorldMap.off("georoam")
                that.dialogLevel = that.oldDialogLevel.pop()
                that.dialogRootName = that.oldDialogRootName.pop()
                that.dialogMapName = that.oldDialogMapName.pop()
                console.info("that.dialogMapName", that.dialogMapName)
                that.showDialogMapChart()
              }
            }
          })
        })
    },
    dialogToNextLevel(param) {
      switch (this.dialogLevel) {
        case "OF_COUNTRY":
          this.oldDialogLevel.push(this.dialogLevel)
          this.oldDialogLevel = Array.from(new Set(this.oldDialogLevel))
          this.dialogLevel = "OF_PROVINCE"
          this.oldDialogMapName.push(this.dialogMapName)
          this.dialogMapName = param.data.zipCode + "_1"
          this.dialogRootName = param.data.zipCode
          this.oldDialogRootName.push(this.dialogRootName)
          this.dialogLevelNum = "1"
          this.singleClickList.push(param.name)
          this.showDialogMapChart()
          break
        case "OF_PROVINCE":
          this.oldDialogLevel.push(this.dialogLevel)
          this.dialogLevel = "OF_CITY"
          this.oldDialogMapName.push(this.dialogMapName)
          this.dialogMapName = this.oldDialogRootName[0] + "_2"
          this.dialogRootName = param.data.zipCode
          this.oldDialogRootName.push(this.dialogRootName)
          this.dialogLevelNum = "2"
          this.showDialogMapChart()
          break
        case "OF_CITY":
          this.oldDialogLevel.push(this.dialogLevel)
          this.oldDialogLevel = Array.from(new Set(this.oldDialogLevel))
          this.dialogMapName = this.oldDialogRootName[0] + "_3"
          this.oldDialogMapName.push(this.dialogMapName)
          this.dialogRootName = param.data.zipCode
          this.oldDialogRootName.push(this.dialogRootName)
          this.dialogLevel = "OF_AREA"
          this.dialogLevelNum = "3"
          this.showDialogMapChart()
          break
        case "OF_AREA":
          break
      }
    },
    delSelectRegion(i) {
      this.selectRegionList.splice(i, 1)
    },
    confirmSelectRegion() {
      this.mapDialogVisible = false
      this.loadTimeDataRequest()
    },
  },
}
