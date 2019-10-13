import request from '@/utils/request'

export function generateOrder(data) {
  return request({
    url:'order/generateOrder',
    method:'post',
    data
  })
}
export function getMemberOrder(params) {
  return request({
    url:'order/memberOrderList',
    method: 'get',
    params:params
  })
}
export function chooseAddress(addressId,id) {
  return request({
    url:'order/chooseAddress/'+id,
    method:'get',
    params: addressId
  })
}
export function detail(id) {
  return request({
    url:'order/detail/'+id,
    method:'get'
  })
}
export function pay(id) {
  return request({
    url: 'order/payForOrder/'+id,
    method: 'post'
  })
}
