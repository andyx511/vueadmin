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
          @click="reset"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form size="small" label-width="140px" :inline="true" :model="listQuery">
          <el-form-item label="输入搜索">
            <el-input v-model="listQuery.name" style="width: 203px" placeholder="商品名称" clearable />
          </el-form-item>
          <el-form-item label="商品id">
            <el-input v-model="listQuery.id" style="width: 203px" placeholder="品牌id" clearable />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div style="margin-top: 20px;">
      <el-table
        ref="BrandTable"
        v-load="listLoading"
        :data="brandList"
        style="width: 100%;"
        @select-change="handleSelectionChange"
      />
    </div>
  </div>
</template>

<script>
import { getList } from '../../api/brand'

const query = {
  name: null,
  id: null,
  pageNum: 1,
  pageSize: 2
}
export default {
  name: 'Brand',
  data() {
    return {
      listLoading: true,
      total: null,
      listQuery: Object.assign({}, query)
    }
  },
  created() {
  },
  methods() {

  }
}
</script>

<style scoped>

</style>
