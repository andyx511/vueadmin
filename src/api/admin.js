import request from '@/utils/request'
export function getList(params) {
  return request({
    url:'admin/list',
    method:'get',
    params:params
  })
}
export function add(data) {
  return request({
    url:'admin/add',
    method:'post',
    data
  })
}
export function jin(params) {
  return request({
    url:'admin/jin',
    method: 'get',
    params:params
  })
}
export function qi(params) {
  return request({
    url:'admin/qi',
    method:'get',
    params:params
  })
}
