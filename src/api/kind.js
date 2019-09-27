import request from '@/utils/request'

export function getKindList(params) {
  return request({
    url: '/kind/list',
    method: 'get',
    params: params
  })
}

export function add(data) {
  return request({
    url: '/kind/add',
    method: 'post',
    data
  })
}
export function detail(id) {
  return request({
    url: '/kind/detail/' + id,
    method: 'get'
  })
}
export function update(data) {
  return request({
    url: '/kind/update',
    method: 'post',
    data
  })
}
export function deleteBrand(params) {
  return request({
    url: '/kind/delete',
    method: 'get',
    params: params
  })
}


