<template>
  <div class="email">
    <el-form label-width="140px" size="mini" :model="content" ref="content" class="demo-form-inline" :rules="rules">
      <el-row :gutter="24">
        <el-col :span="10">
          <el-form-item label="Smtp Host" prop="smtpHost" class="item">
            <template slot="label" class="demolavel">
              <div class="grid-content1">Smtp Host
                <el-tooltip placement="top">
                  <div slot="content">*********</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="content.smtpHost" placeholder="请输入Smtp Host"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="Smtp Port" prop="smtpPort">
            <template slot="label">
              <div class="grid-content1">Smtp Port
                <el-tooltip placement="top">
                  <div slot="content">*********</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </template>
            <el-input-number :controls="false" v-model="content.smtpPort" :min="0" :precision="0" placeholder="请输入Smtp Port"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="Send Mail" prop="sendMail">
            <template slot="label">
              <div class="grid-content1">Send Mail
                <el-tooltip placement="top">
                  <div slot="content">*********</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="content.sendMail" placeholder="请输入mail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="User Name" prop="username">
            <template slot="label">
              <div class="grid-content1">User Name
                <el-tooltip placement="top">
                  <div slot="content">*********</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="content.username" placeholder="请输入mail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="Password" prop="password">
            <template slot="label">
              <div class="grid-content1">Password
                <el-tooltip placement="top">
                  <div slot="content">*********</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="content.password" placeholder="请输入Password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="Use ssl" prop="useSSL">
            <template slot="label">
              <div class="grid-content1">Use ssl
                <el-tooltip placement="top">
                  <div slot="content">*********</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </template>
            <el-radio-group v-model="content.useSSL">
              <el-radio :label="true">true</el-radio>
              <el-radio :label="false">false</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="状态">
            <template slot="label">
              <div class="grid-content1">状态
                <el-tooltip placement="top">
                  <div slot="content">*********</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </template>
            <el-radio-group v-model="content.enabled">
              <el-radio :label="0">停用</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="notification-foot">
      <el-button type="primary" @click="submitForm()">Save</el-button>
      <el-button @click="resetForm()">Cancel</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
      default: {}
    },
    queryTabCompoent: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      content: {
        useSSL: []
      },
      value1: [],
      show: true,
      enabled: true,
      checked: false,
      rules: {
        smtpHost: [
          { required: true, message: '请输入smtpHost', trigger: 'blur' },
          { pattern: /^http(s)?:\/\/(.*?)\//, message: '请输入正确的smtpHost', trigger: 'blur' },
        ],
        smtpPort: [
          { required: true, message: '请输入smtpHost', trigger: 'blur' },
        ],
        sendMail: [
          { required: true, message: '请输入邮箱账号', trigger: 'blur' },
          { pattern: /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/, message: '请输入正确的邮箱账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入邮箱账号', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        useSSL: [
          { required: true, message: '请选择useSSL', trigger: 'blur' },
        ],
        enabled: [
          { required: true, message: '请选择正确的状态', trigger: 'blur' },
        ],

      },
    }
  },
  mounted () {
  },
  methods: {
    submitForm () {
      // this.$refs['content'].validate((valid) => { })
      this.$refs['content'].validate((valid) => {
        this.content.smtpPort = parseInt(this.content.smtpPort)
        let data = {
          provider: {
            "@kind": "email",
            ...this.content,
            "accessKey": "string",
            "accessSecret": "string",
            "regionId": "string",
            "signName": "string",
            "remark": "string",
          }
        }
        this.$$api_modules_saveNotification({
          data: data,
          fn: res => {
            if (res.message == "Ok") {
              this.$message.success("success")
              this.queryTabCompoent("email");
            }
          },
          errFn: () => {
            this.$message.error("Fail")
          },
        })
      })
    }
  }
}
</script>

<style lang="scss" >
.email {
  .title {
    font-size: 20px;
    padding: 1vw 0;
  }
  .grid-content1 {
    text-align: right;
  }
  .grid {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .el-row {
    display: flex;
    flex-direction: column;
  }

  .demo-form-inline .el-form-item__label {
    display: flex;
    justify-content: flex-end;
  }
}
.notification-foot {
  padding-left: 140px;
}
</style>