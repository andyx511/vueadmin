<template>
  <el-container>
    <hello-world></hello-world>
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
          <el-input style="margin-left: 25px;margin-top: 25px;width: 80%;" placeholder="请输入内容">
            <i slot="prefix"class="el-input__icon el-icon-search is-clickable" style="margin-right: 5px;" ></i>
          </el-input>
          <el-button style="margin-left: -5px;width: 80px;" icon="el-icon-search" type="danger"></el-button>
        </el-col>
        <el-col :span="3" style="padding-top: 25px; font-size: 28px;">
          <el-link :underline="false" style="padding-right: 10%">全部商品</el-link>|

        </el-col>
        <el-col :span="5" style="padding-top: 35px">
          <el-link type="info" :underline="false"><i class="el-icon-user" style="font-size: 30px;margin-right: 50px;"></i></el-link>
          <el-badge :value="12" class="item" >
            <el-link type="info" :underline="false"><i class="el-icon-shopping-cart-1" style="font-size: 30px;"></i></el-link>
          </el-badge>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding: 20px 200px">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-carousel indicator-position="outside" >
            <el-carousel-item v-for="item in 2" :key="item" >
              <el-image
                style="width: 100%; height: 100%"
                :src="url[item-1]"
                :fit="fit"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16" :offset="4" style="background-color: #f3f3f3 ;padding-left: 5px" align="left	">
          <h4>精品推荐</h4>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="4">
          <el-card shadow="hover">
            <el-image
            :src="'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-29/14-57-53/894-65cbd157-7502-4e75-8f9b-bf7940dafac1.jpg'">

            </el-image>
            <el-row >
              <el-col :span="9" style="font-size: 22px;color: red">¥248.00</el-col>
              <el-col :span="8" :offset="7" style="font-size: 14px;color: #888">17人已购</el-col>
            </el-row>
            <el-row style="margin-top: 5px;">
              <el-col style="align:right; font-size: 12px;">博世刹车油DOT4制动液刹车液 BOSCH 汽车离合器油配件通用型1L</el-col>
            </el-row>
          </el-card>
        </el-col>

      </el-row>


    </el-main>
    <el-footer>
      foot
    </el-footer>
  </el-container>
</template>

<script>
  // @ is an alias to /src
  export default {
    name: 'index',
    data () {
      return {
        currentDate: new Date(),
        url: ['https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-30/14-42-03/800-0868a1df-588e-4f30-8e53-7915f6f050fd.jpg',
          'https://alex-1300169762.cos.ap-chengdu.myqcloud.com/MALL/2019-09-30/14-45-30/185-f95b2efe-24e8-4de1-8a72-db65ffcd0ff6.png',],
        list: 'null'
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
</style>
