<template>
  <!-- <div>
    <div>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">App Key</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">App Secret</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid" v-for="(item,index) in chatidList" :key="item">
        <el-col :span="3">
          <div class="grid-content1">chatid</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input v-model="item.value" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <i class="el-icon-remove-outline drawer_i" @click="delChatId(index)" v-if="chatidList.length > 1"></i>
            <i class="el-icon-circle-plus-outline drawer_i" @click="addChatId" v-if="chatidList.length < 5 && index == chatidList.length -1"></i>
          </div>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-row :gutter="20" class="grid">
        <el-col :span="3"> </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
            <el-button @click="resetForm('ruleForm')">Cancel</el-button>
          </div>
        </el-col>
      </el-row>

    </div>

  </div> -->
  <div class="email">
    <el-form label-width="140px" size="mini" :model="content" ref="content" class="demo-form-inline" :rules="rules">
      <el-row :gutter="24">
        <el-col :span="10">
          <el-form-item label="Smtp Host" prop="smtpHost" class="item">
            <template slot="label" class="demolavel">
              <div class="grid-content1">App Key
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
  data () {
    return {
      value1: [],
      show: true,
      sliderDisable: false,
      options: [
        {
          value: '选项1',
          label: 'User ssl'
        },
        {
          value: '选项2',
          label: 'User ssl1'
        },
        {
          value: '选项3',
          label: 'User ssl2'
        },
        {
          value: '选项4',
          label: 'User ssl3'
        },
        {
          value: '选项5',
          label: 'User ssl4'
        }
      ],
      enabled: true,
      checked: false,
      chatidList: [
        { value: "1" },
      ]
    }
  },
  methods: {
    addChatId () {
      this.chatidList.push({ value: "" })
    },
    delChatId (val) {
      this.chatidList.splice(val, 1)
    },
    submitForm () {
      console.info(this.chatidList)
    }
  }
}
</script>

<style scoped>
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
.drawer_i {
  font-size: 16px;
  line-height: 2 !important;
  cursor: pointer;
}
</style>