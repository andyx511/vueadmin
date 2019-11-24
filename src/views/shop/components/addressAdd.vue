<template>
<div>
  <el-form ref="form" :model="form" label-width="120px" style="width:80%">
    <el-form-item label="姓名" >
      <el-input v-model="form.receiverName" ></el-input>
    </el-form-item>
    <el-form-item label="地区">
      <v-distpicker
        :placeholders="placeholders"
        :province="form.province"
        :city="form.city"
        :area="form.region"
        @selected="onSelected"></v-distpicker>
    </el-form-item>
    <el-form-item label="详细地址">
      <el-input  v-model="form.detailAddress"></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input  v-model="form.receiverPhone"></el-input>
    </el-form-item>
    <el-form-item label="默认地址">
      <el-checkbox-group v-model="form.isDefault">
        <el-checkbox value="1"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" style="float:right;">立即创建</el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
  import {addAddress} from "../../../api/address";
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
          receiverName:null,
          province:null,
          city:null,
          region:null,
          detailAddress:null,
          receiverPhone:null,
          isDefault:false
        }
      }
    },
    created(){

    },
    methods:{
      onSubmit(){
        addAddress(this.form).then(res=>{
          this.$message({
            message:'添加成功',
            type:'success'
          })
          this.resetForm('form')
          this.$emit('mm',false)
        })
      },
      onSelected(data) {
        this.form.province = data.province.value
        this.form.city = data.city.value
        this.form.region = data.area.value
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },

  }
</script>

<style scoped>

</style>
