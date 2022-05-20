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
          type: "bar",
          data: [21, 32, 42, 21, 21, 32, 42, 21, 21, 32, 42, 21],
          color: "cyan",
        },
      ],
      tooltip: {},
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
