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
      <el-main>
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
              <h3>收货地址</h3>
              <el-button
                @click="add"
              style="float: right" type="primary">
                <i class="el-icon-plus"></i>
              </el-button>
            </el-row>
            <el-row class="title">
              <el-col :span="5">姓名</el-col>
              <el-col :span="5">详细地址</el-col>
              <el-col :span="5">电话</el-col>
              <el-col :span="5"> 是否为默认地址 </el-col>
              <el-col :span="4">操作</el-col>
            </el-row>
            <el-row class="row" v-for="item in 15">
              <el-col :span="5">倪定波</el-col>
              <el-col :span="5">浙江省杭州市萧山区临浦镇横一村（梅里）49号</el-col>
              <el-col :span="5">18257198895</el-col>
              <el-col :span="5"> （默认地址） </el-col>
              <el-col :span="4">
                <el-button><i class="el-icon-edit"></i></el-button>
                <el-button type="danger"><i class="el-icon-delete"></i></el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>

      </el-footer>
    </el-container>
    <el-dialog
      title="新增地址"
      width="40%"
      :visible.sync="addDig"
    >
      <addressAdd @mm="closeAdd"></addressAdd>
    </el-dialog>
  </div>
</template>

<script>
  import addressAdd from "./components/addressAdd";
  import {getAddressList} from "../../api/address";

  export default {
    name: "addressList",
    components:{addressAdd},
    data(){
      return {
        addDig: false,
        addressList:[]
      }
    },
    created(){
      this.getAddressList()
    },
    methods:{
      toUser(){
        this.$message({
          message:"sdasd"
        })
        this.$router.push({path:'/user'})
      },
      add(){
        this.addDig = true
      },
      getAddressList(){
        getAddressList().then(res=>{
          this.addressList = res.data
        })
      },
      closeAdd(){
        this.addDig=false
        this.getAddressList()
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
