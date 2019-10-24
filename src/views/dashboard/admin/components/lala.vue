<template>
  <div style="background:#ffffff">
    <div style="color: #9aaabf;padding:325px 160px;position: absolute">实时内存使用率</div>
    <ve-gauge :data="chartData" :settings="chartSettings"  ></ve-gauge>
  </div>
</template>

<script>
  import {memory} from "../../../../api/report";
  import "echarts/lib/component/title";
  export default {
    name: "lala",
    data () {
      this.chartSettings = {
        dataType: {
          '占比': 'percent'
        },
        seriesMap: {
          '占比': {
            min: 0,
            max: 1
          }
        },
      }
      return {
        chartData: {
          columns: ['type', 'value'],
          rows: [
            { type: '占比', value: 1 }
          ]
        }
      }
    },
    create(){
      this.getMemory()
    },
    mounted: function () {
      this.$nextTick(function () {
        setInterval(this.getMemory, 1000);
      })
    },
    methods:{
      getMemory(){
        memory().then(res=>{
          this.chartData.rows[0].value = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
