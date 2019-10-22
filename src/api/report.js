import request from '@/utils/request'
export function getVisit() {
  return request({
    url:'report/visit',
    method:'get'
  })
}
