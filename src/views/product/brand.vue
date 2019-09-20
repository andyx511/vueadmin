<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <!--<div>
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
          @click="reset"
        >
          重置
        </el-button>
      </div>-->
      <div style="margin-top: 15px">
        <el-form size="small" label-width="140px" :inline="true" :model="listQuery">
          <i class="el-icon-search" />
          <span>筛 选 搜 索</span>
          <el-form-item label="输入搜索">
            <el-input v-model="listQuery.name" style="width: 150px" placeholder="商品名称" clearable />
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
    <div style="margin-top: 20px;">
      <el-table
        ref="BrandTable"
        v-load="listLoading"
        :data="list"
        style="width: 100%;"
        @select-change="handleSelectionChange"
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
            <p><el-button type="primary" @click="edit(scope.$index, scope.row)">编辑</el-button></p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>

    </div>
    <div class="pagination-container">
      <el-button
        @click=""
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
<!--   对话框-->
    <el-dialog
      title="添加品牌"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form size="mini" :model="brand" ref="form" style="align-content: center">
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
      <el-form size="mini" :model="brand" ref="form" style="align-content: center">
        <el-form-item label="品牌名称"  label-width="100px">
          <el-input v-model="brand.name"  clearable style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="品牌status" label-width="100px">
          <el-input v-model="brand.status"  clearable style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList ,add} from '../../api/brand'

const query = {
  name: null,
  id: null,
  pageNum: 1,
  pageSize: 5
}
const defaultBrand ={
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
      brand:Object.assign({},defaultBrand)
    }
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
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    edit(index,row){
      this.dialogVisibleEdit = true

    }
  }
}
</script>

<style scoped>

</style>
