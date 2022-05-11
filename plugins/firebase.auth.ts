import firebase from '~/plugins/firebase'

export default (context:any) => {
    const { store } = context
    const auth = firebase.auth
    return new Promise((resolve, reject) => {
        auth().onAuthStateChanged(user => {
            //本来は、ここで必要なユーザー情報のオブジェクトを作成して
            //ユーザー情報としてセットする方が好ましいですが、
            //サンプルなので、全てセットしています。
            store.commit('setUser', user)
            resolve()
        })
    })
}