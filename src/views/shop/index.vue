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
              <el-link :underline="false" style="padding-right: 10%"  @click="toProduct">全部商品</el-link>|
            </el-col>
            <el-col :span="4" style="padding-top: 35px">

              <el-badge :value="count" class="item" >
                <el-link type="info" :underline="false" style="margin-left: 45px;" @click="toCart">
                  <i class="el-icon-shopping-cart-1" style="font-size: 30px"></i>
                </el-link>
              </el-badge>
              <el-link type="info" :underline="false" style="margin-left: 30px;">
                <el-dropdown @command ="handleCommand">
                  <i class="el-icon-user" style="font-size: 30px;"></i>
                  <el-dropdown-menu slot="dropdown" style="margin-top: -10px;width: 100px;">
                    <div style="padding: 5px 10px">
                      <el-image
                        :src="user.avatar"
                        :fit="contain"
                        style="border-radius: 5px">
                      </el-image>
                      <div style="text-align:center;" v-if="user.name==''">游客</div>
                      <div style="text-align:center;" v-if="user.name!=''">{{user.name}}</div>
                    </div>
                    <el-dropdown-item command="order">我的订单</el-dropdown-item>
                    <el-dropdown-item command="user">账号资料</el-dropdown-item>
                    <el-dropdown-item command="address">收货地址</el-dropdown-item>
                    <el-dropdown-item divided style="text-align:center;"
                                      command="shop"
                                      @click.native="logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-link>
            </el-col>
          </el-row>
        </el-header>
      </sticky>

      <el-main style="padding: 20px 400px">
        <el-row>
          <el-col >
            <el-carousel indicator-position="outside" >
              <el-carousel-item v-for="item in 2" :key="item" >
                <el-image
                  style="width: 100%; height: 100%"
                  :src="url[item-1]"
                  :fit="fit"></el-image>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24"  style="background-color: #f3f3f3 ;padding-left: 5px" align="left	">
            <h4>品牌推荐</h4>
          </el-col>
        </el-row>
        <el-row style="border-right: 1px solid #dddddd;border-left: 1px solid #dddddd;border-bottom: 1px solid #dddddd">
          <el-col :span="6"  v-for="(item,index) in brandList ">
            <a @click="chooseBrand(item.brandName)">
              <div class="card">
                <el-image
                  :src=item.url
                >
                </el-image>
                <el-row style="margin-top: 5px; text-align: left">
                  <el-col style="align:right; font-size: 12px;">{{item.name}}</el-col>
                </el-row>
              </div>
            </a>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24"  style="background-color: #f3f3f3 ;padding-left: 5px;margin-top: 15px;" align="left	">
            <h4>新品推荐</h4>
          </el-col>
        </el-row>
        <el-row style="border-right: 1px solid #dddddd;border-left: 1px solid #dddddd;border-bottom: 1px solid #dddddd">
          <el-col :span="6"  v-for="(item,index) in newList ">
            <a @click="productDetail(item.productId)">
              <div class="card">
                <el-image
                  :src=item.url
                  style="width: 230px;height: 230px;">
                </el-image>
                <el-row >
                  <el-col :span="9" style="font-size: 22px;color: red">￥{{item.price}}.00</el-col>
                  <el-col :span="8" :offset="7" style="font-size: 14px;color: #888">{{item.salesVolume}}人已购</el-col>
                </el-row>
                <el-row style="margin-top: 5px; text-align: left">
                  <el-col style="align:right; font-size: 12px;">{{item.name}}</el-col>
                </el-row>
              </div>
            </a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"  style="background-color: #f3f3f3 ;padding-left: 5px;margin-top: 15px;" align="left	">
            <h4>热门推荐</h4>
          </el-col>
        </el-row>
        <el-row style="border-right: 1px solid #dddddd;border-left: 1px solid #dddddd;border-bottom: 1px solid #dddddd">
          <el-col :span="6"  v-for="(item,index) in hotList ">
            <a @click="productDetail(item.productId)">
            <div class="card">
              <el-image
                :src=item.url
                style="width: 230px;height: 230px;">
              </el-image>
              <el-row >
                <el-col :span="9" style="font-size: 22px;color: red">￥{{item.price}}.00</el-col>
                <el-col :span="8" :offset="7" style="font-size: 14px;color: #888">{{item.salesVolume}}人已购</el-col>
              </el-row>
              <el-row style="margin-top: 5px; text-align: left">
                <el-col style="align:right; font-size: 12px;">{{item.name}}</el-col>
              </el-row>
            </div>
            </a>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24"  style="background-color: #f3f3f3 ;padding-left: 5px ;margin-top: 15px;" align="left">
            <h4>优选推荐</h4>
          </el-col>
        </el-row>
        <el-row style="border-right: 1px solid #dddddd;border-left: 1px solid #dddddd;border-bottom: 1px solid #dddddd">
          <el-col :span="6"  v-for="(item,index) in goodList ">
            <a @click="productDetail(item.productId)">
            <div class="card">
              <el-image
                :src=item.url
                style="width: 230px;height: 230px;">
              </el-image>
              <el-row >
                <el-col :span="9" style="font-size: 22px;color: red">￥{{item.price}}.00</el-col>
                <el-col :span="8" :offset="7" style="font-size: 14px;color: #888">{{item.salesVolume}}人已购</el-col>
              </el-row>
              <el-row style="margin-top: 5px; text-align: left">
                <el-col style="align:right; font-size: 12px;">{{item.name}}</el-col>
              </el-row>
            </div>
            </a>
          </el-col>
        </el-row>
 <!--       <el-row>
          <el-col  style="background-color: #f3f3f3 ;padding-left: 5px" align="left	">
            <h4>精品推荐</h4>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <el-card shadow="hover">
              <el-image
                :src="'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-29/14-57-53/894-65cbd157-7502-4e75-8f9b-bf7940dafac1.jpg'">

              </el-image>
              <el-row >
                <el-col :span="9" style="font-size: 22px;color: red">¥248.00</el-col>
                <el-col :span="8" :offset="7" style="font-size: 14px;color: #888">{{item.salesVolume}}人已购</el-col>
              </el-row>
              <el-row style="margin-top: 5px;">
                <el-col style="align:right; font-size: 12px;">博世刹车油DOT4制动液刹车液 BOSCH 汽车离合器油配件通用型1L</el-col>
              </el-row>
            </el-card>
          </el-col>

        </el-row>-->

      </el-main>
      <el-footer>
        foot
      </el-footer>
    </el-container>
    <el-tooltip placement="top" content="tooltip">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>

</template>

<script>
  import BackToTop from '@/components/BackToTop'
  import Sticky from '@/components/Sticky'
  import {getProductList} from "../../api/product";
  import {mapGetters} from "vuex";
  import {getCount} from "../../api/cart";
  import {getBrandList} from "../../api/recommend"
  import {getGoodList} from "../../api/goodRecommend"
  import {getNewList} from "../../api/newRecommend"
  import {getHotList} from "../../api/hotRecommend"
  // @ is an alias to /src
  export default {
    name: 'index',
    components: { Sticky, BackToTop},
    data () {
      return {
        currentDate: new Date(),
        url: ['https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-30/14-42-03/800-0868a1df-588e-4f30-8e53-7915f6f050fd.jpg',
          'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-30/14-45-30/185-f95b2efe-24e8-4de1-8a72-db65ffcd0ff6.png',],
        list: 'null',
        user:{},
        newList:null,
        hotList:null,
        goodList:null,
        brandList:null,
        count:null
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    },
    created(){
      this.getUser()
      this.getCount()
      this.getList()
    },
    methods: {
      chooseBrand(brandName){
        this.$router.push({path: 'product',query:{brand:brandName}})
      },
      productDetail(data){
        this.$router.push({path: 'productDetail',query:{id:data}})
      },
      getCount(){
        getCount().then(res=>{
          this.count = res.data
        })
      },
      search(){
        this.$message({
          message:"查询中"
        })
      },
      getUser() {
        this.user = {
          name: this.name,
          role: this.roles.join(' | '),
          avatar: this.avatar
        }
      },
      toProduct(){
        this.$router.push({path: '/product'})
      },
      toCart(){
        this.$router.push({path: '/cart'})
      },
      handleCommand(command){
        this.$router.push({path: '/'+command})
      },
      getList(){
        getBrandList().then(res=>{
          this.brandList = res.data
        })
        getHotList().then(res=>{
          this.hotList = res.data
        })
        getNewList().then(res=>{
          this.newList = res.data
        })
        getGoodList().then(res=>{
          this.goodList = res.data
        })
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$message({
          message:'已退出登录'
        })
        this.user.name=''
      }
    }
  }
</script>
<style lang="scss" >
  .box-card-component{
    .el-card__header {
      padding: 0px!important;
    }
  }
</style>
<style>
  .all{
    font-size: 20px;
    color: #ffffff;
  }
  .card{
    padding: 20px;
  }
  .card:hover{
    -moz-box-shadow:2px 2px 5px #333333; -webkit-box-shadow:2px 2px 5px #333333; box-shadow:2px 2px 5px #dddddd;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .el-header, .el-footer {
    background-color: #000000;
    color: #333;

    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {

    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
