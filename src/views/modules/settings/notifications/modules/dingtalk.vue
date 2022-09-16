<template>
  <div>
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