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
          @click=""
        >
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          size="small"
          @click=""
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form size="small" label-width="140px" :inline="true">
          <el-form-item label="输入搜索">
            <el-input style="width: 203px" placeholder="商品名称" />
          </el-form-item>
          <el-form-item label="商品id">
            <el-input style="width: 203px" placeholder="品牌id" />
          </el-form-item>
        </el-form>
        <el-button type="success" @click="add" icon="el-icon-edit" v-permission="['admin']">添加</el-button>
      </div>
    </el-card>
    <div style="margin-top: 20px;">
      <el-table
        ref="ProductTable"
        v-load="listLoading"
        :data="productList"
        style= "width: 100%;"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type = "selection"  align="center"></el-table-column>
        <el-table-column label="ID" align="center" width="50px">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" style="height: 86px;width: 100px; border-radius: 5px">
          </template>
        </el-table-column>
        <el-table-column label="商品名" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p>品牌: {{scope.row.brand}}</p>
            <p>分类: {{scope.row.kind}}</p>
          </template>
        </el-table-column>
       <!-- <el-table-column label="品牌">
          <template slot-scope="scope">{{scope.row.brand}}</template>
        </el-table-column>
        <el-table-column label="种类">
          <template slot-scope="scope">{{scope.row.kind}}</template>
        </el-table-column>-->
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">￥{{scope.row.price}}</template>
        </el-table-column>

        <el-table-column label="库存" align="center">
          <template slot-scope="scope">{{scope.row.stock}}</template>
        </el-table-column>
        <el-table-column label="标签" align="center">
          <template slot-scope="scope">{{scope.row.stock}}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="销量" align="center">
          <template slot-scope="scope">{{scope.row.salesVolume}}</template>
        </el-table-column>
        <el-table-column label="详细图片" align="center">
          <template slot-scope="scope">{{scope.row.detailPic}}</template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status==0">
              <el-tag style="width: 125px; height: 36px; font-size: 20px">待审核</el-tag>
              <br>
              <el-button icon="el-icon-close" style="margin-top: 5px;" type="danger"></el-button>
              <el-button icon="el-icon-check" type="success"></el-button>
            </div>
            <div v-if="scope.row.status==1">
              <el-tag type="success" style="width: 125px; height: 36px; font-size: 20px">审核通过</el-tag>
            </div>
            <div v-if="scope.row.status==2">
              <el-tag type="danger"style="width: 125px; height: 36px; font-size: 20px">审核未通过</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="添加商品"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      >
      <add @mm = "dialogVisible = false" ref="add"></add>
    </el-dialog>
  </div>
</template>

<script>

import add from "./components/add";
import edit from "./components/edit";
import checkPermission from '@/utils/permission' // 权限判断函数
import permission from '@/directive/permission/index.js' // 权限判断指令
import imageListUpload from "./components/imageListUpload";
import {getProductList} from "../../api/product";

const defaultQuery ={
  kind:null,
  brand:null,
  isNew:null,
  name:null,
  minPrice:null,
  maxPrice:null,
  pageNum:1,
  pageSize:10
}
export default {
  name: 'List',
  components: {add,edit,imageListUpload},
  directives: { permission },

  data() {
    return {
      listLoading: false,
      brandList: null,
      dialogVisible: false,
      productList: null,
      kindList:null,
      dialogVisibleEdit: false,
      multipleSelection: [],
      query: Object.assign({},defaultQuery),
      total: null,
      picArray:[]
    }
  },
  created() {
    this.getList();
  },
/*  computed:{
    picArray:function () {
      return this.
    }
  },*/
  methods: {
    checkPermission,
    add() {
      this.dialogVisible = true
    },
    getList(){
      this.listLoading = true
      getProductList(this.query).then(response =>{
        this.listLoading = false;
        this.productList = response.data.list;
        this.total = response.data.total;
      })
    },
    handleClose(done) {

      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.add.resetForm('product')
          done();
        })
        .catch(_ => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  }
}
</script>

<style scoped>

</style>
