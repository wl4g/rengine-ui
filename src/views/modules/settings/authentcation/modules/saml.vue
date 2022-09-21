<template>
  <div>
    <div>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">SpMetadata Url</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input v-model="content.spMetadataUrl" />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="grid">
        <el-col :span="3">
          <div class="grid-content1">状态</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-select v-model="content.enabled" collapse-tags placeholder="请选择">
              <el-option label="停用" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-row :gutter="20" class="grid">
        <el-col :span="3"> </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-button type="primary" @click="submitForm()">Save</el-button>
            <el-button @click="resetForm()">Cancel</el-button>
          </div>
        </el-col>
      </el-row>
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
  },
  data () {
    return {
      value1: [],
      show: true,
      sliderDisable: false,
      content: {
        useSSL: []
      },
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
  mounted () {

    console.info(this.content)
  },
  methods: {
    submitForm () {
      if (!this.content.id) {
        this.content = {
          ...this.content,
          "@kind": "saml2"
        }
      }
      let data = this.content
      this.$$api_modules_saveIdp({
        data: data,
        fn: res => {

        }
      })
    },
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