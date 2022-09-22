<template>
  <div>
    <div class="query">
      <div class="query-left">
        <div class="line"></div>
        {{$t('message.common.total')}}： <span class="number">{{total}}</span>
      </div>
      <!-- 新增按钮 -->
      <el-button type="primary" @click="addLibrary()"> + </el-button>

    </div>
    <div>
      <template>
        <el-table :data="tableData" :border="true" style="width:100%">
          <el-table-column prop="名称" label="名称" width="100"></el-table-column>
          <el-table-column prop="状态" label="状态" width=150></el-table-column>
          <el-table-column prop="lable" label="lable" width=150></el-table-column>
          <el-table-column prop="size" label="size" width=150></el-table-column>
          <el-table-column prop="更新时间" label="更新时间" width=150></el-table-column>
          <el-table-column prop="更新人" label="更新人" width=150></el-table-column>
          <el-table-column prop="备注" label="备注" width=150></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <a class="table_a" @click="design(scope.row)">启用</a> |
              <a class="table_a" @click="design(scope.row)">下载</a> |
              <a class="table_a" @click="showRuleDetail(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange'></el-pagination>
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="libraryDialogVisible " width="50%" v-loading='dialogLoading'>
      <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm" class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="saveForm.name" placeholder="请输入类库名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('message.share.label')">
              <el-select v-model="saveForm.notifyLevel" multiple collapse-tags placeholder="请选择">
                <el-option label="select1" :value="1"></el-option>
                <el-option label="select2" :value="2"></el-option>
                <el-option label="select3" :value="3"></el-option>
                <el-option label="select4" :value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('message.common.status')">
              <el-select v-model="saveForm.notifyLevel" multiple collapse-tags placeholder="请选择">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上传文件">
              <MinioUpload></MinioUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveTemplat()">{{$t('message.common.save')}}</el-button>
        <el-button @click="newDialogVisible = false;">{{$t('message.common.cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MinioUpload from "../../../../../components/minio-upload.vue"

export default {
  name: "UserLibrarys",
  components: {
    MinioUpload,
  },
  data () {
    return {
      tableData: [{}],
      libraryDialogVisible: false,
      dialogTitle: "",
      //弹窗表单
      saveForm: {
        id: "",
        name: "",
        metricId: "",
        classify: "",
        notifyLevel: "",
        tagMap: [],
        rules: [],
      },
    }
  },
  mounted () {
    // this.tableData = getTableData()
  },
  methods: {
    showRuleDetail (row) {
      console.info("11111", row)
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "iam:securityGateway:ruleEngine:ruleEngineDetail"
        ),
        query: { id: row.id },
      })
    },
    addTemplat () {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "modules:ruletemplate:edit"
        ),
      })
    },
    design () {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "modules:ruletemplate:edit"
        ),
      })
    },
    delData () { },
    addLibrary () {
      this.libraryDialogVisible = true
      this.dialogTitle = "新增"
    },
  },
}
</script>

<style>
</style>