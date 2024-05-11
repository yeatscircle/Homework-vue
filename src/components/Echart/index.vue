<template>
  <div ref="myChartContainer" :style="{ height: height, width: width }"></div>
</template>

<script>
import { init, ECharts, EChartsOption } from 'echarts';

export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    option: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      myChart: null,
      resizeTimer: null
    };
  },
  methods: {
    initChart() {
      // Dispose old instance if exists
      if (this.myChart) {
        this.myChart.dispose();
      }
      // Initialize new ECharts instance
      this.myChart = init(this.$refs.myChartContainer);
      // Apply the ECharts options
      this.myChart.setOption(this.option, true);
    },
    resizeChart() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        if (this.myChart) {
          this.myChart.resize();
        }
      }, 500);
    }
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart);
    clearTimeout(this.resizeTimer);
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
  watch: {
    option: {
      deep: true,
      handler() {
        this.initChart();
      }
    }
  }
}
</script>

<style>
/* You can add styles for your chart container here if necessary */
</style>
