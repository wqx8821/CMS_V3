<template>
  <div style="min-height: 419px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="search-header">
          <span>线上人们搜索</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <LineChart></LineChart>
          </el-col>
          <el-col :span="12">
            <LineChart></LineChart>
          </el-col>
        </el-row>
        <!-- table -->
        <el-table style="width: 100%" border>
          <el-table-column prop="date" label="排名"> </el-table-column>
          <el-table-column prop="name" label="搜索关键字"> </el-table-column>
          <el-table-column prop="address" label="用户数" sortable>
          </el-table-column>
          <el-table-column prop="address" label="增长率" sortable>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import lineChart from "./lineChart/index.vue";
import LineChart from "./lineChart/index.vue";
export default {
  components: {
    lineChart,
    LineChart,
  },
};
</script>

<style lang="scss" scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
.box-card {
  height: 100%;
}
</style>
