import request from '@/utils/request'

export function addHotRecommend(data) {
  return request({
    url: 'recommend/addHot',
    method:'post',
    data
  })
}
export function getHotList() {
  return request({
    url: 'recommend/hotList',
    method: 'get'
  })
}
export function setSort(params) {
  return request({
    url: 'recommend/editHot',
    method: 'get',
    params:params
  })
}
export function deleteHot(id) {
  return request({
    url:'recommend/deleteHot/'+id,
    method:'delete'
  })
}
