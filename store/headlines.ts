import moment from "moment";
export const state = () => ({
  headlines: [],
  headline: null,
});

export const mutations = {
  setHeadlines(state, payload) {
    state.headlines = payload
    // console.log(payload + "読み込めているよ")
    for (let i = 0; i < payload.length; i++) {
      state.headlines[i].publishedAt = moment(payload.publishedAt).format("YYYY年M月D日")
    }
  }, 
  setHeadline(state, payload) {
    state.headline = payload
  },
};

export const actions = {
  async loadHeadlines({ commit } , payload) {
    try {
      let { articles } = await this.$axios.$get(payload);
      // console.log(articles)
      let headlines = articles.map((article) => {
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
  submitHeadline({ commit } , headline ) {
    commit("setHeadline", headline)
  },
};

export const getters = {
  headlines(state ) {
    return state.headlines
  }, 
  headline(state ) {
    return state.headline
  },
  authUser(state ) {
    return state.authUser
  },
};
