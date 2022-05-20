<template>
  <div class="charts" ref="chartRef"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {};
  },
  mounted() {
    let lineCharts = echarts.init(this.$refs.chartRef);
    let option = {
      xAxis: {
        show: false,
        // 均分
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [21, 32, 42, 21, 21, 32, 42, 21, 21, 32, 42, 21],
          //  设置拐点样式
          itemStyle: {
            opacity: 0,
          },
        },
      ],
      // 线条颜色
      lineStyle: {
        color: "purple",
      },
      // 渐变填充颜色
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "purple",
            },
            {
              offset: 1,
              color: "#fff",
            },
          ],
          global: false,
        },
      },
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
    lineCharts.setOption(option);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
