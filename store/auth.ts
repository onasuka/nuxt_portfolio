// const state = () => ({
//     user: null,
//   })
  
//   const mutations = {
//     SET_USER(state, user) {
//       state.user = user
//     }
//   }
  
//   const action = {
//     async onAuthStateChangedAction(state, { authUser, claims }) {
//       if (!authUser) {
//         // authされていない場合
//         state.commit('SET_USER', null)
  
//         // リダイレクトの設定
//         this.$router.push({
//           path: '/auth/aignin',
//         })
//       } else {
//         // authされている場合
//         const { uid, email } = authUser
//         state.commit('SET_USER', {
//           uid,
//           email,
//         })
//       }
//     },
//     register(user) {
//       this.$auth.createUserWithEmailAndPassword(user.email,user.password)
//         .then(function(user){
//           alert("登録しました");
//         })
//         console.log(user)
//     },
//       hogehoge() {
//     console.log('いけてr')
//   }
//   }
  
//   const getters = {
//     getUser(state) {
//       return state.user
//     }
//   }