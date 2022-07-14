import { Store } from "vuex";
import { initialiseStores } from "~/utils/store-accessor";
const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];
export * from "~/utils/store-accessor";

import { v4 as uuidv4 } from 'uuid';
import { auth, app } from "~/plugins/firebase";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, signInAnonymously, updateEmail, updatePassword } from "firebase/auth";
import { collection, setDoc, getFirestore , doc, deleteDoc ,getDocs,updateDoc } from "firebase/firestore";


const db = getFirestore(app);
let userId = "";

auth().onAuthStateChanged(function(user) {
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
  questionWordId : [],
  questionList: [],
});


export const mutations = {
  setUser(state:{ user: string }, payload :string) {
    state.user = payload;
  },
  login(state:{ loggedIn: boolean}) {
    state.loggedIn = true;
  },
  logout(state:{ loggedIn: boolean}) {
    state.loggedIn = false;
  },
  setArticle(state: {marklists: ArticleInfo[]},payload:ArticleInfo) {
    let copyMarklists = state.marklists    
    copyMarklists.push(payload)
  },
  deleteArticle(state: {marklists: ArticleInfo[]}) {
    let copyMarklists = state.marklists    
    copyMarklists.splice(0)
  },
  setTitle(state: {markTitles:Headlines[]} ,payload :Headlines) {
    let copyMarkTitles = state.markTitles
    copyMarkTitles.push(payload)
  },
  deleteTitle(state: {markTitles: Headlines[]}) {
    let copyMarkTitles = state.markTitles    
    copyMarkTitles.splice(0)
  },
  signOut(state: {markTitles:Headlines[]}) {
    state.markTitles = []
  },

  setProfile(state:{profile:UseInfo}, user:string) {
    if(user) {
      state.profile.name = user
    } else {
      state.profile.name = "ゲスト"
      state.profile.email = ""
    }
  },
  setEmail(state:{profile:UseInfo}, user:string) {
      state.profile.email = user
  },
  addProfile(state:{profile:UseInfo}, user:UseInfo) {
    if(user) {
      state.profile.name = user.name
      state.profile.email = user.email
    } else {
      state.profile.name = "ゲスト"
      state.profile.email = ""
    }
  },

  setWordItem(state: {wordList:WordInfo[]},payload :WordInfo) {
    let copyWordList = state.wordList
    copyWordList.push(payload)
  },
  changeWordItem(state: {wordList:ChangeSetWordInfo[]} ,payload :ChangeWordInfo) {
    let copyWordList = state.wordList
    copyWordList[payload.wordNum] = payload.wordInfo
  },

  deleteWordItem(state: {wordList:WordInfo[]}){
    let copyWordList = state.wordList    
    copyWordList.splice(0)
  },

  removeWordItem(state: {wordList:WordInfo[]}, payload: {wordNumber: number}) {
    let copyWordList = state.wordList
    copyWordList.splice(payload.wordNumber,1)
  },

  setQuestionWordId(state: {questionWordId:WordInfo[]} ,payload :WordInfo) {
    let copyQuestionId = state.questionWordId
    copyQuestionId.push(payload)
  },

  setQuestionItem(state: {questionList:WordInfo[]},payload:WordInfo) {
    let copyQuestionList = state.questionList
    copyQuestionList.push(payload)
  },
  deleteQuestionItem(state: {questionList:WordInfo[]}) {
    let copyQuestionList = state.questionList
    copyQuestionList.splice(0)
  },
};

export const actions = {
  signUp({ commit }:any, { email, password }:LoginInfo) {
    commit("login")
    return auth().createUserWithEmailAndPassword(email, password);
  },

  signInWithEmail({ commit }:any, { email, password }:LoginInfo) {
    commit("login")
    return auth().signInWithEmailAndPassword(email, password);
  },

  signInWithGoogle({ commit }:any) {
    commit("login")
    return auth().signInWithPopup(new auth.GoogleAuthProvider());
  },
  
  signInWithguestsLogin({ commit }:any) {
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

  signOut({ commit }:any) {
    commit("signOut")
    commit("setProfile")
    return auth().signOut();
  },
  async bookMarks({ commit }:any) {
    if(userId) {
      commit("deleteArticle")
      commit("deleteTitle")
      const querySnapshot = await getDocs(collection(db, `${userId}`));
      querySnapshot.forEach((doc) => {
        let marksitem = doc.data()
        commit("setArticle" , marksitem)
        commit("setTitle" , marksitem.title)
      });
    }
  },
  bookMark({ commit }:any , headline:ArticleInfo) {
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
  bookMarkDelete({commit}:any, headline:ArticleInfo) {
    let documetId = headline.slug
    deleteDoc(doc(db, `${userId}`,`${documetId}`));
  },

  userDateUp({commit}:any,user:UseInfo) {
    let userEmail = user.email
    let userName = userEmail.substr(0, userEmail.indexOf("@"));
    setDoc(doc(db, "profile", `${userId}`), {
      name: userName,
      email: userEmail,
    });
    commit("addProfile" , {name:userName,email:userEmail})
  },
  
  saveProfile({commit}:any, user:UseInfo) {
    const washingtonRef = doc(db, "profile",  `${userId}`);
    setDoc(washingtonRef, {
      name: user.name,
    }, {merge: true});
    commit("setProfile" , user.name)
  },
  async saveEmail({commit}:any, { newEmail, password }:{newEmail:string, password: string}) {
    const auth = getAuth();
    const user = auth.currentUser;    
    // const credential = promptForCredentials();
    const credential = EmailAuthProvider.credential(
      user?.email ?? "",
      password
    )
    user && await reauthenticateWithCredential(user, credential).then(() => {
      // User re-authenticated.
      updateEmail(user, newEmail).then(() => {
        // Email updated!
        const washingtonRef = doc(db, "profile",  `${userId}`);
        setDoc(washingtonRef, {
          email: newEmail,
        }, {merge: true});
        commit("setEmail",newEmail)
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
    }).catch((error) => {
      // An error ocurred
      console.log(error)
      alert("パスワードが間違っています。");
      // ...
    });
  },
  async savePassword({commit}:any, { password, newPassword }:{password:string, newPassword: string}) {
    const auth = getAuth();
    const user = auth.currentUser;    
    // const credential = promptForCredentials();
    const credential = EmailAuthProvider.credential(
      user?.email ?? "",
      password
    )
    user && await reauthenticateWithCredential(user, credential).then(() => {
      // User re-authenticated.
      updatePassword(user, newPassword).then(() => {
        // Update successful.
      }).catch((error) => {
        // An error occurred
        // ...
      });
    }).catch((error) => {
      // An error ocurred
      console.log(error)
      alert("パスワードが間違っています。");
      // ...
    });
  },

  addWord({ commit }:any, wordItem:WordInfo) {
  //ランダムIDを生成
    let wordId = uuidv4(wordItem.word);
    let registeredContent = {
      word: wordItem.word,
      meaning: wordItem.meaning,
      isEditing: false,
      id:wordId
    }
    setDoc(doc(db, "user",`${userId}`,"word",`${wordId}`), {
      word: wordItem.word,
      meaning: wordItem.meaning,
      isEditing: false,
      id:wordId
    });
    commit("setWordItem" , registeredContent)
  },
  async wordList({ commit }:any) {
    if(userId) {
      commit("deleteWordItem")
      const querySnapshot = await getDocs(collection(db, "user",`${userId}`,"word"));
      querySnapshot.forEach((doc) => {
        let wordItem = doc.data()
        commit("setWordItem" , wordItem)
      });
    }
  },
  saveWord({ commit }:any,changeWord:ChangeWordInfo) {
    const washingtonRef = doc(db, "user",`${userId}`,"word",`${changeWord.wordInfo.id}`);
    updateDoc (washingtonRef, {
      word: changeWord.wordInfo.word,
      meaning: changeWord.wordInfo.meaning,
    })
    commit("changeWordItem" , changeWord)
  },
  removeWord({ commit }:any, removeWord:RemoveWordInfo) {
    const removeRef = doc(db, "user",`${userId}`,"word",`${removeWord.word.id}`);
    deleteDoc(removeRef);
    commit("removeWordItem",removeWord)
  },
  async questionWordId({ commit }:any) {
    if(userId) {
      const querySnapshot = await getDocs(collection(db, "user",`${userId}`,"question"));
      querySnapshot.forEach((doc) => {
        let questionItem = doc.data()
        commit("setQuestionWordId" , questionItem.id)
      });
    }
  },
  async questionList({ commit }:any) {
    if(userId) {
      commit("deleteQuestionItem")
      const querySnapshot = await getDocs(collection(db, "user",`${userId}`,"question"));
      querySnapshot.forEach((doc) => {
        let questionItem = doc.data()
        commit("setQuestionItem" , questionItem)
      });
    }
  },
  questionAdd( { commit }:any, question :WordInfo) {
    setDoc(doc(db, "user",`${userId}`,"question",`${question.id}`), {
      word: question.word,
      meaning: question.meaning,
      id: question.id
    });
    commit("setQuestionItem" , question)
    commit("setQuestionWordId" , question.id)
  },
  questionDelete({ commit }:any, removeQuetiond: WordInfo) {
    const removeRef = doc(db, "user",`${userId}`,"question",`${removeQuetiond.id}`);
    deleteDoc(removeRef);
  },
};

export const getters = {
  user(state: {user: object} ) {
    return state.user;
  },
  isAuthenticated(state: {user: object} ) {
    return !!state.user;
  },
  setTitle(state: {markTitles: string[]}) {
    return state.markTitles;
  },
  wordList(state: {wordList: WordInfo[]}) {
    return state.wordList
  },
  questionWordId(state: {questionWordId: WordInfo[]}) {
    return state.questionWordId
  },
};
