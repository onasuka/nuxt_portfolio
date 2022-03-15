<template>
  <div>
    <h1>Nuxt.js(CompositionAPI)+TypeScriptでFirebaseと連携したい！</h1>
    <h2>↓googleでログイン↓</h2>
    <button @click="googleLogin">ログイン</button>
    <hr />
    <input type="text"  v-model='memo.text'/>
    <button @click="addMemo">追加</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent , reactive } from "@nuxtjs/composition-api"; //coompositionを使えるように

export default defineComponent({
  setup(_, { root }) {
    /**
     * ログイン機能
    */
    const googleLogin = async () => {
      try {
        const provider = new root.$fireModule.auth.GoogleAuthProvider()
        root.$fire.auth.signInWithRedirect(provider)
      } catch (e) {
        console.error(e)
      }
    }

    /**
     * メモ機能
     */
    let memo = reactive({
      text: null
    })
    const addMemo = async () => {
      try {
        await root.$fire.firestore
          .collection("memos")
          .add({
            text: memo.text
          })
        memo.text = null
      } catch(e) {
        console.error(e)
      }
    }

    return { googleLogin, memo, addMemo }
  }
})
</script>