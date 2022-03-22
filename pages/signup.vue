<template>
  <v-card class="xs5 text-center">
    <v-card-title>
      <h4 class="text-center">新規登録</h4>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form v-on:submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          prepend-icon="mdi-account-circle"
          label="Eメール"
        ></v-text-field>
        <v-text-field
          v-model="password"
          v-bind:type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          prepend-icon="mdi-lock"
          append-icon="mdi-eye-off"
          label="パスワード"
        ></v-text-field>
        <v-btn @click="register" color="info">新規登録</v-btn>
      </v-form>
    </v-card-text>
    <v-btn class="login-google d-block">Googleで登録 </v-btn>
    <v-btn class="login-google d-block mb-4">Twitterで登録 </v-btn>
    <v-divider></v-divider>
    <div class="pt-8 pb-4 pl-10 login-txt">
      <span>すでにアカウントをお持ちですか？</span>
      <nuxt-link class="login-link" to="/signup">ログインに移動</nuxt-link>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
   return {
     email: '',
     password: '',
     showPassword: false
   }
  },
  computed: {
   user () {
     return this.$store.getters['user']
   },
  },
  methods : {
   register () {
     this.$store.dispatch('todos/register', {email: this.email, password: this.password})
   },
 }
})
</script>
<style lang="scss" scoped>
h4 {
  font-size: 2rem;
}
.v-btn {
  font-size: 1rem;
}

.login-link {
  color: #1976d2;
  text-decoration: underline;
}

.login-txt{
  font-size: 1rem;
}

.login-btn {
  padding: 10px;
  margin: 0 auto 15px;
}

.login-google {
  margin: 15px auto 15px;
}
</style>