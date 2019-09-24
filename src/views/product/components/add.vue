<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12" :push="5">
        <el-form :model="product" :rules="rules" ref="product" label-width="100px" class="demo-product">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="product.name"></el-input>
          </el-form-item>
          <el-form-item label="品牌" prop="brand">
            <el-select v-model="product.brand" placeholder="请选择">
              <el-option
                v-for="item in brand"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('product')">立即创建</el-button>
            <el-button @click="resetForm('product')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getList} from '../../../api/brand'
  export default {
    name: "add",
    data() {
      return{
        product: {
          name: '',
          kind: '',
          brand: '',
          pic: '',
          isNew: '',
          isPublic: '',
          sort: '',
          price: '',
          unit: '',
          giftGrowth:'',
          giftPoint:'',
          status:'',
          word:''
        },
        brand:[],
        kind: [],
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          brand: [
            { required: true, message: '请选择商品品牌', trigger: 'blur'}
          ]
        },

      }
    },
    created() {
      this.getBrandList();
    },
    methods: {
      submitForm( ) {
        this.$parent.dialogVisible = false
        this.$emit('mm','false')
        this.$message({
          message:"哈哈哈"
        })
        this.resetForm('product')
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getBrandList(){
        getList({pageNum:1,pageSize:100}).then(response =>{
          let brandList = response.data.list;
          for (let i = 0;i<brandList.length;i++){
            this.brand.push({label:brandList[i].name,value:brandList[i].name});
          }
          this.$message({
            message:"123"
          })
        })
      },
      getKindList
    }
  }
</script>

<style scoped>

</style>
