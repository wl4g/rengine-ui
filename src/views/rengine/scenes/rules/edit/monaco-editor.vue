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
    <div class="monacoTop">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#303031" text-color="#fff" active-text-color="#fff">
        <el-submenu index="1">
          <template slot="title">{{$t('message.monaco.file')}}</template>
          <el-menu-item index="1-1">{{$t("message.monaco.addDependencyLibrary")}}</el-menu-item>
          <div class="bottom-line"></div>
          <el-menu-item index="1-2">{{$t("message.monaco.save")}}</el-menu-item>
          <div class="bottom-line"></div>
          <el-menu-item index="1-3">
            <template slot="title">
              <div class="save">
                <div>{{$t("message.monaco.autoSave")}}</div>
                <i class="el-icon-check"></i>
              </div>
            </template>
          </el-menu-item>
          <div class="bottom-line"></div>
          <el-submenu index="2-4">
            <template slot="title">{{$t("message.monaco.preferred")}}</template>
            <!-- <el-menu-item index="2-4-1"></el-menu-item> -->
            <el-submenu index="2-4">
              <template slot="title">{{$t("message.monaco.themes")}}</template>
              <el-menu-item :index="item.value" v-for="item in themeOption" :key="item.value" @click="chooseThemes(item.value)">
                <template slot="title">
                  <div class="save">
                    <div>{{item.label}}</div>
                    <i class="el-icon-check" v-if="item.value == theme"></i>
                  </div>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">{{$t("message.monaco.edit")}}</template>
          <el-menu-item index="2-1">{{$t("message.monaco.revoke")}}</el-menu-item>
          <el-menu-item index="2-2">{{$t("message.monaco.recover")}}</el-menu-item>
          <div class="bottom-line"></div>
          <el-menu-item index="2-3">{{$t("message.monaco.cut")}}</el-menu-item>
          <el-menu-item index="2-3">{{$t("message.monaco.copy")}}</el-menu-item>
          <el-menu-item index="2-3">{{$t("message.monaco.paste")}}</el-menu-item>
          <div class="bottom-line"></div>
          <el-menu-item index="2-4">{{$t("message.monaco.find")}}</el-menu-item>
          <el-menu-item index="2-4">{{$t("message.monaco.replace")}}</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">{{$t("message.monaco.running")}}</template>
          <el-menu-item index="3-1" @click="simulationStart()">{{$t("message.monaco.simulationStart")}}</el-menu-item>
          <el-menu-item index="3-2">{{$t("message.monaco.recentlyRun")}}</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">{{$t("message.monaco.terminal")}}</el-menu-item>
        <el-submenu index="5">
          <template slot="title">{{$t("message.monaco.help")}}</template>
          <el-menu-item index="5-1"><a style="color: #fff !important;" href="https://www.ele.me" target="_blank">{{$t("message.monaco.documentation")}}</a></el-menu-item>
          <el-menu-item index="5-2">{{$t("message.monaco.about")}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="monacoBody">
      <div class="monacoBodyTopSelect" v-show="showTopSelect">
        <el-select ref="selectRef" v-model="value" filterable remote v-load-more.method="loadmore" reserve-keyword placeholder="请输入关键词">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="" :class="`file-directory-${theme}`">
        <i class="el-icon-s-fold " :class="`fileIcon-${theme}`" @click="fileIcon(false)"></i>
        <!--鼠标右键菜单栏 -->
        <div v-show="showRightMenu == true">
          <ul id="menu" class="right-menu">
            <li class="menu-item" @click="editTreeNode">
              {{$t("message.monaco.rename")}}
            </li>
            <li class="menu-item" @click="delTreeNode">
              {{$t("message.monaco.delete")}}
            </li>
          </ul>
        </div>
        <el-tree :data="treeData" :props="defaultProps" :expand-on-click-node="false" ref="tree" :class="`tree-line-${theme}`" :indent="0" highlight-current @node-click="nodeClick" @node-contextmenu="rightClick" @check-change="handleCheckChange" default-expand-all>
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
              <span>
                {{data.path}}
              </span>
            </span>
          </span>
        </el-tree>
      </div>
      <i class="el-icon-s-unfold" :class="`fileIconShow-${theme}`" v-if="fileIconShow == false" @click="fileIcon(true)"></i>
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
import { cache } from "../../../../../utils";
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
      theme: "vs",
      options: [
        {
          value: '选项1',
          label: 'Java Dependencies 模拟运行'
        },
        {
          value: '选项2',
          label: 'sql Dependencies 模拟运行'
        },
        {
          value: '选项3',
          label: 'groovy Dependencies 模拟运行'
        },
      ],
      value: '',
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
          childrens: [{
            path: "Java Dependencies",
            childrens: []
          }]
        }
      ],
      showRightMenu: false,
      showTopSelect: false,
      nodeDetail: {},
      currentNodeId: '',
      fileIconShow: true,
      global_theme: cache.get("global_theme")
    };
  },
  filters: {
    ellipsis (value) {
      if (!value) return ""
      let num = value.toString().length
      if (num > 3) {
        return "#..." + value.toString().slice(num - 3, num)
      }
      return value
    },
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
    chooseThemes (val) {
      this.theme = val
      this.initEditor(this.codes);
    },
    simulationStart () {
      this.showTopSelect = true
      console.info(this.$refs.selectRef)
      this.$refs.selectRef.toggleMenu()
    },
    loadmore () {
      // 在这里请求接口加载数据
      console.log("滚动到底部了")
    },
    fileIcon (val) {
      this.fileIconShow = !this.fileIconShow
      console.info(this.fileIconShow)
      if (val == true) {
        document.querySelector(`.file-directory-${this.theme}`).style.display = ""
        document.querySelector(`.file-directory-${this.theme}`).style.width = "25%"
        document.querySelector("#container").style.width = "75%"
      } else {
        document.querySelector(`.file-directory-${this.theme}`).style.display = "none"
        document.querySelector("#container").style.width = "100%"
      }
    },
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
      console.info("222222")
    },
    handleCheckChange (data, checked, indeterminate) {

    },
    nodeClick (data) {

    },
    delTreeNode () {

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
    height: 30px;
    width: 100%;
    background: #3c3c3c !important;
    .el-menu-demo {
      height: 30px;
      width: 100%;
      background: #3c3c3c !important;
    }

    .el-menu--horizontal > .el-menu-item,
    .el-menu--horizontal > .el-submenu .el-submenu__title {
      height: 30px;
      line-height: 30px;
      border-bottom: 0;
      color: #fff !important;
      background: #3c3c3c !important;
      padding: 0;
      text-align: center;
      padding: 0 15px 0 0;
    }
    li.el-menu-item.is-active {
      color: #fff !important;
      border-bottom-color: #3c3c3c !important;
      background: #3c3c3c !important;
    }
    .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
      background: #5a5a5a !important;
    }
    li.el-menu-item:hover {
      color: #fff !important;
      border-bottom-color: #5a5a5a !important;
      background: #5a5a5a !important;
    }
    .el-menu.el-menu--horizontal {
      border-bottom: none !important;
      padding-left: 15px;
    }
    .el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
      display: none;
    }
    .el-menu--horizontal .el-menu .el-menu-item,
    .el-menu--horizontal .el-menu .el-submenu__title {
      background: #232730 !important;
      height: 30px !important;
      line-height: 30px !important;
    }
  }
  .monacoBody {
    display: flex;
    justify-items: center;
    height: calc(100% - 30px);
    width: 100%;
  }
  .monacoBodyTopSelect {
    position: absolute;
    margin: auto;
    left: 50%;
    z-index: 9999;
  }
  .file-directory-hc-black,
  .file-directory-vs-dark {
    width: 25%;
    height: 100%;
    background: #232730;
  }
  .file-directory-vs {
    width: 25%;
    height: 100%;
    background: #eaebef;
  }
  #container {
    height: 100%;
    width: 75%;
    text-align: left;
  }
  .tree-line-vs {
    background: #eaebef !important;
    color: #000;
    .el-tree-node__content {
      &:hover {
        background-color: #b4c1cb;
      }
    }
    .el-tree-node.is-current > .el-tree-node__content {
      background-color: #37373d;
      padding-left: 12px;
    }
  }
  .tree-line-hc-black,
  .tree-line-vs-dark {
    background: #232730;
    color: #fff;
    .el-tree-node__content {
      &:hover {
        background-color: #2a2d2e;
      }
    }
    .el-tree-node.is-current > .el-tree-node__content {
      background-color: #37373d;
      padding-left: 12px;
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
  .fileIcon-vs {
    color: #2c2b2b;
    font-size: 20px;
    text-align: right;
    width: 100%;
    cursor: pointer;
  }
  .fileIcon-hc-blac,
  .fileIcon-vs-dark {
    color: #fff;
    font-size: 20px;
    text-align: right;
    width: 100%;
    cursor: pointer;
  }
  .fileIconShow-vs {
    position: absolute;
    color: #2c2b2b;
    z-index: 9999;
    font-size: 20px;
    text-align: right;
    cursor: pointer;
  }
  .fileIconShow-hc-blac,
  .fileIconShow-vs-dark {
    position: absolute;
    color: #fff;
    z-index: 9999;
    font-size: 20px;
    text-align: right;
    cursor: pointer;
  }
  .save {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.el-menu--popup-bottom-start {
  margin-top: -3px !important;
}
//二次菜单悬浮及背景样式
.el-menu--popup-bottom-start .el-menu-item:hover {
  color: #fff !important;
  background: #04395e !important;
}
.el-menu--popup-bottom-start .el-menu-item:hover {
  color: #fff !important;
  background: #04395e !important;
}
.el-menu--popup-bottom-start .el-menu-item {
  height: 27px !important;
  line-height: 27px !important;
}
ul.el-menu.el-menu--popup.el-menu--popup-right-start {
  margin: 0;
  padding: 0;
  height: 30px;
  line-height: 30px;
  .el-submenu__title {
    height: 35px !important;
  }
}
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  background: #232730 !important;
  height: 30px !important;
  line-height: 30px !important;
}
.el-menu--horizontal .el-menu-item:hover {
  background: #04395e !important;
}
.el-submenu__title {
  font-size: 12px !important;
}
//二次菜单悬浮及背景样式 end
.bottom-line {
  width: 90%;
  height: 1px;
  background: #606060;
  margin: auto;
}
.save {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>