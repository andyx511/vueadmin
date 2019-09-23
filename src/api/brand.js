import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/brand/list',
    method: 'get',
    params: params
  })
}
export function add(data) {
  return request({
    url: '/brand/add',
    method: 'post',
    data
  })
}
export function detail(id) {
  return request({
    url: '/brand/detail/' + id,
    method: 'get'
  })
}
export function update(data) {
  return request({
    url: '/brand/update',
    method: 'post',
    data
  })
}

export function deletes(data) {
  return request({
    url: '/brand/delete',
    method: 'post',
    data
  })
}
