const getters = {
  tabIndex: state => state.app.tabIndex,
  ckIndex: state => state.app.ckIndex,
  token: state => state.user.token,
  courseId: state => state.app.courseId,
  name: state => state.user.name,
  courseInfo: state => state.media.courseInfo,
  media: state => state.media.audio,
  bplaying: state => state.media.bplaying,
  bloading: state => state.media.bloading,
  showDetail: state => state.media.showDetail,
  durationTime: state => state.media.durationTime,
  currentIndex: state => state.media.currentIndex,
  bufferedTime: state => state.media.bufferedTime,
  tmpCurrentTime: state => state.media.tmpCurrentTime,
  mediaList: state => state.media.mediaList,
  currentTime: state => state.media.currentTime,
  change: state => state.media.change,
  prCurrentTime: state => {
    return state.media.currentTime / state.media.durationTime * 100
  },
  prBufferedTime: state => {
    return state.media.bufferedTime / state.media.durationTime * 100
  }
}
export default getters
