<template>
  <div class="content">
    <div class="contentLeft">
      <div class="top-menu">
        <div class="top-menu-left">
          电商充值赠送活动流程
        </div>
        <div class="top-menu-right">
          <div class="top-menu-right-item" v-for="item in menuList" :key="item" @click="clickMenuItem(item.key)">{{item.name}}</div>
        </div>
      </div>
      <div class="flow_region">
        <!-- 左侧组件 -->
        <div class="nodes-wrap">
          <div v-for="item in nodeTypeList" :key="item[`@type`]">
            <div>
              <div :class="`node1_${item['@type']} node_item`" draggable="true" @dragstart="drag($event, item)">
                <div :class="`name_${item['@type']}`">{{item.typeName}}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="flowWrap" ref="flowWrap" class="flow-wrap" @drop="drop($event)" @dragover="allowDrop($event)">
          <div id="flow">
            <div v-show="auxiliaryLine.isShowXLine" class="auxiliary-line-x" :style="{width: auxiliaryLinePos.width, top:auxiliaryLinePos.y + 'px', left: auxiliaryLinePos.offsetX + 'px'}"></div>
            <div v-show="auxiliaryLine.isShowYLine" class="auxiliary-line-y" :style="{height: auxiliaryLinePos.height, left:auxiliaryLinePos.x + 'px', top: auxiliaryLinePos.offsetY + 'px'}"></div>
            <flowNode v-for="item in data.nodeList" :id="item.id" :key="item.id" :node="item" @setNodeName="setNodeName" @deleteNode="deleteNode" @changeLineState="changeLineState"></flowNode>
          </div>
        </div>
      </div>
      <!-- <el-button @click="save" class="save">确定</el-button> -->
    </div>
    <div class="right-instructions">
      <div class="right-instructions-top" v-if="isClickItem == false">工作流属性</div>
      <div class="right-instructions-top right-instructions-top-name" v-else>{{isClickItemContent.name}}</div>
      <div class="right-instructions-content">
        <div class="instructions-content" v-if="isClickItem == false">
          <div class="instructions-content-item">
            <div class="instructions-content-name">工作流名称
              <el-popconfirm title="工作流名称">
                <i slot="reference" class="el-icon-edit-outline instructions-i"></i>
              </el-popconfirm>
            </div>
            <div class="instructions-content-text">电商充值赠送活动流程</div>
          </div>
          <div class="instructions-content-item">
            <div class="instructions-content-name">工作流ID</div>
            <div class="instructions-content-text">6150868953448448</div>
          </div>
          <div class="instructions-content-item">
            <div class="instructions-content-name">创建人(UID)</div>
            <div class="instructions-content-text">null</div>
          </div>
          <div class="instructions-content-item">
            <div class="instructions-content-name">创建日期</div>
            <div class="instructions-content-text">2022-09-27 12:50:22</div>
          </div>
          <div class="instructions-content-item">
            <div class="instructions-content-name">工作流描述
              <el-popconfirm title="工作流描述">
                <i slot="reference" class="el-icon-edit-outline instructions-i"></i>
              </el-popconfirm>
            </div>
            <div class="instructions-content-text">string</div>
          </div>
        </div>
        <div class="instructions-content" v-else>
          <div class="instructions-content-item">
            <div class="instructions-content-name">名称
              <el-popconfirm title="工作流名称">
                <i slot="reference" class="el-icon-edit-outline instructions-i"></i>
              </el-popconfirm>
            </div>
            <div class="instructions-content-text">{{isClickItemContent.name}}</div>
          </div>
          <div class="instructions-content-item">
            <div class="instructions-content-name">ID</div>
            <div class="instructions-content-text">{{isClickItemContent.id}}</div>
          </div>
          <div class="instructions-content-item">
            <div class="instructions-content-name">类型</div>
            <div class="instructions-content-text">{{isClickItemContent['@type']}}</div>
          </div>
          <div class="instructions-content-item">
            <div class="instructions-content-name">工作流描述
              <el-popconfirm title="工作流描述">
                <i slot="reference" class="el-icon-edit-outline instructions-i"></i>
              </el-popconfirm>
            </div>
            <div class="instructions-content-text">string</div>
          </div>
        </div>

      </div>
    </div>
    <el-dialog title="历史工作流" size="tiny" :visible.sync="oldWorkFlowDialogVisible" width="70%" :before-close="handleClose">
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="工作流ID" width="80">
          </el-table-column>
          <el-table-column prop="name" label="工作流名称" width="180">
          </el-table-column>
          <el-table-column prop="address" label="状态">
          </el-table-column>
          <el-table-column prop="address" label="创建人">
          </el-table-column>
          <el-table-column prop="address" label="创建时间">
          </el-table-column>
          <el-table-column prop="address" label="修改人">
          </el-table-column>
          <el-table-column prop="address" label="修改时间">
          </el-table-column>
          <el-table-column prop="address" label="操作">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectRegion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import Design from "./design.js"
export default Design
</script>

<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.content {
  display: flex;
}
.contentLeft {
  width: 85%;
}
.top-menu {
  display: flex;
  height: 30px;
  width: 100%;
  border: 1px solid #ccc;
  border-bottom: none;
  align-items: center;
}
.top-menu-left {
  width: 150px;
  height: 100%;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #ccc;
}
.top-menu-right {
  display: flex;
  padding: 0 0 0 5px;
}
.top-menu-right-item {
  padding: 0 5px;
  cursor: pointer;
}
.top-menu-right-item:hover {
  color: #2ab1e8;
}
.flow_region {
  display: flex;
  width: 100%;
  height: 83vh;
  // margin: 20px auto;
  border: 1px solid #ccc;
  .nodes-wrap {
    width: 150px;
    height: 100%;
    border-right: 1px solid #ccc;
    .node {
      display: flex;
      height: 40px;
      width: 80%;
      margin: 5px auto;
      border: 1px solid #ccc;
      line-height: 40px;
      &:hover {
        cursor: grab;
      }
      &:active {
        cursor: grabbing;
      }
      .log {
        width: 40px;
        height: 40px;
      }
      .name {
        width: 0;
        flex-grow: 1;
        text-align: center;
      }
    }
    .node1 {
      display: flex;
      height: 40px;
      width: 40px;
      margin: 5px auto;
      border: 1px solid #ccc;
      line-height: 40px;
      border-radius: 50%;
      &:hover {
        cursor: grab;
      }
      &:active {
        cursor: grabbing;
      }
      .name {
        width: 40px;
        height: 40px;
        text-align: center;
      }
    }
    .node_item {
      width: 80px;
      height: 40px;
      margin: 10px auto;
    }
    .node1_BOOT {
      width: 80px;
      height: 40px;
      border-radius: 50%;
      text-align: center;
      border: #d5d5d5 1px solid;
      background: #f5898959;
      .name_BOOT {
        height: 40px;
        line-height: 40px;
      }
    }
    .node1_PROCESS {
      width: 80px;
      height: 40px;
      text-align: center;
      border: #d5d5d5 1px solid;
      background: #00800059;
      .name_PROCESS {
        height: 40px;
        line-height: 40px;
      }
    }
    .node1_RELATION {
      width: 60px;
      height: 60px;
      text-align: center;
      border: #d5d5d5 1px solid;
      background: #00800059;
      transform: rotate(-45deg);
      margin: 20px auto;
      .name_RELATION {
        height: 60px;
        line-height: 60px;
        transform: rotate(45deg);
      }
    }
    .node1_FAILBACK {
      width: 80px;
      height: 40px;
      text-align: center;
      border: #d5d5d5 1px solid;
      background: #d8f34659;
      .name_FAILBACK {
        height: 40px;
        line-height: 40px;
      }
    }
    .node1_RUN {
      width: 80px;
      height: 40px;
      text-align: center;
      border: #d5d5d5 1px solid;
      background: #dde1c959;
      .name_RUN {
        height: 40px;
        line-height: 40px;
      }
    }
    .node1_LOGICAL {
      width: 70px;
      height: 70px;
      text-align: center;
      border: #d5d5d5 1px solid;
      background: #dde1c959;
      border-radius: 50%;
      .name_LOGICAL {
        height: 70px;
        line-height: 70px;
      }
    }
  }
  .flow-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
    outline: none !important;
    flex-grow: 1;
    background-image: url("./assets/point.png");
    #flow {
      position: relative;
      width: 100%;
      height: 100%;
      .auxiliary-line-x {
        position: absolute;
        border: 0.5px dashed #2ab1e8;
        z-index: 9999;
      }
      .auxiliary-line-y {
        position: absolute;
        border: 0.5px dashed #2ab1e8;
        z-index: 9999;
      }
    }
  }
}
.save {
  float: right;
}
.right-instructions {
  width: 15%;
  .right-instructions-top {
    height: 30px;
    width: 100%;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-bottom: none;
    background: #0070cc;
    color: #fff;
  }
  .right-instructions-top-name {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 4px;
  }
  .right-instructions-content {
    height: 83vh;
    border: #ccc 1px solid;
    border-left: none;
    padding-top: 12px;
    .instructions-content {
      font-size: 13px;
      transform: scale(0.9);
      .instructions-content-item {
        padding-bottom: 12px;
        .instructions-content-name {
          color: #999;
        }
        .instructions-content-text {
          padding-top: 6px;
        }
        .instructions-i {
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<style lang="less">
.jtk-connector.active {
  z-index: 9999;
  path {
    stroke: #150042;
    stroke-width: 1.5;
    animation: ring;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    stroke-dasharray: 5;
  }
}
@keyframes ring {
  from {
    stroke-dashoffset: 50;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>