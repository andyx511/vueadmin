<template>
  <div>
    <el-upload
      v-loading="loading"
      class="avatar-uploader"
      :class="propClass"
      :action="uploadUrl"
      :before-upload="beforeUpload"
      :show-file-list="false"
      :multiple="false"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-error="handleError"
      :on-preview="handlePreview"
    >
      <img v-if="fileList.length>0 && fileList[0].url" :style="propClass" class="avatar" :src="fileList[0].url"/>
      <i v-else class="el-icon-plus avatar-uploader-icon" :style="propClass"></i>
    </el-upload>
  </div>
</template>
<script>

export default {
  name: "singleImgUpload",
  props: {
    value: String,
    propClass: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    uploadUrl() {
      return "http://114.55.94.250:8888/cos/upload";
    },
    imageUrl() {
      return this.value;
    },
    imageName() {
      if (this.value != null && this.value !== "") {
        return this.value.substr(this.value.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
    fileList() {
      return [
        {
          name: this.imageName,
          url: this.imageUrl
        }
      ];
    },
    showFileList: {
      get: function() {
        return (
          this.value !== null && this.value !== "" && this.value !== undefined
        );
      },
      set: function(newValue) {}
    }
  },
  data() {
    return {
      loading: false,
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: ""
      },
      dialogVisible: false
    };
  },
  methods: {
    emitInput(val) {
      this.$emit("input", val);
    },
    handleRemove(file, fileList) {
      this.emitInput("");
    },
    handlePreview(file) {
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      this.loading = true;
      return true;
      // let _self = this;
      // return new Promise((resolve, reject) => {
      //   policy()
      //     .then(response => {
      //       _self.dataObj.policy = response.data.policy;
      //       _self.dataObj.signature = response.data.signature;
      //       _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
      //       _self.dataObj.key =
      //         response.data.dir + "/" + new Date().getTime() + "/${filename}";
      //       _self.dataObj.dir = response.data.dir + "/" + new Date().getTime();
      //       _self.dataObj.host = response.data.host;
      //       resolve(true);
      //       this.loading = true;
      //     })
      //     .catch(err => {
      //       console.log(err);
      //       reject(false);
      //     });
      // });
    },
    handleError() {
      this.loading = false;
    },
    handleUploadSuccess(res, file) {
      if (res.data) {
        this.showFileList = true;
        this.fileList.pop();
        this.fileList.push({
          name: file.name,
          url: res.data.host + res.data.path
        });
        this.loading = false;
        this.emitInput(this.fileList[0].url);
      } else {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss">
  .app-box-main {
    width: 75%;
  }

  .regi-container {
    width: 800px;
    margin: 0 auto;

    .step-container {
      margin-top: 50px;
    }

    .regi-content {
      width: 550px;
      margin: 0 auto;
      margin-top: 50px;
    }

    .option-btn {
      text-align: center;
      margin-top: 50px;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .map-box {
    position: relative;
  }

  #container {
    width: 100%;
    height: 500px;
    margin: 0;
    font-size: 13px;
  }

  #pickerBox {
    position: absolute;
    z-index: 9999;
    top: 10px;
    right: 0;
    width: 300px;
  }

  #pickerInput {
    width: 276px;
    padding: 5px 5px;
  }

  #poiInfo {
    background: #fff;
  }

  .amap_lib_placeSearch .poibox.highlight {
    background-color: #CAE1FF;
  }

  .amap_lib_placeSearch .poi-more {
    display: none !important;
  }
</style>



