import request from '@/utils/request'

export function page(name, gender, cla, begin, end, page, pageSize) {
  return request({
    url: '/stu?name=' + name + '&gender=' + gender + '&cla=' + cla + '&begin=' + begin + '&end=' + end + '&page=' + page + '&pageSize=' + pageSize,
    method: 'get'
  })
}

export function add(stu) {
  return request({
    url: '/stu',
    method: 'post',
    data: stu
  })
}

export function update(stu) {
  return request({
    url: '/stu',
    method: 'put',
    data: stu
  })
}

export function deleteById(id) {
  return request({
    url: '/stu/' + id,
    method: 'delete'
  })
}

export function selectById(id) {
  return request({
    url: '/stu/' + id,
    method: 'get'
  })
}

