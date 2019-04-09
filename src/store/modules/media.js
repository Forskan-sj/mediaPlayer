// import { login, logout, getInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'

const media = {
  state: {
    audio: {
      'id': 0,
      'name': '',
      'url': ''
    },
    currentIndex: 0,
    bplaying: false,
    bloading: false,
    showDetail: false,
    mediaList: [],
    currentTime: 0,
    tmpCurrentTime: 0,
    durationTime: 0,
    bufferedTime: 0,
    change: false
  },
  mutations: {
    play(state) {
      state.bplaying = true
    },
    pause(state) {
      state.bplaying = false
    },
    toggleDetail(state) {
      state.showDetail = !state.showDetail
    },
    setMedia(state) {
      state.audio = state.mediaList[state.currentIndex - 1]
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
      state.currentIndex++
      if (state.currentIndex > state.mediaList.length) {
        state.currentIndex = 1
      }
      state.audio = state.mediaList[state.currentIndex - 1]
    },
    playPrev(state) {
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
  actions: {
  }
}

export default media
