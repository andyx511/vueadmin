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
      <el-main>

      </el-main>
      <el-footer>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Sticky from '@/components/Sticky'
  export default {
    name: "demo",
    components: { Sticky },
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #000000;
    color: #333;

    line-height: 60px;
  }
</style>
