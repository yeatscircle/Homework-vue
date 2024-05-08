import request from '@/utils/request'

export function page(name,serialNumber,week,begin,end,page,pageSize) {
  return request({
    url: '/course/plan?name='+name+'&serial_number='+serialNumber+'&week='+week+'&begin='+begin+'&end='+end+'&page='+page+'&pageSize='+pageSize,
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

