<template>
  <div class="myEditor">
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
          <!-- <div>

            <el-menu-item index="2-1" @click="clickShortcuts">{{$t("message.monaco.revoke")}}</el-menu-item>
            <el-menu-item index="2-2">{{$t("message.monaco.recover")}}</el-menu-item>
            <div class="bottom-line"></div>
            <el-menu-item index="2-3">{{$t("message.monaco.cut")}}</el-menu-item>
            <el-menu-item index="2-3">{{$t("message.monaco.copy")}}</el-menu-item>
            <el-menu-item index="2-3">{{$t("message.monaco.paste")}}</el-menu-item>
            <div class="bottom-line"></div>
            <el-menu-item index="2-4">{{$t("message.monaco.find")}}</el-menu-item>
            <el-menu-item index="2-4">{{$t("message.monaco.replace")}}</el-menu-item>
          </div> -->
          <div v-for="(item,index) in editMenuList">
            <el-menu-item v-if="item.name" :index="`2-${index+1}`" @click="clickShortcuts(item.name)">
              <template slot="title">
                <div class="save">
                  <div>{{$t(`message.monaco.${item.name}`)}}</div>
                  <div>{{item.shortcutsName}}</div>
                </div>
              </template>
            </el-menu-item>
            <div v-else class="bottom-line"></div>
          </div>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">{{$t("message.monaco.running")}}</template>
          <el-menu-item index="3-1" @click="simulationStart()">{{$t("message.monaco.simulationStart")}}</el-menu-item>
          <!-- <el-menu-item index="3-2">{{$t("message.monaco.recentlyRun")}}</el-menu-item> -->
          <el-submenu index="3-2">
            <template slot="title">{{$t("message.monaco.recentlyRun")}}</template>
            <el-menu-item :index="item.value" v-for="item in recentlyRun" :key="item.value" @click="chooseRecentlyRun(item.value)">
              <template slot="title">
                <div class="save">
                  <div>{{item.label}}</div>
                </div>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">{{$t("message.monaco.terminal")}}</template>
          <el-menu-item index="4-1" @click="showTerminal">{{$t("message.monaco.openTerminal")}}</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">{{$t("message.monaco.help")}}</template>
          <el-menu-item index="5-1"><a style="color: #fff !important;" href="https://www.ele.me" target="_blank">{{$t("message.monaco.documentation")}}</a></el-menu-item>
          <el-menu-item index="5-2">{{$t("message.monaco.about")}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="monacoBody">
      <div class="monacoBodyTopSelect" v-show="showTopSelect">
        <!-- <el-select ref="selectRef" v-model="value" filterable remote v-load-more.method="loadmore" reserve-keyword placeholder="请输入关键词">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> -->
        <select-tree-dropdown placeholder="单击展开依赖库" readonly filterable default-expand-all v-model="formFields.sename" :treeData="selectGardenTreeData.list" :treeProps="selectGardenTreeData.defaultProps" :node-key="selectGardenTreeData.nodeKey" :checkedKeys="selectGardenTreeData.checkedKeys" @check-change="gardenCheckChange">
        </select-tree-dropdown>
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
      <div class="monaco-content">
        <div id="container" ref="container" :style="{'height': showTerminalVisible==true ?'80%':'100%'}"></div>
        <div class="terminal" v-show="showTerminalVisible">
          <div class="terminalTitle">
            <i :class="terminalFullScreen? 'el-icon-arrow-down': 'el-icon-arrow-up'" @click="showTerminalFull"></i>
            <i class="el-icon-close" @click="showTerminalVisible=false,terminalFullScreen=false"></i>
          </div>
          <div id="terminal" ref="terminal"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import monacoEdit from "./monaco-editor.js"
export default monacoEdit
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
  .monaco-content {
    height: 100%;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #container {
    height: 100%;
    width: 100%;
    text-align: left;
  }
  #terminal {
    height: calc(100% - 18px);
  }
  .terminal {
    height: 20%;
    width: auto;
    border-top: 1px #b7b2b2 solid;
    position: relative;
    box-shadow: 2px 0px 5px #929497;
  }
  .terminalTitle {
    height: 18px;
    width: 100%;
    border-right: 1px solid rgb(219, 219, 218);
    text-align: right;
    font-size: 18px;
    line-height: 18px;
    background: #d5d1d1;
    border-radius: 0px 4px 0 0;
  }
  .terminalTitle i {
    padding-right: 2px;
    font-size: 17px;
    cursor: pointer;
  }
  .terminalTitle i:last-child {
    padding-right: 0px;
    font-size: 17px;
    cursor: pointer;
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
.el-menu--popup {
  min-width: 120px !important;
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
  font-size: 12px !important;
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
  background: #424242;
  margin: auto;
}
.save {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>