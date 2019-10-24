<template>
  <el-form>
    <el-form-item label="用户头像">
      <single-img-upload style="margin: 5px" v-model="user.name"></single-img-upload>
    </el-form-item>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import getInfo from '../../../api/user'
  import singleImgUpload from '../../product/components/singleImgUpload'
export default {
  components:{singleImgUpload},
  data(){
    return{
      user:{
        icon:'',
        name:'',
        email:''
      }
    }
  },
  create(){

  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    },
    getInfo(){
      getInfo().then(res=>{

      })
    }
  }
}
</script>
