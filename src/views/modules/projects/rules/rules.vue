<template>
  <div>
    <div class="query">
      <div class="query-left">
        <div class="line"></div>
        {{$t('message.common.total')}}： <span class="number">{{total}}</span>
      </div>
      <!-- 新增按钮 -->
      <el-button type="primary" @click="addRules()"> + </el-button>
    </div>
    <div>
      <template>
        <el-table :data="tableData" style="width:100%">
          <el-table-column prop="id" label="规则ID" width="100">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.id" placement="top">
                <a class="table_a">{{ scope.row.id | ellipsis}}</a>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="规则名称" width=150></el-table-column>
          <el-table-column prop="enabled" label="状态" width=150></el-table-column>
          <el-table-column prop="labels" label="标签" width=150></el-table-column>
          <el-table-column prop="updateDate" label="更新时间" width=150></el-table-column>
          <el-table-column prop="updateBy" label="更新人" width=150></el-table-column>
          <el-table-column prop="remark" label="备注" width=150></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <a class="table_a" @click="design(scope.row)">设计</a>|
              <a class="table_a" @click="design(scope.row)">导入</a>|
              <a class="table_a" @click="design(scope.row)">导出</a>|
              <a class="table_a" @click="design(scope.row)">clone</a>|
              <a class="table_a" @click="editRules(scope.row)">编辑</a>|
              <el-popover placement="top" width="160" v-model="visible">
                <p>确定删除该项目？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="visible = false ; ruleDel(scope.row)">确定</el-button>
                </div>
                <a class="table_a" slot="reference">删除</a>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange'></el-pagination>
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dialogVisible " width="350px" v-loading='dialogLoading'>
      <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm" class="demo-form-inline">
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="name">
              <el-input v-model="saveForm.name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态">
              <el-select v-model="saveForm.enabled" collapse-tags placeholder="请选择">
                <el-option label="停用" :value="0"></el-option>
                <el-option label="启用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('message.share.label')" prop="labels">
              <div class="labels-style" v-for="(item,index) in saveForm.labels">
                <el-input v-model="saveForm.labels[index]"></el-input>
                <i class="el-icon-remove-outline" @click="delLabels(index)" v-if="saveForm.labels.length > 1"></i>
                <i class="el-icon-circle-plus-outline" @click="addLabels" v-if="saveForm.labels.length < 5 && index == saveForm.labels.length -1"></i>
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
        <el-button type="primary" @click="saveRules()">{{$t('message.common.save')}}</el-button>
        <el-button @click="dialogVisible = false;">{{$t('message.common.cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import RuleModeles from "./rules.js"
export default RuleModeles
</script>

<style>
.labels-style {
  display: flex;
  align-items: center;
}
.labels-style .el-input {
  width: 80%;
}
.labels-style i {
  font-size: 16px;
  line-height: 2 !important;
  cursor: pointer;
}
</style>