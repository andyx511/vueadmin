import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
/**
 * 图片验证码地址
 * @type {string}
 */
export const tcode = 'http://114.55.94.250:8888/admin/getTCode'

export function getVCode(data) {
  return request({
    url: '/admin/getVCode',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data
  })
}
export function reset(data) {
  return request({
    url: '/admin/reset',
    method: 'post',
    data
  })
}
export function getMemberInfo(){
  return request({
    url:'/member/info',
    method: 'get'
  })
}
