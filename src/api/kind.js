import request from '@/utils/request'

export function getKindList(params) {
  return request({
    url: '/kind/list',
    method: 'get',
    params: params
  })
}
