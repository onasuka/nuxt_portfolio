import moment from "moment";
export const state = () => ({
  headlines: [],
  headline: null,
});

export const mutations = {
  setHeadlines(state:any, payload:any) {
    state.headlines = payload
    // console.log(payload + "読み込めているよ")
    for (let i = 0; i < payload.length; i++) {
      state.headlines[i].publishedAt = moment(payload.publishedAt).format("YYYY年M月D日")
    }
  }, 
  setHeadline(state:any, payload:any) {
    state.headline = payload
  },
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
