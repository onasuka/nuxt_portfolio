import { v4 as uuidv4 } from 'uuid';

export const state = () => ({
  headlines: [],
  headline: null,
});

export const mutations = {
  setHeadlines(state:any, payload:any) {
    state.headlines = payload;
  }, 
  setHeadline(state:any, payload:any) {
    state.headline = payload;
  },
};

export const actions = {
  async loadHeadlines({ commit }:any , payload:any) {
    try {
      const { articles } = await this.$axios.$get(payload);

      const headlines = articles.map((article:any) => {
        const slug = uuidv4(article.title);
        const headline = { ...article, slug };
        return headline;
      });

      commit("setHeadlines", headlines);
    } catch (e) {
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
