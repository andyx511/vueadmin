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
              <el-link :underline="false" style="padding-right: 10%">全部商品</el-link>|

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
      <el-main >
        <el-row>
          <el-col :span="16" :offset="4">
            <el-row style="
            background: linear-gradient(#fbfbfb,#ececec);
            border: 1px solid #d4d4d4;
            border-radius: 8px 8px 0 0;
            box-shadow: 0 1px 7px rgba(0,0,0,.06);">
              <h3 style="text-align: center">确认付款</h3>
            </el-row>
            <el-row style="padding: 20px ; border: 1px solid #d4d4d4;">
             <el-row>
               <el-col :span="4">
                  商品信息
               </el-col>
               <el-col :span="8">
                 <div><p></p></div>
               </el-col>
               <el-col :span="6">
                 单价
               </el-col>
               <el-col :span="6">
                 数量
               </el-col>
             </el-row>
             <el-row style="margin-top: 20px;" v-for="(item,index) in order.items">
               <el-col :span="4">
                 <el-image
                   style="border: 1px solid #ebebeb;width: 150px;"
                   :fit="contain"
                   :src="item.pic"></el-image>
               </el-col>
               <el-col :span="7" >
                 {{item.name}}
               </el-col>
               <el-col :span="6" :offset="1">
                 {{item.price |numFilter}}
               </el-col>
               <el-col :span="6">
                 {{item.num}}
               </el-col>
             </el-row>
            </el-row>
            <el-row style="padding: 20px ; border: 1px solid #d4d4d4;">
              <el-row style="margin-top: 20px;">
                <el-col :span="4">
                  收件人
                </el-col>
                <el-col :span="8">
                  省市区
                </el-col>
                <el-col :span="6">
                  具体地址
                </el-col>
                <el-col :span="6">
                  联系电话
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;">
                <el-col :span="4">
                  {{order.receiverName}}
                </el-col>
                <el-col :span="8">
                  {{order.receiverProvince}}{{order.receiverCity}}{{order.receiverRegion}}
                </el-col>
                <el-col :span="6">
                  {{order.receiverDetailAddress}}
                </el-col>
                <el-col :span="6">
                  {{order.receiverPhone}}
                </el-col>
              </el-row>
            </el-row>
            <el-row style="
            background: linear-gradient(#ffffff,#ffffff);
            border: 1px solid #d4d4d4;
            border-radius:0 0 8px 8px ;
            box-shadow: 0 1px 7px rgba(0,0,0,.06);padding: 30px">
              <div style="float:left;">当前会员等级：{{member.growth | formatMember}}</div>
              <el-checkbox v-model="checked" v-if="member.point > 1000 && Math.floor(order.totalPrice*discount*100)/100>100" @click="userPoint" style="float:left;margin-left: 50px;">使用积分</el-checkbox>
              <div style="float:left;margin-left: 20px;">当前会员积分：{{member.point}}<span v-if="checked==true">-1000, 可抵扣100元</span></div>
              <h3 style="text-align: right">实付价：<span v-if="checked==true">{{Math.round(order.totalPrice*discount*100-10000)/100}}</span>
                <span v-if="checked==false">{{Math.round(order.totalPrice*discount*100)/100}}</span></h3>
              <el-button type="danger" style="float: right" @click="pay()">确认付款</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import {detail,pay} from "../../api/order"
  import Sticky from '@/components/Sticky'
  import {getCount} from "../../api/cart";
  import {mapGetters} from "vuex";
  import {info} from "../../api/member"
  export default {
    name: "pay",
    components: { Sticky },
    data(){
      return{
        id:null,
        order:null,
        count:null,
        user:{},
        member:'',
        checked:false,
        actualPrice:null,
        discount:null
      }
    },
    filters:{
      formatMember(value){
        if (value<10000){
          return '普通会员'
        }
        if(value>=10000&&value<50000){
          return '白银会员,可享受9折'
        }
        if(value>=50000&&value<100000){
          return '黄金会员，可享受8折'
        }
        if(value>=100000){
          return '钻石会员，可享受7折'
        }
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
      this.id = this.list = this.$route.query.id;
      this.getOrder()
      this.getCount()
      this.getUser()
      this.getMember()
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    },
    // watch:{
    //   actualPrice:function (newValue,oldValue) {
    //     var discount =
    //   }
    // },
    methods:{
      // userPoint(){
      //   if (this.checked==true){
      //     this.member.
      //   }
      // },
      getMember(){
        info().then(res=>{
          this.member = res.data
          if (this.member.growth<10000){
            this.discount = 1
          }
          if (this.member.growth>=10000 && this.member.growth<50000){
            this.discount = 0.9
          }
          if (this.member.growth>=50000 && this.member.growth<100000){
            this.discount = 0.8
          }
          if (this.member.growth>=100000){
            this.discount = 0.7
          }
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
      toHome(){
        this.$router.push({path: 'shop'})
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
      getOrder(){
        detail(this.id).then(res=>{
          this.order = res.data
        })
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$message({
          message:'已退出登录'
        })
        this.user.name=''
      },
      pay(){
        pay(this.id,{isUsePoint:this.checked}).then(res=>{
          this.$message({
            message:"支付成功",
            type:'success'
          })
          this.$router.push({path: 'order'})
        })
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
