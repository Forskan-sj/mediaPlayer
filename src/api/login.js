import request from '@/utils/request'

export function login(needID) {
  return request({
    url: '/index/checkUser',
    method: 'post',
    data: {
      needID
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
