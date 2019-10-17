<template>
  <div>
    <el-container>
      <sticky :sticky-top="0" :z-index="10">
        <el-header style="height: 120px;padding: 0px 100px">
          <el-row >
            <el-col :span="6" >
              <el-image
                :src="'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-30/15-23-41/596-eb1eecc4-1951-4e8b-98fe-33d8ac907492.png'"
                style="width: 120px; height: 120px;float: right"
                :fit="contain"
              >
              </el-image>
            </el-col>
            <el-col :span="9" style="padding: 0px 30px">
              <el-input style="margin-left: 25px;margin-top: 25px;width: 60%;" placeholder="请输入内容">
                <i slot="prefix"class="el-input__icon el-icon-search is-clickable" style="margin-right: 5px;" ></i>
              </el-input>
              <el-button style="margin-left: -1%;width: 20%;" icon="el-icon-search" type="danger"></el-button>
            </el-col>
            <el-col :span="2" style="padding-top: 25px; font-size: 28px;">
              <el-link :underline="false" style="padding-right: 10%">全部商品</el-link>|

            </el-col>
            <el-col :span="4" style="padding-top: 35px">

              <el-badge :value="12" class="item" >
                <el-link type="info" :underline="false" style="margin-left: 45px;">
                  <i class="el-icon-shopping-cart-1" style="font-size: 30px"></i>
                </el-link>
              </el-badge>
              <el-link type="info" :underline="false" style="margin-left: 30px;">
                <el-dropdown>
                  <i class="el-icon-user" style="font-size: 30px;"></i>
                  <el-dropdown-menu slot="dropdown" style="margin-top: -10px;width: 100px;">
                    <div style="padding: 5px 10px">
                      <el-image
                        :src="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'"
                        :fit="contain"
                        style="border-radius: 5px">
                      </el-image>
                      <div style="text-align:center;">admin</div>
                    </div>
                    <el-dropdown-item @click="this.$router.push({path: '/order'})">我的订单</el-dropdown-item>
                    <el-dropdown-item>账号资料</el-dropdown-item>
                    <el-dropdown-item>收货地址</el-dropdown-item>
                    <el-dropdown-item divided style="text-align:center;">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-link>
            </el-col>
          </el-row>
        </el-header>
      </sticky>
      <el-main style="padding: 20px 400px">
        <el-row>
          <el-col :span="8">
            <el-image
            style="width: 350px;height: 350px;float:left;;"
            :src="this.product.pic"
            >

            </el-image>
          </el-col>
          <el-col :span="16" >
            <el-row style="float:left;text-align: left">
              <h3 style="float:left;width: 732px;">
                {{product.name}}
              </h3>
            </el-row>
            <el-row style="text-align: left">
              {{product.des}}
            </el-row>
            <el-row style="margin-top: 20px;color: red;font-size: 22px" v-if="product.isDiscount==0">
              <el-col :span="4" style="text-align: left" >价格</el-col>
              <el-col :span="4" style="text-align: left" >¥{{product.price}}</el-col>
              <el-col :span="4" v-if="product.isDiscount==1" style="font-size: 28px;float:left;width: 732px;"> {{product.discountPrice}}</el-col>
            </el-row>
            <el-row style="margin-top: 10px;color: #000000;font-size: 22px" v-if="product.isDiscount==1">
              <el-col :span="4" style="text-align: left" >价格</el-col>
              <el-col :span="4" style="text-decoration: line-through;text-align: left">¥{{product.price}}</el-col>
            </el-row>
            <el-row style="margin-top: 10px;color: red;font-size: 22px;float:left;" v-if="product.isDiscount==1">
              <el-col :span="4" style="text-align: left;width: 80px;" ><b>折后价</b></el-col>
              <el-col :span="4" style="font-size: 28px;text-align: left;width: 652px;"><b> ¥{{product.discountPrice}}</b></el-col>
            </el-row>
            <el-row style="border: 1px dotted #c9c9c9; padding: 5px 10px;margin-top: 20px;float:left; width: 732px;">
              <el-col :span="8" style="text-align: left">
                销量 {{product.salesVolume}}
              </el-col>
              <el-col :span="8" style="text-align: left">
                评价 {{product.commentNum}}
              </el-col>
              <el-col :span="8" style="text-align: left">
                赠送积分 {{product.giftPoint}}
              </el-col>
            </el-row>
            <el-row style="padding-top: 100px;text-align: left">
              数量 <el-input-number :min="1" v-model="number" @change="handleChange"></el-input-number>
            </el-row>
            <el-row style="margin-top: 30px;text-align: left">
              <el-button>立即购买</el-button>
              <el-button type="danger" @click="addCart">加入购物车</el-button>
            </el-row>
          </el-col>
        </el-row>

        <el-row style="padding: 20px 100px;width: 900px;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="商品详情" name="first">
              <el-image
                v-for="(item,index) in detailPic"
                :src="item"
              ></el-image>
            </el-tab-pane>
            <el-tab-pane label="累计评论" name="second">
              累计评论
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-main>
      <el-footer>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import {addCart} from "../../api/cart";
  import {productDetail} from "../../api/product";
  import Sticky from '@/components/Sticky'
  export default {
    name: "productDetail",
    components: { Sticky },
    data(){
      return{
        id:null,
        product:null,
        detailPic:[],
        number:1,
        activeName: 'first',
        cart:{
          name:null,
          productId:null,
          num:null,
          price:null,
          pic:null
        }
      }
    },
    created() {
      this.id =  this.$route.query.id;
      this.$message({
        message:this.id
      })
      productDetail(this.id).then(res=>{
        this.product = res.data
        this.detailPic = res.data.detailPic.split(',')
      })

    },
    methods:{
      addCart(){
        this.cart.name = this.product.name
        this.cart.productId=this.id
        this.cart.num = this.number
        this.cart.pic= this.product.pic
        if(this.product.isDiscount==0){
          this.cart.price=this.product.price
        }
        if(this.product.isDiscount==1){
          this.cart.price = this.product.discountPrice
        }
        addCart(this.cart).then(res =>{
            this.$notify({
              title:'成功',
              message:'已成功加入购物车，请前往查看',
              type:'success'
            })
        })
      },
      handleChange(value) {
        console.log(value);
      }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #000000;
    color: #333;

    line-height: 60px;
  }
</style>
