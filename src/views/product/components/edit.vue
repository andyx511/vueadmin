<template>
  <div class="app-container">
    <el-row>
      <el-col :span="16" :push="5">
        <el-form :model="product" :rules="rules" ref="product" label-width="100px" class="demo-product">
          <!--<el-form-item label="商品名称" prop="name">
            <el-input v-model="product.name"></el-input>
          </el-form-item>-->
          <el-form-item label="商品名称" prop="name">
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
          <el-form-item label="种类"prop="kind" >
            <el-select v-model="product.kind" placeholder="请选择">
              <el-option
                v-for="item in kind"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片" prop="pic">
            <single-img-upload v-model="product.pic"></single-img-upload>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="product.price" style="width: 200px;"></el-input> 元
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="product.sort" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="赠送成长值" prop="giftGrowth">
            <el-input v-model="product.giftGrowth" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="赠送积分" prop="giftPoint">
            <el-input v-model="product.giftPoint" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="是否打折" >
            <el-radio-group v-model="product.isDiscount">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>

          </el-form-item>
          <el-form-item label="打折后的价格" prop="discountPrice" v-show="this.product.isDiscount==1">
            <el-input-number :min = "1" v-model="product.discountPrice" style="width: 200px;"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('product')">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getList} from '../../../api/brand'
  import {getKindList} from "../../../api/kind";
  import imageListUpload from "./imageListUpload";
  import SingleImgUpload from "./singleImgUpload";
  import updateUpLoad from "./updateUpLoad";
  import {addProduct,productDetail,updateProduct} from "../../../api/product";

  const isNum = (rule, value, callback) => {
    const age= /^[0-9]*$/
    if (!age.test(value)) {
      callback(new Error('请输入数字'))
    }else{
      callback()
    }
  }
  export default {
    name: "edit",
    props:['productId'],
    components:{SingleImgUpload, imageListUpload,updateUpLoad},
    data() {
      return{
        detailPic:[],
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
          detailPic:'',
          giftGrowth:'',
          giftPoint:'',
          status:'',
          isDiscount:'',
          discountPrice:''
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
          ],
          kind: [
            { required: true, message: '请选择商品种类', trigger: 'blur'}
          ],
          pic: [
            { required: true, message: '请选择商品图片', trigger: 'blur'}
          ],
          detailPic: [
            { required: true, message: '请选择商品详情图片', trigger: 'blur'}
          ],
          isNew: [
            { required: true, message: '请选择商品是否为新品', trigger: 'blur'}
          ],
          price: [
            { required: true, message: '请输入商品价格', trigger: 'blur'},
            { validator: isNum, trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '请选择商品排序', trigger: 'blur'},
            { validator: isNum, trigger: 'blur' }
          ],
          unit: [
            { required: true, message: '请输入商品单位', trigger: 'blur'}
          ],
          giftGrowth: [
            { required: true, message: '请输入商品购买时赠送的成长值', trigger: 'blur'},
            { validator: isNum, trigger: 'blur' }
          ],
          giftPoint: [
            { required: true, message: '请输入商品购买时赠送的积分', trigger: 'blur'},
            { validator: isNum, trigger: 'blur' }
          ],
          discountPrice: [
            { validator: isNum, trigger: 'blur' }
          ]
        },

      }
    },
    watch:{
      productId(curVal,oldVal){
        this.getProduct();
        this.getBrandList();
        this.getKindList();
      }
    },
    computed:{
      selectProductPics(){
          let pics = this.product.detailPic.split(',');
          return pics
      }
    },
    created() {
      this.getProduct();
      this.getBrandList();
      this.getKindList();
    },
    methods:{
      getBrandList(){
        getList({pageNum:1,pageSize:100}).then(response =>{
          let brandList = response.data.list;
          for (let i = 0;i<brandList.length;i++){
            this.brand.push({label:brandList[i].name,value:brandList[i].name});
          }
        })
      },
      getKindList(){
        getKindList({pageNum: 1,pageSize: 100}).then(response =>{
          let kindList = response.data.list;
          for (let i = 0;i<kindList.length;i++){
            this.kind.push({label:kindList[i].name,value:kindList[i].name});
          }
        })
      },
      getProduct(){
        productDetail(this.productId).then(response =>{
          this.product = response.data
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid)=> {
          if (valid) {
            updateProduct(this.product).then(response => {
              this.$message({
                message: '添加成功',
                type:"success"
              })
              this.$emit('mm', 'false')
              this.resetForm(formName)
              this.product.detailPic=null
            })
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
