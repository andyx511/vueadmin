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
        <el-button type="success" @click="add" icon="el-icon-edit" >添加</el-button>
      </div>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <add @mm = "dialogVisible = false"></add>
    </el-dialog>
  </div>
</template>

<script>

import add from "./components/add";
import edit from "./components/edit";
export default {
  name: 'List',
  components: {add,edit},

  data() {
    return {
      brandList: '',
      dialogVisible: false
    }
  },
  created() {
  },
  methods: {
    add() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>

<style scoped>

</style>
