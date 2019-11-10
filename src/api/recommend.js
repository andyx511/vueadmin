import request from '@/utils/request'

export function addBrandRecommend(data) {
  return request({
    url: 'recommend/addBrand',
    method:'post',
    data
  })
}
export function getBrandList() {
  return request({
    url: 'recommend/brandListHome',
    method: 'get'
  })
}
export function setSort(params) {
  return request({
    url: 'recommend/editBrand',
    method: 'get',
    params:params
  })
}
export function deleteBrand(id) {
  return request({
    url:'recommend/deleteBrand/'+id,
    method:'delete'
  })
}
