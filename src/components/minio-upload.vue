<template>
  <div class="minioBox">
    <el-button style="marginRight:10px;" @click="getFileName" size="mini" type="success">选择文件</el-button>
    <input accept=".pdf,.doc" type="file" multiple="multiple" id="minIoFile" ref="minIoFile" v-show="false" @change="getFile">
    <el-button v-if="fileList.length>0" style="marginRight:10px;" @click="upload" size="mini" type="success">上传</el-button>
    <ul class="uploadFileList">
      <li v-for="item,index of fileList" :key="index">
        <span class="subString">{{item.name}}</span>&nbsp;
        <span>({{(item.size/1024/1024).toFixed(2)}}M)</span>
        <div class="floatRight" style="float: right;">
          <i class="el-icon-close" style="cursor: pointer;" @click="deleteMinioFile(index)"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
let Minio = require('minio')
let stream = require('stream')
//连接minio文件服务器
var minioClient
// endPoint: '10.0.0.163',   //对象存储服务的URL http://172.17.0.2:9000/test12345678
// port: 19000,//端口号
// useSSL: false,   //true代表使用HTTPS
// accessKey: this.minioConfig.bucketName,   //账户id
// secretKey: this.minioConfig.bucketName,   //密码
// partSize: '',
// sessionToken: ""
export default {
  data () {
    return {
      fileList: [],
      minioConfig: null
    }
  },
  mounted () {
    this.minioConfig = require("./mock2.json").data.s3;
    minioClient = new Minio.Client({ ...this.minioConfig })
  },
  methods: {
    getFileName () {
      let inputDOM = this.$refs.minIoFile;
      inputDOM.click();
    },
    getFile (event) {
      console.log(document.getElementById('minIoFile').files);
      let files = document.getElementById('minIoFile').files;
      let arr = [];
      let fileSwitch = true;
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          if ((files[i].size / 1024 / 1024).toFixed(2) > 64) {
            this.$message({
              message: `${item.name}超过文件的最大长度`,
              type: 'warning'
            });
            fileSwitch = false;
          }
        }
        if (fileSwitch) {
          for (let i = 0; i < files.length; i++) {
            console.log(files[i][File]);
            console.log(files[i]);
            this.fileList.push(files[i])
          }
        }
      }
    },
    upload () {
      this.fileList.map((item, index) => {
        this.uploadMinIo(item, index);
      })
    },
    //上传文件
    uploadMinIo (fileObj, index) {
      let vm = this
      console.info(minioClient)
      // const files = fileObj;
      if (fileObj) {
        let file = fileObj
        //判断是否选择了文件
        if (file == undefined) {
          //未选择
          console.log("请上传文件")
        } else {
          //选择
          //获取文件类型及大小
          const fileName = file.name
          const mineType = file.type
          const fileSize = file.size

          //参数
          let metadata = {
            "content-type": mineType,
            "content-length": fileSize
          }
          //判断储存桶是否存在
          minioClient.bucketExists(vm.minioConfig.bucketName, function (err) {
            console.info(err)
            if (err) {
              if (err.code == 'NoSuchBucket') return console.log("bucket does not exist.")
              return console.log(err)
            }
            //存在
            console.log('Bucket exists.')
            //准备上传
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function (e) {
              const dataurl = e.target.result
              //base64转blob
              const blob = vm.toBlob(dataurl)
              //blob转arrayBuffer
              let reader2 = new FileReader()
              reader2.readAsArrayBuffer(blob)

              reader2.onload = function (ex) {
                //定义流
                let bufferStream = new stream.PassThrough();
                //将buffer写入
                bufferStream.end(new Buffer(ex.target.result));
                //上传
                minioClient.putObject(vm.minioConfig.bucketName, fileName, bufferStream, fileSize, metadata, function (err, etag) {
                  if (err == null) {
                    minioClient.presignedGetObject(vm.minioConfig.bucketName, fileName, 24 * 60 * 60, function (err, presignedUrl) {
                      if (err) return console.log(err)
                      //输出url
                      console.log(presignedUrl)
                      vm.$message.success('upload success');

                    })
                  }
                  //return console.log(err, etag)
                })
              }
            }
          })
        }

      }
    },
    //base64转blob
    toBlob (base64Data) {
      let byteString = base64Data
      if (base64Data.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(base64Data.split(',')[1]) // base64 解码
      } else {
        byteString = unescape(base64Data.split(',')[1])
      }
      // 获取文件类型
      let mimeString = base64Data.split(';')[0].split(":")[1] // mime类型

      // ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区
      // let arrayBuffer = new ArrayBuffer(byteString.length) // 创建缓冲数组
      // let uintArr = new Uint8Array(arrayBuffer) // 创建视图

      let uintArr = new Uint8Array(byteString.length) // 创建视图

      for (let i = 0; i < byteString.length; i++) {
        uintArr[i] = byteString.charCodeAt(i)
      }
      // 生成blob
      const blob = new Blob([uintArr], {
        type: mimeString
      })
      // 使用 Blob 创建一个指向类型化数组的URL, URL.createObjectURL是new Blob文件的方法,可以生成一个普通的url,可以直接使用,比如用在img.src上
      return blob
    },
    deleteMinioFile (i) {
      console.info(i)
      this.fileList.splice(i, 1)
    }
  }
}
</script>

<style>
</style>