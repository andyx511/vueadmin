import request from '@/utils/request'

export function generateOrder(data) {
  return request({
    url:'order/generateOrder',
    method:'post',
    data
  })
}
