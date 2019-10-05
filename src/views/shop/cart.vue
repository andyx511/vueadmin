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
        <el-row >
          <el-col :span="16" :offset="4" style="
            background: linear-gradient(#fbfbfb,#ececec);
            border: 1px solid #d4d4d4;
            border-radius: 8px 8px 0 0;
            box-shadow: 0 1px 7px rgba(0,0,0,.06);margin-top: 20px;">
            <h3>预购清单</h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-table
              ref="CartTable"
              v-load="listLoading"
              :data="cartList"
              style= "width: 100%;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type = "selection"  align="center"></el-table-column>
              <el-table-column label="全选" align="center" width="50px">
                <template slot-scope="scope">{{scope.row.name}}</template>
              </el-table-column>
              <el-table-column label="" align="center" >
                <template slot-scope="scope">{{scope.row.pic}}</template>
              </el-table-column>
              <el-table-column label="" align="center" >
                <template slot-scope="scope">{{scope.row.pic}}</template>
              </el-table-column>
              <el-table-column label="单价" align="center" >
                <template slot-scope="scope">{{scope.row.price}}</template>
              </el-table-column>
              <el-table-column label="数量" align="center" >
                <template slot-scope="scope">{{scope.row.num}}</template>
              </el-table-column>
              <el-table-column label="小计" align="center" >
                <template slot-scope="scope">{{scope.row.num*scope.row.price}}</template>
              </el-table-column>
              <el-table-column label="操作" align="center" >
                <template slot-scope="scope">{{scope.row.pic}}</template>
              </el-table-column>
            </el-table>
            <el-card>
              <el-row>
                <el-col :span="2">
                  <el-button>删除所选</el-button>
                </el-col>
                <el-col :span="4" :offset="12">
                  <el-row>共选择5件商品</el-row>
                  <el-row>共5件商品</el-row>
                </el-col>
                <el-col :span="3">
                  应付金额：￥1333
                </el-col>
                <el-col :span="3">
                  <el-button type="danger" @click="this.$router.push({path: '/address'})">立即结算</el-button>
                </el-col>
              </el-row>


            </el-card>

          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        foot
      </el-footer>
    </el-container>
  </div>

</template>

<script>

  import Sticky from '@/components/Sticky'
  // @ is an alias to /src
  export default {
    name: 'cart',
    components: { Sticky},
    data () {
      return {
        cartList:[
          {
            name:1,
            pic:'sadasdsadasdsa',
            price:153,
            num:2
          },
          {
            name:2,
            pic:'sadadqwsasdfvnhbgvcdsd',
            price:153,
            num:6
          }

        ],
        multipleSelection: [],
      }
    },
    methods: {
      search(){
        this.$message({
          message:"查询中"
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        this.$message({
          message:this.multipleSelection
        })
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
  .la{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>
