
const app = {
  state: {
    tabIndex: 0,
    ckIndex: 0,
    courseId: 0
  },
  mutations: {
    SET_CID: (state, val) => {
      state.courseId = val
    },
    TOGGLE_TABINDEX: (state, val) => {
      state.tabIndex = val
    },
    TOGGLE_CKINDEX: (state, val) => {
      state.ckIndex = val
    }
  },
  actions: {
    ToggleTabIndex: ({ commit }, val) => {
      commit('TOGGLE_TABINDEX', val)
    },
    SetCID: ({ commit }, val) => {
      commit('SET_CID', val)
    },
    ToggleCkIndex({ commit }, val) {
      commit('TOGGLE_CKINDEX', val)
    }
  }
}

export default app
