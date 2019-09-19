import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
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
export const tcode = 'http://127.0.0.1:8888/admin/getTCode'
