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
            <el-row class="row" v-for="(item,index) in addressList">
              <el-col :span="5">{{item.receiverName}}</el-col>
              <el-col :span="5">{{item.province}}{{item.city}}{{item.region}}{{item.detailAddress}}</el-col>
              <el-col :span="5">{{item.receiverPhone}}</el-col>
              <el-col :span="5" v-if="item.isDefault=='true'">（默认地址） </el-col>
              <el-col :span="5" v-if="item.isDefault=='false'"> <el-button @click="chooseDef(item.id)">设为默认地址</el-button> </el-col>
              <el-col :span="4">
                <el-button @click="editAddress(item)"><i class="el-icon-edit"></i></el-button>
                <el-button type="danger" @click="deleteAddress(item.id)"><i class="el-icon-delete"></i></el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
      <el-footer style="height: 160px;">
        <el-row>
          <div class="p">关于我们</div>
          <div class="p">法律声明</div>
          <div class="p">技术选型</div>
          <div class="h">自助服务</div>
          <div class="h">服务支持</div>
          <div class="h">自助服务</div>
        </el-row>
        <el-row>
          <div class="p1">联系我们</div>
          <div class="p1">啦啦啦</div>
          <div class="p1">IDEA </div>
          <div class="p1">Spring Boot</div>
          <div class="p1">Spring Task</div>
          <div class="p1">OSS</div>
        </el-row>
        <el-row>
          <div class="h">关于我们</div>
          <div class="h">啦啦啦</div>
          <div class="p1">MySQL </div>
          <div class="p1">Spring Cloud</div>
          <div class="p1">Spring Security</div>
          <div class="h">自助服务</div>
        </el-row>
        <el-row>
          <div class="h">关于我们</div>
          <div class="h">法律声明</div>
          <div class="p1">MyBatis</div>
          <div class="p1">Vue</div>
          <div class="p1">Redis</div>
          <div class="h">自助服务</div>
        </el-row>
        <el-row>
          <div class="h">关于我们</div>
          <div class="h">法律声明</div>
          <div class="p1"> </div>
          <div class="h">自助服务</div>
          <div class="h">服务支持</div>
          <div class="h">自助服务</div>
        </el-row>
      </el-footer>
    </el-container>
    <el-dialog
      title="新增地址"
      width="40%"
      :visible.sync="addDig"
    >
      <addressAdd @mm="closeAdd"></addressAdd>
    </el-dialog>
    <el-dialog
      title="编辑地址"
      width="40%"
      :visible.sync="editDig"
    >
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
              <el-checkbox value="1"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="float:right;">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import addressAdd from "./components/addressAdd";
  import addressEdit from "./components/addressEdit"
  import {getAddressList,editAddress,detail,deleteAddress} from "../../api/address";
  import {getCount} from "../../api/cart";
  import {mapGetters} from "vuex";

  export default {
    name: "addressList",
    components:{addressEdit, addressAdd},
    data(){
      return {
        addDig: false,
        editDig: false,
        addressList:[],
        addressId:null,
        count:null,
        form:{
          receiverName:null,
          province:null,
          city:null,
          region:null,
          detailAddress:null,
          receiverPhone:null,
          isDefault:false
        },
        user:{},
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
      this.getAddressList()
      this.getCount()
      this.getUser()
    },
    methods:{
      getUser() {
        this.user = {
          name: this.name,
          role: this.roles.join(' | '),
          avatar: this.avatar
        }
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$message({
          message:'已退出登录'
        })
        this.user.name=''
      },
      getCount(){
        getCount().then(res=>{
          this.count = res.data
        })
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
      },
      chooseDef(id){
        let address={
          id:id,
          isDefault:true
        }
        editAddress(address).then(res=>{
          this.getAddressList()
        })
      },
      editAddress(data){
        this.editDig = true
        detail(data.id).then(res=>{
          this.form = res.data
        })
      },
      onSubmit(){
        editAddress(this.form).then(res=>{
          this.editDig=false
          this.getAddressList();
        })
      },
      deleteAddress(id){
        this.$confirm('确定删除该地址吗？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          deleteAddress(id).then(res=>{
            this.getAddressList()
          })
        })

      }
    }
  }
</script>

<style scoped>
  .p{
    width: 150px;
    float: left;
    margin-left: 20px;
    font-size: 12px;
    padding-bottom: 2px;
  }
  .p1{
    width: 150px;
    margin-top: 15px;
    float: left;
    margin-left: 20px;
    font-size: 12px;
    color: #9aaabf;
  }
  .h{
    width: 150px;
    float: left;
    margin-left: 20px;
    font-size: 12px;
    padding-bottom: 2px;
    color: #000000;
  }
  .el-header{
    background-color: #000000;
    color: #333;
    line-height: 60px;
  }
  .el-footer {
    padding-top: 30px;
    background-color: #000000;
    color: #333;
    padding-left: 22%;
    padding-right: 22% ;
    color: #ffffff;
    height: 200px;
    margin-top: 800px;
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
