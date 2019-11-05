<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
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
          <el-form-item label="订单id">
            <el-input style="width: 203px" placeholder="订单id" v-model="query.id" clearable/>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="query.status" placeholder="请选择" clearable>
              <el-option
                :label="'待付款'"
                :value="0">
              </el-option>
              <el-option
                :label="'待发货'"
                :value="1">
              </el-option>
              <el-option
                :label="'已发货'"
                :value="2">
              </el-option>
              <el-option
                :label="'已完成'"
                :value="3">
              </el-option>
              <el-option
                :label="'已取消'"
                :value="6">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-select v-model="query.payType" placeholder="请选择" clearable>
              <el-option
                :label="'网页支付'"
                :value="'网页支付'">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户id">
            <el-input style="width: 203px" placeholder="用户id" v-model="query.handleMan" clearable/>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div style="margin-top: 20px; ">
      <el-table
        ref="OrderTable"
        v-load="listLoading"
        :data="list"
        style= "width: 100%;"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column type = "selection"  align="center"></el-table-column>
        <el-table-column label="订单ID" align="center" >
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="用户id" align="center">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="订单金额" align="center">
          <template slot-scope="scope">{{scope.row.totalPrice}}</template>
        </el-table-column>
        <el-table-column label="支付方式" align="center" >
          <template slot-scope="scope">{{scope.row.payType | formatType}}</template>
        </el-table-column>
        <el-table-column label="订单状态" align="center" >
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">订单详情</el-button>
            <el-button v-if="scope.row.status==1" size = "mini" @click="delivery(scope.row.id)">订单发货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        style="float: right"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="query.pageSize"
        :page-sizes="[5,10]"
        :current-page.sync="query.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {orderList,delivery} from "../../api/order";
  import {formatDate} from '@/utils/date';

  const defaultQuery ={
    id:null,
    status:null,
    userId:null,
    payType:null,
    pageNum:1,
    pageSize:10
  }
  export default {
    name: "list",
    data(){
      return{
        query: Object.assign({},defaultQuery),
        list:[],
        total:null
      }
    },
    filters:{
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
          return '退货中'
        }
      },
      formatType(value){
        if (value==null){
          return '待支付'
        }
        if(value = "网页支付"){
          return '网页支付'
        }
      }
    },
    created(){
      this.getOrderList()
    },
    methods:{
      getOrderList(){
        orderList(this.query).then(res =>{
          this.list = res.data.list
          this.total = res.data.total
        })
      },
      delivery(id){
        delivery(id).then(res=>{
          this.getOrderList()
        })
      },
      detail(id){
        this.$router.push({path: 'orderDetail',query:{id:id}})
      },
      // 改变页面
      handleCurrentChange() {
        this.listLoading = true;
        this.getOrderList();
      },
      // 改变页面大小
      handleSizeChange(val) {
        this.query.pageNum = 1;
        this.query.pageSize = val;
        this.getOrderList();
      },
    }
  }
</script>

<style scoped>

</style>
