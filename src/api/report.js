import request from '@/utils/request'
export function getVisit() {
  return request({
    url:'report/visit',
    method:'get'
  })
}
export function brand() {
  return request({
    url: 'report/brand',
    method: 'get'
  })
}
export function kind() {
  return request({
    url: 'report/kind',
    method: 'get'
  })
}
export function order() {
  return request({
    url: 'report/order',
    method: 'get'
  })
}
export function stat() {
  return request({
    url: 'report/stat',
    method: 'get'
  })
}
export function memory() {
  return request({
    url:'report/memory',
    method:'get'
  })
}
