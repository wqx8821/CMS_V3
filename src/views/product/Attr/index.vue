<template>
  <div>
    <!-- 分类选择 -->
    <el-card class="">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <!-- 属性展示 -->
    <el-card style="margin-top: 30px">
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr()"
          >添加属性</el-button
        >
        <el-table :data="attrList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="140">
          </el-table-column>
          <el-table-column prop="attrValueList" label="属性列表">
            <template #default="{ row, $index }">
              <el-tag
                type="success"
                v-for="item in row.attrValueList"
                :key="item.id"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="180">
            <template #default="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
                >编辑</el-button
              >
              <el-button type="warning" icon="el-icon-edit" size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加修改页面 -->
      <div v-show="!isShowTable">
        <el-form :model="attrInfo">
          <el-form-item label="添加属性" width="30%">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addAttrValue()"
            :disabled="!attrInfo.attrName"
            >添加属性值</el-button
          >
          <el-button @click="isShowTable = true">取消</el-button>
          <el-table
            border
            style="margin-top: 10px; width: 100%"
            :data="attrInfo.attrValueList"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="80"
            ></el-table-column>
            <el-table-column label="属性值" width="width" prop="prop">
              <template #default="{ row, $index }">
                <el-input
                  v-model="row.valueName"
                  placeholder="请输入属性值名称"
                  v-if="row.flag"
                  @blur="toLook(row)"
                  @keyup="row.flag = false"
                ></el-input>
                <span style="display: block" @click="row.flag = true" v-else>{{
                  row.valueName
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="width">
              <template #default="{ row, $index }">
                <!-- 气泡确认框 -->
                <el-popconfirm
                  :title="`确定删除${row.valueName}?`"
                  @onConfirm="deleteAttrValue($index)"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    slot="reference"
                  ></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" icon="el-icon-plus">保存</el-button>
          <el-button @click="isShowTable = true">取消</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      // 新增或修改时使用
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分几级id
      },
    };
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      //区分三级分类相应的id，以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else if (level == 3) {
        this.category3Id = categoryId;
        //发请求获取平台的属性数据
        this.getAttrList();
      }
    },
    getAttrList() {
      let ids = [this.category1Id, this.category2Id, this.category3Id];
      this.$store.dispatch("product/getAttrList", ids).then((result) => {
        if (result.code == 200) {
          this.attrList = result.data;
          console.log(this.attrList);
        }
      });
    },
    // 添加属性值
    addAttrValue() {
      console.log("object");
      this.attrInfo.attrValueList.push({
        attrId: undefined,
        valueName: "",
        flag: true, // 新增字段 标记是否是编辑模式 input 转 span
      });
    },
    // 添加按钮的显示与隐藏
    addAttr() {
      this.isShowTable = false;
      // 每次点击添加时清空之前的内容
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id, // 收集三级分类的id
        categoryLevel: 3, //因为服务器也需要区分几级id
      };
    },
    // 编辑属性按钮
    updateAttr(row) {
      // 是否显示 table
      isShowTable = false;
      this.attrInfo = cloneDeep(row); // 深拷贝
    },
    //失却焦点的事件---切换为查看模式，展示span
    toLook(row) {
      // 如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正常的属性值");
        return;
      }
      //新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        //需要将row从数组里面判断的时候去除
        //row最新新增的属性值【数组的最后一项元素】
        //判断的时候，需要把已有的数组当中新增的这个属性值去除
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });

      if (isRepat) return;
      // row：形参是当前用户添加的最新的属性值
      // 当前编辑模式变为查看模式【让input消失，显示span】
      row.flag = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
