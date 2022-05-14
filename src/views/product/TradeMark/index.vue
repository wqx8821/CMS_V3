<template>
  <div class="trademark">
    <div class="">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        >添加</el-button
      >
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
        <template #default="scoped">
          <el-button
            type="warning"
            icon="el-icon-edit"
            @click="updateTradeMark(scoped.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDeleteTrademark(scope.row)"
            >删除</el-button
          >
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
    <el-dialog
      :title="tmForm.id ? '更新品牌' : '添加品牌'"
      :visible.sync="dialogVisible"
      width="650px"
    >
      <el-form width="80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="商品名称" width="80px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="商品LOGO" width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <template #tip><div>只能上传jpg/png 且不能超过500k</div></template>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUpdateTradeMark()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import product from '@/store/modules/product'

export default {
  name: 'trademark',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      list: [],
      // 对话框
      dialogVisible: false,
      // upload
      tmForm: {
        logoUrl: '',
        tmName: ''
      },
      // 表单校验规则
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        logoUrl: [{ required: true, message: '请选择品牌logo' }]
      }
    }
  },
  mounted() {
    this.handleCurrentChange()
    this.handleDeleteTrademark()
  },
  methods: {
    // 获取品牌列表数据
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
    },
    // 图片上传
    handleAvatarSuccess(res) {
      this.imageUrl = res.data
      console.log(res)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加|修改 商品
    addUpdateTradeMark() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 关闭弹窗
          this.dialogVisible = false
          // 确定后发起请求
          this.$store
            .dispatch('product/addTrademarkAction', this.tmForm)
            .then((res) => {
              console.log(res)
              if (res.status == 200) {
                this.$message({
                  type: 'success',
                  message: this.tmForm.id ? '更新数据成功' : '添加成功'
                })
              }
            })
        } else {
          console.log()
        }
      })
    },
    // 品牌编辑
    updateTradeMark(row) {
      console.log(row)
      this.tmForm = { ...row }
    },
    // 品牌删除
    handleDeleteTrademark(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 发起请求
          this.$store
            .dispatch('product/deleteTrademarkAction', row.id)
            .then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 再次获取品牌列表数据
              this.handleCurrentChange()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  padding-top: 10px;
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #6c6767;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
