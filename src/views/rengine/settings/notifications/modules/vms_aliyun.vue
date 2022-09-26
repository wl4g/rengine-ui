<template>
  <div>
    <div>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Access Key</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Access Secret</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Region Id</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">Called Show Number</div>
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