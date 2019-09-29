import request from '@/utils/request'
import {param} from "../utils";

export function addProduct(data) {
  return request({
    url: 'product/add',
    method: 'post',
    data
  })
}
export function getProductList(params) {
  return request({
    url: 'product/list',
    method: 'get',
    params: params
  })
}
export function deleteProdcuts(data) {
  return request({
    url: '/product/delete',
    method: 'post',
    data
  })
}
export function updateIsNew(params) {
  return request({
    url: '/product/updateIsNew',
    method: 'post',
    params:params
  })
}
export function updateIsPublic(params) {
  return request({
    url: '/product/updateIsPublic',
    method: 'post',
    params: params
  })
}
export function updateStock(params) {
  return request({
    url:'/product/updateStock',
    method: 'post',
    params: params
  })
}
export function updateStatus(params) {
  return request({
    url: '/product/updateStatus',
    method: 'post',
    params: params
  })
}

