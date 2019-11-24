<template>
  <div style="background:#ffffff;">
    <div style="color: #9aaabf;padding: 350px 250px;position: absolute">系统最近访问量</div>
    <ve-histogram  :data="chartData" :settings="chartSettings" :extend="extend"></ve-histogram>
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
          fDate: '日期',
          userCount: '我的访问次数'
        }
      }
      this.extend = {
        series: {
          label: { show: true, position: "top" }
        },

        series (v) {
          v.forEach(i => {
            i.barWidth = 10
          })
          return v
        },
      }
      return{
        title:'你好',
        chartData: {
          columns: ['fDate','count','userCount'],
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
