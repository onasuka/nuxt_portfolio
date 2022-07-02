import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'myApp',
    paths: [
      'headlines.headline',
      'loggedIn',
      'wordList',
      'profile'
    ]
  })(store)
}