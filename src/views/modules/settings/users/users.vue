<template>
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
          <el-table-column prop="ID" label="ID" width="100"></el-table-column>
          <el-table-column prop="用户名" label="用户名" width="100"></el-table-column>
          <el-table-column prop="状态" label="状态" width=150></el-table-column>
          <el-table-column prop="类型" label="类型" width=150></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <a class="table_a drawer_a" @click="edit(scope.row)">编辑</a> |
              <a class="table_a drawer_a" @click="showRuleDetail(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange'></el-pagination>
    <el-dialog title="用户编辑" size="tiny" :visible.sync="userDialogVisible" width="20%" :before-close="handleClose">
      <div>
        <el-form ref="groupForm" label-position="right" :model="saveForm" label-width="100px" :rules="rules">

          <el-row>
            <el-col :span="24">
              <el-form-item label="状态" prop="type">
                <el-select v-model="saveForm.type" :disabled="isEdit">
                  <el-option v-for="item in dictutil.getDictListByType('sys_group_type')" :key="parseInt(item.value)" :label="item.label" :value="parseInt(item.value)">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="类型" prop="type1">
                <el-select v-model="saveForm.type" :disabled="isEdit">
                  <el-option v-for="item in dictutil.getDictListByType('sys_group_type')" :key="parseInt(item.value)" :label="item.label" :value="parseInt(item.value)">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="权限" prop="type2">
                <el-select v-model="saveForm.type" multiple :disabled="isEdit">
                  <el-option v-for="item in dictutil.getDictListByType('sys_group_type')" :key="parseInt(item.value)" :label="item.label" :value="parseInt(item.value)">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectRegion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Users from "./users.js"
export default Users
</script>

<style>
</style>