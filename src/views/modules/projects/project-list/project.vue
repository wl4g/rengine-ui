<!-- <template>
  <div>
    <div class="query">
      <div class="query-left">
        <div class="line"></div>
        {{$t('message.common.total')}}： <span class="number">{{total}}</span>
      </div>
    </div>
    <div>
      <template>
        <el-table :data="tableData" :border="true" style="width:100%">
          <el-table-column prop="项目ID" label="项目ID" width="100"></el-table-column>
          <el-table-column prop="名称" label="名称" width="100"></el-table-column>
          <el-table-column prop="状态" label="状态" width=150></el-table-column>
          <el-table-column prop="lable" label="lable" width=150></el-table-column>
          <el-table-column prop="更新时间" label="更新时间" width=150></el-table-column>
          <el-table-column prop="更新人" label="更新人" width=150></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <a class="table_a drawer_a" @click="toWorkFlow(scope.row)">工作流</a> |
              <a class="table_a drawer_a" @click="toRuleModeles(scope.row)">规则</a> |
              <a class="table_a drawer_a" @click="design(scope.row)">编辑</a> |
              <a class="table_a drawer_a" @click="showRuleDetail(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange'></el-pagination>
  </div>
</template> -->

<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsData" :key="item.name" :label="item.labelName" :name="item.name">
        <keep-alive>
          <component :is="currentTabComponent" :loginEventId="loginEventId"></component>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProjectList from "./project.js"
export default ProjectList
</script>

<style>
.drawer_a {
  cursor: pointer;
}
</style>