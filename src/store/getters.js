const getters = {
  tabIndex: state => state.app.tabIndex,
  ckIndex: state => state.app.ckIndex,
  token: state => state.user.token,
  courseId: state => state.app.courseId,
  name: state => state.user.name,
  roles: state => state.user.roles,
  name2: state => state.user.name2
}
export default getters
