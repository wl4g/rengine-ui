<template>
  <div>
    <div>
      <el-row :gutter="20" class="grid" v-for="(item,index) in posturlList" :key="item">
        <el-col :span="3">
          <div class="grid-content1">POST Url</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input v-model="item.value" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <i class="el-icon-remove-outline drawer_i" @click="delChatId(index)" v-if="posturlList.length > 1"></i>
            <i class="el-icon-circle-plus-outline drawer_i" @click="addChatId" v-if="posturlList.length < 5 && index == posturlList.length -1"></i>
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
      posturlList: [
        { value: "1" },
      ]
    }
  },
  methods: {
    addChatId () {
      this.posturlList.push({ value: "" })
    },
    delChatId (val) {
      this.posturlList.splice(val, 1)
    },
    submitForm () {
      console.info(this.posturlList)
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
</style>