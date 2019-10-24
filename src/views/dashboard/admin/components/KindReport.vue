<template>
  <div style="background:#ffffff;">
    <div style="color: #9aaabf;padding: 330px 140px;position: absolute">种类占比</div>
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
      this.colors = ['#c23531','#2f4554', '#61a0a8',
        '#d48265', '#91c7ae','#749f83',
        '#ca8622', '#bda29a','#6e7074',
        '#546570', '#c4ccd3']
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
