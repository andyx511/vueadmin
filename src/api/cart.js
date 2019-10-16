import request from '@/utils/request'
export function addCart(data) {
  return request({
    url:'/cart/add',
    method: 'post',
    data
  })
}
export function getCart() {
  return request({
    url: '/cart/list',
    method: 'get'
  })
}
export function editCart(data) {
  return request({
    url:'/cart/edit',
    method:'post',
    data
  })
}
export function deleteCart(data) {
  return request({
    url:'/cart/delete',
    method: 'post',
    data
  })
}
export function getCount() {
  return request({
    url:'cart/getCount',
    method:'get'
  })
}
