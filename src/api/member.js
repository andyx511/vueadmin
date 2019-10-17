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
