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

      <el-button type="primary" style='float:right;margin-right:20px' @click="addWorkflow()">+ Add</el-button>
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
          <el-table-column prop="id" label="工作流ID" width="150">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.id" placement="top">
                <a class="table_a" @click="showWorkDetail(scope.row)">{{ scope.row.id | ellipsis}}</a>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" width=100></el-table-column>
          <el-table-column prop="enable" label="状态" width=150>
            <template slot-scope="scope">
              <p>{{scope.row.enable == 1 ?"启用":"禁用"}}</p>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="所属场景" label="所属场景" width=150></el-table-column> -->
          <el-table-column prop="labels" label="标签"></el-table-column>
          <el-table-column prop="updateDate" label="更新时间" width=150></el-table-column>
          <el-table-column prop="updateBy" label="更新人" width=80></el-table-column>
          <el-table-column prop="remark" label="备注" width=150></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="170">
            <template slot-scope="scope">
              <a class="table_a" @click="toDesign(scope.row)">设计</a>|
              <a class="table_a" @click="showRuleDetail(scope.row)">禁用</a>|
              <a class="table_a" @click="editWorkflow(scope.row)">编辑</a>|
              <el-popover placement="top" width="160" v-model="visible">
                <p>确定删除该工作流？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="visible = false ; workflowDel(scope.row)">确定</el-button>
                </div>
                <a class="table_a" slot="reference">删除</a>
              </el-popover>
              <a class="table_a" @click="showRuleDetail(scope.row)">导出</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum +1" @current-change='currentChange'></el-pagination>
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dialogVisible " width="350px">
      <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm" class="demo-form-inline">
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="name">
              <el-input v-model="saveForm.name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态">
              <el-radio-group v-model="saveForm.enable" class="radio-style">
                <el-radio :label="0">停用</el-radio>
                <el-radio :label="1">启用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('message.share.label')" prop="labels">
              <div class="labels-style" v-for="(item,index) in saveForm.labels">
                <el-input v-model="saveForm.labels[index]"></el-input>
                <i class="el-icon-remove-outline" @click="delLabels(index)" v-if="saveForm.labels.length > 1"></i>
                <i class="el-icon-circle-plus-outline" @click="addLabels" v-if="index == saveForm.labels.length -1"></i>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="saveForm.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveWorkflow()">{{$t('message.common.save')}}</el-button>
        <el-button @click="dialogVisible = false;">{{$t('message.common.cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import WorkFlow from "./workflows.js"
export default WorkFlow
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