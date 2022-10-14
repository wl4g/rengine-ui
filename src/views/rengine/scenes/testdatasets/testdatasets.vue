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

      <el-button type="primary" style='float:right;margin-right:20px' @click="addLibrary()">+ Add</el-button>
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
          <el-table-column prop="类库名称" label="类库名称" width="100"></el-table-column>
          <el-table-column prop="uploadType" label="类库类型" width="100"></el-table-column>
          <el-table-column prop="状态" label="状态" width=150></el-table-column>
          <el-table-column prop="标签" label="标签" width=150></el-table-column>
          <el-table-column prop="size" label="size" width=150></el-table-column>
          <el-table-column prop="md5sum" label="md5sum" width=150></el-table-column>
          <el-table-column prop="updateDate" label="更新时间" width=150></el-table-column>
          <el-table-column prop="updateBy" label="更新人" width=150></el-table-column>
          <el-table-column prop="remark" label="备注" width=150></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <a class="table_a" @click="design(scope.row)">启用</a> |
              <a class="table_a" @click="design(scope.row)">下载</a> |
              <el-popover placement="top" width="160" v-model="visible">
                <p>确定删除该类库？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="visible = false ; delLibrary(scope.row)">确定</el-button>
                </div>
                <a class="table_a" slot="reference">删除</a>
              </el-popover>
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
              <MinioUpload :acceptType="acceptType"></MinioUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveTemplat()">{{$t('message.common.save')}}</el-button>
        <el-button @click="libraryDialogVisible = false;">{{$t('message.common.cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MinioUpload from "../../../../components/minio-upload.vue"

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
      acceptType: ".jar",
      searchParams: {
        name: "",
      },
      pageNum: 0,
      total: 0,
      //查询条件
      loading: false,
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    currentChange (i) {
      this.pageNum = i - 1
      this.getTableData()
    },
    onSubmit () {
      this.loading = true
      this.getTableData()
    },
    getTableData () {
      let data = {
        name: "string",
        orgCode: "string",
        labels: "string",
        enable: true,
        pageNum: 0,
        pageSize: 1,
        uploadId: "string",
        scenesId: "string",
        extension: "string",
        uploadType: "TEST_DATASET"
      }
      this.$$api_modules_queryUpload({
        data: data,
        fn: res => {
          this.loading = false
          this.tableData = res.data.records
          this.total = res.data.total
        },
        errFn: () => {
          this.$message.error("Fail")
        }
      })
    },
    delLibrary (row) {
      this.$$api_modules_uploadDel({
        data: { id: row.id },
        fn: res => {
          this.$message.success("success")
          this.getTableData()
        },
        errFn: () => {
          this.$message.error("Fail")
        },
      })
    },
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
          "rengine:ruletemplate:edit"
        ),
      })
    },
    design () {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "rengine:ruletemplate:edit"
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