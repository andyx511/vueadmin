<template>
  <div style="background:#ffffff;">
    <div style="color: #9aaabf;padding: 330px 100px;position: absolute">品牌占比</div>
    <ve-pie :data="chartData" :settings="chartSettings" :extend="extend"></ve-pie>
  </div>
</template>

<script>
  import {brand} from "../../../../api/report";
  export default {
    name: "BrandReport",
    data(){
      this.chartSettings = {
        labelMap: {
          count: '数量',
          kind: '品牌'
        },
        roseType: 'radius'
      }
      return{
        title:'你好',
        chartData: {
          columns: ['brand', "count"],
          rows: [

          ]
        }
      }
    },
    created(){
      this.getBrand()
    },
    methods:{
      getBrand(){
        brand().then(res=>{
          this.chartData.rows = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
