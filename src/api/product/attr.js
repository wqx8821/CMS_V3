import request from "@/utils/request";

// 三级分类查询 第一级
export const CategoryList1 = () => {
  return request({
    url: "/admin/product/getCategory1",
    method: "get",
  });
};

//获取二级分类数据接口
export const CategoryList2 = (category1Id) => {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get",
  });
};

//获取三级分类数据接口
export const CategoryList3 = (category2Id) => {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get",
  });
};

//获取平台属性接口
export const AttrList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
};

//添加属性与属性值接口
///admin/product/saveAttrInfo  post
export const reqAddOrUpdateAttr = (data) => {
  return request({
    url: "/admin/product/saveAttrInfo",
    method: "post",
    data,
  });
};
