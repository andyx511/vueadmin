<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      数据列表 <span style="font-size: 14px;color: #9aaabf"> (新品最多只能推荐8个)</span>

      <el-button style="float:right;" @click="add" :disabled="list.length>7"> 添加商品</el-button>
    </el-card>
    <div style="margin-top: 20px;">
      <el-table
        ref="ProductTable"
        v-load="listLoading"
        :data="list"
        style= "width: 100%;"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type = "selection"  align="center"></el-table-column>
        <el-table-column label="ID" align="center" width="50px">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="商品名" align="center" width="400px">
          <template slot-scope="scope">
            <p>{{scope.row.newName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" >
          <template slot-scope="scope">
            <p>{{scope.row.sort}}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" >
          <template slot-scope="scope">
            <p>推荐中</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="setSort(scope.row.id)">设置排序</el-button>
            <el-button @click="deleteed(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="添加品牌"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-table
        ref="newTable"
        v-load="listLoading"
        :data="newList"
        style="width: 100%;"
        @current-change="handleCurrentChange"
        highlight-current-row
        border>
        <el-table-column label="ID"  align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="品牌名"  align="center">
          <template slot-scope="scope">{{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="Logo"  align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" style="height: 86px;width: 100px; border-radius: 5px">
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handlePCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :page-size="NewQuery.pageSize"
          :page-sizes="[5,10]"
          :current-page.sync="NewQuery.pageNum"
          :total="newTotal">
        </el-pagination>
      </div>
      <div>
         <span slot="footer" style="margin-left: 70%;">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRecommend">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog
      title="设置排序"
      :visible.sync="dialogVisibleSort"
      width="20%"
    >
      <el-form align="center">
        <el-form-item label="设置排序" align="center">
          <el-input-number style="width: 203px" placeholder="数量" v-model="sorted" />
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisibleSort =false">取消</el-button>
          <el-button type="primary" @click="setSortSave">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getProductList} from "../../api/product"
  import {addNewRecommend,getNewList,setSort,deleteNew} from "../../api/newRecommend"
  const newQuery = {
    pageNum: 1,
    pageSize: 5
  }
  const defaultRecommend = {
    productId:''
  }
  export default {
    name: "newRecommend",
    data(){
      return{
        dialogVisible:false,
        dialogVisibleSort:false,
        NewQuery: Object.assign({}, newQuery),
        recommend: Object.assign({}, defaultRecommend),
        newList:'',
        newTotal:'',
        currentRow:'',
        list:'',
        id:'',
        sorted:''
      }
    },
    created(){
      this.getNewList()
      this.getList()
    },
    methods:{
      add(){
        this.dialogVisible=true
      },
      getNewList(){
        getProductList(this.NewQuery).then(res=>{
          this.newList = res.data.list
          this.newTotal = res.data.total
        })
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      // 改变页面
      handlePCurrentChange() {
        this.listLoading = true;
        this.getNewList();
      },
      // 改变页面大小
      handleSizeChange(val) {
        this.NewQuery.pageNum = 1;
        this.NewQuery.pageSize = val;
        this.getNewList();
      },
      // 推荐
      addRecommend(){
        this.recommend.productId=this.currentRow.id
        this.recommend.url=this.currentRow.pic
        addNewRecommend(this.recommend).then(res=>{
          this.dialogVisible=false
          this.getList()
        })
      },
      getList(){
        getNewList().then(res=>{
          this.list = res.data
        })
      },
      setSort(id){
        this.id = id
        this.dialogVisibleSort = true
      },
      setSortSave(){
        let params = new URLSearchParams();
        params.append('id',this.id)
        params.append('sort',this.sorted)
        setSort(params).then(res=>{
          this.getList()
          this.dialogVisibleSort=false
        })
      },
      deleteed(id){
        deleteNew(id).then(res=>{
          this.getList()
        })
      }
    }
  }
</script>

<style scoped>

</style>
