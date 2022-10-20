<template>
  <div>
    <div class="button_group">
      <div class="button_group_item">
        <el-button round :class="hourState === false?'color2':'color1'" class="different" @click="loadEventData('OF_HOUR')">1小时统计</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="dayState === false?'color2':'color1'" class="different" @click="loadEventData('OF_DAY')">今日统计</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="weekState === false?'color2':'color1'" class="different" @click="loadEventData('OF_WEEK')">本周统计</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="monthState === false?'color2':'color1'" class="different" @click="loadEventData('OF_MONTH')">本月统计</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="customState === false?'color2':'color1'" class="different" @click="loadEventData('OF_CUSTOM')">自定义</el-button>
      </div>
      <div v-if="customState" class="date-select">
        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <el-button-group class="radio-group-style">
      <el-radio-group v-model="radio" class="radio-style" @change="dateTypeChange">
        <el-radio v-for="item in radioList" :disabled="item.disabled" :key="item.value" :value="item.value" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </el-button-group>
    <div ref="hitChart" style="height:75vh;width:80vw" id="hitChart"></div>

  </div>
</template>

<script>
import TaskAnalysis from "./taskanalysis.js"
export default TaskAnalysis
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
.radio-group-style {
  width: 100%;
}
.radio-style {
  display: flex;
  width: 100%;
  height: 37px;
  align-items: center;
  padding-right: 20px;
  justify-content: flex-end;
}
</style>