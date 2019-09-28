import request from '@/utils/request'

export function addProduct(data) {
  return request({
    url: 'product/add',
    method: 'post',
    data
  })
}
export function getProductList(params) {
  return request({
    url: 'product/list',
    method: 'get',
    params: params
  })
}
