import { v4 as uuidv4 } from 'uuid';

export const state = () => ({
  headlines: [],
  headline: null,
});

export const mutations = {
  setHeadlines(state, payload) {
    state.headlines = payload;
  }, 
  setHeadline(state, payload) {
    state.headline = payload;
  },
};

export const actions = {
  async loadHeadlines({ commit }, payload) {
    try {
      const { articles } = await this.$axios.$get(payload);
      // console.log({ articles })

      const headlines = articles.map((article) => {
        const slug = uuidv4(article.title);
        const headline = { ...article, slug };
        console.log({ article })
        return headline;
      });

      commit("setHeadlines", headlines);
    } catch (e) {
      console.log(e);
    }
  }, 
  submitHeadline({ commit }, headline) {
    console.log("store", headline);
    commit("setHeadline", headline);
  },
};

export const getters = {
  headlines(state) {
    return state.headlines;
  }, 
  headline(state) {
    return state.headline;
  },
};
