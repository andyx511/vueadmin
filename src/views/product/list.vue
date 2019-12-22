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
        <a href="http://127.0.0.1:8888/product/export">
          <el-button
            style="float: right;margin-right: 10px"
            size="small"
            type="warning"
          >
            导出数据
          </el-button>
        </a>

      </div>
      <div style="margin-top: 20px">
        <el-form size="small" label-width="140px" :inline="true">
          <el-form-item label="商品名称">
            <el-input style="width: 203px" placeholder="商品名称" v-model="query.name" clearable/>
          </el-form-item>
          <el-form-item label="商品品牌">
            <el-select v-model="query.brand" placeholder="请选择" clearable>
              <el-option
                v-for="item in brandList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品种类">
            <el-select v-model="query.kind" placeholder="请选择" clearable>
              <el-option
                v-for="item in kindList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态">
            <el-select v-model="query.isPublic" placeholder="请选择" clearable>
              <el-option
                :label="'下架'"
                :value="0">
              </el-option>
              <el-option
                :label="'上架'"
                :value="1">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否新品">
            <el-select v-model="query.isNew" placeholder="请选择" clearable>
              <el-option
                :label="'非新品'"
                :value="0">
              </el-option>
              <el-option
                :label="'新品'"
                :value="1">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="query.status" placeholder="请选择" clearable>
              <el-option
                :label="'待审核'"
                :value="0">
              </el-option>
              <el-option
                :label="'审核通过'"
                :value="1">
              </el-option>
              <el-option
                :label="'审核未通过'"
                :value="2">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格">
            <div class="block" style="width: 1000px">
              <el-slider
                v-model="price"
                range
                show-input="true"
                :max="1000"
                :marks="marks">
              </el-slider>
            </div>
          </el-form-item>
        </el-form>
        <el-button type="success" @click="add" icon="el-icon-edit" >添加</el-button>
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
        <el-table-column label="图片" align="center" style="width: 72px;">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" style="height: 68px;width: 80px; border-radius: 5px">
          </template>
        </el-table-column>
        <el-table-column label="商品名" align="center" width="300px">
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
        <el-table-column label="价格" align="center" style="width: 130px;">
          <template slot-scope="scope">
            <p>原价：￥{{scope.row.price}}</p>
            <p v-if="scope.row.discountPrice !=0 ">折后价：￥{{scope.row.discountPrice}} </p>
          </template>
        </el-table-column>

        <el-table-column label="库存" align="center" width="95px">
          <template slot-scope="scope">
            {{scope.row.stock}}
            <el-button @click="stockDetail(scope.row)" size="mini">更新库存</el-button>
          </template>
        </el-table-column>
        <el-table-column label="标签" align="center" width="120px">
          <template slot-scope="scope">
      <!--      是否新品：
            <el-switch
              @change="handleIsNew(scope.$index, scope.row)"
              :active-value=1
              :inactive-value=0
              v-model="scope.row.isNew ">
            </el-switch>-->
            是否上架：
            <el-switch
              @change="handleIsPublic(scope.$index, scope.row)"
              :active-value=1
              :inactive-value=0
              v-model="scope.row.isPublic "
              style="margin-top: 10px;">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="销量" align="center">
          <template slot-scope="scope">{{scope.row.salesVolume}}</template>
        </el-table-column>
        <el-table-column label="详细图片" align="center">
          <template slot-scope="scope">
            <el-tooltip content="点击查看更多图片" placement="top" effect="light">
              <el-badge :value="scope.row.detailPic.split(',').length" class="item" style="margin-top: 10px;margin-right: 10px;">
                <el-image
                  :src="scope.row.detailPic.split(',')[0]"
                  :preview-src-list="scope.row.detailPic.split(',')"
                  :fit= "contain"
                >
                </el-image>
              </el-badge>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status==0">
              <el-tag >待审核</el-tag>
              <br>
              <el-button icon="el-icon-close" style="margin-top: 5px;" type="danger" size="mini" @click="refuseStatus(scope.row)" v-permission="['admin']"></el-button>
              <el-button icon="el-icon-check" type="success" size="mini" @click="passStatus(scope.row)" style="margin-top: 1px;margin-left: -1px;" v-permission="['admin']"></el-button>
            </div>
            <div v-if="scope.row.status==1">
              <el-tag type="success">审核通过</el-tag>
            </div>
            <div v-if="scope.row.status==2">
              <el-tag type="danger"  >审核未通过</el-tag>
            </div>
            <div v-if="scope.row.status==3">
              <el-tag type="danger"  >修改待审核</el-tag>
              <br>
              <el-button icon="el-icon-close" style="margin-top: 5px;" type="danger" size="mini" @click="refuseStatus(scope.row)" v-permission="['admin']"></el-button>
              <el-button icon="el-icon-check" type="success" size="mini" @click="passStatus(scope.row)" style="margin-top: 1px;margin-left: -1px;" v-permission="['admin']"></el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleProduct(scope.row)" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-button
        @click="deleteBatch"
        type="danger"
        v-permission="['admin']">
        批量删除
      </el-button>
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
      title="添加商品"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      >
      <add @mm = "closeAdd" ref="add"></add>
    </el-dialog>
    <el-dialog
      title="增加库存"
      :visible.sync="stockVisible"
      width="20%"
    >
      <el-form align="center">
        <el-form-item label="增加库存数" align="center">
          <el-input-number style="width: 203px" placeholder="数量" v-model="stock" clearable :min="10"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="stockVisible =false">取消</el-button>
          <el-button type="primary" @click="updateStock">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="商品编辑"
      :visible.sync="drawer"
      width="50%"
    >
        <edit :productId="productId" size="40%" @mm = "closeEdit" ref="edit"></edit>
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
import {getList} from "../../api/brand"
import  {getKindList} from "../../api/kind";
import {deleteProdcuts,updateIsNew,updateIsPublic,updateStock,updateStatus,exported} from "../../api/product";

const defaultQuery ={
  kind:null,
  brand:null,
  isNew:null,
  isPublic:null,
  name:null,
  minPrice:null,
  maxPrice:null,
  status:null,
  pageNum:1,
  pageSize:5
}
export default {
  name: 'List',
  components: {add,edit,imageListUpload},
  directives: { permission },

  data() {
    return {
      drawer:false,
      listLoading: false,
      brandList: [],
      dialogVisible: false,
      productList: '',
      kindList:[],
      dialogVisibleEdit: false,
      stockVisible: false,
      multipleSelection: [],
      query: Object.assign({},defaultQuery),
      total: null,
      picArray:[],
      price:[0,1000],
      marks:{
        0: '0￥',
        100: '100￥',
        200: '200￥',
        300: '300￥',
        400: '400￥',
        500: '500￥',
        600: '600￥',
        700: '700￥',
        800: '800￥',
        900: '900￥',
        1000: '1000￥',
      },
      stock:null,
      stockId:null,
      productId:null
    }
  },
  watch:{
    dialogVisible(){
      if (this.dialogVisible==false){
        this.getList()
      }
    }
  },
  created() {
    this.getList();
    this.getKindList();
    this.getBrandList();
  },
  methods: {
    checkPermission,
    add() {
      this.dialogVisible = true
    },
    exported(){
      exported()
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
    getBrandList(){
      getList({pageNum:1,pageSize:100}).then(response =>{
        let brandList = response.data.list;
        for (let i = 0;i<brandList.length;i++){
          this.brandList.push({label:brandList[i].name,value:brandList[i].name});
        }
      })
    },
    getKindList(){
      getKindList({pageNum:1,pageSize:100}).then(response =>{
        let kindList = response.data.list;
        for (let i = 0;i<kindList.length;i++){
          this.kindList.push({label:kindList[i].name,value:kindList[i].name});
        }
      })
    },
    reSet(){
      this.query = Object.assign({},defaultQuery)
      this.price = [0,1000]
    },
    search(){
      this.query.pageNum = 1
      this.query.minPrice = this.price[0]
      this.query.maxPrice = this.price[1]
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
    deletes(ids){
      deleteProdcuts(ids).then(response =>{
        this.$message({
          message: '删除成功',
          type: 'success',
          duration:1000
        })
        this.getList()
      })
    },
    handleIsNew(index,row){
      if (row.isNew ===0){
        row.isNew = 0
      }else {
        row.isNew =1
      }
      let params = new URLSearchParams();
      params.append('id',row.id)
      params.append('isNew',row.isNew)
      updateIsNew(params).then(response =>{
        this.$message({
          message : '修改成功',
          type : 'success',
          duration: 1000
        })
      })
    },
    handleIsPublic(index,row){
      if (row.isPublic ===0){
        row.isPublic = 0
      }else {
        row.isPublic =1
      }
      let params = new URLSearchParams();
      params.append('id',row.id)
      params.append('isPublic',row.isPublic)
      updateIsPublic(params).then(response =>{
        this.$message({
          message : '修改成功',
          type : 'success',
          duration: 1000
        })
      })
    },
    stockDetail(row){
      this.stockVisible = true
      this.stockId = row.id
    },
    updateStock(){
      let params = new URLSearchParams();
      params.append('id',this.stockId)
      params.append('num',this.stock)
      updateStock(params).then(response =>{
        this.$message({
          message : '修改成功',
          type : 'success',
          duration: 1000
        })
        this.getList()
      })
      this.stockVisible =false
      this.stockId = null
      this.stock = null

    },
    passStatus(row){
      let params = new URLSearchParams();
      params.append('id',row.id)
      params.append('status','1')
      updateStatus(params).then(response =>{
        this.$message({
          message : '修改成功',
          type : 'success',
          duration: 1000
        })
        this.getList()
      })
    },
    refuseStatus(row){
      let params = new URLSearchParams();
      params.append('id',row.id)
      params.append('status','2')
      updateStatus(params).then(response =>{
        this.$message({
          message : '修改成功',
          type : 'success',
          duration: 1000
        })
        this.getList()
      })
    },
    handleProduct(row){
      this.productId = row.id
      this.drawer= true
    },
    closeAdd(){
      this.dialogVisible = false
      this.getList()
    },
    closeEdit(){
      this.drawer = false
      this.getList()
    }
  }
}
</script>

<style scoped>
  .el-table th.gutter{
    display: table-cell!important;
  }
</style>
