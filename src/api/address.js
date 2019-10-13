import request from '@/utils/request'
import {updateRole} from "./role";
export function getAddressList() {
  return request({
    url:'/address/list',
    method:'get'
  })
}
export function addAddress(data) {
  return request({
    url:'/address/add',
    method: 'post',
    data
  })
}
export function editAddress(data) {
  return request({
    url:'/address/edit',
    method:'post',
    data
  })
}
export function deleteAddress(id) {
  return request({
    url:'/address/delete/'+id,
    method:'get'
  })
}
export function detail(id) {
  return request({
    url: '/address/detail/'+id,
    method: 'get'
  })
}
