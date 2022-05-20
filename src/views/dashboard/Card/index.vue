<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <detail title="总销售额" count="88460">
            <template #charts>
              <span>周同比 {{}} ⬆️</span>
              <span>日同比 {{}} ⬇️</span>
            </template>
            <template #footer>
              <div>哈哈哈</div>
            </template>
          </detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <detail title="访问量" count="88460">
            <template #charts>
              <lineChart>折线图</lineChart>
            </template>
            <template #footer>
              <div>哈哈哈</div>
            </template>
          </detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <detail title="支付笔数" count="88460">
            <template #charts>
              <barChart>柱状图</barChart>
            </template>
            <template #footer>
              <div>转化率</div>
            </template>
          </detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <detail title="运营活动项目" count="88460">
            <template #charts>
              <progressChart>进度条</progressChart>
            </template>
            <template #footer>
              <div>哈哈哈</div>
            </template>
          </detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import detail from "./Detail/index.vue";
import lineChart from "./lineChart/index.vue";
import barChart from "./barChart/index.vue";
import progressChart from "./progressChart/index.vue";
export default {
  data() {
    return {};
  },
  components: {
    detail,
    lineChart,
    barChart,
    progressChart,
  },
};
</script>

<style lang="scss" scoped></style>
