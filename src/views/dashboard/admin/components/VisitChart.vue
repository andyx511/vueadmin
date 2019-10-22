<template>
  <div style="background:#ffffff;">
    <ve-histogram :title="系统访问次数" :data="chartData" :settings="chartSettings" ></ve-histogram>
  </div>
</template>

<script>
  import "echarts/lib/component/title"
  import {getVisit} from "../../../../api/report";
  export default {
    name: "VisitChart",
    data() {
      this.chartSettings = {
        labelMap: {
          count: '访问人数',
          fDate: '日期'
        }
      }
      return{

        chartData: {
          columns: ['fDate','count'],
          rows: [
          ]
        }
      }
    },
    created(){
      this.getVisit()
    },
    components: {  },
    methods:{
      getVisit(){
        getVisit().then(res=>{
          this.chartData.rows = res.data
        })
      },
    }
  }
</script>

<style scoped>

</style>
