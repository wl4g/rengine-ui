import * as monaco from "monaco-editor"
import DialectFactory from "./dialect/base.js"
import GroovyDialect from "./dialect/groovy.js"
import JavaDialect from "./dialect/java.js"
import JavascriptDialect from "./dialect/javascript.js"
import { cache } from "../../../../../utils"
import selectTreeDropdown from "../../../../../components/select-tree-dropdown"
export default {
  props: {
    codes: {
      type: String,
      default: function () {
        return ""
      },
    },
    showTheme: {
      type: Boolean,
      default: function () {},
    },
    runningButton: {
      type: Boolean,
      default: function () {},
    },
    language: {
      type: String,
      default: function () {
        return "html"
      },
    },
    editorOptions: {
      type: Object,
      default: function () {
        return {
          monacoEditor: null,
          monacoTerminalEditor: null,
          autoIndent: true, //自动缩进
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false, // 只读
          cursorStyle: "line", //光标样式
          automaticLayout: false, //自动布局
          glyphMargin: true, //字形边缘
          useTabStops: false,
          formatDocument: true,
          fontSize: 14, //字体大小
          quickSuggestionsDelay: 100, //代码提示延时
        }
      },
    },
    terminalOptions: {
      type: Object,
      default: function () {
        return {
          monacoTerminalEditor: null,
          autoIndent: true, //自动缩进
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: true, // 只读, 不可编辑
          minimap: {
            enabled: false, // 不要小地图
          },
          cursorStyle: "line", //光标样式
          automaticLayout: false, //自动布局
          glyphMargin: true, //字形边缘
          useTabStops: false,
          formatDocument: true,
          fontSize: 14, //字体大小
          quickSuggestionsDelay: 500, //代码提示延时
        }
      },
    },
  },
  components: {
    selectTreeDropdown,
  },
  data() {
    return {
      themeOption: [
        {
          value: "vs",
          label: "默认",
        },
        {
          value: "hc-black",
          label: "高亮",
        },
        {
          value: "vs-dark",
          label: "深色",
        },
      ],
      recentlyRun: [
        {
          value: "vs",
          label: "/User Dependencies/Java Dependencies",
        },
        {
          value: "hc-black",
          label: "/User Dependencies/Groovy Dependencies",
        },
        {
          value: "vs-dark",
          label: "/User Dependencies/Js Dependencies",
        },
        {
          value: "vs-dark",
          label: "更多...",
        },
      ],
      theme: "vs",
      options: [
        {
          value: "选项1",
          label: "Java Dependencies 模拟运行",
        },
        {
          value: "选项2",
          label: "sql Dependencies 模拟运行",
        },
        {
          value: "选项3",
          label: "groovy Dependencies 模拟运行",
        },
      ],
      value: "",
      codesCopy: null, //内容备份
      suggestions: [],
      triggerCharacters: ["."],
      librarys: [],
      fileList: [],
      minioConfig: null,
      defaultProps: {
        children: "childrens",
        label: "path",
      },
      treeData: [
        {
          path: "User Dependencies",
          childrens: [
            {
              path: "Java Dependencies",
              childrens: [],
            },
          ],
        },
      ],
      showRightMenu: false,
      showTopSelect: false,
      nodeDetail: {},
      currentNodeId: "",
      fileIconShow: true,
      showTerminalVisible: false,
      terminalFullScreen: false,
      global_theme: "",
      monacoTerminalEditor: null,
      formFields: { sename: "", switchingroomname: "", switchingroomId: "" },
      zNodes: [],
      //弹窗园区树下拉树组件传递对象
      selectGardenTreeData: {
        nodeKey: "equipementStationId",
        list: [],
        treeShow: false,
        checkedKeys: [],
        defaultProps: {
          children: "childNode",
          label: "sename",
          id: "equipementStationId",
        },
      },

      //弹窗设备树下拉树组件传递对象
      selectUserTreeData: {
        nodeKey: "userId",
        list: [],
        treeShow: false,
        multiple: true,
        checkedKeys: [],
        defaultProps: {
          children: "childNode",
          label: "userName",
          email: "email",
          userPhone: "userPhone",
          id: "userId",
        },
      },
      editMenuList: [
        {
          name: "revoke",
          shortcutsName: "Crtl+Z",
        },
        {
          name: "recover",
          shortcutsName: "Crtl+Y",
        },
        {
          name: null,
          shortcutsName: "",
        },
        {
          name: "cut",
          shortcutsName: "Ctrl+X",
        },
        {
          name: "copy",
          shortcutsName: "Ctrl+C",
        },
        {
          name: "paste",
          shortcutsName: "Ctrl+V",
        },
        {
          name: null,
          shortcutsName: "",
        },
        {
          name: "find",
          shortcutsName: "Ctrl+F",
        },
        {
          name: "replace",
          shortcutsName: "Ctrl+H",
        },
      ],
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return ""
      let num = value.toString().length
      if (num > 3) {
        return "#..." + value.toString().slice(num - 3, num)
      }
      return value
    },
  },
  computed: {
    global_theme: {
      cache: true,
      get() {
        return cache.get("global_theme")
      },
    },
  },
  watch: {
    global_theme: {
      handler: function (val, oldVal) {
        console.info("----------", cache.get("global_theme"))
      },
      immediate: true,
    },
  },
  mounted() {
    this.librarys = require("./mock1.json").data.types
    this.librarys.forEach(item => {
      item.simpleName = item.name.split(".")[item.name.split(".").length - 1]
      item.childrens = []
      item.childrens.push(
        ...item.fields,
        ...item.staticFields,
        ...item.methods,
        ...item.staticMethods
      )
    })
    this.$nextTick(() => {
      this.initEditor()
    })
    DialectFactory.register("groovy", GroovyDialect)
    DialectFactory.register("java", JavaDialect)
    DialectFactory.register("javascript", JavascriptDialect)
    window.addEventListener("dopass_global_theme", function (e) {
      const newdata = JSON.parse(e.newValue)
      console.log("值改变了", newdata)
    })
  },
  beforeDestroy() {},
  methods: {
    initEditor(changecode) {
      let self = this
      self.$refs.container.innerHTML = ""
      self.monacoEditor = monaco.editor.create(self.$refs.container, {
        value: changecode ? changecode : self.codes,
        language: self.language,
        theme: self.theme, //vs, hc-black, or vs-dark
        ...self.editorOptions,
        acceptSuggestionOnCommitCharacter: false,
        automaticLayout: true, // 自动布局
      })

      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        allowNonTsExtensions: true,
        lib: [],
      })
      monaco.languages.registerCompletionItemProvider(self.language, {
        provideCompletionItems() {
          var suggestions = self.suggestions
          for (let i = 0; i < suggestions.length; i++) {
            const v = suggestions[i]
            delete v.range // 必须清除range，不然 .号后面东西都提示不了
          }
          return {
            suggestions: self.suggestions,
          }
        },
        resolveCompletionItem(item, token) {
          return null
        },
        triggerCharacters: self.triggerCharacters, // 触发提示的字符，可以写多个
      })

      self.monacoEditor.setValue(self.monacoEditor.getValue()) //格式化语句
      self.$emit("onMounted", self.monacoEditor) //编辑器创建完成回调
      self.monacoEditor.onDidChangeModelContent(function (event) {
        //编辑器内容changge事件
        self.$emit("onCodeChange", self.monacoEditor.getValue(), event)
        let model = self.monacoEditor.getModel()
        let currentLineText = model
          .getLineContent(event.changes[0].range.endLineNumber)
          .substring(0, event.changes[0].range.endColumn)
        if (event.changes[0].text == ".") {
          self.suggestions = []
          self.suggestions = DialectFactory.for(
            self.language
          ).processSuggestions(currentLineText, self.librarys)
        } else {
          self.suggestions = []
          self.librarys.forEach(item => {
            self.triggerCharacters.push(item.simpleName.charAt(0))
            self.suggestions.push({
              label: item.simpleName,
              insertText: item.simpleName,
              detail: item.simpleName,
            })
            self.triggerCharacters = [...new Set(self.triggerCharacters)]
            self.suggestions = [...new Set(self.suggestions)]
          })
        }
      })
      self.monacoEditor.onKeyUp(function (event) {
        if (event.code == "Enter") {
          let pos = self.monacoEditor.getPosition()
          let model = self.monacoEditor.getModel()
          let insertText = DialectFactory.Utils.processEnterChanged(
            pos,
            model,
            self.librarys,
            self.monacoEditor.getValue()
          )
          insertText && self.monacoEditor.executeEdits("", [insertText])
        }
      })
      //编辑器随窗口自适应
      window.addEventListener("resize", function () {
        initEditor()
      })
      self.$refs.terminal.innerHTML = ""
      self.monacoTerminalEditor = monaco.editor.create(self.$refs.terminal, {
        value: changecode ? changecode : self.codes,
        // language: self.language,
        theme: self.theme, //vs, hc-black, or vs-dark
        ...self.terminalOptions,
        acceptSuggestionOnCommitCharacter: false,
        automaticLayout: true, // 自动布局
      })
    },

    // RunResult () {
    //   console.log(this.monacoEditor.getValue());
    //   // this.$emit('runResult',this.monacoEditor.getValue())
    // },
    chooseThemes(val) {
      this.theme = val
      this.initEditor(this.codes)
    },
    chooseRecentlyRun(val) {
      this.showTopSelect = true
    },
    simulationStart() {
      this.showTopSelect = true
      console.info(this.$refs.selectRef)
      this.$refs.selectRef.toggleMenu()
    },
    loadmore() {
      // 在这里请求接口加载数据
      console.log("滚动到底部了")
    },
    fileIcon(val) {
      this.fileIconShow = !this.fileIconShow
      if (val == true) {
        document.querySelector(`.file-directory-${this.theme}`).style.display =
          ""
        document.querySelector(`.file-directory-${this.theme}`).style.width =
          "25%"
        document.querySelector(".monaco-content").style.width = "75%"
      } else {
        document.querySelector(`.file-directory-${this.theme}`).style.display =
          "none"
        document.querySelector(".monaco-content").style.width = "100%"
      }
    },
    showTerminal(changecode) {
      this.showTerminalVisible = !this.showTerminalVisible
    },
    showTerminalFull(changecode) {
      this.terminalFullScreen = !this.terminalFullScreen
      if (this.terminalFullScreen) {
        document.querySelector(".terminal").style.height = "100%"
        document.querySelector("#container").style.height = "0%"
      } else {
        document.querySelector(".terminal").style.height = ""
        document.querySelector("#container").style.height = ""
      }
    },
    rightClick(event, data, node, obj) {
      this.showRightMenu = false
      this.showRightMenu = true
      let menu = document.querySelector("#menu")
      menu.style.left = `calc(${event.screenX + "px"} + 1vw)`
      menu.style.top = event.screenY - 100 + "px"
      menu.style.display = ""
      //
      document.addEventListener("click", this.closeRightMenu)
      document.addEventListener("contextmenu", this.closeRightMenu)
      this.nodeDetail = { ...node }
    },
    closeRightMenu() {
      console.info("监听右键关闭")
      this.showRightMenu = false
      let menu = document.querySelector("#menu")
      menu.style.display = "none"
      this.nodeDetail = {}
      // 关掉鼠标监听事件
      document.removeEventListener("click", this.closeRightMenu)
    },
    editTreeNode() {},
    clickShortcuts(name) {
      switch (name) {
        case "revoke":
          // console.info("2222222", this.monacoEditor.getSupportedActions())
          this.monacoEditor.trigger("anyString", "cursorUndo")
          // this.monacoEditor.trigger(
          //   monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_Z
          // )
          // const action = {
          //   id: "test",
          //   label: "test",
          //   precondition: "isChrome == true",
          //   keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_Z],
          //   run: () => {
          //     window.alert("chrome: cmd + k")
          //   },
          // }
          // window.dispatchEvent(
          //   new KeyboardEvent("keyup", {
          //     key: "Ctrl",
          //   })
          // )
          // window.dispatchEvent(
          //   new KeyboardEvent("keydown", {
          //     key: "z",
          //   })
          // )
          // this.monacoEditor.focus()
          break
        case "recover":
          console.info("1111111", name)
          break
        case "cut":
          this.monacoEditor.focus()
          document.execCommand("cut")
          break
        case "copy":
          this.monacoEditor.focus()
          document.execCommand("copy")
          break
        case "paste":
          this.monacoEditor.focus()
          document.execCommand("paste")
          break
        case "find":
          this.monacoEditor.trigger("anyString", "actions.find")
          break
        case "replace":
          this.monacoEditor.trigger(
            "anyString",
            "editor.action.startFindReplaceAction"
          )
          break
      }
    },
    handleCheckChange(data, checked, indeterminate) {},
    nodeClick(data) {},
    delTreeNode() {},
  },
}
