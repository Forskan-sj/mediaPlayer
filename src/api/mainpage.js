import request from '@/utils/request'

export function getCate(params) {
  return request({
    url: '/index/getCate',
    method: 'post',
    data: {
      params
    }
  })
}

export function getCourse(token) {
  return request({
    url: '/course/getCourse',
    method: 'post',
    data: {
      token
    }
  })
}

export function getPlan(token) {
  return request({
    url: '/course/myStudy',
    method: 'post',
    data: {
      token
    }
  })
}

export function search(key) {
  return request({
    url: '/course/searchCourse',
    method: 'post',
    data: {
      key
    }
  })
}

export function delCourse(id) {
  return request({
    url: '/course/delStudy',
    method: 'post',
    data: {
      id
    }
  })
}

export function getCourseShow(id) {
  return request({
    url: '/course/getCourseShow',
    method: 'post',
    data: {
      id
    }
  })
}

export function getPoster(id) {
  return request({
    url: '/index/getPoster',
    method: 'post',
    data: {
      id
    }
  })
}

export function pushTime(course_id, chapter_id, time) {
  return request({
    url: '/course/pushTime',
    method: 'post',
    data: {
      course_id,
      chapter_id,
      time
    }
  })
}

export function courseLike(course_id, status) {
  return request({
    url: '/course/doLike',
    method: 'post',
    data: {
      course_id,
      status
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getURLParams() {
  var hrefurl = location.href
  var theRequest = {}
  if (hrefurl.lastIndexOf('?') !== -1) {
    var str = hrefurl.substr(hrefurl.lastIndexOf('?') + 1)
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      var tempData = strs[i].split('=')
      theRequest[tempData[0]] = decodeURIComponent(tempData[1])
    }
  }
  return theRequest
}
