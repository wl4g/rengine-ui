<template>
  <div>
    <div class="query">
      <div class="query-left">
        <div class="line"></div>
        {{$t('message.common.total')}}： <span class="number">{{total}}</span>
      </div>
      <!-- 新增按钮 -->
      <!-- <el-button type="primary" @click="addTemplat()"> + </el-button> -->
    </div>
    <div>
      <template>
        <el-table :data="tableData" :border="true" style="width:100%">
          <el-table-column prop="名称" label="名称" width="100"></el-table-column>
          <el-table-column prop="状态" label="状态" width=150></el-table-column>
          <el-table-column prop="lable" label="lable" width=150></el-table-column>
          <el-table-column prop="更新时间" label="更新时间" width=150></el-table-column>
          <el-table-column prop="更新人" label="更新人" width=150></el-table-column>
          <el-table-column prop="备注" label="备注" width=150></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <a class="table_a drawer_a" @click="design(scope.row)">编辑</a> |
              <a class="table_a drawer_a" @click="showRuleDetail(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange'></el-pagination>
  </div>
</template>

<script>
import ProjectList from "./project-list.js"
export default ProjectList
</script>

<style>
</style>