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
import { collection, addDoc, getFirestore , doc, onSnapshot } from "firebase/firestore";
import { LoaderOptionsPlugin } from "webpack";

const db = getFirestore(app);
const userId = auth().currentUser?.uid;

export const strict = false;

export const state = () => ({
  user: null,
  loggedIn: false,
  marklists:[]
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
    state.marklists = payload
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

  signOut() {
    return auth().signOut();
  },
  async bookMarks({ commit }:any) {
    // const querySnapshot = await getDocs(collection(db, `${userId}`));
    // querySnapshot.forEach((doc) => {
    //   let marksitem = doc.data()
    //   console.log(`${doc.id} => ${doc.data()}`);
    //   commit("setArticle", marksitem)
    // });
    console.log(userId)
    const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
        console.log("Current data: ", doc.data());
    });
  },
  bookMark({ commit }:any , headline:any) {
    // console.log(auth().currentUser?.uid)
    console.log(headline)
    const docRef = addDoc(collection(db, `${userId}`), {
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
};

export const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return !!state.user;
  },
};
