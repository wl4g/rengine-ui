<template>
  <section>
    <div class="button_group">
      <div class="button_group_item">
        <el-button round :class="hourState === false?'color2':'color1'" class="different" @click="loadEventData('OF_HOUR')">1小时访问</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="dayState === false?'color2':'color1'" class="different" @click="loadEventData('OF_DAY')">今日访问</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="weekState === false?'color2':'color1'" class="different" @click="loadEventData('OF_WEEK')">本周访问</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="monthState === false?'color2':'color1'" class="different" @click="loadEventData('OF_MONTH')">本月访问</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="customState === false?'color2':'color1'" class="different" @click="loadEventData('OF_CUSTOM')">自定义</el-button>
      </div>
      <div v-if="customState" class="date-select">
        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-button-group>
        <el-button @click="showChart('event')" :class="mapType === 'event'||mapType ===  'region'?'color1':'color2'">事件地图</el-button>
        <!-- <el-button @click="showChart('region')" :class="mapType === 'region'?'color1':'color2'">地域分布</el-button> -->
        <el-button @click="showChart('time')" :class="mapType === 'time'?'color1':'color2'">时间分布</el-button>
        <el-radio-group v-model="radio" class="radio-style" v-if="mapType === 'time'?true:false" @change="dateTypeChange">
          <el-radio v-for="item in radioList" :disabled="item.disabled" :key="item.value" :value="item.value" :label="item.value">{{item.label}}</el-radio>
          <el-button @click="showDialogMapChart" class="color1">选择地区</el-button>
        </el-radio-group>
      </el-button-group>
      <!-- <chart ref="myChart" style="width: 600px; height: 400px" id="myChart" /> -->
      <chart ref="mapChart" style="height:75vh;width:80vw" id="mapChart" />
      <div class="echart-button">
        <button @click="showChart('event')" class="echart-button-button" :class="mapType === 'event'?'color1':'color2'">事件地图</button>
        <button @click="showChart('region')" class="echart-button-button" :class="mapType === 'region'?'color1':'color2'">地域分布</button>
      </div>
    </div>
    <el-dialog title="选择地区" size="tiny" :visible.sync="mapDialogVisible" width="70%" :before-close="handleClose">
      <div style="height:500px;display: flex;">
        <div class="dialogLeft">
          <div class="dialogLeft-content" v-for="(item,index) in selectRegionList" :key="index" :value="item">{{item}} <i class="el-icon-delete delSelectRegion" @click="delSelectRegion(index)"></i></div>
        </div>
        <div class="dialogRight" ref="dialogRight">
          <chart ref="dialogMapChart" id="dialogMapChart" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectRegion">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import Map from "./map.js"
export default Map
</script>
<style scoped>
.button_group {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
}
.button_group_item {
  padding: 0 1vw;
}
.color1 {
  color: #1890ff;
  background: #e8f4ff;
  border: 1px solid #badeff;
}
.color2 {
  color: dimgray;
}
.echarts {
  width: auto;
  height: 55vh;
}
.date-select {
  display: flex;
  justify-content: center;
  padding: 6px 0;
}
.radio-style {
  display: flex;
  height: 37px;
  align-items: center;
  padding-left: 20px;
}
.dialogLeft {
  width: 25%;
  background: #f1f1f1;
  height: 100%;
  border: 1px #dbd8d8 SOLID;
  padding: 10px;
}
.dialogLeft-content {
  height: 22px;
}
.dialogRight {
  width: 75%;
  height: 100%;
}
.delSelectRegion {
  cursor: pointer;
}
.echart-button {
  position: absolute;
  left: 0;
  top: 40%;
  display: flex;
  flex-direction: column;
}
.echart-button-button {
  width: 20px;
  border: 1px #eee solid;
}
.echart-button-button >>> .el-button span {
  writing-mode: vertical-rl;
}
/* .activeButton {
  background: red;
} */
</style>