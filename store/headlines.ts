import moment from "moment";

export const state = () => ({
  headlines: [],
  headline: null,
  authUser: null
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
  RESET_STORE: (state:any) => {
    Object.assign(state, state)
  },

  SET_AUTH_USER: (state:any, { authUser }:any) => {
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
      console.log(articles)
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
  async nuxtServerInit({ dispatch }:any, ctx:any) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },

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

  checkVuexStore(ctx:any) {
    if (this.$fire.auth === null) {
      throw 'Vuex Store example not working - this.$fire.auth cannot be accessed.'
    }

    alert(
      'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
    )
  },
};

export const getters = {
  headlines(state:any ) {
    return state.headlines
  }, 
  headline(state:any ) {
    return state.headline
  },
  isLoggedIn: (state) => {
    try {
      return state.authUser.uid !== null
    } catch {
      return false
    }
  }
};
