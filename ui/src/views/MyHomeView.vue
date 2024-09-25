<template>
  <div ref="lineChart" style="width: 600px; height: 400px;"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

const lineChart = ref<HTMLDivElement | null>(null);
let chartInstance: ECharts | null = null;

const initChart = () => {
  if (lineChart.value) {
    chartInstance = echarts.init(lineChart.value);

    const option: EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }
      ]
    };

    chartInstance.setOption(option);
  }
};

onMounted(() => {
  initChart();
});
</script>
