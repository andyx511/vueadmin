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
      <el-main style="padding: 20px 400px">
        <div class="searchBar">
          <el-card class="filter-container" shadow="never" style="width: 1097px;height: 231px;">
            <div>
              <i class="el-icon-search" style="float:left;" />
              <span style="float:left;">筛选搜索</span>
              <el-button
                style="float: right"
                type="primary"
                size="small"
                @click="search"
              >
                查询结果
              </el-button>
              <el-button
                style="float: right;margin-right: 15px"
                size="small"
                @click="reSet"
              >
                重置
              </el-button>
            </div>
            <div style="margin-top: 15px">
              <el-form size="small" label-width="140px" :inline="true">
                <el-row></el-row>
                <el-form-item label="商品名称" style="float:left;">
                  <el-input style="width: 203px;float:left;" placeholder="商品名称" v-model="query.name" clearable/>
                </el-form-item>
                <el-form-item label="商品品牌" style="float:left;width: 40%;">
                  <el-select v-model="query.brand" placeholder="请选择" clearable style="float:left;">
                    <el-option
                      v-for="item in brandList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品种类" style="float:left;">
                  <el-select v-model="query.kind" placeholder="请选择" clearable style="float:left;">
                    <el-option
                      v-for="item in kindList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="价格" style="float:left;">
                  <div class="block" style="width: 800px">
                    <el-slider
                      v-model="price"
                      style="width: 80%;float:left;"
                      range
                      show-input="true"
                      :max="1000"
                      :marks="marks">
                    </el-slider>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-card>

        </div>
        <div class="product" style="width: 1099px;height: 634px;">
          <el-row>
            <div v-if="productList.length==0">
              暂时还找不到你所希望的产品
            </div>
            <el-col :span="6" v-for="(item,index) in productList">
              <a @click="productDetail(item.id)">
                <div class="card">
                  <el-image
                    :src="item.pic"
                    style="width: 230px;height: 230px;">
                  </el-image>
                  <el-row >
                    <el-col :span="9" style="font-size: 22px;color: red">￥{{item.price}}.00</el-col>
                    <el-col :span="8" :offset="7" style="font-size: 14px;color: #888">{{item.salesVolume}}人已购</el-col>
                  </el-row>
                  <el-row style="margin-top: 5px; text-align: left">
                    <el-col style="align:right; font-size: 12px;">{{item.name}}</el-col>
                  </el-row>
                </div>
              </a>
            </el-col>
          </el-row>
        </div>
        <div class="page">
          <el-pagination
            style="float:right;"
            :page-size="8"
            layout="prev, pager, next"
            :total=total
            :current-page.sync="query.pageNum"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-main>
      <el-footer>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import {getProductList} from "../../api/product";
  import {getList} from "../../api/brand"
  import  {getKindList} from "../../api/kind";
  import Sticky from '@/components/Sticky'

  const defaultQuery ={
    kind:null,
    brand:null,
    name:null,
    minPrice:null,
    maxPrice:null,
    pageNum:1,
    pageSize:8,
    status:1
  }
  export default {
    name: "product",
    components: { Sticky },
    data(){
      return{
        query: Object.assign({},defaultQuery),
        marks:{
          0: '0￥',
          100: '100￥',
          200: '200￥',
          300: '300￥',
          400: '400￥',
          500: '500￥',
          600: '600￥',
          700: '700￥',
          800: '800￥',
          900: '900￥',
          1000: '1000￥',
        },
        kindList:[],
        brandList: [],
        price:[0,1000],
        productList: '',
        total:'',
      }
    },
    created() {
      this.getList();
      this.getKindList();
      this.getBrandList();
    },
    methods:{
      getKindList(){
        getKindList({pageNum:1,pageSize:100}).then(response =>{
          let kindList = response.data.list;
          for (let i = 0;i<kindList.length;i++){
            this.kindList.push({label:kindList[i].name,value:kindList[i].name});
          }
        })
      },
      getBrandList(){
        getList({pageNum:1,pageSize:100}).then(response =>{
          let brandList = response.data.list;
          for (let i = 0;i<brandList.length;i++){
            this.brandList.push({label:brandList[i].name,value:brandList[i].name});
          }
        })
      },
      reSet(){
        this.query = Object.assign({},defaultQuery)
        this.price = [0,1000]
      },
      search(){
        this.query.pageNum = 1
        this.query.minPrice = this.price[0]
        this.query.maxPrice = this.price[1]
        this.getList()
      },
      getList(){
        this.listLoading = true
        getProductList(this.query).then(response =>{
          this.listLoading = false;
          this.productList = response.data.list;
          this.total = response.data.total;
        })
      },
      handleCurrentChange() {
        this.listLoading = true;
        this.getList();
      },
      productDetail(data){
        this.$router.push({path: 'productDetail',query:{id:data}})
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
  .brand{

  }
  .brand:hover{

  }
  .searchBar{

  }
  .brand  li{
    display: inline;
    margin-left:15px
  }
  .brand li:hover{
    color: #ff4f3f;
  }
  .card{
    padding: 20px;
  }
  .card:hover{
    -moz-box-shadow:2px 2px 5px #333333; -webkit-box-shadow:2px 2px 5px #333333; box-shadow:2px 2px 5px #dddddd;
  }
</style>
