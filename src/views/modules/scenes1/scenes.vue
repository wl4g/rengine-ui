<template>
  <div>
    <div>
      <template>
        <el-table :data="tableData" :border="true" style="width:100%">
          <el-table-column prop="场景ID" label="场景ID" width="100"></el-table-column>
          <el-table-column prop="场景名称" label="场景名称" width=150></el-table-column>
          <el-table-column prop="命名空间" label="命名空间" width=150></el-table-column>
          <el-table-column prop="状态" label="状态" width=150></el-table-column>
          <el-table-column prop="标签" label="标签" width=150></el-table-column>
          <el-table-column prop="更新时间" label="更新时间" width=150></el-table-column>
          <el-table-column prop="更新人" label="更新人" width=150></el-table-column>
          <el-table-column prop="备注" label="备注" width=150></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <a class="table_a">编辑</a>|
              <a class="table_a" @click="showRuleDetail(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange'></el-pagination>
  </div>
</template>

<script>
import Scenes from "./scenes.js"
export default Scenes
</script>

<style>
</style>