import { v4 as uuidv4 } from 'uuid';

export const state = () => ({
  headlines: [],
  headline: null,
});

export const mutations = {
  setHeadlines(state:any, payload:any) {
    state.headlines = payload;
    // console.log(state.headlines)
  }, 
  setHeadline(state:any, payload:any) {
    state.headline = payload;
  },
};

export const actions = {
  async loadHeadlines({ commit }:any , payload:any) {
    try {
      let articles = await this.$axios.$get(payload);
      commit("setHeadlines", articles.results);
    } catch (e) {
      console.log("↓ここからAPIエラー！");
      console.log(e);
    }
  }, 
  submitHeadline({ commit }:any , headline:any ) {
    commit("setHeadline", headline);
  },
};

export const getters = {
  headlines(state:any ) {
    return state.headlines;
  }, 
  headline(state:any ) {
    return state.headline;
  },
};
