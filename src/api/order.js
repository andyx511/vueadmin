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
export function pay(id,params) {
  return request({
    url: 'order/payForOrder/'+id,
    method: 'post',
    params:params
  })
}
export function orderList(params) {
  return request({
    url:'order/orderList',
    method:'get',
    params:params
  })
}
export function delivery(id) {
  return request({
    url:'order/delivery/'+id,
    method:'post'
  })
}
export function applyReturn(data) {
  return request({
    url: 'order/applyReturn',
    method:'post',
    data
  })
}
export function getp(id) {
  return request({
    url: 'order/getp/'+id,
    method: 'get'
  })
}
export function orderReturn(params) {
  return request({
    url: 'order/applyReturnList',
    method: 'get',
    params:params
  })
}
export function returnDetail(id) {
  return request({
    url: 'order/applyReturnDetail/'+id,
    method: 'get'
  })
}
export function querentui(data) {
  return request({
    url:'order/querentui',
    method:'post',
    data
  })
}
export function jujue(data) {
  return request({
    url:'order/jujue',
    method:'post',
    data
  })
}
export function querenshou(data) {
  return request({
    url:'order/querenshou',
    method:'post',
    data
  })
}
