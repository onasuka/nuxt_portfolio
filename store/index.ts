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
import { signInAnonymously , getAuth , updateEmail ,EmailAuthProvider } from "firebase/auth";
import { collection, setDoc, getFirestore , doc, deleteDoc ,getDocs } from "firebase/firestore";

const db = getFirestore(app);
let userId = "";

auth().onAuthStateChanged(function(user) {
  console.log(user?.uid)
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
  profile: {
    name: "ゲスト",
    email: ""
  }
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
  },
  setProfile(state, name, email) {
    console.log(name)
    state.profile.name = name
    state.profile.email = email
  }
};

export const actions = {
  signUp({ commit }, { email, password }) {
    return auth().createUserWithEmailAndPassword(email, password);
  },

  signInWithEmail({ commit }:any, { email, password }:any) {
    return auth().signInWithEmailAndPassword(email, password);
  },

  signInWithGoogle({ commit }:any) {
    return auth().signInWithPopup(new auth.GoogleAuthProvider());
  },
  
  signInWithguestsLogin({ commit }:any) {
    const getAuth = auth();
    signInAnonymously(getAuth)
    .then(() => {
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  },

  signOut({ commit }:any) {
    commit("signOut")
    return auth().signOut();
  },
  async bookMarks({ commit }:any) {
    if(userId) {
      const querySnapshot = await getDocs(collection(db, `${userId}`));
      console.log(querySnapshot.docs)
      querySnapshot.forEach((doc) => {
        let marksitem = doc.data()
        commit("setArticle" , marksitem)
        commit("setTitle" , marksitem.title)
      });
    }
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
  },
  userDateUp({commit},email) {
    console.log(email.state.user.email)
    let userEmail = email.state.user.email
    let userName = userEmail.substr(0, userEmail.indexOf("@"));
    setDoc(doc(db, "users", `${userId}`), {
      name: userName,
      email: userEmail,
    });
    commit("setProfile" , userEmail,userName)
  },
  saveProfile({commit}:any, user:any) {
    const washingtonRef = doc(db, "users",  `${userId}`);
    setDoc(washingtonRef, {
      name: user.name,
      email: user.email
    });
    commit("setProfile" , user.name,user.email)
  },
  async saveEmail({commit}:any, userData:any) {
    const user = getAuth().currentUser;
    try {
      const credential = await EmailAuthProvider.credential(
        user?.email ?? '', 
        password
      )
      user && (await updateEmail(user, credential))
      //メールアドレス、パスワードリセットの処理
    } catch (e) {
      console.log(e)
    }
  },
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
