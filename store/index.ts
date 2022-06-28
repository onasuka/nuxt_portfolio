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
import { v4 as uuidv4 } from 'uuid';
import { auth, app } from "~/plugins/firebase";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, signInAnonymously, updateEmail, updatePassword } from "firebase/auth";
import { collection, setDoc, getFirestore , doc, deleteDoc ,getDocs,updateDoc } from "firebase/firestore";


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
  },
  wordList: [],
  wordNames : [],
  questionWord : [],
  questionList: [],
});


type LoginInfo = {
  email: string
  password: string
}

interface ArticleInfo {
  source: string,
  author: string,
  content: string,
  description: string,
  publishedAt: string,
  slug: string,
  title: string,
  url: string,
  urlToImage: string,
}
interface WordInfo {
  word: object,
  meaning: string,
  slug: string
}
interface UseInfo {
  use: string,
  name: string,
  email: string,
}
interface removeWordInfo {
  word: {
    word: string,
    meaning: string,
    slug: string,
  }
}

export const mutations = {
  setUser(state, payload:string) {
    state.user = payload;
  },
  login(state) {
    state.loggedIn = true;
  },
  logout(state) {
    state.loggedIn = false;
  },
  setArticle(state,payload:string) {
    let markitem = state.marklists
    markitem.push(payload)
  },
  setTitle(state ,payload:string) {
    let title = state.markTitles
    title.push(payload)
  },
  signOut(state) {
    state.markTitles = []
  },

  setProfile(state, user:UseInfo) {
    if(user) {
      state.profile.name = user.name
      state.profile.email = user.email
    } else {
      state.profile.name = "ゲスト"
      state.profile.email = ""
    }
  },

  setWordItem(state,payload:string) {
    let wordItem = state.wordList
    let wordPieces = wordItem.length

    wordItem.push(payload)
  },
  deleteWordItem(state){
    state.wordList = []
  },
  removeWordItem(state, payload: {wordNumber: string}) {
    let wordItem = state.wordList
    wordItem.splice(payload.wordNumber,1)
    console.log(wordItem)
  },
  setQuestionWord(state ,payload:string) {
    let questionWord = state.questionWord
    questionWord.push(payload)
  },
  setQuestionItem(state ,payload:string) {
    let questionItem = state.questionList
    questionItem.push(payload)
  },
};

export const actions = {
  signUp({ commit }, { email, password }:LoginInfo) {
    commit("login")
    return auth().createUserWithEmailAndPassword(email, password);
  },

  signInWithEmail({ commit }, { email, password }:LoginInfo) {
    commit("login")
    return auth().signInWithEmailAndPassword(email, password);
  },

  signInWithGoogle({ commit }) {
    commit("login")
    return auth().signInWithPopup(new auth.GoogleAuthProvider());
  },
  
  signInWithguestsLogin({ commit }) {
    const getAuth = auth();
    signInAnonymously(getAuth)
    .then(() => {
      commit("login")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  },

  signOut({ commit }) {
    commit("signOut")
    commit("setProfile")
    return auth().signOut();
  },
  async bookMarks({ commit }) {
    if(userId) {
      const querySnapshot = await getDocs(collection(db, `${userId}`));
      // console.log(querySnapshot.docs)
      querySnapshot.forEach((doc) => {
        let marksitem = doc.data()
        commit("setArticle" , marksitem)
        commit("setTitle" , marksitem.title)
      });
    }
  },
  bookMark({ commit } , headline:ArticleInfo) {
    //新規ドキュメントIDを指定
    let documetId = headline.slug
    setDoc(doc(db, `${userId}`, `${documetId}`), {
      source: headline.source,
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
  bookMarkDelete({commit}, headline:ArticleInfo) {
    let documetId = headline.slug
    deleteDoc(doc(db, `${userId}`,`${documetId}`));
  },

  userDateUp({commit},user:UseInfo) {
    // console.log(user.email)
    let userEmail = user.email
    let userName = userEmail.substr(0, userEmail.indexOf("@"));
    setDoc(doc(db, "profile", `${userId}`), {
      name: userName,
      email: userEmail,
    });
    commit("setProfile" , {name:userName,email:userEmail})
  },
  
  saveProfile({commit}, user:UseInfo) {
    const washingtonRef = doc(db, "profile",  `${userId}`);
    setDoc(washingtonRef, {
      name: user.name,
    }, {merge: true});
    console.log(user.name)
    commit("setProfile" , user.name)
  },
  async saveEmail({commit}, { newEmail, password }:{newEmail:string, password: string}) {
    const auth = getAuth();
    const user = auth.currentUser;    
    console.log(newEmail)
    // const credential = promptForCredentials();
    const credential = EmailAuthProvider.credential(
      user?.email ?? "",
      password
    )
    user && await reauthenticateWithCredential(user, credential).then(() => {
      // User re-authenticated.
      updateEmail(user, newEmail).then(() => {
        // Email updated!
      }).catch((error) => {
        // An error occurred
        // ...
      });
    }).catch((error) => {
      // An error ocurred
      console.log(error)
      // ...
    });
  },
  async savePassword({ commit }, { password, newPassword }:{password:string, newPassword: string}) {
    const auth = getAuth();
    const user = auth.currentUser;    
    console.log(password)
    // const credential = promptForCredentials();
    const credential = EmailAuthProvider.credential(
      user?.email ?? "",
      password
    )
    user && await reauthenticateWithCredential(user, credential).then(() => {
      // User re-authenticated.
      updatePassword(user, newPassword).then(() => {
        // Update successful.
        console.log("通った")

      }).catch((error) => {
        // An error occurred
        // ...
      });
    }).catch((error) => {
      // An error ocurred
      console.log("通ってない")
      console.log(error)
      // ...
    });
  },

  addWord({ commit }, wordItem:WordInfo) {
  //ランダムIDを生成
    let slug = uuidv4(wordItem.word);
    setDoc(doc(db, "user",`${userId}`,"word",`${slug}`), {
      word: wordItem.word,
      meaning: wordItem.meaning,
      isEditing: false,
      slug:slug
    });
    commit("setWordItem" , wordItem)
  },
  async wordList({ commit }) {
    if(userId) {
      const querySnapshot = await getDocs(collection(db, "user",`${userId}`,"word"));
      querySnapshot.forEach((doc) => {
        let wordItem = doc.data()
        commit("setWordItem" , wordItem)
      });
    }
  },
  saveWord({ commit },changeWord:WordInfo) {
    const washingtonRef = doc(db, "user",`${userId}`,"word",`${changeWord.slug}`);
    console.log(changeWord)
    updateDoc(washingtonRef, {
      word: changeWord.word,
      meaning: changeWord.meaning,
    });
  },
  removeWord({commit}, removeWord:removeWordInfo) {
    const removeRef = doc(db, "user",`${userId}`,"word",`${removeWord.word.slug}`);
    console.log(removeWord)
    deleteDoc(removeRef);
    commit("removeWordItem",removeWord)
  },
  async questionList({ commit }) {
    if(userId) {
      const querySnapshot = await getDocs(collection(db, "user",`${userId}`,"question"));
      // console.log(querySnapshot.docs)
      querySnapshot.forEach((doc) => {
        let questionItem = doc.data()
        // console.log(questionItem.word)
        commit("setQuestionItem" , questionItem)
        commit("setQuestionWord" , questionItem.word)
      });
    }
  },
  questionAdd( { commit },question:WordInfo) {
    let slug = uuidv4(question.word);
    setDoc(doc(db, "user",`${userId}`,"question",`${slug}`), {
      word: question.word,
      meaning: question.meaning,
    });
    // commit("setQuestionWord" , question.word)
  },
  removeQuestion({ commit }, removeQuetiond:WordInfo) {
    const removeRef = doc(db, "user",`${userId}`,"question",`${removeQuetiond.slug}`);
    deleteDoc(removeRef);
  },
};

export const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return !!state.user;
  },
  setTitle(state) {
    return state.markTitles;
  },
  wordList(state) {
    return state.wordList
  },
  questionWord(state) {
    return state.questionWord
  },
};
