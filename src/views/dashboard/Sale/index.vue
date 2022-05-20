<template>
  <div>
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <!-- 头部左侧 -->
        <el-tabs @tab-click="handleClick" class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visited"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧 -->
        <div class="clearfix-right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="6">
            <div style="padding: 0">门店{{ title }}排名</div>
            <ul>
              <li>
                <span class="right-index">0</span>
                <span>肯德基</span>
                <span class="rig-right">12123</span>
              </li>
              <li>
                <span class="right-index">0</span>
                <span>肯德基</span>
                <span class="rig-right">12123</span>
              </li>
              <li>
                <span class="right-index">0</span>
                <span>肯德基</span>
                <span class="rig-right">12123</span>
              </li>
              <li>
                <span class="right-index">0</span>
                <span>肯德基</span>
                <span class="rig-right">12123</span>
              </li>
              <li>
                <span class="right-index">0</span>
                <span>肯德基</span>
                <span class="rig-right">12123</span>
              </li>
              <li>
                <span class="right-index">0</span>
                <span>肯德基</span>
                <span class="rig-right">12123</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  data() {
    return {
      activeName: "sale",
      barChart: null,
      date: "", // 收集日历
    };
  },
  computed: {
    // 计算标题
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  mounted() {
    this.barChart = echarts.init(this.$refs.charts);
    let option = {
      title: {
        text: "ewrwrew",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          data: [10, 52, 200, 334, 390, 330, 220, 200, 334, 390, 330, 220],
        },
      ],
    };

    this.barChart.setOption(option);
  },
  methods: {
    handleClick() {},
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    //本周
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //本月
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //本年
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
  // 监听属性 当切换tab栏时 重新执行 setOption
  watch: {
    title() {
      // 图标的数据可以再次修改，传入配置会与之前的进行替换（差量更新）
      this.barChart.setOption({
        title: {
          text: this.title,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
  v-deep .el-tabs__nav-wrap::after {
    background-color: Transparent;
  }
}
.clearfix-right {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  span {
    width: 20%;
  }
}
.charts {
  height: 300px;
  width: 100%;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
  li {
    height: 8%;
    margin-top: 5px;
  }
}
.right-index {
  width: 15px;
  height: 15px;
  color: #fff;
  border-radius: 50%;
  background: black;
  text-align: center;
  line-height: 15px;
}
.rig-right {
  float: right;
}
</style>
