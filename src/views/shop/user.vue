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
      <el-main style="padding: 20px 200px;min-height:800px ">
        <el-row>
          <el-col :span="4" :offset="2">
            <div style="width: 80%;border-radius: 6px ;display: block" >
              <el-card :body-style="{ padding: '0px' }">
                <el-image
                  :src="'https://s1.ax1x.com/2018/05/19/CcdVQP.png'"
                  style="width: 160px;margin-top: 20px;">
                </el-image>
                <h5>admin</h5>
                <ul class="la">
                  <a  @click="toUser"><li class="check">我的订单</li></a>
                  <a ><li @click="toUser"> 账号资料</li></a>
                  <a ><li>收货地址</li></a>
                </ul>
              </el-card>
            </div>
          </el-col>
          <el-col :span="16" style="border: 1px solid #d4d4d4;" >
            <el-row style="
            background: linear-gradient(#fbfbfb,#ececec);
            border-bottom: 1px solid #d4d4d4;
            border-radius: 8px 8px 0 0;
            box-shadow: 0 1px 7px rgba(0,0,0,.06);">
              <h3>个人信息</h3>
            </el-row>
            <el-row style="padding: 50px;text-align: left">
              <el-row>
                <el-col :span="2">昵称</el-col>
                <el-col :span="8" >{{userInfo.nickname}}</el-col>
               <!-- <el-col :span="4"><el-button icon="el-icon-edit" size="mini">编辑资料</el-button></el-col>-->
              </el-row>
              <el-row style="margin-top: 20px;">
                <el-col :span="2">头像</el-col>
                <el-col :span="8" >
                  <el-image
                    style="width: 100px;"
                    :fit="contain"
                    :src="this.userInfo.icon"></el-image>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;">
                <el-col :span="2">phone</el-col>
                <el-col :span="8" >
                  {{userInfo.username}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;">
                <el-col :span="2">邮箱</el-col>
                <el-col :span="8" >
                  {{userInfo.mail}}
                  <span v-if="userInfo.mail==null">暂无邮箱</span>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;">
                <el-col :span="2">性别</el-col>
                <el-col :span="8" >
                  {{userInfo.sex}}
                  <span v-if="userInfo.sex==null">未知</span>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;">
                <el-col :span="2">成长值</el-col>
                <el-col :span="8" >
                  {{userInfo.growth}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;">
                <el-col :span="2">积分</el-col>
                <el-col :span="8" >
                  {{userInfo.point}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;">
                <el-col :span="2">等级</el-col>
                <el-col :span="8" >
                  <span v-if="userInfo.levelId==1">普通会员</span>
                  <span v-if="userInfo.levelId==2">白银会员</span>
                  <span v-if="userInfo.levelId==3">黄金会员</span>
                  <span v-if="userInfo.levelId==4">钻石会员</span>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;">
                <el-col :span="2">余额</el-col>
                <el-col :span="4" >
                  {{userInfo.money}}
                </el-col>
                <el-col :span="4">
                  <el-button type="mini" @click="getMoney">充值</el-button>
                </el-col>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
      <el-footer style="">

      </el-footer>
    </el-container>

  </div>
</template>

<script>
  import {getMemberInfo} from "../../api/user";
  import Sticky from '@/components/Sticky'
  import {getCount} from "../../api/cart";  import {mapGetters} from "vuex";
  export default {
    name: "user",
    components: { Sticky },
    data(){
      return{
        userInfo:null,
        user:{},
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
    created() {
      this.getUser()
      this.getInfo()
      this.getCount()
    },
    methods:{
      getMoney(){
        this.$message({
          message:"哪来的钱？",
          type: 'warning'
        })
      },
      toProduct(){
        this.$router.push({path: '/product'})
      },
      toCart(){
        this.$router.push({path: '/cart'})
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
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$message({
          message:'已退出登录'
        })
        this.user.name=''
      },
      handleCommand(command){
        this.$router.push({path: '/'+command})
      },
      toHome(){
        this.$router.push({path: 'shop'})
      },
      getInfo(){
        getMemberInfo().then(res=>{
          this.userInfo = res.data
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
  .la li{
    position: relative;
    height: 48px;
    border-top: 1px solid #ebebeb;
    line-height: 48px;
    list-style:none;
  }
  .la {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .el-main {

    text-align: center;
  }
  .title{
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    font-size: 16px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0,0,0,.08);
  }
  .row{
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    height: 115px;
    text-align: center;
  }
</style>
