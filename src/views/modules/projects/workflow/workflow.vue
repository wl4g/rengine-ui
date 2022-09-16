<!-- <template>

  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsData" :key="item.name" :label="item.labelName" :name="item.name">
        <keep-alive>
          <component :is="currentTabComponent" :loginEventId="loginEventId"></component>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template> -->
<template>
  <div>
    <div>
      <template>
        <el-table :data="tableData" :border="true" style="width:100%">
          <el-table-column prop="id" label="工作流ID" width="100">
            <template slot-scope="scope">
              <a class="table_a drawer_a" @click="showWorkDetail(scope.row)">{{ "#" + scope.row.id}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="名称" label="名称" width=150></el-table-column>
          <el-table-column prop="状态" label="状态" width=150></el-table-column>
          <el-table-column prop="所属场景" label="所属场景" width=150></el-table-column>
          <el-table-column prop="标签" label="标签" width=150></el-table-column>
          <el-table-column prop="更新时间" label="更新时间" width=150></el-table-column>
          <el-table-column prop="更新人" label="更新人" width=150></el-table-column>
          <el-table-column prop="备注" label="备注" width=150></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="300">
            <template slot-scope="scope">
              <a class="table_a drawer_a">设计</a>|
              <a class="table_a drawer_a" @click="showRuleDetail(scope.row)">禁用</a> |
              <a class="table_a drawer_a" @click="showRuleDetail(scope.row)">删除</a> |
              <a class="table_a drawer_a" @click="showRuleDetail(scope.row)">导出</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange'></el-pagination>
  </div>

</template>

<script>
import WorkFlow from "./workflow.js"
export default WorkFlow
</script>

<style>
.drawer_a {
  color: #61c3ff;
}
</style>