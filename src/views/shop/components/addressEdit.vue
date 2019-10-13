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
          <el-checkbox ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="float:right;">修改</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {editAddress} from "../../../api/address";
  import VDistpicker from 'v-distpicker'
  export default {
    name: "addressEdit",
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
        this.$message({
          message:this.form,
          type:'success'
        })
        editAddress(this.form).then(res=>{
          this.$message({
            message:'修改成功',
            type:'success'
          })
          this.resetForm('form')
          this.$emit('nn',false)
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
