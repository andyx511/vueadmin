<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form size="small" label-width="140px" :inline="true" :model="listQuery">
          <i class="el-icon-search" />
          <span>筛 选 搜 索</span>
          <el-form-item label="输入搜索">
            <el-input v-model="listQuery.name" style="width: 150px" placeholder="商品名称" clearable />
          </el-form-item>
          <el-button
            style="float: right"
            type="primary"
            size="small"
            @click="search"
            icon="el-icon-search"
          >
            查询
          </el-button>
          <el-button
            style="float: right;margin-right: 15px"
            size="small"
            @click="reset"
            icon="el-icon-refresh"
          >
            重置
          </el-button>
        </el-form>
        <el-button type="success" @click="dialogVisible = true" icon="el-icon-edit" >添加</el-button>
      </div>
    </el-card>
    <div style="margin-top: 20px;">
      <el-table
        v-load="KindTable"
        :data="list"
        style="width: 100%"
        border>
        <el-table-column label="ID" align="center" width="100px">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="种类名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">{{scope.row.des}}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="edit( scope.row)" >
              编辑
            </el-button>
            <el-button type="danger" @click="deleteBrand(scope.row)" v-permission="['admin']">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="float: right ;margin-top: 20px;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
    <!--对话框-->
    <el-dialog
      title="添加种类"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="kind" :rules="rules"  ref="kind" style="align-content: center">
        <el-form-item label="种类名"  label-width="150px" prop="name">
          <el-input v-model="kind.name"  clearable style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="种类描述" label-width="150px" prop="des">
          <el-input v-model="kind.des"  clearable style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="排序" label-width="150px">
          <el-input v-model="kind.sort"  clearable style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add('kind')">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      title="编辑品牌"
      :visible.sync="dialogVisibleEdit"
      width="30%"
    >
      <el-form :model="kind" :rules="rules"  ref="brand" style="align-content: center">
        <el-form-item label="品牌名称"  label-width="150px" prop="name">
          <el-input v-model="kind.name"  clearable style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="品牌首字母" label-width="150px" prop="fLetter">
          <el-input v-model="kind.des"  clearable style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="排序" label-width="150px">
          <el-input v-model="kind.sort"  clearable style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getKindList, add, detail, update, deleteBrand} from '../../api/kind'
  import checkPermission from '@/utils/permission' // 权限判断函数
  import permission from '@/directive/permission/index.js' // 权限判断指令
  const query = {
    name: null,
    pageNum: 1,
    pageSize: 5
  }
  const defaultKind = {
    id:'',
    name:'',
    des:'',
    sort:''
  }
  export default {
    name: "kind",
    directives: { permission },
    data(){
      return{
        listQuery: Object.assign({}, query),
        list: null,
        total:null,
        kind:Object.assign({},defaultKind),
        dialogVisible:false,
        dialogVisibleEdit:false,
        rules: {
          name: [
            { required: true, message: '请输入种类名称', trigger: 'blur' },
          ],
          des: [
            { required: true, message: '请输入种类描述', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.getKindList()
    },
    methods:{
      getKindList(){
        getKindList(this.listQuery).then(response =>{
          this.list = response.data.list
          this.total = response.data.total;
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getKindList();
      },
      // 改变页面
      handleCurrentChange() {
        this.listLoading = true;
        this.getKindList();
      },
      search() {
        this.listQuery.pageNum = 1;
        this.getKindList();
      },
      reset() {
        this.listQuery = Object.assign({},query)
      },
      add(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            add(this.kind).then(response =>{
              this.resetForm(formName)
              this.kind = Object.assign({},defaultKind)
              this.dialogVisible = false
              this.$message({
                message: '提交成功',
                type: 'success',
                duration:1000
              });
              this.getKindList()
            })
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      edit(row){
        detail(row.id).then(response =>{
          this.kind.id = response.data.id
          this.kind.name = response.data.name
          this.kind.des = response.data.des
          this.kind.sort = response.data.sort
          this.dialogVisibleEdit = true
        })
      },
      update(){
        update(this.kind).then(response => {
          this.dialogVisibleEdit = false
          this.$message({
            message:'修改成功',
            type: 'success',
            duration:1000
          })
          this.getKindList()
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      deleteBrand(row){
        let params = new URLSearchParams();
        params.append('id',row.id)
        deleteBrand(params).then(response =>{
          this.getKindList()
          this.dialogVisibleEdit = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
