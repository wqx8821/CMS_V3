<template>
  <div class="trademark">
    <div class="">
      <el-button type="primary" icon="el-icon-plus">添加</el-button>
    </div>
    <el-table border :data="list">
      <el-table-column
        label="序号"
        width="80"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        width="width"
        align="center"
        prop="tmName"
      ></el-table-column>
      <el-table-column
        label="品牌logo"
        width="width"
        prop="logoUrl"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <el-image :src="row.logoUrl" style="height: 40px"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="width" align="center">
        <template #default>
          <el-button type="warning" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器：
    当前页 current-page
    总条数 total
    每页条数 page-size
    设置每条展示数据 page-sizes
    layout 布局
     -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        layout="total, prev, pager, next, ->, sizes, jumper "
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 弹出层 -->
    <el-dialog title="添加品牌" :visible.sync="dialogVisible" width="30%">
      <el-input title="活动名称"></el-input>
      <el-upload></el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'trademark',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      list: [],
      // 对话框
      dialogVisible: true
    }
  },
  mounted() {
    this.handleCurrentChange()
  },
  methods: {
    handleCurrentChange(pager = 1) {
      this.page = pager
      this.$store
        .dispatch('product/setTrademarkAction', {
          page: this.page,
          limit: this.limit
        })
        .then((res) => {
          this.total = res.data.total
          this.list = res.data.records
        })
    },
    handleSizeChange(pagesize) {
      this.limit = pagesize
      this.handleCurrentChange()
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  padding-top: 10px;
  text-align: center;
}
</style>
