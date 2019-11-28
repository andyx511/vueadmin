<template>
  <div>
    <el-container>
      <sticky :sticky-top="0" :z-index="10">
        <el-header style="height: 120px;padding: 0px 100px">
          <el-row >
            <el-col :span="6" >
              <a @click="toHome">
              <el-image
                :src="'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-30/15-23-41/596-eb1eecc4-1951-4e8b-98fe-33d8ac907492.png'"
                style="width: 120px; height: 120px;float: right"
                :fit="contain"
              >
              </el-image>
              </a>
            </el-col>
            <el-col :span="9" style="padding: 0px 30px">
              <el-input style="margin-left: 25px;margin-top: 25px;width: 60%;" placeholder="请输入内容">
                <i slot="prefix"class="el-input__icon el-icon-search is-clickable" style="margin-right: 5px;" ></i>
              </el-input>
              <el-button style="margin-left: -1%;width: 20%;" icon="el-icon-search" type="danger"></el-button>
            </el-col>
            <el-col :span="2" style="padding-top: 25px; font-size: 28px;">
              <el-link :underline="false" style="padding-right: 10%" @click="toProduct">全部商品</el-link>|
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
                    <el-dropdown-item command="addressList">收货地址</el-dropdown-item>
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
      <el-main style="padding: 20px 200px">
        <el-row style="margin: 0px auto; width: 1100px;">
          <el-col :span="8">
            <el-image
            style="width: 350px;height: 350px;float:left;;"
            :src="this.product.pic"
            >

            </el-image>
          </el-col>
          <el-col :span="16" >
            <el-row style="float:left;text-align: left">
              <h3 style="float:left;width: 1000px;">
                {{product.name}}
              </h3>
            </el-row>
            <el-row style="text-align: left;display:block;;">
              <div>{{product.des}}</div>
            </el-row>
            <el-row style="margin-top: 20px;color: red;font-size: 22px" v-if="product.isDiscount==0">
              <el-col :span="4" style="text-align: left" >价格</el-col>
              <el-col :span="4" style="text-align: left" >¥{{product.price|numFilter}}</el-col>
              <el-col :span="4" v-if="product.isDiscount==1" style="font-size: 28px;float:left;width: 732px;"> {{product.discountPrice |numFilter}}</el-col>
            </el-row>
            <el-row style="margin-top: 10px;color: #000000;font-size: 22px" v-if="product.isDiscount==1">
              <el-col :span="4" style="text-align: left" >价格</el-col>
              <el-col :span="4" style="text-decoration: line-through;text-align: left">¥{{product.price|numFilter}}</el-col>
            </el-row>
            <el-row style="margin-top: 10px;color: red;font-size: 22px;float:left;" v-if="product.isDiscount==1">
              <el-col :span="4" style="text-align: left;width: 80px;" ><b>折后价</b></el-col>
              <el-col :span="4" style="font-size: 28px;text-align: left;width: 652px;"><b> ¥{{product.discountPrice|numFilter}}</b></el-col>
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
              数量 <el-input-number :min="1" v-model="number" @change="handleChange" :max="5"></el-input-number>
            </el-row>
            <el-row style="margin-top: 30px;text-align: left">
              <el-button type="danger" @click="addCart">加入购物车</el-button>
            </el-row>
          </el-col>
        </el-row>

        <el-row style="margin: 0px auto; width: 1100px;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="商品详情" name="first">
              <el-image
                v-for="(item,index) in detailPic"
                :src="item"
              ></el-image>
            </el-tab-pane>
            <el-tab-pane label="累计评论" name="second">
              <el-row style="border-bottom: 1px solid #e3e3e3;padding: 5px" v-if="list.length==0" >暂无评论</el-row>
              <el-row style="border-bottom: 1px solid #e3e3e3;padding: 5px" v-for=" item in list">
                <el-col :span="2">
                  <div>
                    <el-avatar :src="item.productName"></el-avatar>
                  </div>
                </el-col>
                <el-col :span="22">
                  <el-row style="font-size: 8px;color:#909399">
                    <el-col :span="3" style="float:left;">{{item.userName}}</el-col>
                    <el-col :span="5" style="float:left;">{{item.createTime | formatCreateTime}}</el-col>
                    <el-col :span="16">
                      <el-rate
                        v-model="item.star"
                        disabled
                        show-score
                        text-color="#ff9900"
                        :colors="colors"
                        >
                      </el-rate>
                    </el-col>
                  </el-row>
                  <el-row style="float:left;">
                    {{item.content}}
                  </el-row>
                </el-col>
              </el-row >
              <el-row>
                <el-pagination
                  style="float:right;"
                  :page-size="5"
                  layout="prev, pager, next"
                  :total=total
                  :current-page.sync="query.pageNum"
                  @current-change="handleCurrentChange">
                </el-pagination>
              </el-row>
              <el-row style="margin-top: 5px;">
                <el-col :span="2">
                  <div>
                    <el-avatar :src="user.avatar"></el-avatar>
                  </div>
                </el-col>
                <el-col :span="22">
                  <el-row style="background-color:#ffffff;">
                    <el-input type="textarea" v-model="comment.content"></el-input>
                    <el-rate
                      v-model="comment.star"
                      :colors="colors"
                      style="float:left;"
                    >
                    </el-rate>
                    <el-button type="danger" size="mini" style="float:right;" @click="add">提交</el-button>
                  </el-row>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-main>
      <el-footer style="height: 160px;">

      </el-footer>

    </el-container>
    <el-tooltip placement="top" content="tooltip">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
  import {addCart} from "../../api/cart";
  import {add,geiList} from "../../api/comment";
  import {productDetail} from "../../api/product";
  import Sticky from '@/components/Sticky'
  import {getCount} from "../../api/cart";
  import BackToTop from '@/components/BackToTop';  import {mapGetters} from "vuex";
  import {formatDate} from '@/utils/date';
  const defaultQuery ={
    pageNum:1,
    pageSize:5,
    productId:''
  }
  export default {
    name: "productDetail",
    components: { Sticky, BackToTop },
    data(){
      return{
        value:3,
        id:null,
        product:null,
        detailPic:[],
        count:null,
        number:1,
        activeName: 'first',
        cart:{
          name:null,
          productId:null,
          num:null,
          price:null,
          pic:null
        },
        comment:{
          content:'',
          productId:'',
          star:''
        },
        list:'',
        total:'',
        rate:'',
        user:{},
        query: Object.assign({},defaultQuery),
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    },
    filters: {
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      numFilter (value) {
        let realVal = ''
        if (value) {
          // 截取当前数据到小数点后两位
          realVal = parseFloat(value).toFixed(2)
        } else {
          realVal = '--'
        }
        return realVal
      }
    },
    created() {
      this.getUser()
      this.id =  this.$route.query.id;
      this.getCount()
      productDetail(this.id).then(res=>{
        this.product = res.data
        this.detailPic = res.data.detailPic.split(',')
      })
      this.getList()
    },
    methods:{
      add(){
        this.comment.productId= this.id
        add(this.comment).then(res=>{
          this.comment.star=''
          this.comment.content = ''
          this.getList()
          productDetail(this.id).then(res=>{
            this.product = res.data
            this.detailPic = res.data.detailPic.split(',')
          })
        })
      },
      handleCommand(command){
        this.$router.push({path: '/'+command})
      },
      getList(){
        this.query.productId = this.id
        geiList(this.query).then(res=>{
          this.total = res.data.total
          this.list = res.data.list
        })
      },
      getUser() {
        this.user = {
          name: this.name,
          role: this.roles.join(' | '),
          avatar: this.avatar
        }
      },
      getCount(){
        getCount().then(res=>{
          this.count = res.data
        })
      },
      handleCurrentChange() {
        this.listLoading = true;
        this.getList();
      },
      toHome(){
        this.$router.push({path: 'shop'})
      },
      toProduct(){
        this.$router.push({path: '/product'})
      },
      toCart(){
        this.$router.push({path: '/cart'})
      },
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
          this.getCount()
        })
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$message({
          message:'已退出登录'
        })
        this.user.name=''
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
