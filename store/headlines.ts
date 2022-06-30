import moment from "moment";
import { $axios } from '~/utils/api'

export const state = () => ({
  headlines: [],
  headline: null,
});

export const mutations = {
  setHeadlines(state:any, payload:{length: number,publishedAt: string}) {
    state.headlines = payload
    console.log(state)
    console.log(payload)
    for (let i = 0; i < payload.length; i++) {
      state.headlines[i].publishedAt = moment(payload.publishedAt).format("YYYY年M月D日")
    }
  }, 
  setHeadline(state:{headline:string}, payload:string) {
    state.headline = payload
  },
};

export const actions = {
  async loadHeadlines({ commit }:any , payload:string) {
    try {
      let { articles } = await $axios.$get(payload);
      // console.log(articles)
      let headlines = articles.map((article:{title: string,publishedAt: string}) => {
        const slug = article.title.substring(0, 5) + article.publishedAt.substring(0,4)
        const headline = { ...article, slug }
        return headline;
      });
      commit("setHeadlines", headlines)
    } catch (e) {
      console.log(e);
    }
  }, 
  submitHeadline({ commit }:any , headline :string ) {
    commit("setHeadline", headline)
  },
};

export const getters = {
  headlines(state:{headlines: string} ) {
    return state.headlines
  }, 
  headline(state:{headline: string}  ) {
    return state.headline
  },
  authUser(state:{authUser: string}  ) {
    return state.authUser
  },
};
