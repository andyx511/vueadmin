import request from '@/utils/request'

export function addGoodRecommend(data) {
  return request({
    url: 'recommend/addGood',
    method:'post',
    data
  })
}
export function getGoodList() {
  return request({
    url: 'recommend/goodList',
    method: 'get'
  })
}
export function setSort(params) {
  return request({
    url: 'recommend/editGood',
    method: 'get',
    params:params
  })
}
export function deleteGood(id) {
  return request({
    url:'recommend/deleteGood/'+id,
    method:'delete'
  })
}
