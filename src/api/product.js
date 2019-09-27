import request from '@/utils/request'

export function addProduct(data) {
  return request({
    url: 'product/add',
    method: 'post',
    data
  })
}
