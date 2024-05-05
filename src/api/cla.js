import request from '@/utils/request'

export function findAll() {
  return request({
    url: '/cla',
    method: 'get'
  })
}

export function add(dept) {
  return request({
    url: '/cla',
    method: 'post',
    data: dept
  })
}

export function update(dept) {
  return request({
    url: '/cla',
    method: 'put',
    data: dept
  })
}

export function deleteById(id) {
  return request({
    url: '/cla/' + id,
    method: 'delete'
  })
}

export function selectById(id) {
  return request({
    url: '/cla/' + id,
    method: 'get'
  })
}
