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
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from '../../api/brand'
const Query = {
  b
}
export default {
  name: 'List',

  data() {
    return {
      brandList: ''
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
