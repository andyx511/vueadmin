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
        <el-button type="success" @click="add" icon="el-icon-edit" v-permission="['admin']">添加</el-button>
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
        <el-table-column label="用户ID" align="center" >
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="账户" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="昵称" align="center" >
          <template slot-scope="scope">{{scope.row.nickName }}</template>
        </el-table-column>
        <el-table-column label="图标" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.icon" alt="" style="height: 86px; border-radius: 5px">
          </template>
        </el-table-column>
        <el-table-column label="mail" align="center">
          <template slot-scope="scope">{{scope.row.email | formatMail}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" >
          <template slot-scope="scope">{{scope.row.createTime |formatCreateTime}}</template>
        </el-table-column>

        <el-table-column label="状态" align="center" >
          <template slot-scope="scope">{{scope.row.status | formatStatus }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" >
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==0" type="primary" size="mini" @click="qi(scope.row.id)">启用</el-button>
            <el-button v-if="scope.row.status==1" size = "mini" @click="jin(scope.row.id)">禁用</el-button>
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
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="admin" :rules="rules" ref="product" label-width="100px" class="demo-product">
        <!--<el-form-item label="商品名称" prop="name">
          <el-input v-model="product.name"></el-input>
        </el-form-item>-->
        <el-form-item label="账号" prop="username">
          <el-input v-model="admin.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="admin.nickName"></el-input>
        </el-form-item>
<!--        <el-form-item label="密码" prop="password">
          <el-input v-model="admin.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="admin.repassword"></el-input>
        </el-form-item>-->
        <el-form-item label="邮箱" prop="email">
          <el-input  v-model="admin.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">立即创建</el-button>
          <el-button @click="resetForm('product')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

  const validateEmail = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请正确填写邮箱'));
    } else {
      if (value !== '') {
        var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(!reg.test(value)){
          callback(new Error('请输入有效的邮箱'));
        }
      }
      callback();
    }
  };
  const validateRestPass = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.resetForm.password) {
      callback(new Error("两次输入密码不一致"));
    } else {
      callback();
    }
  };
  import {getList,add,jin,qi} from "../../api/admin";
  import {validLowerCase} from "../../utils/validate";
  import {formatDate} from '@/utils/date';

  const defaultQuery ={
    id:null,
    name:null,
    nickname:null,
    pageNum:1,
    pageSize:10
  }
  const defaultAdmin ={
    username:null,
    nickName:null,
    email:null
  }
  export default {
    name: "list",
    data(){
      return {
        query: Object.assign({},defaultQuery),
        admin: Object.assign({},defaultAdmin),
        list:[],
        total:null,
        dialogVisible:false,
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          nickName: [
            { required: true, message: '请输入用户昵称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          email: [
            // { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }],
          repassword: [{
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
            {
              validator: validateRestPass,
              trigger: "blur"
            }
          ]
        },
      }
    },
    filters:{
      formatCreateTime(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatMail(value){
        if (value == null){
          return '暂无'
        }else {
          return value
        }
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
      formatStatus(value){
        if (value ==0){
          return '禁用'
        }
        if(value == 1){
          return  '启用'
        }
      }
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        getList(this.query).then(res=>{
          this.list = res.data.list
          this.total = res.data.total
        })
      },
      add(){
        this.dialogVisible=true
      },
      save(){
        add(this.admin).then(res=>{
          this.dialogVisible = false
          this.getList()
          this.admin = Object.assign({},defaultAdmin)
        })
      },
      jin(id){
        jin({id:id}).then(res=>{
          this.getList()
        })
      },
      qi(id){
        qi({id:id}).then(res=>{
          this.getList()
        })
      },
      // 改变页面
      handleCurrentChange() {
        this.listLoading = true;
        this.getList();
      },
      // 改变页面大小
      handleSizeChange(val) {
        this.query.pageNum = 1;
        this.query.pageSize = val;
        this.getList();
      },
    }
  }
</script>

<style scoped>

</style>
