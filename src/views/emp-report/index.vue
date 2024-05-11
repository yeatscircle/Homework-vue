<template>
  <div style="display: flex;">
    <div style="width: 50%;">
      <h1>员工部门分布</h1>
      <Echarts :option="DeptOption" />
    </div>
    <div style="width: 50%;">
      <h1>员工性别分布</h1>
      <Echarts :option="genderOption" />
    </div>
  </div>
</template>

<script>
import Echarts from '@/components/Echart/index.vue';
import { getEmpGender,getDeptCount } from "@/api/emp.js";

export default {
  components: {
    Echarts
  },
  data() {
    return {
      DeptOption: {
        color: ['rgba(248,24,170,0.72)', '#9628fc', '#FFD91A'],
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
        const [DeptRes, genderRes] = await Promise.all([
          getDeptCount(),
          getEmpGender()
        ]);

        console.log(DeptRes);
        console.log(genderRes);

        console.log(genderRes.data.data);

        if (DeptRes.data.code === 1) {
          this.DeptOption.yAxis.data = DeptRes.data.data.map(item => item.deptName);
          this.DeptOption.series[0].data = DeptRes.data.data.map(item => item.count);
        } else {
          console.error('Failed to get class data:', DeptRes.msg);
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
mplate>
