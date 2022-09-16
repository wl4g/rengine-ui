<template>
  <div>
    <div>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Discovery Endpoint</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Directly Configuration</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-select v-model="value1" multiple placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Authorization Url</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Token Url</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Userinfo Url</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Client Id</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Client Secret</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">UserId </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">UserName </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Scopes</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
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
      checked: false
    }
  },
  methods: {

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
</style>