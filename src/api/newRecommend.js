import request from '@/utils/request'

export function addNewRecommend(data) {
  return request({
    url: 'recommend/addNew',
    method:'post',
    data
  })
}
export function getNewList() {
  return request({
    url: 'recommend/newList',
    method: 'get'
  })
}
export function setSort(params) {
  return request({
    url: 'recommend/editNew',
    method: 'get',
    params:params
  })
}
export function deleteNew(id) {
  return request({
    url:'recommend/deleteNew/'+id,
    method:'delete'
  })
}
