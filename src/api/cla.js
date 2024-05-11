import request from '@/utils/request'

export function findAll() {
  return request({
    url: '/cla',
    method: 'get'
  })
}

export function add(cla) {
  return request({
    url: '/cla',
    method: 'post',
    data: cla
  })
}

export function update(cla) {
  return request({
    url: '/cla',
    method: 'put',
    data: cla
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

export function getClass() {
  return request({
    url: '/cla/Rep',
    method: 'get'
  })
}
