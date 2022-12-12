<template>
  <div>
    <div class="flow_region">
      <!-- 左侧组件 -->
      <div class="nodes-wrap">
        <div v-for="item in nodeTypeList" :key="item[`@type`]">
          <!-- <div class="node" draggable="true" @dragstart="drag($event, item)" v-if="item[`@type`] !='judge'">
            <div class="log">
              <div style="text-align:center;border-right: 1px #cbc7c7 solid;">{{item.symbol}}</div>
            </div>
            <div class="name">{{item.typeName}}</div>
          </div> -->
          <div>
            <!-- <div class="node1" draggable="true" @dragstart="drag($event, item)" v-if="item[`@type`] =='judge'">
              <div class="name">{{item.typeName}}</div>
            </div> -->
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
    <el-button @click="save" class="save">确定</el-button>
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
.flow_region {
  display: flex;
  width: 90%;
  height: 83vh;
  margin: 20px auto;
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
      border: #eee 1px solid;
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
      border: #eee 1px solid;
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
      border: #eee 1px solid;
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
      border: #eee 1px solid;
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
      border: #eee 1px solid;
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
      border: #eee 1px solid;
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