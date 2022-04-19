// import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

export const state = () => ({
  headlines: [],
  headline: null,
  user: null,
});

export const mutations = {
  setHeadlines(state:any, payload:any) {
    state.headlines = payload
    for (let i = 0; i < payload.length; i++) {
      state.headlines[i].publishedAt = moment(payload.publishedAt).format("YYYY年M月D日")
    }
  }, 
  setHeadline(state:any, payload:any) {
    state.headline = payload
  },
  SET_USER(state, user) {
    state.user = user
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

  async onAuthStateChangedAction(state, { authUser, claims }) {
    if (!authUser) {
      // authされていない場合
      state.commit('SET_USER', null)

      // リダイレクトの設定
      this.$router.push({
        path: '/auth/aignin',
      })
    } else {
      // authされている場合
      const { uid, email } = authUser
      state.commit('SET_USER', {
        uid,
        email,
      })
    }
  },
  register() {
    console.log(this.user.email)
    this.$auth.createUserWithEmailAndPassword(this.user.email,this.user.password)
      .then(function(user){
        alert("登録しました");
      })

  },
  hogehoge() {
    console.log('いけてr')
  }
};

export const getters = {
  headlines(state:any ) {
    return state.headlines
  }, 
  headline(state:any ) {
    return state.headline
  },
  getUser(state) {
    return state.user
  }
};
