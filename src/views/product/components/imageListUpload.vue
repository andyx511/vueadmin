<template>
  <div>
    <el-upload

      :class="propClass"
      action="http://114.55.94.250:8888/cos/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-success="handleUploadSuccess"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: "imageListUpload",
    props: {
      value: Array,
      propClass: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return{
        list:[]
      }
    },
    computed:{

    },
    methods:{
      emitInput() {
        this.$emit("picList", this.list);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.list = []
        for (let i =0;i<fileList.length;i++){
          this.list.push(fileList[i].response.data.host+fileList[i].response.data.path)
        }

        this.emitInput()
      },
      handlePreview(file, fileList) {
        this.$message({
          message:fileList
        })
        console.log(file);
      },
      handleUploadSuccess(res, file ,fileList) {
        console.log(file, fileList);
        this.list = []
        for (let i =0;i<fileList.length;i++){
          this.list.push(fileList[i].response.data.host+fileList[i].response.data.path)
        }

        this.$emit("picList", this.list)
      }
    }
  }
</script>

<style scoped>

</style>
