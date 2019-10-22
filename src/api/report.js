import request from '@/utils/request'
export function getVisit() {
  return request({
    url:'report/getVisited',
    method:'get'
  })
}
