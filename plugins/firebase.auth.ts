import firebase from '~/plugins/firebase'

export default (context:any) => {
    const { store } = context
    const auth = firebase.auth
    return new Promise((resolve, reject) => {
        auth().onAuthStateChanged(user => {
            store.commit('setUser', user)
            resolve(user)
        })
    })
}