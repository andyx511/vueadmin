import request from '@/utils/request'
export function getList(params) {
  return request({
    url:'admin/list',
    method:'get',
    params:params
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
