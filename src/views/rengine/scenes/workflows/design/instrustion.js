import Vue from "vue"
Vue.directive("drag", {
  bind(el, binding) {
    // 鼠标按下
    el.onmousedown = e => {
      let cyBtn = document.createElement("div") //复制一份el主体
      let lefts = ""
      let mainList = {}
      cyBtn.setAttribute("id", "drag") //给标签添加一个id
      cyBtn.style.position = "absolute" //修改元素的熟悉感
      cyBtn.style.width = "200px"
      cyBtn.style.fontSize = "12px"
      cyBtn.style.lineHeight = "28px"
      cyBtn.style.background = "white"
      cyBtn.style.textAlign = "center"
      cyBtn.style.boxShadow = "0 2px 10px rgb(0 0 0 / 20%)"
      cyBtn.style.display = "flex"
      cyBtn.style.alignItems = "center"
      cyBtn.style.justifyContent = "center"
      cyBtn.style.padding = "1px 10px"
      cyBtn.style.zIndex = "60"
      cyBtn.style.cursor = "pointer"
      cyBtn.innerHTML = `<img src='${
        JSON.parse(binding.value).img
      }'       style="width:23px;height:23px;margin-left:10px;position:absolute;left:0;"><span">${
        JSON.parse(binding.value).name
      }</span>` //插入组件名
      let body = document.body //获取body对象
      body.appendChild(cyBtn) //在body下面插入子节点的主题
      // 算出鼠标相对元素的位置
      let disX = e.pageX - el.offsetLeft //x轴坐标
      let disY = e.pageY - el.offsetTop //y轴坐标
      let top = ""
      let tops = ""
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX //  鼠标停留 计算出相对位置
        top = e.clientY - disY //  鼠标停留 计算出相对位置
        lefts = e.pageX
        tops = e.pageY
        document.querySelector("#drag").style.left = `${left}px`
        document.querySelector("#drag").style.top = `${tops - 10}px`
        lefts = left - document.querySelector("#workflow-editor").offsetLeft
      }
      // 鼠标松开
      document.onmouseup = () => {
        document.onmousemove = null //清除移动事件
        document.onmouseup = null //清除鼠标移开事件
        let leftWidths =
          document.querySelector("#workflow-editor").offsetWidth - 150
        if (lefts > 0 && lefts <= leftWidths && top > 46) {
          let bindings = JSON.parse(binding.value)
          bindings.componentId = `${bindings.componentId}-${parseInt(
            new Date().getTime() / 1000
          )}-${Math.ceil(Math.random() * 10)}`
          mainList = {
            x: lefts,
            y: tops,
            ...bindings,
          }
          this.$store.dispatch("flowChart/setFlowChartList", mainList) //存放带vuex中
        }
        document.getElementById("drag").remove() //删除元素id
      }
    }
  },
})
