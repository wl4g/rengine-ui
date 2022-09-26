<template>
  <div>
    <div>
      <template>
        <el-table :data="tableData" :border="true" style="width:100%">
          <el-table-column prop="id" label="任务ID" width="100">
            <template slot-scope="scope">
              <a class="table_a">{{ "#" + scope.row.id}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="状态" label="状态" width=150></el-table-column>
          <el-table-column prop="标签" label="labels" width=150></el-table-column>
          <el-table-column prop="更新时间" label="启动时间" width=150></el-table-column>
          <el-table-column prop="更新人" label="结束时间" width=150></el-table-column>
          <el-table-column prop="更新人" label="启动人" width=150></el-table-column>
          <el-table-column prop="备注" label="备注" width=150></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="300">
            <template slot-scope="scope">
              <a class="table_a">设计</a>|
              <a class="table_a" @click="showRuleDetail(scope.row)">备注</a> |
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

</script>

<style>
</style>