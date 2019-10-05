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
            <div>
              <el-row style="background-color:#eee;width: 100%;height: 50px;line-height:50px">
                <el-col :span="4">2019-10-02 18:21</el-col>
                <el-col :span="6">订单号： 157001167482755</el-col>
                <el-col :span="3">单价</el-col>
                <el-col :span="3">数量</el-col>
                <el-col :span="3">实付款</el-col>
                <el-col :span="3">订单状态</el-col>
                <el-col :span="2">操作</el-col>
              </el-row>
              <el-row >
                <el-col :span="4" style="padding: 20px;border: 1px">
                  <el-image
                    style="border: 1px solid #ebebeb;width: 100px;"
                    :fit="contain"
                    :src="'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-29/10-47-55/620-0ddcb075-13d2-4efa-aeb4-ac18c1b54780.jpg'"></el-image>
                </el-col>
                <el-col :span="6" style="line-height:50px">
                  <p>2010-16现代瑞纳扶手箱原装专用北京现代瑞奕中央手扶箱改装配件</p>
                </el-col>
                <el-col :span="3" style="line-height:144px">153RMB</el-col>
                <el-col :span="3" style="line-height:144px">1</el-col>
                <el-col :span="3" style="line-height:144px">153RMB</el-col>
                <el-col :span="3" style="line-height:144px">待发货</el-col>
                <el-col :span="2" style="padding: 5px;line-height: 40px">
                  <el-button size="mini" style="margin-left: 10px;">查看详情</el-button>
                  <el-button size="mini">删除订单</el-button>
                  <el-button size="mini">评论</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4" style="padding: 20px;border: 1px">
                  <el-image
                    style="border: 1px solid #ebebeb;width: 100px;"
                    :fit="contain"
                    :src="'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-29/10-47-55/620-0ddcb075-13d2-4efa-aeb4-ac18c1b54780.jpg'"></el-image>
                </el-col>
                <el-col :span="6" style="line-height:50px">
                  <p>2010-16现代瑞纳扶手箱原装专用北京现代瑞奕中央手扶箱改装配件</p>
                </el-col>
                <el-col :span="3" style="line-height:144px">153RMB</el-col>
                <el-col :span="3" style="line-height:144px">1</el-col>

              </el-row>
              <el-row>
                <el-col :span="4" style="padding: 20px;border: 1px">
                  <el-image
                    style="border: 1px solid #ebebeb;width: 100px;"
                    :fit="contain"
                    :src="'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-29/10-47-55/620-0ddcb075-13d2-4efa-aeb4-ac18c1b54780.jpg'"></el-image>
                </el-col>
                <el-col :span="6" style="line-height:50px">
                  <p>2010-16现代瑞纳扶手箱原装专用北京现代瑞奕中央手扶箱改装配件</p>
                </el-col>
                <el-col :span="3" style="line-height:144px">153RMB</el-col>
                <el-col :span="3" style="line-height:144px">1</el-col>
              </el-row>
              <el-row>
                <el-col :span="4" style="padding: 20px;border: 1px">
                  <el-image
                    style="border: 1px solid #ebebeb;width: 100px;"
                    :fit="contain"
                    :src="'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-29/10-47-55/620-0ddcb075-13d2-4efa-aeb4-ac18c1b54780.jpg'"></el-image>
                </el-col>
                <el-col :span="6" style="line-height:50px">
                  <p>2010-16现代瑞纳扶手箱原装专用北京现代瑞奕中央手扶箱改装配件</p>
                </el-col>
                <el-col :span="3" style="line-height:144px">153RMB</el-col>
                <el-col :span="3" style="line-height:144px">1</el-col>
              </el-row>
            </div>
            <div>
              <el-row style="background-color:#eee;width: 100%;height: 50px;line-height:50px">
                <el-col :span="4">2019-10-02 18:21</el-col>
                <el-col :span="6">订单号： 157001167482755</el-col>
                <el-col :span="3">单价</el-col>
                <el-col :span="3">数量</el-col>
                <el-col :span="3">实付款</el-col>
                <el-col :span="3">订单状态</el-col>
                <el-col :span="2">操作</el-col>
              </el-row>
              <el-row >
                <el-col :span="4" style="padding: 20px;border: 1px">
                  <el-image
                    style="border: 1px solid #ebebeb;width: 100px;"
                    :fit="contain"
                    :src="'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-29/10-47-55/620-0ddcb075-13d2-4efa-aeb4-ac18c1b54780.jpg'"></el-image>
                </el-col>
                <el-col :span="6" style="line-height:50px">
                  <p>2010-16现代瑞纳扶手箱原装专用北京现代瑞奕中央手扶箱改装配件</p>
                </el-col>
                <el-col :span="3" style="line-height:144px">153RMB</el-col>
                <el-col :span="3" style="line-height:144px">1</el-col>
                <el-col :span="3" style="line-height:144px">153RMB</el-col>
                <el-col :span="3" style="line-height:144px">待发货</el-col>
                <el-col :span="2" style="padding: 5px;line-height: 40px">
                  <el-button size="mini" style="margin-left: 10px;">查看详情</el-button>
                  <el-button size="mini">删除订单</el-button>
                  <el-button size="mini">评论</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4" style="padding: 20px;border: 1px">
                  <el-image
                    style="border: 1px solid #ebebeb;width: 100px;"
                    :fit="contain"
                    :src="'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-29/10-47-55/620-0ddcb075-13d2-4efa-aeb4-ac18c1b54780.jpg'"></el-image>
                </el-col>
                <el-col :span="6" style="line-height:50px">
                  <p>2010-16现代瑞纳扶手箱原装专用北京现代瑞奕中央手扶箱改装配件</p>
                </el-col>
                <el-col :span="3" style="line-height:144px">153RMB</el-col>
                <el-col :span="3" style="line-height:144px">1</el-col>

              </el-row>
            </div>
            <div style="border-top: 1px solid #d4d4d4;;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
            </div>
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
  import BackToTop from '@/components/BackToTop'
  import Sticky from '@/components/Sticky'
  // @ is an alias to /src
  export default {
    name: 'order',
    components: { Sticky },
    data () {
      return {
        currentDate: new Date(),
        url: ['https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-30/14-42-03/800-0868a1df-588e-4f30-8e53-7915f6f050fd.jpg',
          'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-30/14-45-30/185-f95b2efe-24e8-4de1-8a72-db65ffcd0ff6.png',],
        list: 'null',
        checkedAddress:null,
      }
    },
    methods: {
      search(){
        this.$message({
          message:"查询中"
        })
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
