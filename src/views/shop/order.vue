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
                  <li class="check">我的订单</li>
                  <li>账号资料</li>
                  <li>收货地址</li>
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
              <h3>我的订单</h3>
            </el-row>
            <div v-for="(item,index) in order">
              <el-row style="background-color:#eee;width: 100%;height: 50px;line-height:50px">
                <el-col :span="4">{{item.createTime | formatCreateTime}}</el-col>
                <el-col :span="6">订单号： {{item.id}}</el-col>
                <el-col :span="3">单价</el-col>
                <el-col :span="3">数量</el-col>
                <el-col :span="3">实付款</el-col>
                <el-col :span="3">订单状态</el-col>
                <el-col :span="2">操作</el-col>
              </el-row>
              <el-row v-for="(it,index) in item.items">
                <el-col :span="4" style="padding: 20px;border: 1px">
                  <el-image
                    style="border: 1px solid #ebebeb;width: 100px;"
                    :fit="contain"
                    :src="it.pic"></el-image>
                </el-col>
                <el-col :span="6" style="line-height:50px">
                  <p>{{it.name}}</p>
                </el-col>
                <el-col :span="3" style="line-height:144px">￥{{it.price}}</el-col>
                <el-col :span="3" style="line-height:144px">{{it.num}}</el-col>
                <el-col :span="3" style="line-height:144px" v-if="index==0">￥{{item.totalPrice}}</el-col>
                <el-col :span="3" style="line-height:144px" v-if="index==0">
                  {{item.status | formatStatus}}
                </el-col>
                <el-col :span="3" style="line-height:144px" v-if="index!=0"></el-col>
                <el-col :span="2" style="padding: 5px;line-height: 40px" v-if="index==0">
                  <el-button size="mini" v-if="item.status!=1 && item.status!=2">删除订单</el-button>
                  <el-button size="mini" v-if="item.status==3">评论</el-button>
                  <el-button size="mini" v-if="item.status==3" @click="applyReturn(item.id)">申请退货</el-button>
                  <el-button size="mini" v-if="item.status==0">现在付款</el-button>
                  <el-button size="mini" @click="remind" v-if="item.status==1">催促发货</el-button>
                  <el-tag type="success" v-if="item.status==2" >已发货</el-tag>
                  <el-tag type="success" v-if="item.status==2" >请耐心等待</el-tag>
                  <el-tag type="danger" v-if="item.status==8" >申请退款中</el-tag>
                </el-col>
              </el-row>
            </div>

            <div style="border-top: 1px solid #d4d4d4;;">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync=pageNum
                :page-sizes="5"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total=total>
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-main>

      <el-footer>
        foot
      </el-footer>
    </el-container>
    <el-dialog
      title="申请退款"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      style="padding-top: 150px"
    >
      <el-form :model="orderReturn"  ref="product" label-width="100px" class="demo-product">
        <el-form-item label="退货理由">
          <el-input v-model="orderReturn.reason" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('orderReturn',)" style="float:right;">立即申请</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>

</template>

<script>
  import BackToTop from '@/components/BackToTop'
  import Sticky from '@/components/Sticky'
  import {getMemberOrder,applyReturn} from "../../api/order";
  import {formatDate} from '@/utils/date';
  // @ is an alias to /src
  export default {
    name: 'order',
    components: { Sticky },
    data () {
      return {
        currentDate: new Date(),
        list: 'null',
        checkedAddress:null,
        order:null,
        total:null,
        pageNum:1,
        dialogVisible: false,
        orderReturn:{
          orderId:null,
          reason:null
        },
      }
    },
    created(){
      this.getList()
    },
    filters:{
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStatus(value){
        if(value == 0){
          return '待付款'
        }
        if(value == 1){
          return '待发货'
        }
        if(value == 2){
          return '已发货'
        }
        if(value == 3){
          return '已完成'
        }
        if(value == 4){
          return '已关闭'
        }
        if(value == 5){
          return '无效订单'
        }
        if(value == 6){
          return '已取消'
        }
        if(value == 8){
          return '申请退货中'
        }
        if(value == 9){
          return '退货中'
        }
        if(value == 10){
          return '拒绝退货'
        }
        if(value == 11){
          return '已完成退货'
        }
      }
    },
    methods: {
      search(){
        this.$message({
          message:"查询中"
        })
      },
      getList(){
        getMemberOrder({pageNum:this.pageNum,pageSize:5}).then(res=>{
          this.order = res.data.list
          this.total = res.data.total
        })
      },
      handleCurrentChange(){
        this.getList()
      },
      remind(){
        this.$message({
          message:'已提醒商家尽快发货',
          type: 'success'
        })
      },
      applyReturn(id){
        this.dialogVisible = true
        this.orderReturn.orderId = id;
      },
      submitForm(formName){
        applyReturn(this.orderReturn).then(res=>{
          this.$message({
            message:'已发申请，等待确认',
            type:'success'
          })
          this.dialogVisible = false
          this.getList()
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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
  .check{
    background-color: #5edaff;
  }
  .la li:hover{
    background-color: #5edaff;
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
</style>
