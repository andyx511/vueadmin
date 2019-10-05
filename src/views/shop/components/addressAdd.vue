<template>
<div>
  <el-form ref="form" :model="form" label-width="120px" style="width:80%">
    <el-form-item label="姓名" >
      <el-input v-model="form.name" ></el-input>
    </el-form-item>
    <el-form-item label="地区">
      <v-distpicker :placeholders="placeholders" v-model="form.place"></v-distpicker>
    </el-form-item>
    <el-form-item label="详细地址">
      <el-input  v-model="form.detailAddress"></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input  v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="默认地址">
        <el-checkbox></el-checkbox>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  export default {
    name: "addressAdd",
    components:{VDistpicker},
    data(){
      return{
        placeholders: {
          province: '------- 省 --------',
          city: '--- 市 ---',
          area: '--- 区 ---',
        },
        form:{
          name:null,
          place:null,
          detailAddress:null,
          phone:null
        }
      }
    }
  }
</script>

<style scoped>

</style>
