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
    <div >
      <el-table
        :data="list"
        border>

      </el-table>
    </div>
  </div>
</template>

<script>
  const query = {
    kindName: null,
    id: null,
    pageNum: 1,
    pageSize: 5
  }
  export default {
    name: "kind",
    data(){
      return{
        listQuery: Object.assign({}, query),
        list: null,
        total:null
      }
    },
    created() {
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
