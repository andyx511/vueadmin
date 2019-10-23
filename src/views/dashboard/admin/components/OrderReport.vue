<template>
  <div style="background:#ffffff;">
    <ve-histogram :data="chartData" :title="ndb" :settings="chartSettings" :extend="extend" :data-zoom="dataZoom"></ve-histogram>
  </div>
</template>

<script>
  import {order} from "../../../../api/report";
  export default {
    name: "OrderReport",
    data(){
      this.dataZoom = [
        {
          type: 'slider',
          start: 0,
          end: 100
        }
      ],
      this.chartSettings = {
        axisSite:{right:['num']},
        yAxisType: ['normal', 'normal'],
        yAxisName: ['金额', '数量'],
        labelMap: {
          date: '日期',
          num: '数量',
          totalPrice:'总价'
        },
        showLine: ['totalPrice'],

      },
      this.extend = {
        series: {
          label: { show: true, position: "top" }
        },
        series (v) {
          v.forEach(i => {
            i.barWidth = 30
          })
          return v
        },
      }
      return{
        chartData: {
          columns: ['date', 'num', 'totalPrice'],
          rows: []
        }
      }
    },
    created(){
      this.getOrder()
    },
    methods:{
      getOrder(){
        order().then(res=>{
          this.chartData.rows = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
