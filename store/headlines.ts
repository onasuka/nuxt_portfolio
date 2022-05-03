import moment from "moment";

export const state = () => ({
  headlines: [],
  headline: null,
  authUser:null
});

export const mutations = {
  setHeadlines(state:any, payload:any) {
    state.headlines = payload
    // console.log(payload + "読み込めているよ")
    for (let i = 0; i < payload.length; i++) {
      state.headlines[i].publishedAt = moment(payload.publishedAt).format("YYYY年M月D日")
    }
    // console.log(state.headlines)
  }, 
  setHeadline(state:any, payload:any) {
    state.headline = payload
  },
  setAuthUser(state:any, payload:any) {
    state.authUser 
  },
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },
  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    }
  }
};

export const actions = {
  async loadHeadlines({ commit }:any , payload:any) {
    try {
      let { articles } = await this.$axios.$get(payload);
      // console.log(articles)
      let headlines = articles.map((article:any) => {
        const slug = article.title.substring(0, 5) + article.publishedAt.substring(0,4)
        const headline = { ...article, slug }
        return headline;
      });

      commit("setHeadlines", headlines)
    } catch (e) {
      console.log("↓ここからAPIエラー！")
      console.log(e);
    }
  }, 
  submitHeadline({ commit }:any , headline:any ) {
    commit("setHeadline", headline)
  },
  // userData({ commit }:any , user:any) {
  //   console.log(user)
  //   commit("setAuthUser", user)
  // }
  async onAuthStateChanged({ commit }:any, { authUser }:any) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true)
        console.info('idToken', idToken)
      } catch (e) {
        console.error(e)
      }
    }
    commit('SET_AUTH_USER', { authUser })
  },
};

export const getters = {
  headlines(state:any ) {
    return state.headlines
  }, 
  headline(state:any ) {
    return state.headline
  },
  authUser(state:any ) {
    return state.authUser
  },
};
