import request from '@/utils/request'
export function add(data) {
  return request({
    url:'comment/add',
    method:'post',
    data
  })
}
export function deleteed(params) {
  return request({
    url:'comment/delete',
    method: 'get',
    params: params
  })
}
export function geiList(params) {
  return request({
    url:'comment/list',
    method: 'get',
    params: params
  })
}
