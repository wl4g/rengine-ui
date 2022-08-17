<template>
  <div>
    <div>
      <template>
        <el-table :data="tableData" :border="true" style="width:100%">
          <el-table-column prop="规则ID" label="规则流ID" width="100"></el-table-column>
          <el-table-column prop="规则流名称" label="规则流名称" width=120></el-table-column>
          <el-table-column prop="状态" label="状态" width=120></el-table-column>
          <el-table-column prop="所属场景" label="所属场景" width=120></el-table-column>
          <el-table-column prop="标签" label="标签" width=120></el-table-column>
          <el-table-column prop="更新时间" label="更新时间" width=120></el-table-column>
          <el-table-column prop="更新人" label="更新人" width=120></el-table-column>
          <el-table-column prop="备注" label="备注" width=120></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <a class="table_a drawer_a">修改</a>|
              <a class="table_a drawer_a" @click="showRuleDetail(scope.row)">查看详情</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange'></el-pagination>
  </div>
</template>

<script>
import Ruleflows from "./ruleflows.js"
export default Ruleflows
</script>

<style>
</style>