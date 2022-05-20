<template>
  <div class="charts" ref="chartRef"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  mounted() {
    let lineCharts = echarts.init(this.$refs.chartRef);
    let option = {
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        // 均分
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [21],
          //  柱状图宽度
          barWidth: 10,
          // color: "#fff",
          // 背景颜色
          showBackground: true,
          backgroundStyle: {
            color: "#000",
          },
          label: {
            text: "|",
            show: true,
            position: "right",
          },
        },
      ],
    };
    lineCharts.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
