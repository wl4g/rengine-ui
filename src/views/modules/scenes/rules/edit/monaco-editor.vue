<template>
  <div class="myEditor">
    <!-- <p style="display: flex; justify-content: space-between; height: 50px;" v-if="showTheme || runningButton">
      <span class="theme" v-if="showTheme">
        <el-select v-model="theme" size="mini" @change="themeChange" placeholder="请选择主题">
          <el-option v-for="item in themeOption" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </span>
      <el-button v-if="runningButton" type="success" @click="RunResult">确定</el-button>
    </p> -->
    <div class="monacoTop"></div>
    <div class="monacoBody">
      <div class="file-directory">
        <!--鼠标右键菜单栏 -->
        <div v-show="showRightMenu == true">
          <ul id="menu" class="right-menu">
            <li class="menu-item" @click="editTreeNode">
              重命名
            </li>
            <li class="menu-item" @click="delTreeNode">
              删除
            </li>
          </ul>
        </div>
        <el-tree :data="treeData" :props="defaultProps" :expand-on-click-node="false" ref="tree" class="tree-line" :indent="0" highlight-current @node-click="nodeClick" @node-contextmenu="rightClick" @check-change="handleCheckChange" default-expand-all>
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
              <span>
                {{data.path}}
              </span>
            </span>
          </span>
        </el-tree>
      </div>
      <div id="container" ref="container" style="height:100%"></div>
    </div>
  </div>
</template>
<script>
import * as monaco from "monaco-editor";
import DialectFactory from "./dialect/base.js"
import GroovyDialect from './dialect/groovy.js';
import JavaDialect from './dialect/java.js';
import JavascriptDialect from './dialect/javascript.js';

export default {

  props: {
    codes: {
      type: String,
      default: function () {
        return "";
      },
    },
    showTheme: {
      type: Boolean,
      default: function () { },
    },
    runningButton: {
      type: Boolean,
      default: function () { },
    },
    language: {
      type: String,
      default: function () {
        return "html";
      },
    },
    editorOptions: {
      type: Object,
      default: function () {
        return {
          monacoEditor: null,
          autoIndent: true, //自动缩进
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false, // 只读
          cursorStyle: "line", //光标样式
          automaticLayout: false, //自动布局
          glyphMargin: true, //字形边缘
          useTabStops: false,
          formatDocument: true,
          fontSize: 28, //字体大小
          quickSuggestionsDelay: 500, //代码提示延时
        };
      },
    },
  },
  data () {
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
      theme: "hc-black",
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
          path: "path1",
          childrens: [{
            path: "path1-1",
            childrens: []
          }]
        }
      ],
      showRightMenu: false,
      nodeDetail: {},
      currentNodeId: ''
    };
  },
  mounted () {
    this.librarys = require("./mock1.json").data.types;
    this.librarys.forEach((item) => {
      item.simpleName =
        item.name.split(".")[item.name.split(".").length - 1];
      item.childrens = [];
      item.childrens.push(
        ...item.fields,
        ...item.staticFields,
        ...item.methods,
        ...item.staticMethods
      );
    });
    this.$nextTick(() => {
      this.initEditor();
    });
    DialectFactory.register("groovy", GroovyDialect);
    DialectFactory.register("java", JavaDialect);
    DialectFactory.register("javascript", JavascriptDialect);
  },
  beforeDestroy () { },
  methods: {
    initEditor (changecode) {
      let self = this;
      self.$refs.container.innerHTML = "";
      self.monacoEditor = monaco.editor.create(self.$refs.container, {
        value: changecode ? changecode : self.codes,
        language: self.language,
        theme: self.theme, //vs, hc-black, or vs-dark
        editorOptions: self.editorOptions,
        acceptSuggestionOnCommitCharacter: false,
        automaticLayout: true, // 自动布局
      });
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        allowNonTsExtensions: true,
        lib: []
      })
      monaco.languages.registerCompletionItemProvider(self.language, {
        provideCompletionItems () {
          var suggestions = self.suggestions;
          for (let i = 0; i < suggestions.length; i++) {
            const v = suggestions[i];
            delete v.range;// 必须清除range，不然 .号后面东西都提示不了
          }
          return {
            suggestions: self.suggestions,
          };
        },
        resolveCompletionItem (item, token) {
          return null;
        },
        triggerCharacters: self.triggerCharacters, // 触发提示的字符，可以写多个
      });

      self.monacoEditor.setValue(self.monacoEditor.getValue()); //格式化语句
      self.$emit("onMounted", self.monacoEditor); //编辑器创建完成回调
      self.monacoEditor.onDidChangeModelContent(function (event) {
        //编辑器内容changge事件
        self.$emit("onCodeChange", self.monacoEditor.getValue(), event);
        let model = self.monacoEditor.getModel();
        let currentLineText = model.getLineContent(
          event.changes[0].range.endLineNumber,
        ).substring(0, event.changes[0].range.endColumn);
        if (event.changes[0].text == ".") {
          self.suggestions = []
          self.suggestions = DialectFactory.for(self.language).processSuggestions(currentLineText, self.librarys)
        } else {
          self.suggestions = []
          self.librarys.forEach(item => {
            self.triggerCharacters.push(item.simpleName.charAt(0))
            self.suggestions.push({
              label: item.simpleName,
              insertText: item.simpleName,
              detail: item.simpleName
            })
            self.triggerCharacters = [...new Set(self.triggerCharacters)]
            self.suggestions = [...new Set(self.suggestions)]
          })
        }
      });
      self.monacoEditor.onKeyUp(function (event) {
        if (event.code == "Enter") {
          let pos = self.monacoEditor.getPosition()
          let model = self.monacoEditor.getModel();
          let insertText = DialectFactory.Utils.processEnterChanged(pos, model, self.librarys, self.monacoEditor.getValue())
          insertText && self.monacoEditor.executeEdits("", [insertText]);
        }
      })
      //编辑器随窗口自适应
      window.addEventListener("resize", function () {
        initEditor();
      });
    },

    // RunResult () {
    //   console.log(this.monacoEditor.getValue());
    //   // this.$emit('runResult',this.monacoEditor.getValue())
    // },
    themeChange (val) {
      this.initEditor(this.codes);
    },
    // nodeClick (data) {
    //   console.info("ddddddddddddddddd")
    //   let currentCli = document.getElementById("menu")
    //   console.info(currentCli)
    //   if (currentCli) {
    //     if (!currentCli.contains(event.target)) {
    //       //点击到了id为option-button-group以外的区域，就隐藏菜单
    //       this.showRightMenu = false
    //     }
    //   }
    // },
    rightClick (event, data, node, obj) {
      this.showRightMenu = false
      this.showRightMenu = true
      let menu = document.querySelector("#menu")
      console.info("11111111111")
      menu.style.left = `calc(${event.screenX + "px"} + 1vw)`
      menu.style.top = event.screenY - 100 + "px"
      menu.style.display = ""
      //
      document.addEventListener("click", this.closeRightMenu)
      document.addEventListener('contextmenu', this.closeRightMenu)
      this.nodeDetail = { ...node }
    },
    closeRightMenu () {
      console.info("监听右键关闭")
      this.showRightMenu = false
      let menu = document.querySelector("#menu")
      menu.style.display = "none"
      this.nodeDetail = {}
      // 关掉鼠标监听事件
      document.removeEventListener("click", this.closeRightMenu)
    },
    editTreeNode () {
      let that = this
      console.info("222222")
    },
  },
};
</script>
<style lang="scss" >
.myEditor {
  .theme {
    display: flex;
  }
  .monacoTop {
    height: 40px;
    width: 100%;
    background: #3c3c3c;
  }
  .monacoBody {
    display: flex;
    justify-items: center;
    height: 100%;
    width: 100%;
  }
  .file-directory {
    width: 25%;
    height: 100%;
    background: #252526;
  }
  #container {
    height: 100%;
    width: 75%;
    text-align: left;
  }
  .tree-line {
    background: #252526;
    color: #fff;
    .el-tree-node__content {
      &:hover {
        background-color: #2a2d2e;
      }
    }
    .el-tree-node.is-current > .el-tree-node__content {
      background-color: #37373d;
    }
  }
  .right-menu {
    z-index: 99;
    position: absolute;
    width: 100px;
    position: absolute;
    border-radius: 5px;
    border: 1px solid #303031;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .menu-item {
      line-height: 33px;
      text-align: left;
      padding-left: 6px;
      height: 33px;
      font-size: 14px;
      background: #303031;
      color: #fff;
      list-style: none;
      cursor: pointer;
    }
    li:hover {
      background-color: #edf6ff;
      color: #606266;
    }
  }
}
</style>