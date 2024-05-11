<template>
  <div style="display: flex;">
    <div style="width: 50%;">
      <h1>学生班级分布</h1>
      <Echarts :option="clazzOption" />
    </div>
    <div style="width: 50%;">
      <h1>学生性别分布</h1>
      <Echarts :option="genderOption" />
    </div>
  </div>
</template>

<script>
import Echarts from '@/components/Echart/index.vue';
import { getStuGender } from "@/api/stu.js";
import { getClass } from "@/api/cla.js";

export default {
  components: {
    Echarts
  },
  data() {
    return {
      clazzOption: {
        color: ['#72f818', '#9628fc', '#FFD91A'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [
          {
            type: 'bar',
            data: []
          }
        ]
      },
      genderOption: {
        color: ['#f88f18', '#288CFC', '#afff1a'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '5%',
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            radius: '60%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const [clazzRes, genderRes] = await Promise.all([
          getClass(),
          getStuGender()
        ]);

        console.log(clazzRes);
        console.log(genderRes);

        console.log(genderRes.data.data);

        if (clazzRes.data.code === 1) {
          this.clazzOption.yAxis.data = clazzRes.data.data.map(item => item.name);
          this.clazzOption.series[0].data = clazzRes.data.data.map(item => item.number);
        } else {
          console.error('Failed to get class data:', clazzRes.msg);
        }

        if (genderRes.data.code === 1) {
          this.genderOption.series[0].data = genderRes.data.data.map(item => ({
            value: item.genderCount,
            name: item.gender === 1 ? '男' : '女'
          }));
        } else {
          console.error('Failed to get gender data:', genderRes.msg);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
