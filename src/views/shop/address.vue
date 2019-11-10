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
                        :src="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'"
                        :fit="contain"
                        style="border-radius: 5px">
                      </el-image>
                      <div style="text-align:center;">admin</div>
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
      <el-main>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-row style="
            background: linear-gradient(#fbfbfb,#ececec);
            border: 1px solid #d4d4d4;
            border-radius: 8px 8px 0 0;
            box-shadow: 0 1px 7px rgba(0,0,0,.06);">
              <h3 style="text-align: center">收货地址选择</h3>
            </el-row>
            <el-row style="padding: 20px ; border: 1px solid #d4d4d4;">
              <el-col :span="5" :offset="1" v-for="(item,index) in addressList " >
                <el-card
                  @click.native="checkAddress(index,item)"
                  style="margin-top: 20px;width: 247px;height: 276px"
                  :class="{'checked':index == checked}">
                  <h4>{{item.province}}{{item.city}}({{item.receiverName}}）收</h4>
                  <el-divider></el-divider>
                  <p>{{item.province}}{{item.city}}{{item.region}}</p>
                  <p>{{item.detailAddress}}</p>
                  <p>{{item.receiverPhone}} <!--<a v-show="index==checked" style="color:#ff5d65;font-size: 14px">设为默认地址</a>--></p>
                  <!--<el-button size="mini"> 修改</el-button>
                  <el-button size="mini" type="danger"> 删除</el-button>-->
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="16" :offset="4" >
            <el-button type="danger" style="float:right;padding-top: 20px" @click="confirmOrder">确认订单</el-button>
          </el-col>
          <!--<el-col :span="16" :offset="4">
            <el-row style="
             margin-top: 20px;;
            background: linear-gradient(#fbfbfb,#ececec);
            border: 1px solid #d4d4d4;
            border-radius: 8px 8px 0 0;
            box-shadow: 0 1px 7px rgba(0,0,0,.06);">
              <h3 style="text-align: center">预购清单</h3>
            </el-row>


          </el-col>-->
        </el-row>
      </el-main>
      <el-footer>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import {getAddressList} from "../../api/address";
  import {chooseAddress} from "../../api/order";
  import {getCount} from "../../api/cart";

  export default {
    name: "address",
    data(){
      return{
        id:null,
        checked:0,
        addressList:[],
        checkedAddress:null,
        count:null
      }
    },
    created() {
      this.id = this.list = this.$route.query.id;
      this.getList()
      this.getCount()
    },
    methods:{
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$message({
          message:'已退出登录'
        })
        this.user.name=''
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

      toHome(){
        this.$router.push({path: 'shop'})
      },
      checkAddress(index,item){
        this.checked = index
        this.checkedAddress = item.id
      },
      getList(){
        getAddressList().then(res=>{
          this.addressList = res.data
          this.checkedAddress = res.data[0].id
        })
      },
      getCount(){
        getCount().then(res=>{
          this.count = res.data
        })
      },
      confirmOrder(){
        let address = {
          addressId:this.checkedAddress
        }
        chooseAddress(address,this.id).then(res=>{
          this.$router.push({path: 'pay',query:{id:this.id}})
        })
      },
      getCount(){
        getCount().then(res=>{
          this.count = res.data
        })
      },
    }
  }
</script>

<style scoped>
  .checked{
    border: 1px dashed #d45e49;
    background-color: #F2F6FC;
  }
.address{
  background-color: #ffa544;
}
.address:hover{
  background-color: #fff;
}
.el-header, .el-footer {
  background-color: #000000;
  color: #333;

  line-height: 60px;
}
</style>
