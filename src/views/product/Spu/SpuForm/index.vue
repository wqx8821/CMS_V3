<template>
  <div>
    <el-form width="80px">
      <el-form-item label="spu名称">
        <el-input placeholder="请输入名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="spu图片管理">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          v-model="attrIdAndAttrName"
          :placeholder="`还有${unSelectSaleAttr.length}未选择属性`"
        >
          <el-option
            :label="unselect.name"
            v-for="(unselect, index) in unSelectSaleAttr"
            :value="unselect.id"
            :key="unselect.id"
          ></el-option>
          <el-button
            type="primary"
            :disabled="!attrIdAndAttrName"
            @click="addSaleAttr"
            >添加销售属性</el-button
          >
        </el-select>
        <!-- 展示的是当前SPU属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <!-- el-tag:用户展示已有属性值列表的数据的 -->
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                >{{ tag.saleAttrValueName }}</el-tag
              >
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <!-- @click="showInput" -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: "",
      spu: {
        category3Id: 0, //三级分类的id
        description: "", //描述
        spuName: "", //spu名称
        tmId: "", //平台的id
        spuImageList: [
          //收集SPU图片的信息
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        //平台属性与属性值收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      tradeMarkList: [],
      spuImageList: [],
      saleAttrList: [],
      attrIdAndAttrName: "", // 未选择的销售属性ID
    };
  },
  computed: {
    unSelectSaleAttr() {
      return this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((res) => {
          return item.name != res.SaleAttrName;
        });
      });
    },
  },
  methods: {
    //照片墙删除某一个图片的时候会触发
    handleRemove(file, fileList) {
      //file参数:代表的是删除的那个张图片 fileList:照片墙删除某一张图片以后，剩余的其他的图片
      //收集照片墙图片的数据 对于已有的图片【照片钱中显示的图片：有name、url字段的】，因为照片墙显示数据务必要有这两个属性
      //对于服务器而言，不需要name、url字段，将来对于有的图片的数据在提交给服务器的时候，需要处理的
      this.spuImageList = fileList;
    },
    //照片墙图片预览的回调
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url; //将图片地址赋值给这个属性
      this.dialogVisible = true; //对话框显示
    },
    //照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      //收集图片的信息
      this.spuImageList = fileList;
    },
    // 请求
    initSpuData(spuRow) {
      this.$store.dispatch("product/reqSpu", spuRow.id).then((res) => {
        this.spu = res.data;
      });
      // 获取品牌信息
      this.$store.dispatch("product/reqTradeMarkList").then((res) => {
        this.tradeMarkList = res.data;
      });
      // 获取图片信息
      this.$store.dispatch("product/reqSpuImageList", spuRow.id).then((res) => {
        let tempArr = res.data;
        // 由于照片墙属性不同，需要先处理一下数据
        tempArr.forEach((res) => {
          (res.name = res.imgName), (res.url = res.imgUrl);
        });
        this.spuImageList = tempArr;
      });
      // 获取平台销售属性信息
      this.$store.dispatch("product/reqBaseSaleAttrList").then((res) => {
        this.saleAttrList = res.data;
      });
    },
    // 添加新的销售属性
    addSaleAttr() {
      // 处理收集到的属性
      let [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      // 将新的销售属性 添加进spu 的spuSaleAttrList 属性中
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      // 添加后清空数组
      this.attrIdAndAttrName = "";
    },
    // 添加按钮回调
    addSaleAttrValue(row) {
      // 点击时 将tag 转变为input 但不是响应式的
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    // input失去焦点事件
    handleInputConfirm() {
      // 解构出属性
      const { baseSaleAttrId, inputValue } = row;
      // 格式校验
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      const temp = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName === inputValue
      );
      if (temp) {
        this.$message("属性名不能重复");
        return;
      }
      // 处理数据
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName, inputValue };
      //新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      // 切换回tag
      row.row.inputVisible = false;
    },
    cancel() {
      this.$emit("changeScene", { scene: 0, flag: "" });
      // 取消后清空数据
      Object.assign(this._data, this.$option.data());
    },
    // 最后的保存按钮处理
    addOrUpdateSpu() {
      // 整理参数
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url,
        };
      });
      this.$store
        .dispatch("product/reqAddOrUpdateSpu", this.spu)
        .then((res) => {
          if (res.code == 200) {
            this.$message({ type: "success", message: "保存成功" });
            //通知父组件回到场景0
            this.$emit("changeScene", {
              scene: 0,
              flag: this.spu.id ? "修改" : "添加",
            });
          }
        });
      // 保存后也要后清空数据
      Object.assign(this._data, this.$option.data());
    },
    // 子组件 通知 添加spu
    addSpuData() {
      // 获取品牌信息
      this.$store.dispatch("product/reqTradeMarkList").then((res) => {
        this.tradeMarkList = res.data;
      });
      // 获取平台销售属性信息
      this.$store.dispatch("product/reqBaseSaleAttrList").then((res) => {
        this.saleAttrList = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
