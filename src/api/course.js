import request from '@/utils/request'

export function findAll() {
  return request({
    url: '/course',
    method: 'get'
  })
}

export function add(course) {
  return request({
    url: '/course',
    method: 'post',
    data: course
  })
}

export function update(course) {
  return request({
    url: '/course',
    method: 'put',
    data: course
  })
}

export function deleteById(id) {
  return request({
    url: '/course/' + id,
    method: 'delete'
  })
}

export function selectById(id) {
  return request({
    url: '/course/' + id,
    method: 'get'
  })
}
