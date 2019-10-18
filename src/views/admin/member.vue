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
          <el-form-item label="会员id">
            <el-input style="width: 203px" placeholder="会员id" v-model="query.memberId" clearable/>
          </el-form-item>
          <el-form-item label="会员昵称">
            <el-input style="width: 203px" placeholder="会员昵称" v-model="query.memberName" clearable/>
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
        <el-table-column label="用户ID" align="center" >
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="mail" align="center">
          <template slot-scope="scope">{{scope.row.mail | formatMail}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" >
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="成长值" align="center" >
          <template slot-scope="scope">{{scope.row.growth }}</template>
        </el-table-column>
        <el-table-column label="积分" align="center" >
          <template slot-scope="scope">{{scope.row.point }}</template>
        </el-table-column>
        <el-table-column label="会员等级" align="center" >
          <template slot-scope="scope">{{scope.row.levelId | formatLv}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" >
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==0" type="primary" size="mini" @click="dong(scope.row.userId)">冻结</el-button>
            <el-button v-if="scope.row.status==1" size = "mini" @click="jie(scope.row.userId)">解冻</el-button>
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
  import {getMemberList, dong, jie} from "../../api/member";
  import {formatDate} from '@/utils/date';

  const defaultQuery ={
    memberId:null,
    memberName:null,
    pageNum:1,
    pageSize:10
  }
  export default {
    name: "member",
    data(){
      return{
        query: Object.assign({},defaultQuery),
        list:[],
        total:null
      }
    },
    filters:{
      formatMail(value){
        if (value == null){
          return '暂无'
        }else {
          return value
        }
      },
      formatStatus(value){
        if (value==0){
          return '正常'
        }
        if (value ==1){
          return '冻结'
        }
      },
      formatCreateTime(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatLv(value){
        if(value == 1){
          return '普通会员'
        }
        if(value == 2){
          return '白银会员'
        }
        if(value == 3){
          return '黄金会员'
        }
        if(value == 4){
          return '钻石会员'
        }
      }
    },
    created(){
      this.getList()
    },
    methods:{
      reSet(){
        this.query = Object.assign({},defaultQuery)
      },
      search(){
        this.query.pageNum = 1
        this.getList()
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
      getList(){
        getMemberList(this.query).then(res=>{
          this.list = res.data.list
          this.total = res.data.total
        })
      },
      dong(id){
        dong({memberId:id}).then(res=>{
          this.getList()
        })
      },
      jie(id){
        jie({memberId:id}).then(res=>{
          this.getList()
        })
      }
    }
  }
</script>

<style scoped>

</style>
