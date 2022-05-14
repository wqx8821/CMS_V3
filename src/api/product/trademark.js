import request from '@/utils/request'

export const getTradeMark = (page, limit) => {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}

// 添加品牌 参数 名称 logo
export const addTradeMark = (data) => {
  return request({
    url: `/admin/product/baseTrademark/save`,
    method: 'put',
    data
  })
}

// 更新品牌信息 参数 （id 名称 logo）
export const updateTradeMark = (data) => {
  return request({
    url: `/admin/product/baseTrademark/update`,
    method: 'post',
    data
  })
}

// 删除品牌
export const deleteTradeMark = (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}
