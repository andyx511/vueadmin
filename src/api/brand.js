import request from '@/utils/request'

/* export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}*/
export function getList(params) {
  return request({
    url: '/brand/list',
    method: 'get',
    params: params
  })
}
export function add(data) {
  return request({
    url: 'brand/add',
    method: 'post',
    data
  })
}
