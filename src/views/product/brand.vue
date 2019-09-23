<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form size="small" label-width="140px" :inline="true" :model="listQuery">
          <i class="el-icon-search" />
          <span>筛 选 搜 索</span>
          <el-form-item label="输入搜索">
            <el-input v-model="listQuery.brandName" style="width: 150px" placeholder="商品名称" clearable />
          </el-form-item>
          <el-form-item label="商品id">
            <el-input v-model="listQuery.id" style="width: 150px" placeholder="品牌id" clearable />
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
    <div style="margin-top: 20px">
      <el-table
        ref="BrandTable"
        v-load="listLoading"
        :data="list"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column type = "selection"  align="center"></el-table-column>
        <el-table-column label="编号"  align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="商品图片"  align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <p><el-button type="primary" @click="edit( scope.row)">编辑</el-button></p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>

    </div>
    <div class="pagination-container">
      <el-button
        @click="deleteBatch"
        type="danger">
        批量删除
      </el-button>
      <el-pagination
        style="float: right"
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
      title="添加品牌"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="brand" ref="form" style="align-content: center">
        <el-form-item label="品牌名称"  label-width="100px">
          <el-input v-model="brand.name"  clearable style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="品牌status" label-width="100px">
          <el-input v-model="brand.status"  clearable style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      title="编辑品牌"
      :visible.sync="dialogVisibleEdit"
      width="30%"
      :before-close="handleClose">
      <el-form  :model="brand" ref="form" style="align-content: center">
        <el-form-item label="品牌名称"  label-width="100px">
          <el-input v-model="brand.name"  clearable style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="品牌status" label-width="100px">
          <el-input v-model="brand.status"  clearable style="width: 200px;"></el-input>
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
  import { getList, add, detail, update, deletes} from '../../api/brand'

  const query = {
    brandName: null,
    id: null,
    pageNum: 1,
    pageSize: 5
  }
  const defaultBrand ={
    id:  '',
    name: null,
    status: null
  }
  export default {
    name: 'Brand',
    data() {
      return {
        listLoading: true,
        total: null,
        listQuery: Object.assign({}, query),
        list: null,
        dialogVisible: false,
        dialogVisibleEdit: false,
        brand: Object.assign({},defaultBrand),
        detail: null,
        // 多选组件
        multipleSelection: []
      }
    },
    watch: {
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        getList(this.listQuery).then(response =>{
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        })
      },
      // 改变页面
      handleCurrentChange() {
        this.listLoading = true;
        this.getList();
      },
      // 改变页面大小
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      search() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      reset() {
        this.listQuery = Object.assign({},query)
      },
      add() {
        add(this.brand).then(response =>{
          this.brand.name = null
          this.brand.status = null
          this.brand = Object.assign({},defaultBrand)
          this.dialogVisible = false
          this.$message({
            message: '提交成功',
            type: 'success',
            duration:1000
          });
          this.getList()
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      edit(row){
        detail(row.id).then(response =>{
          this.brand.id = response.data.id
          this.brand.name = response.data.name
          this.brand.status = response.data.status
          this.dialogVisibleEdit = true
        })
        this.getList()
      },
      update(){
        update(this.brand).then(response =>{
          this.brand.id = null
          this.brand.name = null
          this.brand.status = null
          this.brand = Object.assign({},defaultBrand)
          this.dialogVisibleEdit = false
          this.$message({
            message: '修改成功',
            type: 'success',
            duration:1000
          })
        })
        this.getList()
      },
      deleteBatch(){
        if (this.multipleSelection==null || this.multipleSelection.length<1){
          this.$message({
            message: '请选择要删除的',
          })
        }else {
          this.$confirm('是否要进行该批量删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let ids = [];
            for (let i = 0;i<this.multipleSelection.length;i++){
              ids.push(this.multipleSelection[i].id);
            }
            this.deletes(ids)
          });
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      deletes(ids){
        deletes(ids).then(response =>{
          this.$message({
            message: '删除成功',
            type: 'success',
            duration:1000
          })
          this.getList()
        })
      }
    }
  }
</script>

<style scoped>

</style>
