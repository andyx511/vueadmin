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
          <el-form-item label="用户id">
            <el-input style="width: 203px" placeholder="用户id" v-model="query.memberId" clearable/>
          </el-form-item>
          <el-form-item label="账户">
            <el-input style="width: 203px" placeholder="账户" v-model="query.name" clearable/>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input style="width: 203px" placeholder="用户昵称" v-model="query.memberName" clearable/>
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
        <el-table-column label="账户" align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="昵称" align="center" >
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="图标" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="mail" align="center">
          <template slot-scope="scope">{{scope.row.mail | formatMail}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" >
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="上次登录时间" align="center" >
          <template slot-scope="scope">{{scope.row.growth }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center" >
          <template slot-scope="scope">{{scope.row.point }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" >
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==0" type="primary" size="mini" @click="dong(scope.row.userId)">冻结</el-button>
            <el-button v-if="scope.row.status==1" size = "mini" @click="jie(scope.row.userId)">解冻</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import

  const defaultQuery ={
    id:null,
    name:null,
    nickname:null,
    pageNum:1,
    pageSize:10
  }
  export default {
    name: "list",
    data(){
      return {
        query: Object.assign({},defaultQuery),
        list:[],
        total:null
      }
    },
    filters:{

    },
    created(){
    },
    methods:{
      get
    }
  }
</script>

<style scoped>

</style>
