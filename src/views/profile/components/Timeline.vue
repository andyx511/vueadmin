<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top"
                        :icon="item.icon"
                        :type="item.type"
                        :color="item.color">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2019/9/9',
          title: '选择课题',
          content: 'andyx511  选择汽车配件系统作为毕业课题  2019/9/9 20:46',
          color: '#0bbd87'
        },
        {
          timestamp: '2019/9/13',
          title: '确认选题',
          content: 'andyx511  确认选择汽车配件系统作为毕业课题 2019/9/13 20:46',
          color: '#0bbd87'
        },
        {
          timestamp: '2019/9/19',
          title: '书写任务书',
          content: 'andyx511 书写任务书 2019/9/19 20:46',
          color: '#0bbd87'
        },
        {
          timestamp: '2019/9/20',
          title: '书写开题报告',
          content: 'andyx511 书写任务书 2019/9/20 20:46',
          color: '#0bbd87'
        },
        {
          timestamp: '2019/9/20',
          title: '项目研发，撰写论文',
          content: 'andyx511 书写任务书 2019/9/20 20:46',
          color: '#0bbd87'
        },
        {
          timestamp: '2019/9/20',
          title: '中期检查',
          content: 'andyx511 书写任务书 2019/9/20 20:46'
        },
        {
          timestamp: '2019/9/20',
          title: '论文查重',
          content: 'andyx511 书写任务书 2019/9/20 20:46'
        },
        {
          timestamp: '2019/9/20',
          title: '毕业答辩',
          content: 'andyx511 书写任务书 2019/9/20 20:46'
        },
        {
          timestamp: '2019/9/20',
          title: '成绩评议，材料归档',
          content: 'andyx511 书写任务书 2019/9/20 20:46'
        }
      ]
    }
  }
}
</script>
