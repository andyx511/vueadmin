<template>
  <div class="detail-container">

    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-top: 20px">
        <el-icon class="el-icon-collection-tag" style="color: #606266"></el-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">订单编号</el-col>
          <el-col :span="4" class="table-cell-title">用户编号</el-col>
          <el-col :span="4" class="table-cell-title">支付方式</el-col>
          <el-col :span="4" class="table-cell-title">订单来源</el-col>
          <el-col :span="4" class="table-cell-title">订单类型</el-col>
          <el-col :span="4" class="table-cell-title">配送方式</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.id}}</el-col>
          <el-col :span="4" class="table-cell">{{order.userId}}</el-col>
          <el-col :span="4" class="table-cell">{{order.payType}}</el-col>
          <el-col :span="4" class="table-cell">网站</el-col>
          <el-col :span="4" class="table-cell">正常订单</el-col>
          <el-col :span="4" class="table-cell">快递</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">物流公司</el-col>
          <el-col :span="4" class="table-cell-title">自动确认收货时间</el-col>
          <el-col :span="4" class="table-cell-title">订单可得积分</el-col>
          <el-col :span="4" class="table-cell-title">订单可得成长值</el-col>

        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.deliveryCompany | formatCompany}}</el-col>
          <el-col :span="4" class="table-cell">15天</el-col>
          <el-col :span="4" class="table-cell">{{order.point}}</el-col>
          <el-col :span="4" class="table-cell">{{order.growth}}</el-col>

        </el-row>
      </div>
      <div style="margin-top: 20px">
        <el-icon class="el-icon-collection-tag" style="color: #606266"></el-icon>
        <span class="font-small">收货人信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">收件人</el-col>
          <el-col :span="6" class="table-cell-title">联系电话</el-col>
          <el-col :span="6" class="table-cell-title">省市区</el-col>
          <el-col :span="6" class="table-cell-title">详细地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{order.receiverName}}</el-col>
          <el-col :span="6" class="table-cell">{{order.receiverPhone}}</el-col>
          <el-col :span="6" class="table-cell">{{order.receiverProvince}} {{order.receiverCity}} {{order.receiverRegion}}</el-col>
          <el-col :span="6" class="table-cell">{{order.receiverDetailAddress}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <el-icon class="el-icon-collection-tag" style="color: #606266"></el-icon>
        <span class="font-small">商品信息</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="order.items"
        style="width: 100%;margin-top: 20px" border>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" style="height: 80px">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="120" align="center">
          <template slot-scope="scope">
            <p>￥{{scope.row.price}}</p>

          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.num}}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            ￥{{scope.row.price*scope.row.num}}
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-icon class="el-icon-collection-tag" style="color: #606266"></el-icon>
        <span class="font-small">费用信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">会员折扣</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{order.totalPrice}}</el-col>
          <el-col :span="6" class="table-cell">￥0</el-col>
          <el-col :span="6" class="table-cell">8折</el-col>
          <el-col :span="6" class="table-cell">￥100</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{order.totalPrice}}</el-col>
          <el-col :span="6" class="table-cell">￥{{order.totalPrice}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <el-icon class="el-icon-collection-tag" style="color: #606266"></el-icon>
        <span class="font-small">退货信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">用户名</el-col>
          <el-col :span="6" class="table-cell-title">订单id</el-col>
          <el-col :span="6" class="table-cell-title">申请时间</el-col>
          <el-col :span="6" class="table-cell-title">理由</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{returnOrder.userName}}</el-col>
          <el-col :span="6" class="table-cell">{{returnOrder.orderId}}</el-col>
          <el-col :span="6" class="table-cell">{{returnOrder.applyTime | formatCreateTime}}</el-col>
          <el-col :span="6" class="table-cell">{{returnOrder.reason}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">处理人</el-col>
          <el-col :span="6" class="table-cell-title">处理时间</el-col>
          <el-col :span="6" class="table-cell-title">备注</el-col>
          <el-col :span="6" class="table-cell-title">状态</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{returnOrder.handleMan | formatHandleMan}}</el-col>
          <el-col :span="6" class="table-cell">{{returnOrder.handleTime | formatCreateTime}}</el-col>
          <el-col :span="6" class="table-cell">{{returnOrder.handleNote | formatHandleMan}}</el-col>
          <el-col :span="6" class="table-cell">{{returnOrder.applyStatus | formatReturnStatus}}</el-col>
        </el-row>
      </div>
      <div class="table-layout" v-if="returnOrder.applyStatus==0">
        <el-row>
          <el-col :span="6" style="border-right: 1px solid #DCDFE6;
              border-bottom: 1px solid #DCDFE6;
              padding: 21px;
              background: #F2F6FC;
              text-align: center;
              font-size: 14px;
              color: #303133;">备注</el-col>
          <el-col :span="18" class="table-cell"><el-input v-model="returnOrder.handleNote"></el-input></el-col>
        </el-row>
        <el-row style="text-align: center;margin-top: 10px" >
          <el-button @click="querentui">确认退货</el-button>
          <el-button type="danger" @click="jujue">拒绝退货</el-button>
        </el-row>
      </div>
      <div class="table-layout" v-if="returnOrder.applyStatus==1">
        <el-row style="text-align: center;margin-top: 10px" >
          <el-button @click="querenshou">确认收货</el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {detail,returnDetail,querentui,jujue,querenshou} from "../../api/order";
  import {formatDate} from '@/utils/date';
  export default {
    name: "returnDetail",
    filters:{
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatHandleMan(value){
        if (value=='' || value==null){
          return '暂无'
        }else {
          return value
        }
      },
      formatReturnStatus(value){
        if (value==0){
          return '待处理'
        }
        if (value==1){
          return '退货中'
        }
        if (value==2){
          return '已完成'
        }
        if (value==3){
          return '已拒绝'
        }
      },
      formatStatus(value){
        if (value==0){
          return '待付款'
        }
        if(value==1){
          return '待发货'
        }
        if(value==2){
          return '已发货'
        }
        if(value==3){
          return '已完成'
        }
        if(value==6){
          return '已取消'
        }
        if(value==8){
          return '已完成'
        }
      },
      formatCompany(value){
        if(value==null){
          return '暂无快递公司'
        }else {
          return value
        }
      }
    },
    data(){
      return{
        id:null,
        order:null,
        returnOrder:null
      }
    },
    created() {
      this.id =  this.$route.query.id;
      this.getDetail()
    },
    methods:{
      getDetail(){
        detail(this.id).then(res=>{
          this.order = res.data
        })
        returnDetail(this.id).then(res=>{
          this.returnOrder = res.data
        })
      },
      querentui(){
        querentui(this.returnOrder).then(res=>{
          this.getDetail()
        })
      },
      jujue(){
        jujue(this.returnOrder).then(res=>{
          this.getDetail()
        })
      },
      querenshou(){
        querenshou(this.returnOrder).then(res=>{
          this.getDetail()
        })
      },
    }
  }
</script>

<style scoped>
  .detail-container {
    width: 80%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
  }

  .operate-container {
    background: #F2F6FC;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
  }

  .operate-button-container {
    float: right;
    margin-right: 20px
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>
