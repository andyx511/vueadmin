<template>
  <div class="app-container">
    <!--搜索栏-->
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
      <div style="margin-top: 25px">
        <el-form size="small" label-width="140px" :inline="true">
          <el-form-item label="退单ID">
            <el-input style="width: 203px" placeholder="订单id" v-model="query.id" clearable/>
          </el-form-item>
          <el-form-item label="处理人">
            <el-input style="width: 203px" placeholder="订单id" v-model="query.handleMan" clearable/>
          </el-form-item>
          <el-form-item label="处理状态">
            <el-select v-model="query.status" placeholder="请选择" clearable>
              <el-option
                :label="'待处理'"
                :value="'0'">
              </el-option>
              <el-option
                :label="'退货中'"
                :value="'1'">
              </el-option>
              <el-option
                :label="'已完成'"
                :value="'2'">
              </el-option>
              <el-option
                :label="'已拒绝'"
                :value="'3'">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期范围">
            <el-date-picker
              v-model="date"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!--表格-->
    <div style="margin-top: 20px; ">
      <el-table
        ref="OrderTable"
        v-load="listLoading"
        :data="list"
        style= "width: 100%;"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column type = "selection"  align="center"></el-table-column>
        <el-table-column label="退货ID" align="center" >
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="订单ID" align="center" >
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.applyTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="处理人" align="center">
          <template slot-scope="scope">{{scope.row.handleMan | formatHandleMan}}</template>
        </el-table-column>
        <el-table-column label="订单金额" align="center">
          <template slot-scope="scope">{{scope.row.returnMoney}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center" >
          <template slot-scope="scope">{{scope.row.applyStatus | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="detail(scope.row.orderId)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '@/utils/date';
  import {orderReturn} from "../../api/order";
  const defaultQuery ={
    id:null,
    status:null,
    handleMan:null,
    startDt:null,
    endDt:null,
    pageNum:1,
    pageSize:10
  }
  export default {
    name: "returnList",
    filters:{
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatHandleMan(value){
        if (value==null || value==''){
          return '暂无'
        }
      },
      formatStatus(value){
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
      }
    },
    data(){
      return{
        query: Object.assign({},defaultQuery),
        list:[],
        total:null,
        date:'',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        orderReturn(this.query).then(res=>{
          this.list = res.data.list
          this.total = res.data.total
        })
      },
      detail(id){
        this.$router.push({path: 'returnDetail',query:{id:id}})
      }
    }
  }
</script>

<style scoped>

</style>
