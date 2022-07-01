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
  questionWord : [],
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
  setArticle(state: {marklists: Headlines[]},payload :Headlines) {
    let copyMarklists = state.marklists
    copyMarklists.push(payload)
  },
  setTitle(state: {markTitles:Headlines[]} ,payload :Headlines) {
    let copyMarkTitles = state.markTitles
    copyMarkTitles.push(payload)
  },
  signOut(state: {markTitles:Headlines[]}) {
    state.markTitles = []
  },

  setProfile(state:{profile:UseInfo}, user:UseInfo) {
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

  deleteWordItem(state: {wordList:WordInfo[]}){
    state.wordList = []
  },

  removeWordItem(state: {wordList:WordInfo[]}, payload: {wordNumber: number}) {
    let copyWordList = state.wordList
    copyWordList.splice(payload.wordNumber,1)
  },

  setQuestionWord(state: {questionWord:WordInfo[]} ,payload :WordInfo) {
    let copyQuestionWord = state.questionWord
    copyQuestionWord.push(payload)
  },

  setQuestionItem(state: {questionList:WordInfo[]},payload:WordInfo) {
    let copyQuestionList = state.questionList
    copyQuestionList.push(payload)
  },
  setProblemWord(state: {questionList:WordInfo[]},payload:WordInfo) {
    let copyQuestionList = state.questionList
    copyQuestionList.push(payload)
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
      const querySnapshot = await getDocs(collection(db, `${userId}`));
      // console.log(querySnapshot.docs)
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
    // console.log(user.email)
    let userEmail = user.email
    let userName = userEmail.substr(0, userEmail.indexOf("@"));
    setDoc(doc(db, "profile", `${userId}`), {
      name: userName,
      email: userEmail,
    });
    commit("setProfile" , {name:userName,email:userEmail})
  },
  
  saveProfile({commit}:any, user:UseInfo) {
    const washingtonRef = doc(db, "profile",  `${userId}`);
    setDoc(washingtonRef, {
      name: user.name,
    }, {merge: true});
    console.log(user.name)
    commit("setProfile" , user.name)
  },
  async saveEmail({commit}:any, { newEmail, password }:{newEmail:string, password: string}) {
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
        // ...
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
  async savePassword({commit}:any, { password, newPassword }:{password:string, newPassword: string}) {
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

  addWord({ commit }:any, wordItem:WordInfo) {
  //ランダムIDを生成
    let slug = uuidv4(wordItem.word);
    let registeredContent = {
      word: wordItem.word,
      meaning: wordItem.meaning,
      isEditing: false,
      slug:slug
    }
    setDoc(doc(db, "user",`${userId}`,"word",`${slug}`), {
      word: wordItem.word,
      meaning: wordItem.meaning,
      isEditing: false,
      slug:slug
    });
    // console.log(registeredContent)
    commit("setWordItem" , registeredContent)
  },
  async wordList({ commit }:any) {
    if(userId) {
      const querySnapshot = await getDocs(collection(db, "user",`${userId}`,"word"));
      querySnapshot.forEach((doc) => {
        let wordItem = doc.data()
        commit("setWordItem" , wordItem)
      });
    }
  },
  saveWord({ commit }:any,changeWord:WordInfo) {
    const washingtonRef = doc(db, "user",`${userId}`,"word",`${changeWord.slug}`);
    console.log(changeWord)
    updateDoc(washingtonRef, {
      word: changeWord.word,
      meaning: changeWord.meaning,
    });
  },
  removeWord({ commit }:any, removeWord:RemoveWordInfo) {
    const removeRef = doc(db, "user",`${userId}`,"word",`${removeWord.word.slug}`);
    deleteDoc(removeRef);
    commit("removeWordItem",removeWord)
  },
  async questionList({ commit }:any) {
    if(userId) {
      const querySnapshot = await getDocs(collection(db, "user",`${userId}`,"question"));
      // console.log(querySnapshot.docs)
      querySnapshot.forEach((doc) => {
        let questionItem = doc.data()
        // console.log(questionItem.word)
        commit("setQuestionWord" , questionItem.word)
      });
    }
  },
  async problemList({ commit }:any) {
    if(userId) {
      const querySnapshot = await getDocs(collection(db, "user",`${userId}`,"question"));
      // console.log(querySnapshot.docs)
      querySnapshot.forEach((doc) => {
        let questionItem = doc.data()
        // console.log(questionItem.word)
        commit("setProblemWord" , questionItem)
      });
    }
  },
  questionAdd( { commit }:any, question :WordInfo) {
    console.log(question)
    setDoc(doc(db, "user",`${userId}`,"question",`${question.slug}`), {
      word: question.word,
      meaning: question.meaning,
      slug: question.slug
    });
    commit("setQuestionItem" , question)
    commit("setQuestionWord" , question.word)
  },
  questionDelete({ commit }:any, removeQuetiond: WordInfo) {
    const removeRef = doc(db, "user",`${userId}`,"question",`${removeQuetiond.slug}`);
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
  questionWord(state: {questionWord: WordInfo[]}) {
    return state.questionWord
  },
};
