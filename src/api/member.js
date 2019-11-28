import request from '@/utils/request'
export function getMemberList(params) {
  return request({
    url: 'member/list',
    method: 'get',
    params:params
  })
}
export function dong(params) {
  return request({
    url:'member/dong',
    method: 'get',
    params:params
  })
}
export function jie(params) {
  return request({
    url: 'member/jie',
    method:'get',
    params:params
  })
}
export function info() {
  return request({
    url: 'member/info',
    method: 'get'
  })
}
export function chong(params) {
  return request({
    url: 'member/chong',
    method: 'get',
    params:params
  })
}
