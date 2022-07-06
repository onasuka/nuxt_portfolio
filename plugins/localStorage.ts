import createPersistedState from 'vuex-persistedstate'

export default ({ store }:any) => {
  createPersistedState({
    key: 'myApp',
    paths: [
      'headlines.headline',
      'loggedIn',
      'profile'
    ]
  })(store)
}