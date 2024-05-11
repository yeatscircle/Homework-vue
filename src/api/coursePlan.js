import request from '@/utils/request'

export function page(name, serialNumber, week, page, pageSize) {
  return request({
    url: '/course/plan?name=' + name + '&serial_number=' + serialNumber + '&week=' + week + '&page=' + page + '&pageSize=' + pageSize,
    method: 'get'
  })
}

export function update(course) {
  return request({
    url: '/course/plan',
    method: 'put',
    data: course
  })
}

export function selectById(id) {
  return request({
    url: '/course/plan/' + id,
    method: 'get'
  })
}

export function add(course) {
  return request({
    url: '/course/plan',
    method: 'post',
    data: course
  })
}

