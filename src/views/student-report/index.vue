<template>
  <div style="padding:30px;">
    <h1 style="text-align:center">对不起, 当前功能暂未开发...</h1>
    <div id="myChart" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'MyComponent',
  mounted() {
    var myChart = echarts.init(document.getElementById('myChart'));
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
    myChart.setOption(option);
  }
}
</script>
