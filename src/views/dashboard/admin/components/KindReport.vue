<template>
  <div style="background:#ffffff;">
    <ve-ring :data="chartData" :settings="chartSettings" :extend="extend"></ve-ring>
  </div>
</template>

<script>
  import {kind} from "../../../../api/report";
  export default {
    name: "KindReport",
    data(){
      this.chartSettings = {
        labelMap: {
          count: '数量',
          kind: '种类'
        },
        roseType: 'radius'
      }
      return{
        title:'你好',
        chartData: {
          columns: ['kind', "count"],
          rows: [

          ]
        }
      }
    },
    created(){
      this.getKind()
    },
    methods:{
      getKind(){
        kind().then(res=>{
          this.chartData.rows = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
