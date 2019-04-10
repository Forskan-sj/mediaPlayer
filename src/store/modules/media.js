import { pushTime } from '@/api/mainpage'
// import { getToken, setToken, removeToken } from '@/utils/auth'

const media = {
  state: {
    audio: {
      'id': 0,
      'title': '',
      'media': '',
      'rtime': 0
    },
    courseInfo: {
      id: 0,
      poster: ''
    },
    currentIndex: 1,
    bplaying: false,
    bloading: false,
    showDetail: false, // 是否在详情页
    mediaList: [],
    currentTime: 0,
    tmpCurrentTime: 0,
    durationTime: 0,
    bufferedTime: 0,
    videoMark: false, // 是否为视频
    change: false
  },
  mutations: {
    play(state) {
      state.bplaying = true
    },
    pause(state) {
      state.bplaying = false
    },
    toggleDetail(state, flag) {
      state.showDetail = flag
    },
    setVideoMark(state, flag) {
      state.videoMark = flag
    },
    setMedia(state) {
      state.audio = state.mediaList[state.currentIndex - 1]
      if (state.audio.media.substring(state.audio.media.length - 3) === 'mp4') {
        state.videoMark = true
      } else {
        state.videoMark = false
      }
    },
    setCourseInfo(state, info) {
      state.courseInfo = info
    },
    setCurrentIndex(state, index) {
      state.currentIndex = index + 1
    },
    setAudioIndex(state, index) {
      state.audio = state.mediaList[index]
      state.currentIndex = index + 1
    },
    removeAudio(state, index) {
      state.mediaList.splice(index, 1)
      if (index === state.mediaList.length) {
        index--
      }
      state.audio = state.mediaList[index]
      state.currentIndex = index + 1
      if (state.mediaList.length === 0) {
        state.audio = {
          'id': 0,
          'name': '',
          'rul': ''
        }
        state.bplaying = false
      }
    },
    updateCurrentTime(state, time) {
      state.currentTime = time
    },
    updateDurationTime(state, time) {
      state.durationTime = time
    },
    updateBufferedTime(state, time) {
      state.bufferedTime = time
    },
    changeTime(state, time) {
      state.tmpCurrentTime = time
    },
    setChange(state, flag) {
      state.change = flag
    },
    openLoading(state) {
      state.bloading = true
    },
    closeLoading(state) {
      state.bloading = false
    },
    resetAudio(state) {
      state.currentTime = 0
    },
    playNext(state) {
      pushTime(state.courseInfo.id, state.mediaList[state.currentIndex - 1].id, state.currentTime).then(response => {
      })
      state.currentIndex++
      if (state.currentIndex > state.mediaList.length) {
        state.currentIndex = 1
      }
      state.audio = state.mediaList[state.currentIndex - 1]
    },
    playPrev(state) {
      pushTime(state.courseInfo.id, state.mediaList[state.currentIndex - 1].id, state.currentTime).then(response => {
      })
      state.currentIndex--
      if (state.currentIndex < 1) {
        state.currentIndex = 1
      }
      state.audio = state.mediaList[state.currentIndex - 1]
    },
    setMediaList(state, list) {
      if (list.length) {
        state.mediaList = list
      }
    }
  },
  actions: {}
}

export default media
