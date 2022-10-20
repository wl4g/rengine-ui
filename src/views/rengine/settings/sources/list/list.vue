<template>
  <div>
    <el-form :inline="true" :model="searchParams" class="searchbar" @keyup.enter.native.prevent="onSubmit()">
      <el-form-item :label="$t('message.common.name')">
        <el-input v-model="searchParams.name" placeholder="e.g. example" style="width:165px"></el-input>
      </el-form-item>
      <input hidden></input>
      <el-form-item>
        <el-button @click="onSubmit" type="success" :loading="loading">{{$t('message.common.search')}}</el-button>
      </el-form-item>

    </el-form>
    <div class="query">
      <div class="query-left">
        <div class="line"></div>
        {{$t('message.common.total')}}： <span class="number">{{total}}</span>
      </div>
    </div>
    <div>
      <template>
        <el-table :data="tableData" style="width:100%">
          <el-table-column prop="name" label="事件时间" width="150"></el-table-column>
          <el-table-column prop="labels" label="观测时间"></el-table-column>
          <el-table-column prop="updateDate" label="事件类型"></el-table-column>
          <el-table-column prop="updateBy" label="事件主体" width=100></el-table-column>
          <el-table-column prop="updateBy" label="事件位置" width=100></el-table-column>
          <el-table-column prop="updateBy" label="扩展属性" width=100></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <a class="table_a" @click="toDetails(scope.row)">详情</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum +1" @current-change='currentChange'></el-pagination>
  </div>
</template>

<script>
import List from "./list.js";
export default List
</script>

<style scoped>
.labels-style,
.scenesCodeLabel {
  display: flex;
  align-items: center;
}
.labels-style .el-input {
  width: 84%;
}
.labels-style i {
  font-size: 16px;
  line-height: 2 !important;
  cursor: pointer;
  padding-left: 4px;
}
.radio-style .el-radio {
  margin-right: 14px;
}
.scenesCodeLabel a {
  width: 18%;
  padding-left: 4px;
  cursor: pointer;
}
</style>