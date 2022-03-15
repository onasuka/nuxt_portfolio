<template>
  <v-container>
    <v-card class="text-center">
      <v-card-title>
        <h4 class="text-center">ログイン</h4>
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
          <div class="text-center mb-5">
            <v-btn class="login-btn d-block" @click="register" color="info">ログイン</v-btn>
            <nuxt-link class="login-link" to="/signup">パスワードを忘れた方</nuxt-link>
          </div>

          <v-divider></v-divider>

          <v-btn @click="googleLogin" class="login-google d-block">Googleで登録 </v-btn>
          <v-btn class="login-google d-block">Twitterで登録 </v-btn>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>
      <div class="pt-8 pb-4 pl-10 login-txt">
        <span>アカウントを作成</span>
        <nuxt-link class="login-link" to="/signup">新規登録に移動</nuxt-link>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent , reactive } from "@nuxtjs/composition-api"; //coompositionを使えるように

// import Vue from "vue";
export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
  methods: {
    register() {
      this.$store.dispatch("todos/register", {
        email: this.email,
        password: this.password,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.v-btn {
  font-size: 1.5rem;
}
.login-link {
  margin: 0 auto 25px;
  color: #1976d2;
  text-decoration: underline;
}
</style>