// import { vuexfireMutations } from 'vuefire'
// import createPersistedState from 'vuex-persistedstate'
// export const mutations = {
//     ...vuexfireMutations
// }
import { Store } from "vuex";
import { initialiseStores } from "~/utils/store-accessor";
const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];
export * from "~/utils/store-accessor";

//5/11追加分
import { auth, app } from "~/plugins/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, setDoc, getFirestore , doc, deleteDoc ,getDocs } from "firebase/firestore";
import { LoaderOptionsPlugin } from "webpack";

const db = getFirestore(app);
let userId = "";

auth().onAuthStateChanged(function(user) {
  // console.log(user?.uid)
  if (user) {
    return userId =user.uid
  }
});

export const strict = false;

export const state = () => ({
  user: null,
  loggedIn: false,
  marklists:[],
  markTitles: [],
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  login(state) {
    state.loggedIn = true;
  },
  logout(state) {
    state.loggedIn = false;
  },
  setArticle(state:any,payload:any) {
    let markitem = state.marklists
    markitem.push(payload)
    // console.log(state.marklists)
  },
  setTitle(state ,payload) {
    let title = state.markTitles
    title.push(payload)
    // console.log(state.markTitles)
  },
  signOut(state) {
    state.markTitles = []
  }
};

export const actions = {
  signUp({ commit }, { email, password }) {
    return auth().createUserWithEmailAndPassword(email, password);
  },

  signInWithEmail({ commit }:any, { email, password }:any) {
    return auth().signInWithEmailAndPassword(email, password);
  },

  signInWithTwitter({ commit }:any) {
    return auth().signInWithPopup(new auth.TwitterAuthProvider());
  },

  signInWithFacebook({ commit }:any) {
    return auth().signInWithPopup(new auth.FacebookAuthProvider());
  },

  signInWithGoogle({ commit }:any) {
    return auth().signInWithPopup(new auth.GoogleAuthProvider());
  },

  signOut({ commit }:any) {
    commit("signOut")
    return auth().signOut();
  },
  async bookMarks({ commit }:any) {
      const querySnapshot = await getDocs(collection(db, `${userId}`));
      console.log(querySnapshot.docs)
      querySnapshot.forEach((doc) => {
        let marksitem = doc.data()
        commit("setArticle" , marksitem)
        commit("setTitle" , marksitem.title)
      });

  },
  bookMark({ commit }:any , headline:any) {
    //新規ドキュメントIDを指定
    let documetId = headline.slug
    setDoc(doc(db, `${userId}`, `${documetId}`), {
      author: headline.author,
      content: headline.content,
      description: headline.description,
      publishedAt: headline.publishedAt,
      slug: headline.slug,
      title: headline.title,
      url: headline.url,
      urlToImage: headline.urlToImage,
    });
  },
  bookMarkDelete({commit}:any, headline:any) {
    let documetId = headline.slug
    deleteDoc(doc(db, `${userId}`,`${documetId}`));
  }
};

export const getters = {
  user(state:any) {
    return state.user;
  },
  isAuthenticated(state:any) {
    return !!state.user;
  },
  setTitle(state:any) {
    return state.markTitles;
  },
};
